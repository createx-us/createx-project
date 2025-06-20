# UML Component Diagrams

## 🏗️ System Component Architecture

### High-Level Component Overview

```mermaid
C4Component
    title CreateX Facilitator Guide - Component Diagram

    Container_Boundary(frontend, "Frontend Layer") {
        Component(nextjs, "Next.js App", "React 18, TypeScript", "Web application framework")
        Component(components, "React Components", "Reusable UI", "Modular component library")
        Component(hooks, "Custom Hooks", "State Management", "Content and AI hooks")
        Component(providers, "Context Providers", "Global State", "Theme, progress, auth")
    }

    Container_Boundary(api, "API Layer") {
        Component(content_api, "Content API", "REST Endpoints", "Content CRUD operations")
        Component(assessment_api, "Assessment API", "REST Endpoints", "Quiz and assessment management")
        Component(ai_api, "AI Services API", "REST Endpoints", "AI content generation")
        Component(analytics_api, "Analytics API", "REST Endpoints", "Usage and performance data")
    }

    Container_Boundary(services, "Business Logic Layer") {
        Component(content_mgr, "Content Manager", "TypeScript", "Content processing and validation")
        Component(translation_svc, "Translation Service", "TypeScript", "Multi-language support")
        Component(ai_svc, "AI Service", "TypeScript", "AI integration and content generation")
        Component(build_svc, "Build System", "Node.js", "Static site generation")
    }

    Container_Boundary(data, "Data Layer") {
        Component(markdown, "Markdown Files", "File System", "Content storage")
        Component(metadata, "YAML Frontmatter", "File System", "Content metadata")
        Component(translations, "Translation Files", "JSON", "Language dictionaries")
        Component(config, "Configuration", "JSON/YAML", "System configuration")
    }

    Rel(nextjs, content_api, "HTTP/REST")
    Rel(nextjs, assessment_api, "HTTP/REST")
    Rel(nextjs, ai_api, "HTTP/REST")
    Rel(content_api, content_mgr, "Function calls")
    Rel(assessment_api, content_mgr, "Function calls")
    Rel(ai_api, ai_svc, "Function calls")
    Rel(content_mgr, markdown, "File I/O")
    Rel(translation_svc, translations, "File I/O")
    Rel(build_svc, config, "File I/O")
```

### Frontend Component Architecture

```mermaid
graph TB
    subgraph "Next.js App Router"
        Layout[Root Layout]
        Pages[Dynamic Pages]
        API[API Routes]
    end

    subgraph "Core Components"
        Nav[Navigation]
        Footer[Footer]
        ContentToolbar[Content Toolbar]
        AdminPanel[Admin Panel]
    end

    subgraph "Content Components"
        ModulePage[Dynamic Module Page]
        ModuleList[Module List]
        SearchResults[Search Results]
        ContentDisplay[Content Display]
    end

    subgraph "Assessment Components"
        QuizInterface[Quiz Interface]
        QuestionTypes[Question Types]
        ProgressTracker[Progress Tracker]
        ResultsDisplay[Results Display]
    end

    subgraph "AI Components"
        ContentGenerator[Content Generator]
        TranslationUI[Translation UI]
        EnhancementPanel[Enhancement Panel]
    end

    subgraph "Utility Components"
        ErrorBoundary[Error Boundary]
        LoadingSpinner[Loading States]
        LanguageSelector[Language Selector]
        ThemeToggle[Theme Toggle]
    end

    subgraph "Providers & Hooks"
        ThemeProvider[Theme Provider]
        ProgressProvider[Progress Provider]
        useModules[useModules Hook]
        useAI[useAI Hook]
        useTranslation[useTranslation Hook]
    end

    Layout --> Nav
    Layout --> Pages
    Layout --> Footer
    Layout --> ContentToolbar
    
    Pages --> ModulePage
    Pages --> AdminPanel
    
    ModulePage --> ContentDisplay
    ModulePage --> QuizInterface
    ModulePage --> ProgressTracker
    
    AdminPanel --> ContentGenerator
    AdminPanel --> TranslationUI
    AdminPanel --> ModuleList
    
    QuizInterface --> QuestionTypes
    QuizInterface --> ResultsDisplay
    
    ContentGenerator --> useAI
    ModulePage --> useModules
    TranslationUI --> useTranslation
    
    ThemeProvider --> ThemeToggle
    ProgressProvider --> ProgressTracker
```

