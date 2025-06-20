# UML Class Diagrams

## 📊 Core Domain Model

### Content Management Domain

```mermaid
classDiagram
    class Module {
        +string id
        +number chapter
        +string title
        +string track
        +string duration
        +string difficulty
        +string[] prerequisites
        +string[] learningObjectives
        +string content
        +ModuleMetadata metadata
        +validate() boolean
        +toHTML() string
        +translate(locale: Locale) Module
    }

    class ModuleMetadata {
        +string author
        +Date lastModified
        +string version
        +string[] tags
        +number estimatedTime
        +string[] materials
        +Assessment[] assessments
    }

    class Assessment {
        +string id
        +string type
        +string title
        +Question[] questions
        +Rubric rubric
        +number maxScore
    }

    class Question {
        +string id
        +string type
        +string text
        +string[] options
        +string correctAnswer
        +number points
    }

    class Rubric {
        +string[] criteria
        +RubricLevel[] levels
        +string description
    }

    class RubricLevel {
        +string name
        +number score
        +string description
    }

    class Track {
        +string id
        +string name
        +string description
        +Module[] modules
        +string[] prerequisites
        +number totalDuration
    }

    Module ||--|| ModuleMetadata
    ModuleMetadata ||--o{ Assessment
    Assessment ||--o{ Question
    Assessment ||--|| Rubric
    Rubric ||--o{ RubricLevel
    Track ||--o{ Module
```

### Content Management System

```mermaid
classDiagram
    class ContentManager {
        -string contentDir
        -Map~string,Module~ moduleCache
        +loadAllModules() Promise~Module[]~
        +getModule(id: string) Promise~Module~
        +getModulesByTrack(track: string) Promise~Module[]~
        +searchModules(query: string) Promise~SearchResult[]~
        +validateModule(module: Module) ValidationResult
        +generateNavigation() NavigationStructure
        +getContentStats() ContentStats
    }

    class SearchResult {
        +Module module
        +number score
        +string[] highlights
        +string excerpt
    }

    class ValidationResult {
        +boolean isValid
        +ValidationError[] errors
        +ValidationWarning[] warnings
        +string[] suggestions
    }

    class ValidationError {
        +string type
        +string message
        +number line
        +string field
    }

    class ValidationWarning {
        +string type
        +string message
        +string suggestion
    }

    class NavigationStructure {
        +NavigationItem[] items
        +number totalModules
        +string[] tracks
    }

    class NavigationItem {
        +string id
        +string title
        +string path
        +NavigationItem[] children
        +string track
        +number order
    }

    class ContentStats {
        +number totalModules
        +number totalTracks
        +Map~string,number~ modulesByTrack
        +Map~string,number~ modulesByDifficulty
        +number averageDuration
    }

    ContentManager --> Module
    ContentManager --> SearchResult
    ContentManager --> ValidationResult
    ContentManager --> NavigationStructure
    ContentManager --> ContentStats
    ValidationResult --> ValidationError
    ValidationResult --> ValidationWarning
    NavigationStructure --> NavigationItem
```

### Translation System

```mermaid
classDiagram
    class TranslationService {
        -Map~Locale,Dictionary~ dictionaries
        +translate(content: string, target: Locale) Promise~string~
        +getTranslation(key: string, locale: Locale) string
        +loadDictionary(locale: Locale) Promise~Dictionary~
        +validateTranslations() ValidationResult[]
    }

    class Dictionary {
        +Locale locale
        +Map~string,string~ translations
        +Date lastUpdated
        +string version
        +getTranslation(key: string) string
        +addTranslation(key: string, value: string) void
    }

    class Locale {
        <<enumeration>>
        EN
        ES
        FR
        DE
        ZH
    }

    class TranslationRequest {
        +string content
        +Locale sourceLanguage
        +Locale targetLanguage
        +TranslationContext context
    }

    class TranslationContext {
        +string moduleId
        +string contentType
        +string[] preservedTerms
        +Map~string,string~ glossary
    }

    class TranslationResult {
        +string translatedContent
        +number confidence
        +string[] warnings
        +Map~string,string~ alternatives
    }

    TranslationService --> Dictionary
    TranslationService --> Locale
    TranslationService --> TranslationRequest
    TranslationService --> TranslationResult
    TranslationRequest --> Locale
    TranslationRequest --> TranslationContext
```

