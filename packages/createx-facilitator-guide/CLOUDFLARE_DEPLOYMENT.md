# Cloudflare Deployment Guide
# CreateX Facilitator Guide CMS

## 🌐 **COMPLETE CLOUDFLARE INFRASTRUCTURE DEPLOYMENT**

This guide walks through deploying the CreateX Facilitator Guide to Cloudflare's full-stack platform using D1 database, Workers, AI services, and global edge infrastructure.

---

## 📋 **PREREQUISITES**

### Required Tools
```bash
# Install Wrangler CLI
npm install -g wrangler

# Install Node.js dependencies
npm install

# Login to Cloudflare
wrangler login
```

### Cloudflare Account Setup
1. **Cloudflare Account** with Workers Unlimited plan
2. **Custom Domain** (optional but recommended)
3. **Payment Method** configured for usage-based services

---

## 🚀 **AUTOMATED DEPLOYMENT**

### Quick Start (Recommended)
```bash
# Deploy to development environment
./scripts/deploy-cloudflare.sh development

# Deploy to production environment
./scripts/deploy-cloudflare.sh production
```

### What the Script Does
1. ✅ Creates D1 database and runs migrations
2. ✅ Sets up KV namespace for caching
3. ✅ Creates R2 bucket for asset storage
4. ✅ Deploys Cloudflare Worker API
5. ✅ Builds and deploys Next.js to Pages
6. ✅ Configures environment variables
7. ✅ Tests deployment health

---

## 🔧 **MANUAL DEPLOYMENT STEPS**

### Step 1: Database Setup
```bash
# Create D1 database
wrangler d1 create createx-cms

# Note the database ID and update wrangler.toml
# database_id = "your-database-id-here"

# Run migrations
wrangler d1 migrations apply createx-cms --local

# For production
wrangler d1 migrations apply createx-cms
```

### Step 2: KV Storage Setup
```bash
# Create KV namespace for caching
wrangler kv:namespace create createx-cache

# Create preview namespace for development
wrangler kv:namespace create createx-cache --preview

# Update wrangler.toml with KV namespace IDs
```

### Step 3: R2 Storage Setup
```bash
# Create R2 bucket for assets
wrangler r2 bucket create createx-assets

# Upload existing assets (if any)
wrangler r2 object put createx-assets/logo.png --file public/logo.png
```

### Step 4: Worker Deployment
```bash
# Install worker dependencies
cd workers
npm install

# Deploy worker
wrangler deploy

# Deploy to production environment
wrangler deploy --env production
```

### Step 5: Pages Deployment
```bash
# Build Next.js application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name createx-facilitator-guide

# Or connect GitHub repository for automatic deployments
```

### Step 6: Environment Variables
```bash
# Set required secrets
wrangler secret put JWT_SECRET
wrangler secret put ENCRYPTION_KEY

# Production environment
wrangler secret put JWT_SECRET --env production
wrangler secret put ENCRYPTION_KEY --env production
```

---

## 📊 **INFRASTRUCTURE OVERVIEW**

### Cloudflare Services Used

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Workers** | API Backend | `workers/api/index.ts` |
| **Pages** | Frontend Hosting | Next.js static export |
| **D1** | Database | SQLite with edge replication |
| **R2** | Object Storage | Images, documents, assets |
| **KV** | Caching | API responses, sessions |
| **AI** | Content Generation | Llama 3.1 8B model |
| **Analytics Engine** | Usage Tracking | Real-time analytics |
| **Durable Objects** | Real-time Features | Collaboration sessions |

### Architecture Diagram
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudflare    │    │   Cloudflare    │    │   Cloudflare    │
│     Pages       │    │    Workers      │    │       D1        │
│   (Frontend)    │────│   (API Layer)   │────│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudflare    │    │   Cloudflare    │    │   Cloudflare    │
│       R2        │    │       KV        │    │       AI        │
│  (Asset Store)  │    │   (Caching)     │    │ (Content Gen)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📁 **CONTENT MIGRATION**

### Migrate Existing Content
```bash
# Run content migration script
node scripts/migrate-content.js

# Verify migration
wrangler d1 execute createx-cms --command="SELECT COUNT(*) FROM modules"
```

### Sample Content Structure
```
content/modules/
├── 01-introduction-to-entrepreneurship/
│   ├── index.md
│   ├── 01-what-is-entrepreneurship.md
│   └── 02-entrepreneurial-mindset.md
├── 02-opportunity-recognition/
│   ├── index.md
│   └── 01-identifying-opportunities.md
└── 03-business-model-development/
    ├── index.md
    ├── 01-business-model-canvas.md
    └── 02-value-proposition.md
```

