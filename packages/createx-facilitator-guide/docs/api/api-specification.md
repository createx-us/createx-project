# API Specification

## 🔌 CreateX Facilitator Guide API Documentation

### Overview
The CreateX Facilitator Guide API provides comprehensive access to content management, assessment systems, AI services, and analytics. This RESTful API follows OpenAPI 3.0 standards and supports JSON data format.

**Base URL**: `/api`  
**API Version**: v1  
**Authentication**: Bearer Token (JWT)  
**Content-Type**: `application/json`

---

## 🔐 **AUTHENTICATION**

### Authorization Header
```http
Authorization: Bearer <jwt_token>
```

### User Roles
- **Learner**: Can access content and take assessments
- **Facilitator**: Can create and manage content, view analytics
- **Admin**: Full system access including user management
- **Guest**: Read-only access to public content

---

## 📚 **CONTENT ENDPOINTS**

### Get All Modules
```http
GET /api/content/modules
```

**Query Parameters**:
```yaml
lang: string (optional) - Language code (en, es, fr, de, zh)
track: string (optional) - Filter by learning track
difficulty: string (optional) - Filter by difficulty (beginner, intermediate, advanced)
limit: number (optional) - Maximum results (default: 50)
offset: number (optional) - Pagination offset (default: 0)
```

**Response Example**:
```json
{
  "modules": [
    {
      "id": "creative-confidence",
      "chapter": 3,
      "title": "Building Creative Confidence",
      "track": "Creative Mindset",
      "duration": "45 minutes",
      "difficulty": "beginner",
      "prerequisites": ["design-thinking-intro"],
      "learningObjectives": [
        "Understand the components of creative confidence",
        "Identify personal creative barriers",
        "Practice confidence-building exercises"
      ],
      "tags": ["creativity", "confidence", "mindset"],
      "lastModified": "2025-01-15T10:30:00Z",
      "author": "Jane Smith"
    }
  ],
  "pagination": {
    "total": 27,
    "limit": 50,
    "offset": 0,
    "hasNext": false
  }
}
```

### Get Specific Module
```http
GET /api/content/modules/{moduleId}
```

**Path Parameters**:
- `moduleId`: Unique module identifier

**Query Parameters**:
```yaml
lang: string (optional) - Language code
includeContent: boolean (optional) - Include full content (default: true)
format: string (optional) - Response format (json, html, markdown)
```

**Response Example**:
```json
{
  "module": {
    "id": "creative-confidence",
    "chapter": 3,
    "title": "Building Creative Confidence",
    "track": "Creative Mindset",
    "duration": "45 minutes",
    "difficulty": "beginner",
    "prerequisites": ["design-thinking-intro"],
    "learningObjectives": [
      "Understand the components of creative confidence",
      "Identify personal creative barriers"
    ],
    "content": "<h1>Building Creative Confidence</h1><p>Creative confidence is...</p>",
    "rawContent": "# Building Creative Confidence\n\nCreative confidence is...",
    "metadata": {
      "author": "Jane Smith",
      "lastModified": "2025-01-15T10:30:00Z",
      "version": "1.2",
      "reviewStatus": "approved",
      "wordCount": 2850,
      "readingTime": "12 minutes"
    },
    "assessments": [
      {
        "id": "cc-quiz-1",
        "title": "Creative Confidence Assessment",
        "type": "quiz",
        "questionCount": 5,
        "estimatedTime": "10 minutes"
      }
    ],
    "exercises": [
      {
        "id": "cc-exercise-1",
        "title": "Confidence Building Activity",
        "type": "individual",
        "duration": "15 minutes"
      }
    ]
  }
}
```

### Search Content
```http
GET /api/content/search
```

**Query Parameters**:
```yaml
q: string (required) - Search query
lang: string (optional) - Language code
type: string (optional) - Content type (module, exercise, assessment)
track: string (optional) - Learning track filter
difficulty: string (optional) - Difficulty filter
limit: number (optional) - Maximum results (default: 20)
```

**Response Example**:
```json
{
  "results": [
    {
      "module": {
        "id": "creative-confidence",
        "title": "Building Creative Confidence",
        "track": "Creative Mindset"
      },
      "score": 0.95,
      "highlights": [
        "Creative <mark>confidence</mark> is the ability to believe in your creative capabilities",
        "Building <mark>confidence</mark> through practice and reflection"
      ],
      "excerpt": "Creative confidence is the foundation of innovative thinking..."
    }
  ],
  "totalResults": 8,
  "searchTime": "0.023s"
}
```

