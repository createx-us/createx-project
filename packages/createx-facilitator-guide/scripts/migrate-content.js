#!/usr/bin/env node

/**
 * Data Migration Script for CreateX Facilitator Guide
 * Migrates existing markdown content to Cloudflare D1 database
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'modules');
const DB_NAME = 'createx-cms';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'blue') {
    console.log(`${colors[color]}[MIGRATION]${colors.reset} ${message}`);
}

function success(message) {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function error(message) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function warning(message) {
    console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

// Utility functions
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

function parseMarkdownFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: content };
    }

    const [, frontmatterText, markdownContent] = match;
    const frontmatter = {};

    // Simple YAML parser for common cases
    frontmatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            // Remove quotes if present
            frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
    });

    return { frontmatter, content: markdownContent };
}

function executeSQLCommand(sql) {
    try {
        const command = ENVIRONMENT === 'production'
            ? `wrangler d1 execute ${DB_NAME} --command="${sql}"`
            : `wrangler d1 execute ${DB_NAME} --local --command="${sql}"`;

        const result = execSync(command, { encoding: 'utf8' });
        return result;
    } catch (err) {
        error(`SQL execution failed: ${err.message}`);
        throw err;
    }
}

function insertModule(moduleData) {
    const sql = `
    INSERT INTO modules (
      title, slug, description, difficulty, duration, 
      category, tags, status, metadata, created_at, updated_at
    ) VALUES (
      '${moduleData.title.replace(/'/g, "''")}',
      '${moduleData.slug}',
      '${moduleData.description.replace(/'/g, "''")}',
      '${moduleData.difficulty}',
      ${moduleData.duration},
      '${moduleData.category}',
      '${JSON.stringify(moduleData.tags).replace(/'/g, "''")}',
      '${moduleData.status}',
      '${JSON.stringify(moduleData.metadata).replace(/'/g, "''")}',
      datetime('now'),
      datetime('now')
    );
  `;

    return executeSQLCommand(sql);
}

function getModuleId(slug) {
    const sql = `SELECT id FROM modules WHERE slug = '${slug}';`;
    const result = executeSQLCommand(sql);

    // Parse the result to extract the ID
    const match = result.match(/id.*?(\d+)/);
    return match ? parseInt(match[1]) : null;
}

function insertModuleContent(moduleId, contentData) {
    const sql = `
    INSERT INTO module_content (
      module_id, title, slug, content, content_type,
      sort_order, metadata, created_at, updated_at
    ) VALUES (
      ${moduleId},
      '${contentData.title.replace(/'/g, "''")}',
      '${contentData.slug}',
      '${JSON.stringify(contentData.content).replace(/'/g, "''")}',
      '${contentData.content_type}',
      ${contentData.sort_order},
      '${JSON.stringify(contentData.metadata).replace(/'/g, "''")}',
      datetime('now'),
      datetime('now')
    );
  `;

    return executeSQLCommand(sql);
}

function insertLearningObjective(moduleId, objective, sortOrder) {
    const sql = `
    INSERT INTO learning_objectives (
      module_id, objective_text, sort_order, created_at
    ) VALUES (
      ${moduleId},
      '${objective.replace(/'/g, "''")}',
      ${sortOrder},
      datetime('now')
    );
  `;

    return executeSQLCommand(sql);
}

function processMarkdownFile(filePath, moduleSlug) {
    log(`Processing file: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: markdownContent } = parseMarkdownFrontmatter(content);

    const fileName = path.basename(filePath, '.md');
    const sectionSlug = slugify(fileName);

    // Parse content into structured format
    const sections = markdownContent.split(/^##\s+/m).filter(Boolean);
    const processedContent = [];

    sections.forEach((section, index) => {
        const lines = section.trim().split('\n');
        const title = lines[0].replace('#', '').trim();
        const content = lines.slice(1).join('\n').trim();

        if (title && content) {
            processedContent.push({
                type: 'section',
                title: title,
                content: content,
                order: index
            });
        }
    });

    return {
        title: frontmatter.title || fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug: sectionSlug,
        content: processedContent,
        content_type: 'markdown',
        metadata: {
            original_file: filePath,
            frontmatter: frontmatter
        }
    };
}

function processModuleDirectory(moduleDir) {
    log(`Processing module directory: ${moduleDir}`);

    const moduleName = path.basename(moduleDir);
    const moduleSlug = slugify(moduleName);

    // Read module metadata from index file or directory structure
    const indexFile = path.join(moduleDir, 'index.md');
    const readmeFile = path.join(moduleDir, 'README.md');

    let moduleMetadata = {
        title: moduleName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Module: ${moduleName}`,
        difficulty: 'intermediate',
        duration: 120,
        category: 'entrepreneurship',
        tags: ['entrepreneurship', 'innovation'],
        status: 'published'
    };

    // Try to read module metadata from index file
    if (fs.existsSync(indexFile)) {
        const indexContent = fs.readFileSync(indexFile, 'utf8');
        const { frontmatter } = parseMarkdownFrontmatter(indexContent);
        moduleMetadata = { ...moduleMetadata, ...frontmatter };
    } else if (fs.existsSync(readmeFile)) {
        const readmeContent = fs.readFileSync(readmeFile, 'utf8');
        const { frontmatter } = parseMarkdownFrontmatter(readmeContent);
        moduleMetadata = { ...moduleMetadata, ...frontmatter };
    }

    // Parse learning objectives if present
    const learningObjectives = [];
    if (moduleMetadata.objectives) {
        if (Array.isArray(moduleMetadata.objectives)) {
            learningObjectives.push(...moduleMetadata.objectives);
        } else if (typeof moduleMetadata.objectives === 'string') {
            learningObjectives.push(moduleMetadata.objectives);
        }
    }

    const moduleData = {
        title: moduleMetadata.title,
        slug: moduleSlug,
        description: moduleMetadata.description,
        difficulty: moduleMetadata.difficulty,
        duration: parseInt(moduleMetadata.duration) || 120,
        category: moduleMetadata.category,
        tags: Array.isArray(moduleMetadata.tags) ? moduleMetadata.tags : [moduleMetadata.tags].filter(Boolean),
        status: moduleMetadata.status,
        metadata: {
            original_directory: moduleDir,
            learning_objectives: learningObjectives
        }
    };

    return { moduleData, learningObjectives };
}

async function migrateContent() {
    log('Starting content migration to Cloudflare D1...');

    try {
        // Check if content directory exists
        if (!fs.existsSync(CONTENT_DIR)) {
            warning(`Content directory not found: ${CONTENT_DIR}`);
            warning('Creating sample module structure...');

            // Create sample module
            const sampleModuleDir = path.join(CONTENT_DIR, '01-introduction-to-entrepreneurship');
            fs.mkdirSync(sampleModuleDir, { recursive: true });

            const sampleContent = `---
title: Introduction to Entrepreneurship
description: Learn the fundamentals of entrepreneurship and innovation
difficulty: beginner
duration: 90
category: fundamentals
tags: ["entrepreneurship", "basics", "innovation"]
objectives:
  - Understand what entrepreneurship means
  - Identify entrepreneurial opportunities
  - Learn about the startup ecosystem
---

# Introduction to Entrepreneurship

## What is Entrepreneurship?

Entrepreneurship is the process of creating, developing, and managing a new business venture to make a profit. It involves taking calculated risks, being innovative, and solving problems in the market.

## Key Characteristics of Entrepreneurs

- **Risk-taking**: Willing to take calculated risks
- **Innovation**: Bringing new ideas to market
- **Persistence**: Not giving up when facing challenges
- **Leadership**: Ability to lead and inspire teams

## The Entrepreneurial Mindset

Developing an entrepreneurial mindset involves:

1. Identifying opportunities
2. Being creative and innovative
3. Taking calculated risks
4. Learning from failures
5. Building networks and relationships
`;

            fs.writeFileSync(path.join(sampleModuleDir, 'index.md'), sampleContent);
            success('Created sample module content');
        }

        // Get all module directories
        const moduleDirectories = fs.readdirSync(CONTENT_DIR)
            .filter(item => fs.statSync(path.join(CONTENT_DIR, item)).isDirectory());

        if (moduleDirectories.length === 0) {
            warning('No module directories found');
            return;
        }

        log(`Found ${moduleDirectories.length} module directories`);

        // Process each module
        for (const moduleDir of moduleDirectories) {
            const fullModulePath = path.join(CONTENT_DIR, moduleDir);

            try {
                const { moduleData, learningObjectives } = processModuleDirectory(fullModulePath);

                log(`Inserting module: ${moduleData.title}`);
                insertModule(moduleData);

                const moduleId = getModuleId(moduleData.slug);
                if (!moduleId) {
                    error(`Failed to get module ID for: ${moduleData.slug}`);
                    continue;
                }

                success(`Created module: ${moduleData.title} (ID: ${moduleId})`);

                // Insert learning objectives
                learningObjectives.forEach((objective, index) => {
                    insertLearningObjective(moduleId, objective, index);
                });

                if (learningObjectives.length > 0) {
                    success(`Added ${learningObjectives.length} learning objectives`);
                }

                // Process markdown files in the module directory
                const markdownFiles = fs.readdirSync(fullModulePath)
                    .filter(file => file.endsWith('.md') && file !== 'index.md' && file !== 'README.md');

                markdownFiles.forEach((file, index) => {
                    const filePath = path.join(fullModulePath, file);
                    const contentData = processMarkdownFile(filePath, moduleData.slug);
                    contentData.sort_order = index;

                    insertModuleContent(moduleId, contentData);
                    success(`Added content section: ${contentData.title}`);
                });

                // If no separate content files, create content from index file
                if (markdownFiles.length === 0) {
                    const indexFile = path.join(fullModulePath, 'index.md');
                    if (fs.existsSync(indexFile)) {
                        const contentData = processMarkdownFile(indexFile, moduleData.slug);
                        contentData.sort_order = 0;

                        insertModuleContent(moduleId, contentData);
                        success(`Added content from index file`);
                    }
                }

            } catch (err) {
                error(`Failed to process module ${moduleDir}: ${err.message}`);
                continue;
            }
        }

        success('Content migration completed successfully!');

    } catch (err) {
        error(`Migration failed: ${err.message}`);
        process.exit(1);
    }
}

// Run migration
if (require.main === module) {
    migrateContent();
}

module.exports = {
    migrateContent,
    parseMarkdownFrontmatter,
    slugify
};
