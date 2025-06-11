# Contributing to CreateX Protocol

Welcome to the CreateX Protocol! We're excited to have you contribute to building the future of decentralized innovation education.

## 🤝 How to Contribute

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/createx-monorepo.git
cd createx-monorepo
```

### 2. Set Up Development Environment

```bash
# Run the setup script
./tools/scripts/setup.sh

# Or manually:
npm install
npm run build
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## 📦 Monorepo Structure

Each package has its own development workflow:

```bash
# Frontend development
cd packages/frontend
npm run dev

# Backend development
cd packages/backend
npm run dev

# Smart contract development
cd packages/smart-contracts
npm run dev

# Website development
cd packages/website
npm run dev

# Mobile app development
cd packages/mobile-app
npm run dev
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/frontend && npm run test
cd packages/backend && npm run test
cd packages/smart-contracts && npm run test
```

### Writing Tests

- **Frontend**: Use Jest and React Testing Library
- **Backend**: Use Jest with supertest for API testing
- **Smart Contracts**: Use Hardhat testing framework
- **Mobile**: Use Jest with React Native Testing Library

## 🎯 Development Guidelines

### Code Style

We use automated formatting and linting:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Commit Messages

Follow conventional commits:

```
feat(frontend): add community dashboard
fix(backend): resolve authentication bug
docs(readme): update installation instructions
test(contracts): add governance contract tests
```

### Pull Request Process

1. **Update your branch** with the latest main
2. **Run all checks** (tests, linting, type checking)
3. **Write clear description** of changes
4. **Link related issues** using GitHub keywords
5. **Request review** from relevant team members

## 🏗️ Package-Specific Guidelines

### Smart Contracts (`packages/smart-contracts/`)

- **Security First**: All contracts must pass security audits
- **Gas Optimization**: Optimize for gas efficiency
- **Documentation**: Comprehensive NatSpec comments
- **Testing**: 100% test coverage for critical functions

```bash
# Contract development workflow
npm run compile
npm run test
npm run coverage
npm run size
```

### Backend (`packages/backend/`)

- **API Design**: Follow RESTful principles
- **Security**: Implement proper authentication and authorization
- **Documentation**: OpenAPI/Swagger specifications
- **Performance**: Optimize database queries and caching

```bash
# Backend development workflow
npm run dev
npm run test
npm run migrate
```

### Frontend (`packages/frontend/`)

- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Core Web Vitals optimization
- **Responsive**: Mobile-first design approach
- **User Experience**: Intuitive and consistent UI

```bash
# Frontend development workflow
npm run dev
npm run test
npm run build
```

### Mobile App (`packages/mobile-app/`)

- **Platform Guidelines**: Follow iOS and Android design principles
- **Performance**: 60fps animations and smooth interactions
- **Offline Support**: Graceful degradation without internet
- **Security**: Secure storage and biometric authentication

```bash
# Mobile development workflow
npm run dev
npm run ios
npm run android
```

### Website (`packages/website/`)

- **SEO**: Optimized for search engines
- **Performance**: Static generation where possible
- **Content**: Clear and engaging copy
- **Conversion**: Effective call-to-action elements

```bash
# Website development workflow
npm run dev
npm run build
npm run export
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, browser, versions)
5. **Screenshots or logs** if applicable

Use our bug report template when creating issues.

## 💡 Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** you're trying to solve
3. **Propose a solution** with implementation details
4. **Consider the impact** on existing functionality
5. **Discuss with the team** before starting implementation

## 🔒 Security

For security vulnerabilities:

1. **Do NOT** create public issues
2. **Email** security@createx.protocol
3. **Include details** about the vulnerability
4. **Wait for confirmation** before disclosure

## 📚 Documentation

Help improve our documentation:

- **API Documentation**: Update OpenAPI specs
- **Code Comments**: Add clear, helpful comments
- **README Files**: Keep package READMEs current
- **Tutorials**: Create step-by-step guides
- **Examples**: Provide working code examples

## 🌍 Community

Join our community:

- **Discord**: [discord.gg/createx](https://discord.gg/createx)
- **Twitter**: [@createxprotocol](https://twitter.com/createxprotocol)
- **GitHub Discussions**: For longer-form discussions
- **Weekly Calls**: Participate in developer calls

## 🏆 Recognition

Contributors are recognized through:

- **Hall of Fame**: Featured in our documentation
- **Token Rewards**: CTX tokens for significant contributions
- **Conference Opportunities**: Speaking at events
- **Mentorship**: Work directly with core team members

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🆘 Getting Help

If you need help:

1. **Check documentation** and existing issues
2. **Ask in Discord** for quick questions
3. **Create an issue** for bugs or feature requests
4. **Join community calls** for in-depth discussions

## 🎉 Thank You!

Every contribution, no matter how small, helps make CreateX better. Thank you for being part of building the future of decentralized education!

---

*Happy coding! 🚀*