### Get Learning Tracks
```http
GET /api/content/tracks
```

**Response Example**:
```json
{
  "tracks": [
    {
      "id": "creative-mindset",
      "name": "Creative Mindset",
      "description": "Develop creative thinking and confidence",
      "moduleCount": 6,
      "totalDuration": "4 hours",
      "difficulty": "beginner-intermediate",
      "modules": [
        {
          "id": "design-thinking-intro",
          "order": 1,
          "title": "Introduction to Design Thinking"
        },
        {
          "id": "creative-confidence",
          "order": 2,
          "title": "Building Creative Confidence"
        }
      ]
    }
  ]
}
```

### Get Navigation Structure
```http
GET /api/content/navigation
```

**Query Parameters**:
```yaml
lang: string (optional) - Language code
includeProgress: boolean (optional) - Include user progress (requires auth)
```

**Response Example**:
```json
{
  "navigation": {
    "tracks": [
      {
        "id": "creative-mindset",
        "title": "Creative Mindset",
        "modules": [
          {
            "id": "creative-confidence",
            "title": "Building Creative Confidence",
            "path": "/modules/creative-confidence",
            "completed": true,
            "progress": 100
          }
        ]
      }
    ],
    "totalModules": 27,
    "userProgress": {
      "completedModules": 5,
      "totalProgress": 18.5
    }
  }
}
```

---

## 🧠 **ASSESSMENT ENDPOINTS**

### Get Module Assessments
```http
GET /api/assessments/modules/{moduleId}
```

**Response Example**:
```json
{
  "assessments": [
    {
      "id": "cc-quiz-1",
      "title": "Creative Confidence Assessment",
      "type": "quiz",
      "description": "Test your understanding of creative confidence concepts",
      "questionCount": 5,
      "timeLimit": 600,
      "passingScore": 70,
      "allowRetakes": true,
      "availableFrom": "2025-01-01T00:00:00Z",
      "availableUntil": null,
      "attempts": [
        {
          "attemptId": "attempt-123",
          "score": 85,
          "completedAt": "2025-01-15T14:30:00Z",
          "timeSpent": 480
        }
      ]
    }
  ]
}
```

### Get Assessment Details
```http
GET /api/assessments/{assessmentId}
```

**Response Example**:
```json
{
  "assessment": {
    "id": "cc-quiz-1",
    "title": "Creative Confidence Assessment",
    "description": "Test your understanding of creative confidence concepts",
    "instructions": "Read each question carefully and select the best answer.",
    "timeLimit": 600,
    "questionCount": 5,
    "passingScore": 70,
    "configuration": {
      "allowRetakes": true,
      "showFeedback": "immediate",
      "randomizeQuestions": false,
      "allowNavigation": true
    },
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "text": "What is the primary component of creative confidence?",
        "options": [
          "Technical skills",
          "Belief in creative abilities",
          "Artistic talent",
          "Educational background"
        ],
        "points": 20,
        "feedback": {
          "correct": "Correct! Creative confidence is fundamentally about belief.",
          "incorrect": "Creative confidence is more about mindset than skills."
        }
      }
    ]
  }
}
```

### Submit Assessment Attempt
```http
POST /api/assessments/{assessmentId}/attempts
```

**Request Body**:
```json
{
  "answers": [
    {
      "questionId": "q1",
      "answer": "Belief in creative abilities",
      "timeSpent": 45
    },
    {
      "questionId": "q2",
      "answer": ["option-a", "option-c"],
      "timeSpent": 60
    }
  ],
  "totalTimeSpent": 480,
  "completed": true
}
```

**Response Example**:
```json
{
  "attempt": {
    "id": "attempt-456",
    "assessmentId": "cc-quiz-1",
    "userId": "user-123",
    "score": 85,
    "percentage": 85,
    "passed": true,
    "completedAt": "2025-01-15T14:30:00Z",
    "timeSpent": 480,
    "results": [
      {
        "questionId": "q1",
        "correct": true,
        "points": 20,
        "feedback": "Correct! Creative confidence is fundamentally about belief."
      }
    ],
    "feedback": {
      "overall": "Great job! You demonstrated a solid understanding of creative confidence.",
      "strengths": ["Conceptual understanding", "Application skills"],
      "improvements": ["Consider exploring practical exercises"]
    }
  }
}
```

