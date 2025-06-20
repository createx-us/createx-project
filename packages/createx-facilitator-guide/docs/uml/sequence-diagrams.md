# UML Sequence Diagrams

## 🔄 System Interaction Flows

### 1. Content Loading and Display

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant N as Next.js Router
    participant API as Content API
    participant CM as Content Manager
    participant FS as File System

    U->>B: Navigate to /modules/creative-confidence
    B->>N: Route request
    N->>API: GET /api/content/modules/creative-confidence
    API->>CM: getModule('creative-confidence')
    CM->>FS: Read markdown file
    FS-->>CM: Raw content + frontmatter
    CM->>CM: Parse metadata with gray-matter
    CM->>CM: Process content with remark
    CM-->>API: Processed Module object
    API-->>N: JSON response with module data
    N->>N: Render DynamicModulePage component
    N-->>B: HTML with rendered content
    B-->>U: Display module page
```

### 2. Content Search Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant API as Content API
    participant CM as Content Manager
    participant SI as Search Index

    U->>B: Enter search query "creative thinking"
    B->>API: GET /api/content/search?q=creative+thinking
    API->>CM: searchModules('creative thinking')
    CM->>SI: Query search index
    SI-->>CM: Matching module IDs with scores
    loop For each matching module
        CM->>CM: Load module content
        CM->>CM: Generate excerpt and highlights
    end
    CM-->>API: SearchResult array
    API-->>B: JSON response with results
    B->>B: Render search results
    B-->>U: Display filtered modules
```

### 3. AI Content Generation

```mermaid
sequenceDiagram
    participant U as User (Facilitator)
    participant Admin as Admin Panel
    participant API as Content API
    participant AI as AI Service
    participant CM as Content Manager
    participant FS as File System

    U->>Admin: Click "Generate Exercise"
    Admin->>Admin: Show generation form
    U->>Admin: Fill prompt and select type
    Admin->>API: POST /api/content/generate
    Note over Admin,API: {type: "exercise", prompt: "...", context: {...}}
    API->>AI: generateContent(request)
    AI->>AI: Process prompt with context
    AI->>AI: Generate structured exercise
    AI-->>API: Generated exercise object
    API-->>Admin: JSON response with exercise
    Admin->>Admin: Display generated content
    U->>Admin: Review and approve
    Admin->>CM: Save exercise to module
    CM->>FS: Write updated markdown
    FS-->>CM: Confirmation
    CM-->>Admin: Success response
    Admin-->>U: Show success message
```

### 4. Multi-Language Translation

```mermaid
sequenceDiagram
    participant U as User
    participant UI as User Interface
    participant API as Content API
    participant TS as Translation Service
    participant Dict as Dictionary
    participant AI as AI Service (Optional)

    U->>UI: Select language "Español"
    UI->>API: GET /api/content/modules/creative-confidence?lang=es
    API->>TS: getTranslation(content, 'es')
    TS->>Dict: Load Spanish dictionary
    Dict-->>TS: Translation mappings
    
    alt If translation exists
        TS->>TS: Apply translations
        TS-->>API: Translated content
    else If AI translation enabled
        TS->>AI: translate(content, 'es')
        AI-->>TS: AI-translated content
        TS->>Dict: Cache translation
    else Fallback to original
        TS-->>API: Original content with warning
    end
    
    API-->>UI: Localized content
    UI-->>U: Display in Spanish
```

### 5. Static Site Build Process

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CLI as Build CLI
    participant BS as Build System
    participant CM as Content Manager
    participant TG as Template Generator
    participant FS as File System

    Dev->>CLI: npm run build:static
    CLI->>BS: build({production: true})
    BS->>CM: loadAllModules()
    CM->>FS: Scan content directory
    FS-->>CM: All markdown files
    
    loop For each module
        CM->>CM: Parse and validate content
    end
    
    CM-->>BS: All processed modules
    BS->>BS: Generate navigation structure
    BS->>TG: Generate HTML pages
    
    loop For each module
        TG->>TG: Apply template with content
        TG->>FS: Write HTML file
    end
    
    TG->>TG: Generate index.html
    TG->>TG: Generate search.json
    TG->>FS: Write static assets
    FS-->>TG: Confirmation
    TG-->>BS: Build complete
    BS-->>CLI: Build result
    CLI-->>Dev: Success message with stats
