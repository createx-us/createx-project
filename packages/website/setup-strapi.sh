#!/bin/bash

# CreateX Website - Strapi CMS Setup Script
# This script sets up Strapi CMS for the CreateX website package

set -e

echo "🚀 Setting up Strapi CMS for CreateX Website..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the correct directory
if [ ! -f "package.json" ] || [ ! -f "setup-strapi.sh" ]; then
    echo -e "${RED}❌ Please run this script from the packages/website directory${NC}"
    exit 1
fi

echo -e "${BLUE}📂 Current directory: $(pwd)${NC}"

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is not supported. Please upgrade to Node.js >= 18.0.0${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version $NODE_VERSION is compatible${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Create Strapi project structure
echo -e "${YELLOW}🏗️ Setting up Strapi project structure...${NC}"

# Create strapi directory if it doesn't exist
mkdir -p strapi

# Navigate to strapi directory
cd strapi

# Check if Strapi is already initialized
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}🎯 Initializing new Strapi project...${NC}"
    
    # Create Strapi project with TypeScript and specific database
    npx create-strapi-app@latest . \
        --typescript \
        --template \
        --no-run \
        --skip-cloud \
        --dbclient=sqlite \
        --dbname=createx_cms
    
    echo -e "${GREEN}✅ Strapi project initialized${NC}"
else
    echo -e "${BLUE}ℹ️ Strapi project already exists${NC}"
    npm install
fi

# Create content types directory
mkdir -p src/api

# Create custom content types
echo -e "${YELLOW}📝 Creating content types...${NC}"

# Blog Post content type
mkdir -p src/api/blog-post/content-types/blog-post
cat > src/api/blog-post/content-types/blog-post/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post",
    "description": "Blog posts for CreateX platform"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 255
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "maxLength": 500
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::team-member.team-member"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category",
      "mappedBy": "blog_posts"
    },
    "tags": {
      "type": "json"
    },
    "readTime": {
      "type": "integer",
      "default": 5
    },
    "seo": {
      "type": "component",
      "repeatable": false,
      "component": "shared.seo"
    }
  }
}
EOF

# Team Member content type
mkdir -p src/api/team-member/content-types/team-member
cat > src/api/team-member/content-types/team-member/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "team_members",
  "info": {
    "singularName": "team-member",
    "pluralName": "team-members",
    "displayName": "Team Member",
    "description": "CreateX team members"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "role": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "bio": {
      "type": "text",
      "maxLength": 1000
    },
    "avatar": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "email": {
      "type": "email"
    },
    "linkedIn": {
      "type": "string"
    },
    "twitter": {
      "type": "string"
    },
    "github": {
      "type": "string"
    },
    "walletAddress": {
      "type": "string"
    },
    "expertise": {
      "type": "json"
    },
    "order": {
      "type": "integer",
      "default": 0
    },
    "blog_posts": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::blog-post.blog-post",
      "mappedBy": "author"
    }
  }
}
EOF

# Category content type
mkdir -p src/api/category/content-types/category
cat > src/api/category/content-types/category/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "Content categories"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true,
      "maxLength": 100
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text",
      "maxLength": 500
    },
    "color": {
      "type": "string",
      "default": "#3B82F6"
    },
    "blog_posts": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::blog-post.blog-post",
      "mappedBy": "categories"
    }
  }
}
EOF

# Workshop content type
mkdir -p src/api/workshop/content-types/workshop
cat > src/api/workshop/content-types/workshop/schema.json << 'EOF'
{
  "kind": "collectionType",
  "collectionName": "workshops",
  "info": {
    "singularName": "workshop",
    "pluralName": "workshops",
    "displayName": "Workshop",
    "description": "Educational workshops and events"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 255
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true,
      "maxLength": 1000
    },
    "content": {
      "type": "richtext"
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "startDate": {
      "type": "datetime",
      "required": true
    },
    "endDate": {
      "type": "datetime"
    },
    "duration": {
      "type": "integer",
      "default": 60
    },
    "level": {
      "type": "enumeration",
      "enum": ["beginner", "intermediate", "advanced"],
      "default": "beginner"
    },
    "price": {
      "type": "decimal",
      "default": 0
    },
    "priceToken": {
      "type": "string",
      "default": "ETH"
    },
    "maxParticipants": {
      "type": "integer"
    },
    "instructor": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::team-member.team-member"
    },
    "categories": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::category.category"
    },
    "requirements": {
      "type": "json"
    },
    "learningOutcomes": {
      "type": "json"
    },
    "isOnline": {
      "type": "boolean",
      "default": true
    },
    "location": {
      "type": "string"
    },
    "meetingLink": {
      "type": "string"
    },
    "seo": {
      "type": "component",
      "repeatable": false,
      "component": "shared.seo"
    }
  }
}
EOF

