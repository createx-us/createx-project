#!/bin/bash

# Test deployment pipeline for CreateX Facilitator Guide
# This script makes a small change and triggers the CI/CD pipeline

set -e

echo "🚀 Testing CreateX Facilitator Guide CI/CD Pipeline"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "next.config.js" ]; then
    echo -e "${RED}❌ Error: Please run this script from the createx-facilitator-guide directory${NC}"
    exit 1
fi

# Check if GitHub secrets are likely configured
echo -e "${BLUE}1. Pre-flight checks...${NC}"

# Check git status
if [ -n "$(git status --porcelain)" ]; then
    echo -e "   ${YELLOW}⚠️  Uncommitted changes detected. Committing them first...${NC}"
    git add .
    git commit -m "chore: Prepare for CI/CD pipeline test"
fi

# Check current branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo -e "   ${YELLOW}⚠️  Current branch is '$current_branch'. Switching to main...${NC}"
    git checkout main
    git pull origin main
fi

echo -e "   ${GREEN}✅ Git repository ready${NC}"

# 2. Create a test change
echo -e "${BLUE}2. Creating test deployment...${NC}"

# Update a timestamp in a comment to trigger deployment
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
test_file="CICD_FINAL_SETUP.md"

# Add deployment test timestamp
echo "" >> "$test_file"
echo "<!-- Deployment test: $timestamp -->" >> "$test_file"

echo -e "   ${GREEN}✅ Test change created${NC}"

# 3. Commit and push
echo -e "${BLUE}3. Triggering deployment...${NC}"

git add "$test_file"
git commit -m "test: Trigger CI/CD pipeline deployment

- Test automated deployment to Cloudflare Pages
- Timestamp: $timestamp
- Target: https://dt.createx.us"

echo -e "   ${GREEN}✅ Changes committed${NC}"

# Push to trigger CI/CD
echo -e "   ${YELLOW}Pushing to main branch...${NC}"
git push origin main

echo -e "   ${GREEN}✅ Push completed${NC}"

# 4. Provide monitoring links
echo ""
echo -e "${BLUE}4. Monitor deployment progress:${NC}"
echo ""
echo -e "   ${YELLOW}GitHub Actions:${NC}"
echo "   https://github.com/createx-us/createx-project/actions"
echo ""
echo -e "   ${YELLOW}Cloudflare Pages:${NC}"
echo "   https://dash.cloudflare.com/pages/view/createx-facilitator-guide"
echo ""
echo -e "   ${YELLOW}Live Site:${NC}"
echo "   https://dt.createx.us"
echo ""

# 5. Expected timeline
echo -e "${BLUE}5. Expected timeline:${NC}"
echo "   📦 Build: 2-3 minutes"
echo "   🚀 Deploy: 1-2 minutes"
echo "   🌐 Propagation: 1-2 minutes"
echo "   ⏱️  Total: ~5-7 minutes"
echo ""

echo -e "${GREEN}🎉 Deployment test initiated!${NC}"
echo ""
echo "The CI/CD pipeline should now:"
echo "1. Detect the push to main branch"
echo "2. Run build and tests"
echo "3. Deploy to Cloudflare Pages"
echo "4. Update https://dt.createx.us"
echo ""
echo "Check the GitHub Actions link above for real-time progress."