### AI Integration System

```mermaid
classDiagram
    class AIService {
        -string apiKey
        -string model
        +generateContent(request: AIRequest) Promise~AIResponse~
        +enhanceContent(content: string) Promise~string~
        +generateExercise(objectives: string[]) Promise~Exercise~
        +generateAssessment(module: Module) Promise~Assessment~
        +translateContent(content: string, target: Locale) Promise~string~
    }

    class AIRequest {
        +string type
        +string prompt
        +AIContext context
        +Map~string,any~ parameters
    }

    class AIContext {
        +Module module
        +string[] learningObjectives
        +string difficulty
        +string duration
        +string[] materials
    }

    class AIResponse {
        +string content
        +number confidence
        +string[] sources
        +Map~string,any~ metadata
        +Date timestamp
    }

    class Exercise {
        +string id
        +string title
        +string description
        +string duration
        +string[] materials
        +ExerciseStep[] steps
        +string[] variations
    }

    class ExerciseStep {
        +number order
        +string instruction
        +string duration
        +string[] tips
        +string[] commonMistakes
    }

    AIService --> AIRequest
    AIService --> AIResponse
    AIService --> Exercise
    AIRequest --> AIContext
    Exercise --> ExerciseStep
```

### Build System

```mermaid
classDiagram
    class BuildSystem {
        -BuildConfig config
        -ContentManager contentManager
        +build(options: BuildOptions) Promise~BuildResult~
        +serve(port: number) Promise~Server~
        +validate() Promise~ValidationResult[]~
        +generateStats() Promise~BuildStats~
    }

    class BuildConfig {
        +string outputDir
        +string templateDir
        +boolean minify
        +string[] includedLocales
        +Map~string,any~ customOptions
    }

    class BuildOptions {
        +boolean production
        +string outputFormat
        +boolean generateSearch
        +boolean includeAdmin
        +string[] locales
    }

    class BuildResult {
        +boolean success
        +string outputPath
        +string[] generatedFiles
        +number totalSize
        +BuildError[] errors
        +number buildTime
    }

    class BuildError {
        +string type
        +string message
        +string file
        +number line
        +string severity
    }

    class BuildStats {
        +number totalPages
        +number totalAssets
        +Map~string,number~ fileSizes
        +number buildTime
        +string[] optimizations
    }

    class Server {
        +number port
        +string host
        +boolean isRunning
        +start() Promise~void~
        +stop() Promise~void~
        +getStatus() ServerStatus
    }

    class ServerStatus {
        +boolean running
        +number uptime
        +number requests
        +string[] recentErrors
    }

    BuildSystem --> BuildConfig
    BuildSystem --> BuildOptions
    BuildSystem --> BuildResult
    BuildSystem --> BuildStats
    BuildSystem --> Server
    BuildResult --> BuildError
    Server --> ServerStatus
```

## 🎯 Key Design Patterns

### 1. **Factory Pattern**
Used in `ContentManager` for creating different types of content objects based on frontmatter metadata.

### 2. **Strategy Pattern**
Implemented in `AIService` for different content generation strategies (exercise, assessment, enhancement).

### 3. **Observer Pattern**
Used in build system for watching file changes and triggering rebuilds.

### 4. **Command Pattern**
CLI tools implement command pattern for different build operations.

### 5. **Repository Pattern**
`ContentManager` acts as a repository for content access, abstracting file system operations.

## 🔗 Relationships and Dependencies

### Core Dependencies
- `Module` is the central entity that all other services operate on
- `ContentManager` orchestrates all content operations
- `TranslationService` and `AIService` are independent but can be composed
- `BuildSystem` depends on `ContentManager` and can use translation/AI services

### Data Flow
1. Raw markdown files → `ContentManager` → `Module` objects
2. `Module` objects → `TranslationService` → Localized content
3. `Module` objects → `AIService` → Enhanced/generated content
4. Processed content → `BuildSystem` → Static HTML output

### Error Handling
- Each service implements comprehensive error handling
- Validation results provide structured error information
- Build system aggregates errors from all services
- API layer translates internal errors to HTTP responses

---

*These class diagrams provide a comprehensive view of the system's object-oriented design and relationships.*
