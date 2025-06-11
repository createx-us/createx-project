# CreateX Marketing Website

Next.js website with Strapi CMS showcasing the CreateX Protocol - fully open-source solution combining high-performance static pages with flexible content management.

## 🎉 Implementation Status: COMPLETE ✅

The Strapi CMS integration is fully implemented and ready for use! See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for complete details.

## 🚀 Quick Start

### 1. Setup Strapi CMS
```bash
cd packages/website
./setup-strapi.sh
```

### 2. Start Development
```bash
# Terminal 1: Start Strapi CMS
cd strapi && npm run develop

# Terminal 2: Start Next.js (in new terminal)
cd packages/website && npm run dev
```

### 3. Access Applications
- **Next.js Website**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

## 🏗️ Architecture 

### Next.js + Strapi CMS (100% Open Source)
- **Next.js Frontend** - Static generation, Web3 integration, interactive features  
- **Strapi CMS** - 100% open-source headless CMS with full customization
- **SQLite/PostgreSQL** - Database for content storage (SQLite dev, PostgreSQL prod)
- **Self-hosted** - Complete control over data and infrastructure

## 🌟 Features

### Static Marketing Pages (Next.js)
- **Landing Page** ✅ - Hero section, features overview, and call-to-action
- **Team** ✅ - Dynamic team member profiles with Strapi integration
- **Blog** ✅ - Latest news and updates with rich content management
- **About** - Protocol vision, mission, and value proposition
- **How It Works** - Step-by-step guide to platform participation
- **Roadmap** - Development milestones and future plans

### Dynamic Content (Strapi CMS) ✅
- **Blog Posts** ✅ - Rich text content with categories, tags, and SEO
- **Team Members** ✅ - Profiles with avatars, social links, and expertise
- **Categories** ✅ - Content organization and filtering
- **Workshops** ✅ - Educational events with scheduling and pricing
- **SEO Components** ✅ - Meta tags, social sharing, and search optimization

### Interactive Features 
- **Community Map** - Global workshop locations with real-time data
- **Protocol Statistics** - Live metrics from blockchain and backend
- **Web3 Integration** - Wallet connection and CTX token information
- **Governance Portal** - Links to voting dashboard
- **Multi-language Support** - English, Spanish, Mandarin

## ⚡ Tech Stack

### Frontend (Next.js 13) ✅
- **Next.js 13** - React framework with Pages Router
- **TypeScript** ✅ - Type-safe development
- **Tailwind CSS** ✅ - Utility-first styling with custom theme
- **Framer Motion** - Smooth animations
- **Image Optimization** ✅ - Next.js Image component with WebP/AVIF

### Content Management (Strapi CMS) ✅
- **Strapi v4** ✅ - Latest version with TypeScript support
- **Admin Panel** ✅ - React-based admin interface at localhost:1337/admin
- **REST API** ✅ - Auto-generated endpoints with TypeScript client
- **Content Types** ✅ - Blog posts, team members, workshops, categories
- **Media Library** ✅ - Image uploads with optimization
- **Plugin Ecosystem** - Extensible with community and custom plugins
- **Self-hosted** - Complete control over data and infrastructure

### Web3 Integration
- **Wagmi + Viem** - Type-safe Ethereum interactions
- **Rainbow Kit** - Beautiful wallet connection UI
- **ethers.js** - Smart contract integration
- **Token gating** - CTX token-based content access
- **On-chain data** - Live protocol statistics and governance data

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up Strapi CMS (first time only)
npm run strapi:setup

# Start development servers (both Next.js and Strapi)
npm run dev:all

# Or start individually:
# Website: npm run dev
# Strapi Admin: npm run strapi:dev