### API Component Structure

```mermaid
graph TB
    subgraph "API Gateway Layer"
        Router[Next.js API Router]
        Middleware[Request Middleware]
        Auth[Authentication]
        RateLimit[Rate Limiting]
    end

    subgraph "Content API Module"
        ContentController[Content Controller]
        ContentValidation[Content Validation]
        ContentSerialization[Content Serialization]
    end

    subgraph "Assessment API Module"
        AssessmentController[Assessment Controller]
        QuizEngine[Quiz Engine]
        ScoreCalculation[Score Calculation]
        ProgressTracking[Progress Tracking]
    end

    subgraph "AI API Module"
        AIController[AI Controller]
        ContentGeneration[Content Generation]
        TranslationEngine[Translation Engine]
        EnhancementEngine[Enhancement Engine]
    end

    subgraph "Analytics API Module"
        AnalyticsController[Analytics Controller]
        DataAggregation[Data Aggregation]
        ReportGeneration[Report Generation]
        MetricsCollection[Metrics Collection]
    end

    subgraph "Shared Components"
        ErrorHandler[Error Handler]
        Logger[Request Logger]
        CacheManager[Cache Manager]
        ValidationSchemas[Validation Schemas]
    end

    Router --> Middleware
    Middleware --> Auth
    Middleware --> RateLimit
    
    Router --> ContentController
    Router --> AssessmentController
    Router --> AIController
    Router --> AnalyticsController
    
    ContentController --> ContentValidation
    ContentController --> ContentSerialization
    
    AssessmentController --> QuizEngine
    AssessmentController --> ScoreCalculation
    AssessmentController --> ProgressTracking
    
    AIController --> ContentGeneration
    AIController --> TranslationEngine
    AIController --> EnhancementEngine
    
    AnalyticsController --> DataAggregation
    AnalyticsController --> ReportGeneration
    AnalyticsController --> MetricsCollection
    
    ContentController --> ErrorHandler
    AssessmentController --> ErrorHandler
    AIController --> ErrorHandler
    AnalyticsController --> ErrorHandler
    
    ContentController --> Logger
    AssessmentController --> Logger
    AIController --> Logger
    AnalyticsController --> Logger
    
    ContentController --> CacheManager
    AssessmentController --> CacheManager
    
    ContentValidation --> ValidationSchemas
    QuizEngine --> ValidationSchemas
```

### Service Layer Architecture