### Get User Assessment Progress
```http
GET /api/assessments/progress
```

**Query Parameters**:
```yaml
moduleId: string (optional) - Filter by module
trackId: string (optional) - Filter by track
```

**Response Example**:
```json
{
  "progress": {
    "totalAssessments": 15,
    "completedAssessments": 8,
    "averageScore": 82.5,
    "assessments": [
      {
        "id": "cc-quiz-1",
        "title": "Creative Confidence Assessment",
        "moduleId": "creative-confidence",
        "bestScore": 85,
        "attempts": 2,
        "lastAttempt": "2025-01-15T14:30:00Z",
        "status": "passed"
      }
    ]
  }
}
```

---

## 🤖 **AI SERVICES ENDPOINTS**

### Generate Content
```http
POST /api/ai/generate
```

**Request Body**:
```json
{
  "type": "exercise",
  "prompt": "Create a team building exercise for creative confidence",
  "context": {
    "moduleId": "creative-confidence",
    "duration": "30 minutes",
    "groupSize": "6-8 people",
    "difficulty": "beginner"
  },
  "parameters": {
    "creativity": "high",
    "interactivity": "high",
    "materials": "minimal"
  }
}
```

**Response Example**:
```json
{
  "generated": {
    "id": "exercise-ai-001",
    "title": "Creative Confidence Circle",
    "description": "A team exercise to build creative confidence through positive affirmation and idea sharing",
    "duration": "30 minutes",
    "materials": ["Sticky notes", "Pens", "Timer"],
    "steps": [
      {
        "order": 1,
        "instruction": "Form a circle with all participants",
        "duration": "2 minutes",
        "tips": ["Ensure everyone can see each other", "Create a welcoming atmosphere"]
      },
      {
        "order": 2,
        "instruction": "Each person writes one creative strength on a sticky note",
        "duration": "5 minutes",
        "tips": ["Encourage honest self-reflection", "No strength is too small"]
      }
    ],
    "variations": [
      {
        "name": "Virtual Version",
        "changes": ["Use breakout rooms", "Digital sticky notes"]
      }
    ],
    "learningObjectives": [
      "Build awareness of personal creative strengths",
      "Practice giving and receiving positive feedback"
    ]
  },
  "metadata": {
    "confidence": 0.92,
    "generationTime": "3.4s",
    "model": "gpt-4",
    "timestamp": "2025-01-15T15:45:00Z"
  }
}
```

### Enhance Content
```http
POST /api/ai/enhance
```

**Request Body**:
```json
{
  "content": "Creative confidence is important for innovation.",
  "enhancements": ["clarity", "engagement", "examples"],
  "context": {
    "audience": "facilitators",
    "level": "beginner",
    "tone": "professional"
  }
}
```

**Response Example**:
```json
{
  "enhanced": {
    "content": "Creative confidence serves as the cornerstone of innovative thinking, empowering individuals to trust their creative instincts and take calculated risks. For facilitators, fostering this confidence in learners means creating safe spaces for experimentation, celebrating diverse ideas, and providing constructive feedback that builds rather than diminishes creative courage.",
    "improvements": [
      {
        "type": "clarity",
        "description": "Added specific definition and context"
      },
      {
        "type": "engagement",
        "description": "Included actionable guidance for facilitators"
      },
      {
        "type": "examples",
        "description": "Provided concrete strategies"
      }
    ]
  },
  "metadata": {
    "originalWordCount": 8,
    "enhancedWordCount": 52,
    "readabilityScore": 12.5,
    "confidence": 0.89
  }
}
```

### Translate Content
```http
POST /api/ai/translate
```

**Request Body**:
```json
{
  "content": "Building creative confidence requires practice and patience.",
  "targetLanguage": "es",
  "sourceLanguage": "en",
  "context": {
    "domain": "education",
    "preserveTerms": ["creative confidence"],
    "tone": "formal"
  }
}
```