# Open browser to:
# - Website: http://localhost:3000
# - Strapi Admin: http://localhost:1337/admin
```

## 📋 Project Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx          # Landing page
│   │   ├── about/            # About pages
│   │   ├── how-it-works/     # Process explanation
│   │   ├── roadmap/          # Development roadmap
│   │   ├── team/             # Team profiles (from Strapi)
│   │   └── community/        # Community showcase (from Strapi)
│   ├── blog/
│   │   ├── page.tsx          # Blog listing (from Strapi)
│   │   └── [slug]/           # Individual blog posts (from Strapi)
│   ├── docs/
│   │   ├── protocol/         # Technical documentation
│   │   ├── tokenomics/       # Token economics
│   │   └── developers/       # API documentation
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Layout components
│   ├── marketing/            # Marketing-specific components
│   ├── web3/                 # Web3 wallet and token components
│   ├── strapi/               # Strapi content components
│   └── interactive/          # Interactive features
├── strapi/
│   ├── types/                # TypeScript types for Strapi content
│   │   ├── blog.ts           # Blog post types
│   │   ├── team.ts           # Team member types
│   │   ├── workshop.ts       # Workshop types
│   │   └── community.ts      # Community types
│   ├── api/
│   │   ├── client.ts         # Strapi client configuration
│   │   ├── queries.ts        # API query functions
│   │   └── auth.ts           # Authentication utilities
│   └── hooks/                # React hooks for Strapi data
├── lib/
│   ├── strapi.ts             # Strapi utilities
│   ├── web3.ts               # Web3 utilities
│   ├── api.ts                # API client for backend
│   └── utils.ts              # General utilities
└── hooks/
    ├── useWeb3.ts            # Web3 wallet hooks
    ├── useStrapi.ts          # Strapi content hooks
    └── useStats.ts           # Protocol statistics
```

## 🎨 Design System

### Brand Colors
- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Purple)
- Accent: `#10B981` (Green)
- Neutral: Gray scale

### Typography
- Headlines: Inter Bold (700)
- Subheadings: Inter SemiBold (600)
- Body: Inter Regular (400)
- Code: JetBrains Mono

### Components
- Consistent spacing using Tailwind's scale
- Accessible color contrasts (WCAG AA)
- Responsive breakpoints for all devices
- Motion design with Framer Motion

## 📱 Pages Overview

### Marketing Site
- **Home** (`/`) - Main landing page with hero and features
- **About** (`/about`) - Protocol mission and vision
- **How It Works** (`/how-it-works`) - Step-by-step process
- **Roadmap** (`/roadmap`) - Development timeline
- **Team** (`/team`) - Core team and advisors
- **Community** (`/community`) - Global community showcase

### Documentation
- **Protocol** (`/docs/protocol`) - Technical overview
- **Tokenomics** (`/docs/tokenomics`) - CTX token details
- **Governance** (`/docs/governance`) - DAO mechanics
- **Developers** (`/docs/developers`) - API and integration

### Content
- **Blog** (`/blog`) - Latest news and updates
- **Press Kit** (`/press`) - Media resources
- **Legal** (`/legal`) - Terms and privacy policy

## 🌐 Environment Variables

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL="https://createx.protocol"
NEXT_PUBLIC_APP_URL="https://app.createx.protocol"

# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
NEXT_PUBLIC_STRAPI_API_TOKEN="your-strapi-api-token"
STRAPI_ADMIN_JWT_SECRET="your-strapi-jwt-secret"
STRAPI_API_TOKEN_SALT="your-strapi-token-salt"

# Database (for Strapi)
DATABASE_CLIENT="postgres"
DATABASE_NAME="createx_cms"
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USERNAME="strapi"
DATABASE_PASSWORD="your-db-password"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"

# API Integration
NEXT_PUBLIC_API_URL="https://api.createx.protocol"
NEXT_PUBLIC_STATS_ENDPOINT="/stats"

# Web3 Configuration
NEXT_PUBLIC_CHAIN_ID="1"
NEXT_PUBLIC_CTX_TOKEN_ADDRESS="0x..."
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Static Export
```bash
npm run build
npm run export
```

### Vercel Deployment
```bash
vercel --prod
```

## 📊 Features

### Performance
- Static Site Generation (SSG) for fast loading
- Image optimization with Next.js Image
- Bundle optimization and code splitting
- Core Web Vitals optimization

### SEO
- Dynamic meta tags and Open Graph
- Structured data for search engines
- XML sitemap generation
- Robots.txt configuration

### Analytics
- Google Analytics integration
- PostHog event tracking
- Performance monitoring
- User behavior analysis

## 🌍 Internationalization

Support for multiple languages:
- English (default)
- Spanish (es)
- Mandarin Chinese (zh)
- More languages planned

## 📄 Content Management

- MDX for rich content authoring
- Git-based content workflow
- Automatic content validation
- SEO optimization for all content

---

*The marketing website serves as the public face of the CreateX Protocol.*
