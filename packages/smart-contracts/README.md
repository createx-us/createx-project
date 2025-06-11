# CreateX Smart Contracts

Ethereum-based smart contracts powering the CreateX Protocol's decentralized innovation education ecosystem.

## 🔧 Features

### Core Contracts
- **CTX Token** - ERC-20 utility token with governance features
- **Community Registry** - Workshop community registration and validation
- **Governance** - Decentralized voting and proposal mechanisms
- **Treasury** - Multi-signature fund management
- **Rewards** - Automated participation incentive distribution

### Security Features
- Multi-signature wallet controls
- Upgradeable proxy patterns
- Role-based access control
- Emergency pause mechanisms
- Comprehensive testing suite

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Compile contracts
npm run build

# Run tests
npm run test

# Start local blockchain
npm run dev

# Deploy to local network
npm run deploy
```

## 📋 Contract Architecture

```
contracts/
├── token/
│   ├── CTXToken.sol           # Main utility token
│   └── TokenVesting.sol       # Team token vesting
├── governance/
│   ├── Governor.sol           # Main governance contract
│   ├── Timelock.sol          # Proposal execution delays
│   └── VotingPower.sol       # Voting weight calculations
├── community/
│   ├── CommunityRegistry.sol  # Workshop registration
│   ├── RewardsManager.sol    # Participation rewards
│   └── Workshop.sol          # Individual workshop logic
├── treasury/
│   ├── Treasury.sol          # Multi-sig treasury
│   └── FundAllocation.sol    # Automated fund distribution
└── utils/
    ├── AccessControl.sol     # Role management
    └── Pausable.sol         # Emergency controls
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test file
npx hardhat test test/CTXToken.test.ts

# Generate coverage report
npm run coverage

# Check contract sizes
npm run size
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
npm run deploy
```

### Testnet Deployment
```bash
npx hardhat deploy --network goerli
npx hardhat verify --network goerli <CONTRACT_ADDRESS>
```

### Mainnet Deployment
```bash
npx hardhat deploy --network mainnet
npm run verify
```

## 🔒 Security

- All contracts undergo comprehensive testing
- External security audits before mainnet deployment
- Multi-signature controls for critical functions
- Gradual deployment with emergency controls

## 📄 Documentation

- [Contract Specifications](./docs/contracts/)
- [Deployment Guide](./docs/deployment.md)
- [Security Practices](./docs/security.md)
- [API Reference](./docs/api.md)

---

*Smart contracts are the foundation of the CreateX Protocol's decentralized architecture.*