---

## 🔒 **SECURITY CONFIGURATION**

### Environment Variables
```bash
# Required secrets (generated automatically by script)
JWT_SECRET=your-jwt-secret-here
ENCRYPTION_KEY=your-encryption-key-here

# Application URLs
APP_URL=https://facilitator.createx.org
CORS_ORIGINS=https://facilitator.createx.org

# Database and service bindings (configured in wrangler.toml)
```

### Authentication Flow
1. **User Registration/Login** → JWT token generation
2. **Token Validation** → Middleware in all protected routes
3. **Role-Based Access** → Admin, Facilitator, Learner roles
4. **Session Management** → KV storage for session data

---

## 🌍 **GLOBAL DEPLOYMENT**

### Edge Locations
- **Pages**: Deployed to 300+ edge locations globally
- **Workers**: Run in 200+ data centers worldwide
- **D1**: Automatic replication to multiple regions
- **R2**: Global object storage with edge caching

### Performance Optimizations
- **Edge Caching**: API responses cached at edge
- **Asset Optimization**: Images compressed and served via CDN
- **Database Queries**: Optimized with proper indexing
- **Real-time Features**: Durable Objects for low-latency collaboration

---

## 🤖 **AI INTEGRATION**

### Cloudflare AI Models
```javascript
// Content generation example
const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
  messages: [
    {
      role: 'system',
      content: 'You are an expert educational content designer...'
    },
    {
      role: 'user',
      content: 'Create a module outline for: Innovation Management'
    }
  ]
});
```

### Available AI Features
- **Module Outline Generation**
- **Lesson Content Creation**
- **Assessment Development**
- **Interactive Activity Design**
- **Content Enhancement**

---

## 📈 **MONITORING & ANALYTICS**

### Built-in Analytics
```bash
# View worker logs
wrangler tail

# Database queries
wrangler d1 execute createx-cms --command="SELECT * FROM analytics_events LIMIT 10"

# KV operations
wrangler kv:key list --binding=CACHE_KV
```

### Performance Metrics
- **API Response Times**
- **Database Query Performance**
- **User Engagement Analytics**
- **Content Usage Statistics**
- **AI Generation Metrics**

---

## 🔧 **MAINTENANCE & UPDATES**

### Regular Maintenance
```bash
# Update worker
wrangler deploy

# Database migrations
wrangler d1 migrations apply createx-cms

# Clear cache
wrangler kv:key delete --binding=CACHE_KV "cache-key"

# Backup database
wrangler d1 export createx-cms --output backup.sql
```

### Scaling Considerations
- **D1**: Automatic scaling up to 10GB per database
- **Workers**: 100,000 requests/day on free tier
- **R2**: Pay-as-you-go storage and bandwidth
- **KV**: 1,000 operations/day on free tier

---

## 🆘 **TROUBLESHOOTING**

### Common Issues

#### Database Connection
```bash
# Test database connection
wrangler d1 execute createx-cms --command="SELECT 1"
```

#### Worker Deployment
```bash
# Check worker status
wrangler dev

# View deployment logs
wrangler tail --format=pretty
```

#### Pages Build Issues
```bash
# Local build test
npm run build

# Check build output
ls -la out/
```

### Debug Commands
```bash
# Worker logs
wrangler tail --format=json

# Database schema
wrangler d1 execute createx-cms --command=".schema"

# KV namespace contents
wrangler kv:key list --binding=CACHE_KV

# R2 bucket contents
wrangler r2 object list createx-assets
```

---

## 📞 **SUPPORT & RESOURCES**

### Documentation Links
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare AI Docs](https://developers.cloudflare.com/ai/)

### Community Support
- [Cloudflare Community](https://community.cloudflare.com/)
- [Workers Discord](https://discord.gg/cloudflaredev)
- [GitHub Issues](https://github.com/cloudflare/workers-sdk/issues)

---

## ✅ **DEPLOYMENT CHECKLIST**

- [ ] Cloudflare account setup with payment method
- [ ] Wrangler CLI installed and authenticated
- [ ] D1 database created and migrated
- [ ] KV namespace configured
- [ ] R2 bucket created
- [ ] Worker deployed successfully
- [ ] Pages deployed and accessible
- [ ] Environment variables configured
- [ ] Content migrated to database
- [ ] SSL/TLS certificates configured
- [ ] Custom domain configured (if applicable)
- [ ] Analytics and monitoring enabled
- [ ] Backup strategy implemented

---

**🎉 Congratulations! Your CreateX Facilitator Guide is now running on Cloudflare's global edge network with enterprise-grade performance, security, and scalability.**
