# CreateX Website - Strapi CMS Implementation Guide

This document provides a comprehensive guide for implementing Strapi CMS in the CreateX website package, including setup, configuration, content modeling, and integration with Next.js.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Architecture](#architecture)
5. [Content Types](#content-types)
6. [API Integration](#api-integration)
7. [Environment Configuration](#environment-configuration)
8. [Development Workflow](#development-workflow)
9. [Production Deployment](#production-deployment)
10. [Web3 Integration](#web3-integration)
11. [Performance Optimization](#performance-optimization)
12. [Security Best Practices](#security-best-practices)
13. [Troubleshooting](#troubleshooting)

## Overview

Strapi CMS has been selected as the content management solution for the CreateX website package based on the following criteria:

- **100% Open Source**: MIT licensed with full source code access
- **API-First**: RESTful and GraphQL APIs out of the box
- **Flexible Content Modeling**: Custom content types and relationships
- **TypeScript Support**: Native TypeScript support for type safety
- **Plugin Ecosystem**: Rich ecosystem of plugins and extensions
- **Self-Hosted**: Full control over data and infrastructure
- **Developer-Friendly**: Excellent DX with hot reload and admin panel

## Prerequisites

Before starting, ensure you have:

- Node.js >= 18.0.0
- npm >= 8.0.0
- Git
- Code editor (VS Code recommended)
- Basic knowledge of Next.js and TypeScript

## Quick Start

### 1. Run the Setup Script

```bash
# Navigate to the website package
cd packages/website

# Make the setup script executable
chmod +x setup-strapi.sh

# Run the setup script
./setup-strapi.sh
```

### 2. Start Strapi Development Server

```bash
# Navigate to Strapi directory
cd strapi

# Start in development mode with admin panel
npm run develop
```

### 3. Access Admin Panel

- Open http://localhost:1337/admin
- Create your first admin user
- Explore the admin interface

### 4. Configure API Tokens

1. Go to Settings → API Tokens
2. Create a new API token with "Read Only" permissions
3. Copy the token for use in your Next.js application

## Architecture

### Directory Structure

```
packages/website/
├── strapi/                 # Strapi CMS backend
│   ├── src/
│   │   ├── api/           # Content types and controllers
│   │   ├── components/    # Reusable components
│   │   └── extensions/    # Custom extensions
│   ├── config/            # Strapi configuration
│   ├── public/            # Static assets
│   └── package.json
├── types/                 # TypeScript type definitions
│   └── strapi.ts         # Strapi content types
├── lib/                   # Utility libraries
│   └── strapi.ts         # Strapi API client
├── components/            # Next.js components
├── pages/                 # Next.js pages
└── package.json
```

### Technology Stack

- **Backend**: Strapi CMS v4.x with TypeScript
- **Database**: SQLite (development), PostgreSQL (production)
- **API**: REST API with optional GraphQL
- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Image Handling**: Strapi Media Library

## Content Types

The following content types are automatically created during setup:

### 1. Blog Post (`blog-post`)

Content structure for blog articles and news.

**Fields:**
- `title` (String, required): Post title
- `slug` (UID, required): URL-friendly identifier
- `excerpt` (Text): Short description
- `content` (Rich Text, required): Main content
- `featuredImage` (Media): Hero image
- `author` (Relation): Link to team member
- `categories` (Relation): Multiple categories
- `tags` (JSON): Array of tags
- `readTime` (Number): Estimated reading time
- `seo` (Component): SEO metadata

**Relations:**
- Many-to-One with Team Member (author)
- Many-to-Many with Categories

### 2. Team Member (`team-member`)

Information about CreateX team members.

**Fields:**
- `name` (String, required): Full name
- `role` (String, required): Job title/position
- `bio` (Text): Biography
- `avatar` (Media): Profile picture
- `email` (Email): Contact email
- `linkedIn` (String): LinkedIn profile URL
- `twitter` (String): Twitter handle
- `github` (String): GitHub username
- `walletAddress` (String): Ethereum wallet address
- `expertise` (JSON): Array of skills/expertise
- `order` (Number): Display order

**Relations:**
- One-to-Many with Blog Posts (authored posts)

### 3. Category (`category`)

Categorization system for content.

**Fields:**
- `name` (String, required, unique): Category name
- `slug` (UID, required): URL identifier
- `description` (Text): Category description
- `color` (String): Theme color for UI

**Relations:**
- Many-to-Many with Blog Posts
- Many-to-Many with Workshops

### 4. Workshop (`workshop`)

Educational workshops and events.

**Fields:**
- `title` (String, required): Workshop title
- `slug` (UID, required): URL identifier
- `description` (Text, required): Short description
- `content` (Rich Text): Detailed content
- `featuredImage` (Media): Workshop image
- `startDate` (DateTime, required): Start time
- `endDate` (DateTime): End time
- `duration` (Number): Duration in minutes
- `level` (Enum): beginner/intermediate/advanced
- `price` (Decimal): Cost
- `priceToken` (String): Token type (ETH, USDC, etc.)
- `maxParticipants` (Number): Capacity limit
- `instructor` (Relation): Team member instructor
- `categories` (Relation): Workshop categories
- `requirements` (JSON): Prerequisites
- `learningOutcomes` (JSON): What participants will learn
- `isOnline` (Boolean): Online vs in-person
- `location` (String): Physical location
- `meetingLink` (String): Online meeting URL
- `seo` (Component): SEO metadata

### 5. SEO Component (`shared.seo`)

Reusable SEO metadata component.

**Fields:**
- `metaTitle` (String): Page title
- `metaDescription` (Text): Meta description
- `keywords` (Text): SEO keywords
- `metaImage` (Media): Social sharing image
- `canonicalURL` (String): Canonical URL

## API Integration

### Strapi API Client

The `lib/strapi.ts` file provides a TypeScript-safe client for interacting with Strapi:

```typescript
import strapi from '../lib/strapi';

// Get all blog posts
const blogPosts = await strapi.getBlogPosts({
  pagination: { page: 1, pageSize: 10 }
});

// Get a specific blog post by slug
const post = await strapi.getBlogPost('introduction-to-defi');

// Get team members
const team = await strapi.getTeamMembers();

// Get upcoming workshops
const workshops = await strapi.getWorkshops({
  filters: {
    startDate: { $gte: new Date().toISOString() }
  }
});
```

### Next.js Integration Examples

#### Blog Post Page

```typescript
// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import strapi from '../../lib/strapi';
import { BlogPost } from '../../types/strapi';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await strapi.getBlogPost(params?.slug as string);
  
  if (!response.data.length) {
    return { notFound: true };
  }

  return {
    props: {
      post: response.data[0]
    },
    revalidate: 60 // ISR revalidation
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await strapi.getBlogPosts({
    fields: ['slug']
  });

  const paths = response.data.map((post) => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};
```

#### Team Page

```typescript
// pages/team.tsx
import { GetStaticProps } from 'next';
import strapi from '../lib/strapi';
import { TeamMember } from '../types/strapi';

interface TeamPageProps {
  team: TeamMember[];
}

export default function TeamPage({ team }: TeamPageProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((member) => (
        <div key={member.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
          <p className="mt-2">{member.bio}</p>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await strapi.getTeamMembers();

  return {
    props: {
      team: response.data
    },
    revalidate: 3600 // Revalidate every hour
  };
};
```

## Environment Configuration

### Development Environment

```env
# packages/website/.env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

### Production Environment

```env
# Production environment variables
NEXT_PUBLIC_STRAPI_URL=https://cms.createx.io
STRAPI_API_TOKEN=your-production-api-token
```

### Strapi Environment

```env
# packages/website/strapi/.env
HOST=0.0.0.0
PORT=1337

# Security keys (generate new ones for production)
APP_KEYS=generated-key-1,generated-key-2
API_TOKEN_SALT=generated-salt
ADMIN_JWT_SECRET=generated-secret
TRANSFER_TOKEN_SALT=generated-salt
JWT_SECRET=generated-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Upload
UPLOAD_PROVIDER=local

# CORS
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

## Development Workflow

### 1. Content Creation Workflow

1. **Start Development Servers**
   ```bash
   # Terminal 1: Start Strapi
   cd packages/website/strapi
   npm run develop
   
   # Terminal 2: Start Next.js
   cd packages/website
   npm run dev
   ```

2. **Create Content in Admin Panel**
   - Navigate to http://localhost:1337/admin
   - Create/edit content types
   - Add sample content
   - Publish content

3. **Consume in Next.js**
   - Use the Strapi client to fetch data
   - Implement pages and components
   - Test functionality

### 2. Schema Development

1. **Modify Content Types**
   - Edit schema files in `strapi/src/api/*/content-types/*/schema.json`
   - Restart Strapi server
   - Update TypeScript types

2. **Add New Content Types**
   ```bash
   cd strapi
   npm run strapi generate:api new-content-type
   ```

3. **Update TypeScript Types**
   - Modify `types/strapi.ts`
   - Update API client methods
   - Regenerate types if using code generation

### 3. Testing Content

1. **API Testing**
   ```bash
   # Test API endpoints
   curl http://localhost:1337/api/blog-posts
   curl http://localhost:1337/api/team-members
   ```

2. **Frontend Testing**
   - Check pages render correctly
   - Verify data fetching
   - Test error states

## Production Deployment

### 1. Database Migration

For production, migrate from SQLite to PostgreSQL:

```env
# strapi/.env.production
DATABASE_CLIENT=postgres
DATABASE_HOST=your-postgres-host
DATABASE_PORT=5432
DATABASE_NAME=createx_cms
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password
DATABASE_SSL=true
```

### 2. File Upload Configuration

Configure cloud storage for media files:

```env
# AWS S3 configuration
UPLOAD_PROVIDER=aws-s3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET=createx-cms-media
```

### 3. Security Hardening

1. **Generate New Secrets**
   ```bash
   openssl rand -base64 32  # For each secret
   ```

2. **Configure CORS**
   ```env
   CORS_ORIGIN=https://createx.io,https://www.createx.io
   ```

3. **Enable HTTPS**
   - Configure SSL certificates
   - Update URLs in environment variables

### 4. Performance Optimization

1. **Enable Caching**
   ```javascript
   // strapi/config/plugins.js
   module.exports = {
     'rest-cache': {
       enabled: true,
       config: {
         strategy: {
           contentTypes: [
             'api::blog-post.blog-post',
             'api::team-member.team-member',
           ],
         },
       },
     },
   };
   ```

2. **Configure CDN**
   - Set up CloudFront or similar CDN
   - Configure cache headers

## Web3 Integration

### 1. Wallet Address Validation

Add wallet address validation to team members:

```javascript
// strapi/src/api/team-member/content-types/team-member/lifecycles.js
module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.walletAddress) {
      // Validate Ethereum address format
      const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
      if (!ethAddressRegex.test(data.walletAddress)) {
        throw new Error('Invalid Ethereum address format');
      }
    }
  },
};
```

### 2. Token-Gated Content

Implement token-gated access for premium workshops:

```typescript
// lib/web3-auth.ts
export async function verifyTokenOwnership(
  walletAddress: string,
  tokenContract: string,
  minimumBalance: number
): Promise<boolean> {
  // Implement token balance check
  // This would integrate with web3 libraries
  return true; // Placeholder
}

// pages/workshops/[slug].tsx
export const getServerSideProps: GetServerSideProps = async ({ 
  params, 
  req 
}) => {
  const workshop = await strapi.getWorkshop(params?.slug as string);
  
  // Check if workshop requires token ownership
  if (workshop.data[0]?.tokenGated) {
    // Verify user's token ownership
    const hasAccess = await verifyTokenOwnership(
      req.session?.walletAddress,
      workshop.data[0].tokenContract,
      workshop.data[0].minimumTokens
    );
    
    if (!hasAccess) {
      return {
        redirect: {
          destination: '/connect-wallet',
          permanent: false,
        },
      };
    }
  }
  
  return {
    props: {
      workshop: workshop.data[0]
    }
  };
};
```

### 3. Blockchain Data Integration

Add blockchain data to content:

```typescript
// Custom controller for fetching on-chain data
// strapi/src/api/workshop/controllers/workshop.js
module.exports = {
  async findWithBlockchainData(ctx) {
    const workshops = await strapi.service('api::workshop.workshop').find();
    
    // Enhance with blockchain data
    const enhancedWorkshops = await Promise.all(
      workshops.results.map(async (workshop) => {
        if (workshop.smartContract) {
          const contractData = await fetchContractData(workshop.smartContract);
          return {
            ...workshop,
            participants: contractData.participants,
            totalRevenue: contractData.totalRevenue
          };
        }
        return workshop;
      })
    );
    
    return { data: enhancedWorkshops };
  }
};
```

## Performance Optimization

### 1. Caching Strategy

```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache';

export const getCachedBlogPosts = unstable_cache(
  async () => {
    return strapi.getBlogPosts();
  },
  ['blog-posts'],
  {
    revalidate: 300, // 5 minutes
    tags: ['blog']
  }
);
```

### 2. Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['localhost', 'cms.createx.io'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### 3. API Response Optimization

```typescript
// Optimize API calls with specific field selection
const posts = await strapi.getBlogPosts({
  fields: ['title', 'slug', 'excerpt', 'publishedAt'],
  populate: {
    featuredImage: {
      fields: ['url', 'alternativeText']
    },
    author: {
      fields: ['name', 'role']
    }
  }
});
```

## Security Best Practices

### 1. API Token Management

- Use environment variables for API tokens
- Implement token rotation
- Use read-only tokens for frontend
- Separate tokens for different environments

### 2. Content Validation

```javascript
// strapi/src/api/blog-post/content-types/blog-post/lifecycles.js
module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    
    // Sanitize HTML content
    if (data.content) {
      data.content = sanitizeHtml(data.content, {
        allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
        allowedAttributes: {}
      });
    }
  },
};
```

### 3. Access Control

```javascript
// strapi/src/api/blog-post/routes/blog-post.js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blog-posts',
      handler: 'blog-post.find',
      config: {
        auth: false, // Public access
      },
    },
    {
      method: 'POST',
      path: '/blog-posts',
      handler: 'blog-post.create',
      config: {
        policies: ['admin::isAuthenticatedAdmin'], // Admin only
      },
    },
  ],
};
```

## Troubleshooting

### Common Issues

1. **Strapi Server Won't Start**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Check Node.js version
   node --version  # Should be >= 18.0.0
   ```

2. **API Connection Issues**
   ```bash
   # Check Strapi server status
   curl http://localhost:1337/api/blog-posts
   
   # Verify environment variables
   echo $NEXT_PUBLIC_STRAPI_URL
   echo $STRAPI_API_TOKEN
   ```

3. **Content Type Errors**
   ```bash
   # Restart Strapi after schema changes
   npm run develop
   
   # Check logs for validation errors
   tail -f strapi/logs/strapi.log
   ```

4. **Database Issues**
   ```bash
   # Reset SQLite database (development only)
   rm -f strapi/.tmp/data.db
   npm run develop
   ```

### Debug Mode

Enable debug logging:

```env
# strapi/.env
NODE_ENV=development
STRAPI_LOG_LEVEL=debug
```

### Performance Issues

1. **Slow API Responses**
   - Check database queries
   - Optimize populate relationships
   - Enable caching

2. **Large Image Files**
   - Configure image optimization
   - Use appropriate image formats
   - Implement lazy loading

## Next Steps

1. **Run the Setup Script**
   ```bash
   cd packages/website
   ./setup-strapi.sh
   ```

2. **Start Development**
   ```bash
   cd strapi
   npm run develop
   ```

3. **Create Your First Content**
   - Access admin panel at http://localhost:1337/admin
   - Create admin user
   - Add sample blog posts and team members

4. **Integrate with Next.js**
   - Implement blog and team pages
   - Add CMS data to existing components
   - Test the complete workflow

5. **Customize for Your Needs**
   - Add custom content types
   - Implement Web3 features
   - Configure production deployment

For additional support and advanced configuration, refer to the [official Strapi documentation](https://docs.strapi.io/).