```

### 6. Content Validation Workflow

```mermaid
sequenceDiagram
    participant A as Author
    participant Editor as Code Editor
    participant FS as File System
    participant Watcher as File Watcher
    participant CM as Content Manager
    participant Val as Validator
    participant UI as Dev Server UI

    A->>Editor: Edit module markdown
    Editor->>FS: Save file changes
    FS->>Watcher: File change event
    Watcher->>CM: validateModule(changedFile)
    CM->>Val: Validate content structure
    
    Val->>Val: Check frontmatter schema
    Val->>Val: Validate markdown syntax
    Val->>Val: Check learning objectives
    Val->>Val: Verify prerequisites exist
    
    alt If validation passes
        Val-->>CM: ValidationResult{isValid: true}
        CM-->>UI: Show success indicator
    else If validation fails
        Val-->>CM: ValidationResult{errors: [...]}
        CM-->>UI: Show error indicators
        UI-->>A: Display errors in editor
    end
    
    A->>A: Fix validation errors
    Note over A,UI: Cycle continues until valid
```

### 7. Admin Panel Content Management

```mermaid
sequenceDiagram
    participant F as Facilitator
    participant AP as Admin Panel
    participant API as Content API
    participant CM as Content Manager
    participant FS as File System

    F->>AP: Open Admin Panel
    AP->>API: GET /api/content/modules
    API->>CM: loadAllModules()
    CM-->>API: Module list with metadata
    API-->>AP: Module overview data
    AP-->>F: Display content dashboard

    F->>AP: Select module to edit
    AP->>API: GET /api/content/modules/{id}
    API->>CM: getModule(id)
    CM-->>API: Full module content
    API-->>AP: Module details
    AP-->>F: Show edit interface

    F->>AP: Make content changes
    AP->>API: POST /api/content/validate
    API->>CM: validateModule(content)
    CM-->>API: Validation results
    
    alt If valid
        API-->>AP: Success response
        F->>AP: Save changes
        AP->>CM: Save updated content
        CM->>FS: Write markdown file
        FS-->>CM: Success
        CM-->>AP: Saved successfully
        AP-->>F: Show success message
    else If invalid
        API-->>AP: Validation errors
        AP-->>F: Show error messages
        Note over F,AP: User fixes errors and retries
    end
```

### 8. Progressive Web App Offline Support

```mermaid
sequenceDiagram
    participant U as User
    participant PWA as PWA Client
    participant SW as Service Worker
    participant Cache as Browser Cache
    participant API as Content API

    U->>PWA: Load application
    PWA->>SW: Register service worker
    SW->>API: Fetch critical content
    API-->>SW: Core modules and assets
    SW->>Cache: Store in cache
    Cache-->>SW: Cached successfully

    Note over U,Cache: User goes offline

    U->>PWA: Navigate to cached module
    PWA->>SW: Request content
    SW->>Cache: Check cache
    Cache-->>SW: Return cached content
    SW-->>PWA: Serve from cache
    PWA-->>U: Display content (offline)

    Note over U,Cache: User comes back online

    U->>PWA: Request new content
    PWA->>SW: Check for updates
    SW->>API: Fetch latest content
    API-->>SW: Updated content
    SW->>Cache: Update cache
    SW-->>PWA: Serve fresh content
    PWA-->>U: Display updated content
```

## 🎯 Key Interaction Patterns

### 1. **Request-Response Pattern**
Most API interactions follow a simple request-response pattern with proper error handling and validation.

### 2. **Event-Driven Updates**
File watching and real-time validation use event-driven patterns for responsive development experience.

### 3. **Caching Strategy**
Multiple levels of caching (browser, service worker, API) ensure optimal performance.

### 4. **Graceful Degradation**
All interactions have fallback mechanisms for offline or error scenarios.

### 5. **Validation Pipeline**
Content validation happens at multiple stages to ensure quality and consistency.

## 🔄 Error Handling Flows

### API Error Handling
```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Service
    
    Client->>API: Request
    API->>Service: Process
    Service-->>API: Error
    API->>API: Log error
    API->>API: Sanitize error message
    API-->>Client: HTTP error response
    Client->>Client: Show user-friendly message
```

### Content Validation Error Flow
```mermaid
sequenceDiagram
    participant User
    participant Validator
    participant ErrorHandler
    participant UI
    
    User->>Validator: Submit content
    Validator->>Validator: Validate
    Validator-->>ErrorHandler: Validation errors
    ErrorHandler->>ErrorHandler: Categorize errors
    ErrorHandler->>UI: Structured error data
    UI-->>User: Highlight errors with suggestions
```

---

*These sequence diagrams illustrate the dynamic behavior and interactions within the CreateX Facilitator Guide system.*
