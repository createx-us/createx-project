# CreateX Facilitator Guide - Content Management System

## 🎯 Overview

This is a comprehensive content management system for the CreateX Facilitator Guide, featuring:

- **Markdown-based content** with gray-matter metadata
- **API endpoints** for dynamic content serving  
- **Translation system** for multiple languages
- **AI integration** for content generation and enhancement
- **Build system** for static HTML generation
- **Content validation** and quality checking
- **Admin panel** for content management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build static HTML site
npm run build:static

# Serve static site locally
npm run serve:static

# Validate all content
npm run validate:content

# View content statistics
npm run stats
```

## 📁 Project Structure

```
createx-facilitator-guide/
├── app/                          # Next.js App Router
│   ├── api/content/[...slug]/    # Dynamic content API
│   ├── modules/                  # Module pages
│   ├── layout.tsx               # Root layout with toolbar
│   └── page.tsx                 # Homepage
├── components/
│   ├── AdminPanel.tsx           # Content management interface
│   ├── ContentToolbar.tsx       # Floating management toolbar
│   ├── DynamicModulePage.tsx    # Template for module pages
│   ├── Footer.tsx               # Site footer
│   └── Navigation.tsx           # Site navigation
├── content/
│   ├── modules/                 # Markdown module files
│   │   ├── 03-creative-confidence.md
│   │   └── [other modules]
│   └── translations/            # Translation files
│       ├── en/                  # English translations
│       ├── es/                  # Spanish translations
│       └── [other languages]
├── lib/
│   ├── content.ts              # Content management system
│   ├── hooks.ts                # React hooks for content operations
│   └── i18n.ts                 # Internationalization
├── scripts/
│   └── build.ts                # Build system CLI
└── dictionaries/               # UI translations
    ├── en.json
    ├── es.json
    └── [other languages]
```

## 🛠️ Content Management

### Markdown Structure

Each module follows this structure:

```markdown
---
title: "Module Title"
track: "Learning Track"
duration: "45 minutes"
difficulty: "Beginner"
prerequisites: ["Basic facilitation skills"]
learningObjectives:
  - "Objective 1"
  - "Objective 2"
---

# Module Title

## Learning Objectives
- Understand concept A
- Apply technique B

## Prerequisites
**Prerequisites:** Basic facilitation skills

**Duration:** 45 minutes
**Difficulty:** Beginner

## Content Sections
[Markdown content here]
```

### API Endpoints

- `GET /api/content/modules` - Get all modules
- `GET /api/content/modules/[id]` - Get specific module
- `GET /api/content/tracks` - Get all tracks
- `GET /api/content/tracks/[track]` - Get modules by track
- `GET /api/content/search?q=query` - Search modules
- `GET /api/content/navigation` - Get navigation structure
- `POST /api/content/generate` - AI content generation
- `POST /api/content/translate` - Content translation
- `POST /api/content/validate` - Content validation

### React Hooks

```typescript
import { useModules, useTranslation, useAI, useBuildSystem } from '../lib/hooks';

// Load and manage modules
const { modules, loading, getModule, searchModules } = useModules();

// Handle translations
const { translateContent, currentLanguage, t } = useTranslation();

// AI content generation
const { generateContent, enhanceContent, suggestExercises } = useAI();

// Build system
const { buildSite, buildStatus, exportToPDF } = useBuildSystem();
```

## 🌍 Translation System

### Adding New Languages

1. Create translation dictionary:
```json
// dictionaries/[lang].json
{
  "navigation.home": "Inicio",
  "navigation.modules": "Módulos",
  "common.duration": "Duración"
}
```

2. Add language to content API:
```typescript
const supportedLanguages = ['en', 'es', 'fr', 'de', 'zh'];
```

3. Create translation directory:
```bash
mkdir content/translations/[lang]
```

### Auto-Translation

Use the API endpoint to translate content:

```typescript
const translatedContent = await fetch('/api/content/translate', {
  method: 'POST',
  body: JSON.stringify({
    content: originalContent,
    targetLanguage: 'es',
    sourceLanguage: 'en'
  })
});
```

## 🤖 AI Integration

### Content Generation

Generate exercises, assessments, and content enhancements:

```typescript
// Generate interactive exercise
const exercise = await generateContent('exercise', 
  'Create a team collaboration activity for creative confidence');

// Generate assessment rubric
const assessment = await generateContent('assessment',
  'Assessment criteria for design thinking skills');

// Enhance content for accessibility
const enhanced = await enhanceContent(content, 'accessibility');
```

### AI-Powered Features

- **Exercise Generation**: Create custom activities based on learning objectives
- **Assessment Creation**: Generate rubrics and evaluation criteria
- **Content Enhancement**: Improve clarity, engagement, and accessibility
- **Translation Assistance**: AI-powered content translation
- **Content Validation**: Automated quality checking

## 🏗️ Build System

### Static Site Generation

Generate a complete static HTML site:

```bash
# Build for specific language
npm run build:static -- --language es --output dist/es

