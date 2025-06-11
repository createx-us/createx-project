#!/bin/bash

# CreateX Deployment Script
# Handles deployment across different environments

set -e

ENVIRONMENT=${1:-development}
PACKAGE=${2:-all}

echo "🚀 Deploying CreateX to $ENVIRONMENT environment..."

case $ENVIRONMENT in
  development)
    echo "📦 Development deployment"
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "frontend" ]; then
      echo "🌐 Deploying frontend to development..."
      cd packages/frontend && npm run build && npm run deploy:dev
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "backend" ]; then
      echo "🖥️ Deploying backend to development..."
      cd packages/backend && npm run deploy:dev
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "website" ]; then
      echo "🏠 Deploying website to development..."
      cd packages/website && npm run build && npm run deploy:dev
    fi
    ;;
    
  staging)
    echo "📦 Staging deployment"
    # Run tests before staging deployment
    npm run test
    
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "smart-contracts" ]; then
      echo "🔗 Deploying smart contracts to testnet..."
      cd packages/smart-contracts && npm run deploy:testnet
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "frontend" ]; then
      echo "🌐 Deploying frontend to staging..."
      cd packages/frontend && npm run build && npm run deploy:staging
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "backend" ]; then
      echo "🖥️ Deploying backend to staging..."
      cd packages/backend && npm run deploy:staging
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "website" ]; then
      echo "🏠 Deploying website to staging..."
      cd packages/website && npm run build && npm run deploy:staging
    fi
    ;;
    
  production)
    echo "📦 Production deployment"
    # Run full test suite before production
    npm run test
    npm run lint
    npm run type-check
    
    echo "⚠️ Deploying to PRODUCTION. Continue? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
      echo "❌ Production deployment cancelled"
      exit 1
    fi
    
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "smart-contracts" ]; then
      echo "🔗 Deploying smart contracts to mainnet..."
      cd packages/smart-contracts && npm run deploy:mainnet
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "frontend" ]; then
      echo "🌐 Deploying frontend to production..."
      cd packages/frontend && npm run build && npm run deploy:prod
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "backend" ]; then
      echo "🖥️ Deploying backend to production..."
      cd packages/backend && npm run deploy:prod
    fi
    if [ "$PACKAGE" = "all" ] || [ "$PACKAGE" = "website" ]; then
      echo "🏠 Deploying website to production..."
      cd packages/website && npm run build && npm run deploy:prod
    fi
    ;;
    
  *)
    echo "❌ Unknown environment: $ENVIRONMENT"
    echo "Usage: ./deploy.sh [development|staging|production] [package_name|all]"
    exit 1
    ;;
esac

echo "✅ Deployment to $ENVIRONMENT complete!"
