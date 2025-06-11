# CreateX Protocol Monorepo

A decentralized innovation education protocol leveraging blockchain technology to create a global network of community-driven learning environments.

## 🏗️ Architecture

This monorepo contains all the components of the CreateX ecosystem:

```
createx-monorepo/
├── packages/
│   ├── docs/                   # Documentation, whitepapers, and project specs
│   ├── smart-contracts/        # Ethereum smart contracts and DeFi protocols
│   ├── backend/               # API server, authentication, and data services
│   ├── frontend/              # React web application for community dashboard
│   ├── website/               # Marketing website and landing pages
│   └── mobile-app/            # React Native mobile application
├── tools/
│   ├── build/                 # Build scripts and configuration
│   └── scripts/              # Utility scripts and automation
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/createx-protocol/createx-monorepo.git
cd createx-monorepo

# Install dependencies
npm install

# Start development servers
npm run dev
```

## 📦 Packages

### 📚 [Documentation](./packages/docs/)
Project documentation, whitepapers, implementation guides, and team structure.

### 🔗 [Smart Contracts](./packages/smart-contracts/)
Ethereum-based smart contracts for:
- CTX token implementation
- Governance mechanisms
- Community rewards system
- Treasury management

### 🖥️ [Backend](./packages/backend/)
Node.js API server providing:
- User authentication and profiles
- Community management
- Workshop coordination
- Analytics and reporting

### 🌐 [Frontend](./packages/frontend/)
React web application featuring:
- Community dashboard
- Workshop management
- Governance voting interface
- Token wallet integration

### 🏠 [Website](./packages/website/)
Marketing website with:
- Landing pages
- Protocol documentation
- Community showcase
- Partnership information

### 📱 [Mobile App](./packages/mobile-app/)
React Native mobile application for:
- Workshop participation
- Community networking
- Mobile token management
- Push notifications

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start all development servers
npm run build       # Build all packages
npm run test        # Run tests across all packages
npm run lint        # Lint all packages
npm run format      # Format code with Prettier
npm run clean       # Clean all build artifacts
```

### Working with Packages

Each package can be developed independently:

```bash
# Work on frontend
cd packages/frontend
npm run dev

# Work on smart contracts
cd packages/smart-contracts
npm run compile
npm run test

# Work on backend
cd packages/backend
npm run dev
```

## 🌍 Project Vision

CreateX aims to deploy 1,000 autonomous workshop communities across major global cities, creating a decentralized innovation education infrastructure that:

- **Democratizes Access**: Removes geographic and economic barriers to high-quality innovation education
- **Incentivizes Participation**: Uses cryptoeconomic mechanisms to reward active contribution and learning
- **Scales Locally**: Enables each community to address region-specific challenges while contributing to global knowledge
- **Maintains Quality**: Implements governance mechanisms to ensure educational standards and community impact
- **Preserves Autonomy**: Operates through decentralized governance rather than centralized institutional control

## 🗺️ Roadmap

### Phase 1: Foundation (2025)
- Smart contract deployment and security auditing
- Initial community pilot programs in 10 major cities
- Core platform development and beta testing

### Phase 2: Growth (2026-2027)
- Scale to 250 active communities globally
- Advanced analytics and impact measurement systems
- Corporate partnership program expansion

### Phase 3: Maturity (2028+)
- Achievement of 1,000 workshop communities globally
- Self-sustaining economic model
- Integration with formal education systems

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Website](https://createx.protocol)
- [Documentation](./packages/docs/)
- [Whitepaper](./packages/docs/createx%20whitepaper.md)
- [Discord Community](https://discord.gg/createx)
- [Twitter](https://twitter.com/createxprotocol)

---

**Built with ❤️ by the CreateX community**