# Build with validation
npm run validate:content && npm run build:static

# Serve locally for testing
npm run serve:static -- --port 3001
```

### Export Options

```bash
# Export as HTML site
npm run export:html

# Export as PDF
npm run export:pdf

# Export specific modules
npm run build:static -- --modules "creative-confidence,design-thinking"
```

### Build Features

- **Responsive HTML**: Mobile-first design with CSS Grid/Flexbox
- **Search Functionality**: Client-side search with JSON index
- **Navigation**: Automatic breadcrumbs and module navigation
- **Progressive Enhancement**: Works without JavaScript
- **Print Optimization**: CSS for PDF generation
- **Asset Optimization**: Minified CSS and optimized images

## 📊 Content Validation

### Automated Checks

The validation system checks for:

- Required metadata fields (title, track, duration, difficulty)
- Learning objectives section
- Prerequisites information
- Content structure and formatting
- Minimum content length
- Accessibility considerations

### Manual Quality Assurance

Use the admin panel to:

- Review validation results
- Check content consistency
- Verify learning objective alignment
- Test responsive design
- Validate translations

## 🎨 Admin Panel Features

### Content Overview

- **Module Statistics**: Total count, validation status, word counts
- **Track Distribution**: Modules per learning track
- **Difficulty Analysis**: Beginner/Intermediate/Advanced breakdown
- **Progress Tracking**: Content creation and translation progress

### Content Management

- **Search and Filter**: Find modules by title, track, or content
- **Bulk Operations**: Validate, translate, or export multiple modules
- **Content Preview**: Live preview of rendered markdown
- **Version Control**: Track content changes and updates

### Translation Management

- **Language Status**: Track translation progress per language
- **Batch Translation**: Translate multiple modules at once
- **Quality Review**: Approve and edit translated content
- **Consistency Checking**: Ensure terminology consistency

### AI Tools

- **Content Generation**: Create exercises, assessments, and explanations
- **Enhancement Suite**: Improve clarity, engagement, and accessibility
- **Suggestion Engine**: Get recommendations for content improvements
- **Automated QA**: AI-powered content review and suggestions

## 🔧 Development Workflow

### Adding New Modules

1. Create markdown file in `content/modules/`:
```bash
# Use chapter number prefix for ordering
touch content/modules/04-new-module.md
```

2. Add frontmatter and content:
```markdown
---
title: "New Module Title"
track: "Foundation"
duration: "30 minutes"
difficulty: "Beginner"
---

# New Module Title
[Content here]
```

3. Validate and test:
```bash
npm run validate:content
npm run dev
```

### Customizing the Build System

Edit `scripts/build.ts` to modify:

- HTML templates and styling
- Search index generation
- Asset processing
- Export formats

### Extending the API

Add new endpoints in `app/api/content/[...slug]/route.ts`:

```typescript
if (slug[0] === 'custom-endpoint') {
  // Handle custom functionality
  return NextResponse.json({ data: customData });
}
```

## 🚀 Deployment

### Static Site Deployment

```bash
# Build for production
npm run build:static

# Deploy to any static hosting
rsync -av dist/ user@server:/var/www/html/
```

### Next.js Deployment

```bash
# Build Next.js app
npm run build

# Deploy to Vercel, Netlify, or custom server
vercel --prod
```

### Content Updates

The system supports hot content updates:

1. Update markdown files in `content/modules/`
2. API automatically serves new content
3. Static builds can be regenerated on demand
4. No application restart required

## 📈 Analytics and Monitoring

### Content Metrics

Track important metrics:

- Module completion rates
- Time spent per section
- Search queries and results
- Popular content and learning paths
- User feedback and ratings

### Performance Monitoring

- Page load times
- Search response times
- Build generation duration
- Translation accuracy scores
- Content freshness indicators

## 🤝 Contributing

### Content Contributors

1. Fork the repository
2. Add/edit markdown files in `content/modules/`
3. Run validation: `npm run validate:content`
4. Submit pull request with changes

### Developers

1. Follow TypeScript and React best practices
2. Add tests for new API endpoints
3. Update documentation for new features
4. Ensure responsive design compliance

### Translators

1. Use the admin panel translation tools
2. Follow terminology guidelines
3. Test translated content in target language
4. Submit translations for review

---

**Note**: This is a living document that evolves with the content management system. For the latest updates and detailed API documentation, refer to the inline code comments and TypeScript definitions.

## License

MIT License - see LICENSE file for details.
