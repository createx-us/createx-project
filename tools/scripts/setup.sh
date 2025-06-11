#!/bin/bash

# CreateX Monorepo Setup Script
# This script sets up the development environment for all packages

set -e

echo "🚀 Setting up CreateX Monorepo..."

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📦 Node.js version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    echo "❌ Node.js 18+ is required. Please upgrade your Node.js version."
    exit 1
fi

# Install root dependencies
echo "📥 Installing root dependencies..."
npm install

# Install dependencies for all packages
echo "📥 Installing package dependencies..."
npm run install:all

# Build all packages
echo "🔨 Building all packages..."
npm run build

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linters..."
npm run lint

echo "✅ CreateX Monorepo setup complete!"
echo ""
echo "📚 Available commands:"
echo "  npm run dev         - Start all development servers"
echo "  npm run build       - Build all packages"
echo "  npm run test        - Run tests across all packages"
echo "  npm run lint        - Lint all packages"
echo "  npm run format      - Format code with Prettier"
echo ""
echo "🏗️ Package-specific development:"
echo "  cd packages/frontend && npm run dev"
echo "  cd packages/backend && npm run dev"
echo "  cd packages/smart-contracts && npm run dev"
echo "  cd packages/website && npm run dev"
echo "  cd packages/mobile-app && npm run dev"
echo ""
echo "🌟 Happy coding!"