**Response Example**:
```json
{
  "translation": {
    "content": "Desarrollar la confianza creativa requiere práctica y paciencia.",
    "confidence": 0.95,
    "alternatives": [
      {
        "text": "Construir la confianza creativa requiere práctica y paciencia.",
        "confidence": 0.88
      }
    ],
    "preservedTerms": ["creative confidence → confianza creativa"]
  },
  "metadata": {
    "sourceLanguage": "en",
    "targetLanguage": "es",
    "model": "gpt-4-translate",
    "timestamp": "2025-01-15T16:00:00Z"
  }
}
```

---

## 📊 **ANALYTICS ENDPOINTS**

### Get Content Analytics
```http
GET /api/analytics/content
```

**Query Parameters**:
```yaml
startDate: string (ISO date) - Start date for analytics
endDate: string (ISO date) - End date for analytics
moduleId: string (optional) - Filter by module
trackId: string (optional) - Filter by track
```

**Response Example**:
```json
{
  "analytics": {
    "overview": {
      "totalViews": 1547,
      "uniqueUsers": 342,
      "averageTimeSpent": 890,
      "completionRate": 76.5
    },
    "modules": [
      {
        "id": "creative-confidence",
        "title": "Building Creative Confidence",
        "views": 245,
        "completions": 189,
        "averageScore": 82.3,
        "averageTime": 1240,
        "dropoffPoints": [
          {
            "section": "Exercise 2",
            "percentage": 15.2
          }
        ]
      }
    ],
    "trends": {
      "daily": [
        {
          "date": "2025-01-15",
          "views": 45,
          "completions": 38
        }
      ]
    }
  }
}
```

### Get User Analytics
```http
GET /api/analytics/users
```

**Query Parameters**:
```yaml
period: string - Time period (week, month, quarter, year)
groupBy: string - Group by (role, track, completion)
```

**Response Example**:
```json
{
  "users": {
    "total": 1250,
    "active": 847,
    "new": 45,
    "retention": {
      "week1": 89.2,
      "week2": 72.8,
      "month1": 65.4
    },
    "engagement": {
      "averageSessionTime": 1850,
      "pagesPerSession": 4.2,
      "returnRate": 68.3
    },
    "segmentation": [
      {
        "role": "facilitator",
        "count": 156,
        "averageScore": 87.5,
        "completionRate": 92.1
      },
      {
        "role": "learner",
        "count": 1094,
        "averageScore": 78.2,
        "completionRate": 71.8
      }
    ]
  }
}
```

---

## 🛠️ **ADMIN ENDPOINTS**

### Content Management
```http
PUT /api/admin/content/modules/{moduleId}
```

**Request Body**:
```json
{
  "title": "Building Creative Confidence",
  "content": "# Building Creative Confidence\n\nUpdated content...",
  "metadata": {
    "author": "Jane Smith",
    "track": "Creative Mindset",
    "difficulty": "beginner",
    "duration": "45 minutes",
    "learningObjectives": ["Updated objective 1", "Updated objective 2"]
  }
}
```

### Bulk Content Operations
```http
POST /api/admin/content/bulk
```

**Request Body**:
```json
{
  "operation": "export",
  "filters": {
    "track": "Creative Mindset",
    "format": "markdown"
  },
  "options": {
    "includeMetadata": true,
    "includeAssessments": true
  }
}
```

---

## 🚨 **ERROR HANDLING**

### Standard Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "duration",
        "message": "Duration must be a positive number"
      }
    ],
    "timestamp": "2025-01-15T16:30:00Z",
    "requestId": "req-abc123"
  }
}
```

### Error Codes
- `400 BAD_REQUEST` - Invalid request data
- `401 UNAUTHORIZED` - Authentication required
- `403 FORBIDDEN` - Insufficient permissions
- `404 NOT_FOUND` - Resource not found
- `422 VALIDATION_ERROR` - Data validation failed
- `429 RATE_LIMITED` - Too many requests
- `500 INTERNAL_ERROR` - Server error

---

## 🔧 **API UTILITIES**

### Health Check
```http
GET /api/health
```

### API Version
```http
GET /api/version
```

### Rate Limiting
- **Authenticated Users**: 1000 requests/hour
- **Guests**: 100 requests/hour
- **AI Endpoints**: 50 requests/hour

---

*This API specification provides comprehensive access to all CreateX Facilitator Guide features and follows REST best practices for scalable integration.*
