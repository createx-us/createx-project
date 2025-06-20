-- Migration: Initial schema for CreateX Facilitator Guide CMS
-- Version: v1.0.0
-- Date: 2024-12-20

-- Content Management Tables
CREATE TABLE IF NOT EXISTS modules (
    id TEXT PRIMARY KEY,
    chapter INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    track TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    duration TEXT NOT NULL,
    learning_objectives TEXT, -- JSON array
    prerequisites TEXT, -- JSON array
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    tags TEXT, -- JSON array
    estimated_reading_time INTEGER DEFAULT 0,
    word_count INTEGER DEFAULT 0
);

-- Assessment System Tables
CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- quiz, assignment, project, reflection
    questions TEXT NOT NULL, -- JSON
    time_limit INTEGER, -- seconds
    passing_score INTEGER DEFAULT 70,
    max_attempts INTEGER DEFAULT 3,
    randomize_questions BOOLEAN DEFAULT FALSE,
    show_feedback BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assessment_attempts (
    id TEXT PRIMARY KEY,
    assessment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    answers TEXT NOT NULL, -- JSON
    score INTEGER,
    percentage REAL,
    passed BOOLEAN,
    time_spent INTEGER, -- seconds
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    ip_address TEXT,
    user_agent TEXT,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);

-- User Management and Progress Tracking
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'learner', -- learner, facilitator, admin
    preferences TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    module_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    progress_percentage INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0, -- seconds
    last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT, -- User's personal notes
    bookmarked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
    UNIQUE(user_id, module_id)
);

-- Translation System
CREATE TABLE IF NOT EXISTS translations (
    id TEXT PRIMARY KEY,
    content_id TEXT NOT NULL,
    content_type TEXT NOT NULL, -- module, assessment, ui, exercise
    language TEXT NOT NULL, -- ISO 639-1 code (en, es, fr, etc.)
    translated_content TEXT NOT NULL, -- JSON
    translator TEXT, -- ai, human, community
    confidence REAL DEFAULT 1.0,
    review_status TEXT DEFAULT 'pending', -- pending, approved, rejected
    reviewed_by TEXT,
    reviewed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, content_type, language)
);

-- Analytics and Usage Tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    session_id TEXT,
    event_type TEXT NOT NULL, -- page_view, module_start, module_complete, assessment_start, etc.
    event_data TEXT, -- JSON
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT,
    country_code TEXT,
    city TEXT
);

-- AI Generated Content
CREATE TABLE IF NOT EXISTS ai_generated_content (
    id TEXT PRIMARY KEY,
    content_type TEXT NOT NULL, -- exercise, assessment, enhancement, translation
    prompt TEXT NOT NULL,
    context TEXT, -- JSON
    generated_content TEXT NOT NULL, -- JSON
    model_used TEXT,
    confidence REAL,
    human_reviewed BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT
);

-- Workshop and Session Management
CREATE TABLE IF NOT EXISTS workshops (
    id TEXT PRIMARY KEY,
    facilitator_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    module_ids TEXT, -- JSON array of module IDs
    max_participants INTEGER,
    duration_minutes INTEGER,
    status TEXT DEFAULT 'draft', -- draft, scheduled, active, completed, cancelled
    scheduled_start DATETIME,
    scheduled_end DATETIME,
    actual_start DATETIME,
    actual_end DATETIME,
    meeting_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (facilitator_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS workshop_participants (
    id TEXT PRIMARY KEY,
    workshop_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    role TEXT DEFAULT 'participant', -- participant, co-facilitator
    joined_at DATETIME,
    left_at DATETIME,
    attendance_duration INTEGER DEFAULT 0, -- seconds
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(workshop_id, user_id)
);

-- Content Versioning and Collaboration
CREATE TABLE IF NOT EXISTS content_versions (
    id TEXT PRIMARY KEY,
    content_id TEXT NOT NULL,
    content_type TEXT NOT NULL, -- module, assessment
    version_number INTEGER NOT NULL,
    content_data TEXT NOT NULL, -- JSON snapshot
    changes_summary TEXT,
    created_by TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS content_comments (
    id TEXT PRIMARY KEY,
    content_id TEXT NOT NULL,
    content_type TEXT NOT NULL,
    user_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    line_number INTEGER, -- For inline comments
    resolved BOOLEAN DEFAULT FALSE,
    parent_comment_id TEXT, -- For threaded comments
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_comment_id) REFERENCES content_comments(id)
);

-- Notifications and Communication
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL, -- workshop_reminder, content_update, comment, etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data TEXT, -- JSON
    read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- System Configuration
CREATE TABLE IF NOT EXISTS system_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_modules_track ON modules(track);
CREATE INDEX IF NOT EXISTS idx_modules_difficulty ON modules(difficulty);
CREATE INDEX IF NOT EXISTS idx_modules_published ON modules(published);
CREATE INDEX IF NOT EXISTS idx_modules_chapter ON modules(chapter);

CREATE INDEX IF NOT EXISTS idx_assessments_module_id ON assessments(module_id);
CREATE INDEX IF NOT EXISTS idx_assessments_published ON assessments(published);

CREATE INDEX IF NOT EXISTS idx_attempts_assessment_id ON assessment_attempts(assessment_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON assessment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_completed_at ON assessment_attempts(completed_at);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module_id ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_completed ON user_progress(completed);

CREATE INDEX IF NOT EXISTS idx_translations_content ON translations(content_id, content_type);
CREATE INDEX IF NOT EXISTS idx_translations_language ON translations(language);

CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);

CREATE INDEX IF NOT EXISTS idx_workshops_facilitator ON workshops(facilitator_id);
CREATE INDEX IF NOT EXISTS idx_workshops_status ON workshops(status);
CREATE INDEX IF NOT EXISTS idx_workshops_scheduled_start ON workshops(scheduled_start);

-- Insert default system configuration
INSERT OR IGNORE INTO system_config (key, value, description) VALUES
('app_version', '1.0.0', 'Current application version'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode'),
('max_file_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)'),
('session_timeout', '86400', 'Session timeout in seconds (24 hours)'),
('default_language', 'en', 'Default application language'),
('supported_languages', '["en", "es", "fr", "de", "zh"]', 'Supported languages array'),
('ai_content_generation', 'true', 'Enable AI content generation features'),
('analytics_enabled', 'true', 'Enable analytics tracking'),
('workshop_max_participants', '50', 'Maximum participants per workshop'),
('content_cache_ttl', '300', 'Content cache TTL in seconds');

-- Insert default admin user (update with actual admin details)
INSERT OR IGNORE INTO users (id, email, name, role, created_at) VALUES
('admin-001', 'admin@createx.io', 'System Administrator', 'admin', CURRENT_TIMESTAMP);