# Create shared components
mkdir -p src/components/shared
cat > src/components/shared/seo.json << 'EOF'
{
  "collectionName": "components_shared_seos",
  "info": {
    "displayName": "SEO",
    "description": "SEO meta data component"
  },
  "options": {},
  "attributes": {
    "metaTitle": {
      "type": "string",
      "maxLength": 60
    },
    "metaDescription": {
      "type": "text",
      "maxLength": 160
    },
    "keywords": {
      "type": "text"
    },
    "metaImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "canonicalURL": {
      "type": "string"
    }
  }
}
EOF

# Create environment files
echo -e "${YELLOW}⚙️ Setting up environment configuration...${NC}"

cat > .env << 'EOF'
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Upload
UPLOAD_PROVIDER=local

# Security
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
EOF

cat > .env.example << 'EOF'
# Server Configuration
HOST=0.0.0.0
PORT=1337

# Security Keys (CHANGE THESE IN PRODUCTION!)
APP_KEYS=your-app-key-1,your-app-key-2
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# For PostgreSQL (recommended for production):
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=createx_cms
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=password
# DATABASE_SSL=false

# Upload Configuration
UPLOAD_PROVIDER=local

# For AWS S3:
# UPLOAD_PROVIDER=aws-s3
# AWS_ACCESS_KEY_ID=your-access-key
# AWS_SECRET_ACCESS_KEY=your-secret-key
# AWS_REGION=us-east-1
# AWS_BUCKET=your-bucket-name

# CORS Configuration
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Email Configuration (optional)
# EMAIL_PROVIDER=sendgrid
# EMAIL_PROVIDER_API_KEY=your-sendgrid-api-key
# EMAIL_DEFAULT_FROM=noreply@createx.io
# EMAIL_DEFAULT_REPLY_TO=support@createx.io
EOF

# Generate secure keys
echo -e "${YELLOW}🔐 Generating secure keys...${NC}"
if command -v openssl &> /dev/null; then
    APP_KEY1=$(openssl rand -base64 32)
    APP_KEY2=$(openssl rand -base64 32)
    API_TOKEN_SALT=$(openssl rand -base64 32)
    ADMIN_JWT_SECRET=$(openssl rand -base64 32)
    TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Replace placeholders in .env file
    sed -i.bak "s/toBeModified1/$APP_KEY1/g" .env
    sed -i.bak "s/toBeModified2/$APP_KEY2/g" .env
    sed -i.bak "s/API_TOKEN_SALT=toBeModified/API_TOKEN_SALT=$API_TOKEN_SALT/g" .env
    sed -i.bak "s/ADMIN_JWT_SECRET=toBeModified/ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET/g" .env
    sed -i.bak "s/TRANSFER_TOKEN_SALT=toBeModified/TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT/g" .env
    sed -i.bak "s/JWT_SECRET=toBeModified/JWT_SECRET=$JWT_SECRET/g" .env
    
    rm -f .env.bak
    echo -e "${GREEN}✅ Secure keys generated${NC}"
else
    echo -e "${YELLOW}⚠️ OpenSSL not found. Please manually update the keys in .env file${NC}"
fi

# Go back to website directory
cd ..

# Create TypeScript types for Strapi
echo -e "${YELLOW}📘 Creating TypeScript types...${NC}"
mkdir -p types

cat > types/strapi.ts << 'EOF'
// Strapi Content Types
export interface StrapiBase {
  id: number;
  attributes: any;
  meta?: {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: StrapiMedia;
  author?: TeamMember;
  categories?: Category[];
  tags?: string[];
  readTime: number;
  seo?: SEO;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  avatar?: StrapiMedia;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
  walletAddress?: string;
  expertise?: string[];
  order: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workshop {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  featuredImage?: StrapiMedia;
  startDate: string;
  endDate?: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  priceToken: string;
  maxParticipants?: number;
  instructor?: TeamMember;
  categories?: Category[];
  requirements?: string[];
  learningOutcomes?: string[];
  isOnline: boolean;
  location?: string;
  meetingLink?: string;
  seo?: SEO;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

export interface SEO {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaImage?: StrapiMedia;
  canonicalURL?: string;
}

// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API Client Types
export interface StrapiQueryParams {
  populate?: string | string[] | object;
  fields?: string[];
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}
EOF

# Create Strapi API client
cat > lib/strapi.ts << 'EOF'
import { StrapiQueryParams, StrapiResponse, StrapiCollectionResponse } from '../types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

class StrapiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string = STRAPI_URL, token?: string) {
    this.baseURL = baseURL;
    this.token = token || STRAPI_TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private buildQueryString(params: StrapiQueryParams): string {
    const searchParams = new URLSearchParams();

    if (params.populate) {
      if (typeof params.populate === 'string') {
        searchParams.append('populate', params.populate);
      } else if (Array.isArray(params.populate)) {
        params.populate.forEach(field => searchParams.append('populate', field));
      } else {
        searchParams.append('populate', JSON.stringify(params.populate));
      }
    }

    if (params.fields) {
      params.fields.forEach(field => searchParams.append('fields', field));
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }

    if (params.sort) {
      if (Array.isArray(params.sort)) {
        params.sort.forEach(sortField => searchParams.append('sort', sortField));
      } else {
        searchParams.append('sort', params.sort);
      }
    }

    if (params.pagination) {
      Object.entries(params.pagination).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(`pagination[${key}]`, String(value));
        }
      });
    }