```mermaid
graph TB
    subgraph "Content Management Services"
        ContentManager[Content Manager]
        FileProcessor[File Processor]
        MetadataParser[Metadata Parser]
        ContentValidator[Content Validator]
        SearchIndexer[Search Indexer]
    end

    subgraph "AI Integration Services"
        AIServiceFacade[AI Service Facade]
        OpenAIClient[OpenAI Client]
        ContentGenerator[Content Generator]
        TranslationService[Translation Service]
        EnhancementService[Enhancement Service]
    end

    subgraph "Assessment Services"
        AssessmentManager[Assessment Manager]
        QuizProcessor[Quiz Processor]
        GradingEngine[Grading Engine]
        ProgressCalculator[Progress Calculator]
        AnalyticsProcessor[Analytics Processor]
    end

    subgraph "Build & Deployment Services"
        StaticSiteGenerator[Static Site Generator]
        TemplateEngine[Template Engine]
        AssetOptimizer[Asset Optimizer]
        DeploymentManager[Deployment Manager]
    end

    subgraph "Utility Services"
        FileSystemManager[File System Manager]
        ConfigurationManager[Configuration Manager]
        CacheService[Cache Service]
        LoggingService[Logging Service]
        ErrorReporter[Error Reporter]
    end

    ContentManager --> FileProcessor
    ContentManager --> MetadataParser
    ContentManager --> ContentValidator
    ContentManager --> SearchIndexer
    
    AIServiceFacade --> OpenAIClient
    AIServiceFacade --> ContentGenerator
    AIServiceFacade --> TranslationService
    AIServiceFacade --> EnhancementService
    
    AssessmentManager --> QuizProcessor
    AssessmentManager --> GradingEngine
    AssessmentManager --> ProgressCalculator
    AssessmentManager --> AnalyticsProcessor
    
    StaticSiteGenerator --> TemplateEngine
    StaticSiteGenerator --> AssetOptimizer
    StaticSiteGenerator --> DeploymentManager
    
    ContentManager --> FileSystemManager
    ContentManager --> ConfigurationManager
    ContentManager --> CacheService
    
    AIServiceFacade --> LoggingService
    AIServiceFacade --> ErrorReporter
    
    AssessmentManager --> CacheService
    AssessmentManager --> LoggingService
    
    StaticSiteGenerator --> FileSystemManager
    StaticSiteGenerator --> ConfigurationManager
```

### Data Flow Component Diagram

```mermaid
graph LR
    subgraph "Input Sources"
        MarkdownFiles[Markdown Files]
        UserInput[User Input]
        APIRequests[API Requests]
        ConfigFiles[Config Files]
    end

    subgraph "Processing Pipeline"
        ContentProcessor[Content Processor]
        ValidationEngine[Validation Engine]
        TransformationEngine[Transformation Engine]
        CacheLayer[Cache Layer]
    end

    subgraph "Business Logic"
        ContentManager[Content Manager]
        AssessmentEngine[Assessment Engine]
        AIServices[AI Services]
        AnalyticsEngine[Analytics Engine]
    end

    subgraph "Output Channels"
        WebInterface[Web Interface]
        APIResponses[API Responses]
        StaticFiles[Static Files]
        Reports[Reports]
    end

    MarkdownFiles --> ContentProcessor
    UserInput --> ValidationEngine
    APIRequests --> TransformationEngine
    ConfigFiles --> ContentProcessor
    
    ContentProcessor --> ContentManager
    ValidationEngine --> ContentManager
    TransformationEngine --> AssessmentEngine
    
    ContentManager --> CacheLayer
    AssessmentEngine --> CacheLayer
    AIServices --> CacheLayer
    
    CacheLayer --> WebInterface
    ContentManager --> APIResponses
    AssessmentEngine --> StaticFiles
    AnalyticsEngine --> Reports
    
    ContentManager --> AIServices
    AssessmentEngine --> AnalyticsEngine
```

## 🔧 Component Interfaces and Dependencies

### Content Manager Interface
```typescript
interface IContentManager {
  // Core content operations
  loadAllModules(): Promise<Module[]>
  getModule(id: string): Promise<Module | null>
  saveModule(module: Module): Promise<void>
  deleteModule(id: string): Promise<void>
  
  // Search and filtering
  searchModules(query: string): Promise<SearchResult[]>
  getModulesByTrack(track: string): Promise<Module[]>
  
  // Validation and quality
  validateModule(module: Module): ValidationResult
  getContentStats(): ContentStats
  generateNavigation(): NavigationStructure
}
```

### AI Service Interface
```typescript
interface IAIService {
  // Content generation
  generateContent(request: AIRequest): Promise<AIResponse>
  enhanceContent(content: string, options: EnhancementOptions): Promise<string>
  
  // Specialized generation
  generateExercise(objectives: string[], context: AIContext): Promise<Exercise>
  generateAssessment(module: Module): Promise<Assessment>
  
  // Translation and improvement
  translateContent(content: string, targetLang: Locale): Promise<string>
  suggestImprovements(content: string): Promise<Suggestion[]>
}
```

