# 🚀 Cloudflare Pages CI/CD Setup Guide

This guide will help you set up automated deployment of the CreateX Facilitator Guide to Cloudflare Pages using GitHub Actions.

## 📋 Prerequisites

- [x] GitHub repository: `https://github.com/createx-us/createx-project.git`
- [x] Cloudflare account with Pages access
- [x] Cloudflare API Token with appropriate permissions
- [x] Application already deployed manually once to Cloudflare Pages

## 🔑 Step 1: Get Your Cloudflare API Token

### Create a Custom API Token (Recommended)

1. Go to [Cloudflare Dashboard → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Use the **"Custom token"** template
4. Configure the token with these permissions:
   ```
   Account - Cloudflare Pages:Edit
   Zone - Zone Settings:Read, Zone:Read (if using custom domain)
   ```
5. Set Account Resources to: **Include - All accounts** or select your specific account
6. Set Zone Resources to: **Include - All zones** (if using custom domain)
7. Copy the generated token - you'll need it for GitHub secrets

### Your Account Details
- **Account ID**: `cc39c0447db8c730182cfd075fe91bf7`
- **Account Name**: BoardX Inc
- **Project Name**: createx-facilitator-guide

## 🔧 Step 2: Configure GitHub Repository Secrets

1. Go to your GitHub repository: https://github.com/createx-us/createx-project
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"** and add these secrets:

### Required Secrets

| Secret Name | Value | Description |
|------------|-------|-------------|
| `CLOUDFLARE_API_TOKEN` | `your-api-token-here` | The API token from Step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | `cc39c0447db8c730182cfd075fe91bf7` | Your Cloudflare Account ID |

### How to Add Secrets

```bash
# Navigate to: GitHub Repository → Settings → Secrets and variables → Actions

# Add CLOUDFLARE_API_TOKEN
Name: CLOUDFLARE_API_TOKEN
Secret: [paste your API token here]

# Add CLOUDFLARE_ACCOUNT_ID  
Name: CLOUDFLARE_ACCOUNT_ID
Secret: cc39c0447db8c730182cfd075fe91bf7
```

## 🏗️ Step 3: Cloudflare Pages Project Setup

### Option A: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/pages)
2. Click **"Create application"**
3. Choose **"Connect to Git"**
4. Select your repository: `createx-us/createx-project`
5. Configure build settings:
   ```
   Framework preset: Next.js
   Build command: cd packages/createx-facilitator-guide && npm ci && npm run build
   Build output directory: packages/createx-facilitator-guide/out
   Root directory: /
   Environment variables: NODE_VERSION = 18
   ```

### Option B: Via Wrangler CLI

```bash
# Navigate to your project directory
cd /Users/shenyanbin/bx/createx-project/createx-project/packages/createx-facilitator-guide

# Create the Pages project
wrangler pages project create createx-facilitator-guide

# Deploy once manually to initialize
npm run build
wrangler pages deploy out --project-name createx-facilitator-guide
```

## 🔄 Step 4: Test the CI/CD Pipeline

### Trigger Automatic Deployment

1. Make a small change to any file in `packages/createx-facilitator-guide/`
2. Commit and push to the main branch:
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

3. Watch the deployment in:
   - **GitHub**: Repository → Actions tab
   - **Cloudflare**: Dashboard → Pages → createx-facilitator-guide

### Manual Deployment Trigger

You can also trigger deployment manually:
1. Go to GitHub Repository → Actions
2. Select "Deploy CreateX Facilitator Guide to Cloudflare Pages"
3. Click "Run workflow" → "Run workflow"

## 🌐 Step 5: Custom Domain Setup (Optional)

### If you want to use a custom domain:

1. **In Cloudflare Pages**:
   - Go to Pages → createx-facilitator-guide → Custom domains
   - Add your domain (e.g., `guide.createx.us`)

2. **Update DNS**:
   - Add a CNAME record pointing to your Pages domain
   - Or add A/AAAA records as provided by Cloudflare

3. **SSL Certificate**:
   - Cloudflare will automatically provision SSL certificates
   - This should resolve your current SSL issue

## 🔍 Step 6: Monitoring and Troubleshooting

### Check Deployment Status

```bash
# Check recent deployments
wrangler pages deployment list --project-name createx-facilitator-guide

# View deployment logs
wrangler pages deployment tail --project-name createx-facilitator-guide
```

### GitHub Actions Monitoring

- **Workflow Status**: Repository → Actions tab
- **Build Logs**: Click on any workflow run to see detailed logs
- **Environment URLs**: Each deployment creates preview/production URLs

### Common Issues and Solutions

1. **SSL Certificate Error**: 
   - Usually resolves automatically after proper Cloudflare Pages setup
   - Ensure you're accessing the correct Cloudflare Pages URL

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs in GitHub Actions

3. **Environment Variables**:
   - Add any required environment variables in Cloudflare Pages settings
   - Or in GitHub Actions workflow if needed for build time

## 📊 Current Deployment Status

- ✅ **Manual Deployment**: Working (https://822957ad.createx-facilitator-guide.pages.dev)
- ⏳ **CI/CD Pipeline**: Ready to configure
- ⏳ **SSL Certificate**: Will be resolved with proper domain setup
- ✅ **Internationalization**: English and Chinese support active

## 🎯 Next Steps

1. **Immediate**: Set up GitHub secrets (Steps 1-2)
2. **Short-term**: Test automated deployment (Step 4)
3. **Optional**: Configure custom domain (Step 5)
4. **Ongoing**: Monitor deployments and performance

## 🆘 Getting Help

If you encounter issues:

1. **Check GitHub Actions logs**: Repository → Actions → [failed workflow]
2. **Check Cloudflare Pages logs**: Dashboard → Pages → createx-facilitator-guide → View details
3. **Verify secrets**: Ensure GitHub secrets are correctly set
4. **Test locally**: `npm run build` should work without errors

---

## 📝 Commands Quick Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy manually
npm run deploy

# Check Cloudflare auth
wrangler whoami

# View Pages projects
wrangler pages project list
```