    if (params.publicationState) {
      searchParams.append('publicationState', params.publicationState);
    }

    if (params.locale) {
      searchParams.append('locale', params.locale);
    }

    return searchParams.toString();
  }

  // Generic methods
  async find<T>(
    endpoint: string,
    params: StrapiQueryParams = {}
  ): Promise<StrapiCollectionResponse<T>> {
    const queryString = this.buildQueryString(params);
    return this.request<StrapiCollectionResponse<T>>(
      `${endpoint}${queryString ? `?${queryString}` : ''}`
    );
  }

  async findOne<T>(
    endpoint: string,
    id: string | number,
    params: StrapiQueryParams = {}
  ): Promise<StrapiResponse<T>> {
    const queryString = this.buildQueryString(params);
    return this.request<StrapiResponse<T>>(
      `${endpoint}/${id}${queryString ? `?${queryString}` : ''}`
    );
  }

  async create<T>(endpoint: string, data: any): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async update<T>(
    endpoint: string,
    id: string | number,
    data: any
  ): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }

  async delete<T>(endpoint: string, id: string | number): Promise<StrapiResponse<T>> {
    return this.request<StrapiResponse<T>>(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  }

  // Content-specific methods
  async getBlogPosts(params: StrapiQueryParams = {}) {
    return this.find('/blog-posts', {
      populate: ['featuredImage', 'author', 'categories', 'seo'],
      sort: ['publishedAt:desc'],
      ...params,
    });
  }

  async getBlogPost(slug: string, params: StrapiQueryParams = {}) {
    return this.find('/blog-posts', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage', 'author', 'categories', 'seo'],
      ...params,
    });
  }

  async getTeamMembers(params: StrapiQueryParams = {}) {
    return this.find('/team-members', {
      populate: ['avatar'],
      sort: ['order:asc'],
      ...params,
    });
  }

  async getWorkshops(params: StrapiQueryParams = {}) {
    return this.find('/workshops', {
      populate: ['featuredImage', 'instructor', 'categories', 'seo'],
      sort: ['startDate:asc'],
      ...params,
    });
  }

  async getWorkshop(slug: string, params: StrapiQueryParams = {}) {
    return this.find('/workshops', {
      filters: { slug: { $eq: slug } },
      populate: ['featuredImage', 'instructor', 'categories', 'seo'],
      ...params,
    });
  }

  async getCategories(params: StrapiQueryParams = {}) {
    return this.find('/categories', {
      sort: ['name:asc'],
      ...params,
    });
  }
}

export const strapi = new StrapiClient();
export default strapi;
EOF

# Update package.json scripts
echo -e "${YELLOW}📦 Updating package.json scripts...${NC}"
cd ..

# Update the scripts in package.json to include Strapi commands
npm pkg set scripts.strapi:dev="cd strapi && npm run develop"
npm pkg set scripts.strapi:build="cd strapi && npm run build"
npm pkg set scripts.strapi:start="cd strapi && npm run start"
npm pkg set scripts.strapi:setup="cd strapi && npm install"
npm pkg set scripts.setup:strapi="./setup-strapi.sh"

echo -e "${GREEN}✅ Strapi CMS setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo -e "  1. ${YELLOW}cd strapi${NC} - Navigate to Strapi directory"
echo -e "  2. ${YELLOW}npm run develop${NC} - Start Strapi in development mode"
echo -e "  3. Open ${YELLOW}http://localhost:1337/admin${NC} to access admin panel"
echo -e "  4. Create your first admin user"
echo -e "  5. Configure content types and add sample content"
echo ""
echo -e "${BLUE}🔧 Configuration:${NC}"
echo -e "  • Admin Panel: ${YELLOW}http://localhost:1337/admin${NC}"
echo -e "  • API Endpoint: ${YELLOW}http://localhost:1337/api${NC}"
echo -e "  • Database: SQLite (development) - stored in strapi/.tmp/data.db"
echo -e "  • Environment: Check strapi/.env file for configuration"
echo ""
echo -e "${BLUE}📚 Content Types Created:${NC}"
echo -e "  • Blog Posts (/blog-posts)"
echo -e "  • Team Members (/team-members)"
echo -e "  • Categories (/categories)"
echo -e "  • Workshops (/workshops)"
echo ""
echo -e "${GREEN}🎉 Ready to start building your CreateX website!${NC}"