### Assessment Manager Interface
```typescript
interface IAssessmentManager {
  // Assessment management
  createAssessment(assessment: Assessment): Promise<string>
  getAssessment(id: string): Promise<Assessment | null>
  updateAssessment(id: string, assessment: Assessment): Promise<void>
  
  // Attempt management
  startAttempt(assessmentId: string, userId: string): Promise<AttemptSession>
  submitAttempt(attempt: AssessmentAttempt): Promise<AttemptResult>
  
  // Progress and analytics
  getUserProgress(userId: string): Promise<ProgressData>
  getAssessmentAnalytics(assessmentId: string): Promise<AnalyticsData>
}
```

### Build System Interface
```typescript
interface IBuildSystem {
  // Build operations
  build(options: BuildOptions): Promise<BuildResult>
  watch(callback: (changes: FileChange[]) => void): void
  serve(port: number): Promise<Server>
  
  // Validation and optimization
  validate(): Promise<ValidationResult[]>
  optimize(): Promise<OptimizationResult>
  deploy(target: DeploymentTarget): Promise<DeploymentResult>
}
```

## 🔗 Component Dependencies

### Frontend Dependencies
```yaml
Primary Dependencies:
  - Next.js 15 (App Router)
  - React 18 (UI Library)
  - TypeScript 5 (Type Safety)
  - Tailwind CSS (Styling)

Secondary Dependencies:
  - Lucide React (Icons)
  - React Hook Form (Form Management)
  - Framer Motion (Animations)
  - React Query (Data Fetching)
```

### Backend Dependencies
```yaml
Core Libraries:
  - gray-matter (Frontmatter Parsing)
  - remark (Markdown Processing)
  - remark-html (HTML Conversion)
  - remark-gfm (GitHub Flavored Markdown)

Utility Libraries:
  - chalk (CLI Styling)
  - commander (CLI Framework)
  - express (Preview Server)
  - chokidar (File Watching)
```

### AI Integration Dependencies
```yaml
AI Services:
  - OpenAI API (Content Generation)
  - Azure Cognitive Services (Translation)
  - Hugging Face Transformers (Local AI)

Processing Libraries:
  - natural (Text Processing)
  - compromise (NLP)
  - sentiment (Sentiment Analysis)
```

## 📦 Component Deployment Model

### Development Environment
```mermaid
graph TB
    subgraph "Developer Machine"
        NextDev[Next.js Dev Server]
        FileWatcher[File Watcher]
        ContentValidator[Live Validation]
    end

    subgraph "Local Services"
        LocalContent[Local Content Files]
        DevDatabase[Dev Database]
        MockAI[Mock AI Services]
    end

    NextDev --> LocalContent
    FileWatcher --> ContentValidator
    ContentValidator --> NextDev
    NextDev --> MockAI
```

### Production Environment
```mermaid
graph TB
    subgraph "CDN Layer"
        CDN[Global CDN]
        StaticAssets[Static Assets]
    end

    subgraph "Application Layer"
        LoadBalancer[Load Balancer]
        AppInstances[App Instances]
        APIGateway[API Gateway]
    end

    subgraph "Service Layer"
        ContentService[Content Service]
        AIService[AI Service]
        AnalyticsService[Analytics Service]
    end

    subgraph "Data Layer"
        ContentStore[Content Storage]
        UserDatabase[User Database]
        CacheCluster[Cache Cluster]
    end

    CDN --> LoadBalancer
    LoadBalancer --> AppInstances
    AppInstances --> APIGateway
    APIGateway --> ContentService
    APIGateway --> AIService
    APIGateway --> AnalyticsService
    
    ContentService --> ContentStore
    AIService --> UserDatabase
    AnalyticsService --> CacheCluster
```

---

*These component diagrams provide a comprehensive view of the system's modular architecture and component relationships.*
