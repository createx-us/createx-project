#!/bin/bash

# CreateX Facilitator Guide - Deployment Verification Script
# This script helps verify that your Cloudflare Pages deployment setup is working correctly

set -e

echo "🔍 CreateX Facilitator Guide - Deployment Verification"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
    echo -e "${RED}❌ Error: Please run this script from the createx-facilitator-guide directory${NC}"
    exit 1
fi

echo -e "${BLUE}📍 Current directory: $(pwd)${NC}"
echo ""

# 1. Check Node.js and npm versions
echo -e "${YELLOW}1. Checking Node.js and npm versions...${NC}"
node_version=$(node --version)
npm_version=$(npm --version)
echo -e "   Node.js: ${GREEN}$node_version${NC}"
echo -e "   npm: ${GREEN}$npm_version${NC}"
echo ""

# 2. Check if dependencies are installed
echo -e "${YELLOW}2. Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "   ${RED}❌ node_modules not found. Installing dependencies...${NC}"
    npm ci
else
    echo -e "   ${GREEN}✅ Dependencies installed${NC}"
fi
echo ""

# 3. Test build process
echo -e "${YELLOW}3. Testing build process...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Build successful${NC}"
else
    echo -e "   ${RED}❌ Build failed. Running with verbose output:${NC}"
    npm run build
    exit 1
fi
echo ""

# 4. Check if output directory exists
echo -e "${YELLOW}4. Checking build output...${NC}"
if [ -d "out" ]; then
    file_count=$(find out -type f | wc -l)
    echo -e "   ${GREEN}✅ Output directory exists with $file_count files${NC}"
else
    echo -e "   ${RED}❌ Output directory not found${NC}"
    exit 1
fi
echo ""

# 5. Check Cloudflare authentication
echo -e "${YELLOW}5. Checking Cloudflare authentication...${NC}"
if command -v wrangler &> /dev/null; then
    if wrangler whoami > /dev/null 2>&1; then
        account=$(wrangler whoami | grep "Account Name" | cut -d'│' -f2 | xargs)
        echo -e "   ${GREEN}✅ Cloudflare authenticated${NC}"
        echo -e "   Account: ${BLUE}$account${NC}"
    else
        echo -e "   ${RED}❌ Cloudflare not authenticated. Run: wrangler login${NC}"
    fi
else
    echo -e "   ${RED}❌ Wrangler CLI not found. Install: npm install -g wrangler${NC}"
fi
echo ""

# 6. Check GitHub remote
echo -e "${YELLOW}6. Checking GitHub repository...${NC}"
if git remote -v | grep -q "createx-us/createx-project"; then
    echo -e "   ${GREEN}✅ Correct GitHub repository configured${NC}"
    
    # Check current branch
    current_branch=$(git branch --show-current)
    echo -e "   Current branch: ${BLUE}$current_branch${NC}"
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "   ${YELLOW}⚠️  Uncommitted changes detected${NC}"
    else
        echo -e "   ${GREEN}✅ Working directory clean${NC}"
    fi
else
    echo -e "   ${RED}❌ Incorrect or missing GitHub repository${NC}"
fi
echo ""

# 7. Check GitHub Actions workflow
echo -e "${YELLOW}7. Checking GitHub Actions workflow...${NC}"
workflow_file="../../.github/workflows/deploy-cloudflare-pages.yml"
if [ -f "$workflow_file" ]; then
    echo -e "   ${GREEN}✅ GitHub Actions workflow exists${NC}"
else
    echo -e "   ${RED}❌ GitHub Actions workflow not found${NC}"
fi
echo ""

# 8. Check configuration files
echo -e "${YELLOW}8. Checking configuration files...${NC}"
config_files=("next.config.js" "package.json" "pages.toml")
for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✅ $file exists${NC}"
    else
        echo -e "   ${RED}❌ $file missing${NC}"
    fi
done
echo ""

# 9. Summary and next steps
echo -e "${BLUE}📋 Summary and Next Steps:${NC}"
echo "   1. Ensure GitHub secrets are set up:"
echo "      - CLOUDFLARE_API_TOKEN"
echo "      - CLOUDFLARE_ACCOUNT_ID (cc39c0447db8c730182cfd075fe91bf7)"
echo ""
echo "   2. Test the deployment pipeline:"
echo "      - Make a small change to any file"
echo "      - Commit and push to main branch"
echo "      - Check GitHub Actions for deployment status"
echo ""
echo "   3. Monitor deployment:"
echo "      - GitHub: https://github.com/createx-us/createx-project/actions"
echo "      - Cloudflare: https://dash.cloudflare.com/pages"
echo ""

if [ -d "out" ] && command -v wrangler &> /dev/null && wrangler whoami > /dev/null 2>&1; then
    echo -e "${GREEN}🎉 Everything looks ready for deployment!${NC}"
else
    echo -e "${YELLOW}⚠️  Some issues need to be resolved before deployment${NC}"
fi

echo ""
echo "📖 For detailed setup instructions, see: CLOUDFLARE_CICD_SETUP.md"
