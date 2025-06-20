#!/bin/bash

# GitHub Secrets Setup Guide for Cloudflare Pages CI/CD
# Run this script to get the values needed for GitHub repository secrets

echo "🔐 GitHub Secrets Setup for CreateX Facilitator Guide"
echo "====================================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}📋 You need to set up these GitHub repository secrets:${NC}"
echo ""

# 1. Account ID (we already know this)
echo -e "${BLUE}1. CLOUDFLARE_ACCOUNT_ID${NC}"
echo -e "   Value: ${GREEN}cc39c0447db8c730182cfd075fe91bf7${NC}"
echo ""

# 2. API Token instructions
echo -e "${BLUE}2. CLOUDFLARE_API_TOKEN${NC}"
echo -e "   ${YELLOW}You need to create a custom API token with these steps:${NC}"
echo ""
echo "   a) Open: https://dash.cloudflare.com/profile/api-tokens"
echo "   b) Click 'Create Token'"
echo "   c) Use 'Custom token' template"
echo "   d) Set permissions:"
echo "      - Account → Cloudflare Pages:Edit"
echo "      - Zone → Zone Settings:Read, Zone:Read (if using custom domain)"
echo "   e) Set account resources: Include → All accounts (or select BoardX Inc)"
echo "   f) Set zone resources: Include → All zones (if using custom domain)"
echo "   g) Copy the generated token"
echo ""

# 3. GitHub repository setup
echo -e "${BLUE}3. Add secrets to GitHub repository:${NC}"
echo ""
echo "   a) Go to: https://github.com/createx-us/createx-project"
echo "   b) Navigate to: Settings → Secrets and variables → Actions"
echo "   c) Click 'New repository secret' for each:"
echo ""
echo "      Secret name: CLOUDFLARE_API_TOKEN"
echo "      Secret value: [paste your API token from step 2]"
echo ""
echo "      Secret name: CLOUDFLARE_ACCOUNT_ID"
echo "      Secret value: cc39c0447db8c730182cfd075fe91bf7"
echo ""

# 4. Verification
echo -e "${BLUE}4. Test the setup:${NC}"
echo ""
echo "   After adding the secrets, you can test by:"
echo "   a) Making a small change to any file in packages/createx-facilitator-guide/"
echo "   b) Committing and pushing to main branch"
echo "   c) Checking GitHub Actions: https://github.com/createx-us/createx-project/actions"
echo ""

# 5. Current status check
echo -e "${YELLOW}📊 Current Status Check:${NC}"
echo ""

# Check if we're authenticated
if wrangler whoami > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Cloudflare authentication: Working${NC}"
    
    # Get account info
    account_info=$(wrangler whoami | grep "Account Name" | cut -d'│' -f2 | xargs)
    echo -e "   Account: ${GREEN}$account_info${NC}"
else
    echo -e "   ${RED}❌ Cloudflare authentication: Failed${NC}"
fi

# Check Pages project
if wrangler pages project list | grep -q "createx-facilitator-guide"; then
    echo -e "   ${GREEN}✅ Pages project exists: createx-facilitator-guide${NC}"
else
    echo -e "   ${YELLOW}⚠️  Pages project may need to be created${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Once you complete these steps, your CI/CD pipeline will be ready!${NC}"
echo ""
echo "📖 For detailed instructions, see: CLOUDFLARE_CICD_SETUP.md"
