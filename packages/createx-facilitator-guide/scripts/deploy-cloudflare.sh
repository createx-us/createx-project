#!/bin/bash

# CreateX Facilitator Guide - Cloudflare Deployment Script
# This script deploys the complete Cloudflare infrastructure

set -e

echo "🚀 Starting CreateX Facilitator Guide Cloudflare Deployment"
echo "============================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    print_error "Wrangler CLI not found. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Cloudflare
print_status "Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    print_warning "Not authenticated with Cloudflare. Please login:"
    wrangler login
fi

print_success "Authenticated with Cloudflare"

# Set environment (default to development)
ENVIRONMENT=${1:-development}
print_status "Deploying to environment: $ENVIRONMENT"

# Step 1: Create D1 Database
print_status "Creating D1 Database..."
DB_NAME="createx-cms"
if [ "$ENVIRONMENT" = "production" ]; then
    DB_NAME="createx-cms-prod"
fi

# Check if database exists
if wrangler d1 list | grep -q "$DB_NAME"; then
    print_warning "Database $DB_NAME already exists"
else
    DB_ID=$(wrangler d1 create "$DB_NAME" --output json | jq -r '.result.id')
    print_success "Created database: $DB_NAME with ID: $DB_ID"
    
    # Update wrangler.toml with database ID
    if [ "$ENVIRONMENT" = "production" ]; then
        print_status "Please update wrangler.toml with production database ID: $DB_ID"
    else
        print_status "Please update wrangler.toml with database ID: $DB_ID"
    fi
fi

# Step 2: Run Database Migrations
print_status "Running database migrations..."
if [ "$ENVIRONMENT" = "production" ]; then
    wrangler d1 migrations apply "$DB_NAME"
else
    wrangler d1 migrations apply "$DB_NAME" --local
fi
print_success "Database migrations completed"

# Step 3: Create KV Namespace
print_status "Creating KV namespace..."
KV_NAME="createx-cache"
if [ "$ENVIRONMENT" = "production" ]; then
    KV_NAME="createx-cache-prod"
fi

KV_ID=$(wrangler kv:namespace create "$KV_NAME" --output json | jq -r '.result.id')
print_success "Created KV namespace: $KV_NAME with ID: $KV_ID"

# Create preview KV namespace for development
if [ "$ENVIRONMENT" = "development" ]; then
    KV_PREVIEW_ID=$(wrangler kv:namespace create "$KV_NAME" --preview --output json | jq -r '.result.id')
    print_success "Created preview KV namespace with ID: $KV_PREVIEW_ID"
fi

print_status "Please update wrangler.toml with KV namespace ID: $KV_ID"

# Step 4: Create R2 Bucket
print_status "Creating R2 bucket..."
R2_BUCKET="createx-assets"
if [ "$ENVIRONMENT" = "production" ]; then
    R2_BUCKET="createx-assets-prod"
fi

if wrangler r2 bucket create "$R2_BUCKET"; then
    print_success "Created R2 bucket: $R2_BUCKET"
else
    print_warning "R2 bucket $R2_BUCKET may already exist or creation failed"
fi

# Step 5: Install Worker Dependencies
print_status "Installing worker dependencies..."
cd workers
if [ -f package.json ]; then
    npm install
    print_success "Worker dependencies installed"
else
    print_warning "No package.json found in workers directory"
fi
cd ..

# Step 6: Deploy Worker
print_status "Deploying Cloudflare Worker..."
if [ "$ENVIRONMENT" = "production" ]; then
    wrangler deploy --env production
else
    wrangler deploy
fi
print_success "Worker deployed successfully"

# Step 7: Build and Deploy Pages (Next.js)
print_status "Building Next.js application..."
npm run build

print_status "Deploying to Cloudflare Pages..."
if [ "$ENVIRONMENT" = "production" ]; then
    # Production deployment
    if command -v wrangler &> /dev/null; then
        wrangler pages deploy out --project-name createx-facilitator-guide --production
    else
        print_warning "Please deploy manually to Cloudflare Pages:"
        echo "1. Go to Cloudflare Dashboard > Pages"
        echo "2. Create new project: createx-facilitator-guide"
        echo "3. Connect to your Git repository"
        echo "4. Set build command: npm run build"
        echo "5. Set output directory: out"
    fi
else
    # Development deployment
    if command -v wrangler &> /dev/null; then
        wrangler pages deploy out --project-name createx-facilitator-guide-dev
    else
        print_warning "Please deploy manually to Cloudflare Pages for development"
    fi
fi

# Step 8: Configure Environment Variables
print_status "Configuring environment variables..."

ENV_VARS=(
    "JWT_SECRET=$(openssl rand -base64 32)"
    "ENCRYPTION_KEY=$(openssl rand -base64 32)"
)

if [ "$ENVIRONMENT" = "production" ]; then
    ENV_VARS+=(
        "APP_URL=https://facilitator.createx.org"
        "CORS_ORIGINS=https://facilitator.createx.org"
    )
else
    ENV_VARS+=(
        "APP_URL=https://createx-facilitator-guide.pages.dev"
        "CORS_ORIGINS=https://createx-facilitator-guide.pages.dev"
    )
fi

for var in "${ENV_VARS[@]}"; do
    key=$(echo "$var" | cut -d'=' -f1)
    value=$(echo "$var" | cut -d'=' -f2-)
    
    if [ "$ENVIRONMENT" = "production" ]; then
        wrangler secret put "$key" --env production <<< "$value"
    else
        wrangler secret put "$key" <<< "$value"
    fi
    print_success "Set environment variable: $key"
done

# Step 9: Test Deployment
print_status "Testing deployment..."
sleep 5

if [ "$ENVIRONMENT" = "production" ]; then
    WORKER_URL="https://createx-facilitator-guide.createx.workers.dev"
else
    WORKER_URL="https://createx-facilitator-guide.createx.workers.dev"
fi

if curl -s "$WORKER_URL/health" | grep -q "healthy"; then
    print_success "Worker health check passed"
else你啊
    print_warning "Worker health check failed. Check deployment logs."
fi

# Step 10: Display Summary
echo ""
echo "============================================================"
print_success "🎉 Deployment Complete!"
echo "============================================================"
echo ""
echo "📊 Deployment Summary:"
echo "----------------------"
echo "Environment: $ENVIRONMENT"
echo "Database: $DB_NAME"
echo "KV Namespace: $KV_NAME"
echo "R2 Bucket: $R2_BUCKET"
echo "Worker URL: $WORKER_URL"
echo ""
echo "🔧 Next Steps:"
echo "-------------"
echo "1. Update wrangler.toml with the generated IDs above"
echo "2. Configure custom domain in Cloudflare Dashboard"
echo "3. Set up SSL/TLS certificates"
echo "4. Configure DNS records"
echo "5. Test all API endpoints"
echo ""
echo "📚 API Endpoints:"
echo "----------------"
echo "Health Check: $WORKER_URL/health"
echo "API Documentation: $WORKER_URL/api/v1"
echo "Content API: $WORKER_URL/api/v1/content"
echo "Authentication: $WORKER_URL/api/v1/auth"
echo "AI Generation: $WORKER_URL/api/v1/ai"
echo ""
echo "🔗 Useful Commands:"
echo "------------------"
echo "View logs: wrangler tail"
echo "Update worker: wrangler deploy"
echo "Database shell: wrangler d1 execute $DB_NAME --command=\"SELECT * FROM modules\""
echo "KV operations: wrangler kv:key list --binding=CACHE_KV"
echo ""
print_success "Deployment script completed successfully!"
