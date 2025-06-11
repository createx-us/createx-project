# CreateX Frontend

Modern React web application providing the main user interface for the CreateX Protocol ecosystem.

## ⚡ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Web3Modal** - Wallet connection interface
- **Wagmi** - React hooks for Ethereum

## 🚀 Features

### Core Functionality
- **Wallet Integration** - Connect MetaMask, WalletConnect, and other Web3 wallets
- **Community Dashboard** - View and manage workshop communities
- **Workshop Management** - Create, join, and participate in workshops
- **Governance Interface** - Submit proposals and vote on protocol changes
- **Token Management** - View CTX balance, transaction history, and rewards
- **Profile System** - User profiles with achievements and contribution history

### User Experience
- Responsive design for desktop and mobile
- Dark/light theme support
- Real-time notifications
- Progressive Web App (PWA) capabilities
- Accessibility (WCAG 2.1 AA compliance)

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 📋 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── layout/               # Layout components
│   ├── community/            # Community-specific components
│   ├── workshop/             # Workshop components
│   └── governance/           # Governance interface
├── pages/
│   ├── Dashboard.tsx         # Main dashboard
│   ├── Communities.tsx       # Community listing
│   ├── Workshops.tsx         # Workshop management
│   ├── Governance.tsx        # Proposal and voting
│   └── Profile.tsx          # User profile
├── hooks/
│   ├── useAuth.ts           # Authentication logic
│   ├── useCommunities.ts    # Community data
│   ├── useWorkshops.ts      # Workshop operations
│   └── useGovernance.ts     # Governance actions
├── services/
│   ├── api.ts               # API client configuration
│   ├── auth.service.ts      # Authentication service
│   ├── blockchain.service.ts # Smart contract interaction
│   └── storage.service.ts   # Local storage utilities
├── types/
│   ├── auth.types.ts        # Authentication types
│   ├── community.types.ts   # Community interfaces
│   └── api.types.ts         # API response types
├── utils/
│   ├── constants.ts         # App constants
│   ├── formatters.ts        # Data formatting utilities
│   └── validation.ts        # Form validation schemas
└── styles/
    ├── globals.css          # Global styles
    └── components.css       # Component-specific styles
```

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Headings: Inter (weights: 600, 700)
- Body: Inter (weights: 400, 500)
- Code: JetBrains Mono

### Components
All components follow the Radix UI design principles with custom styling via Tailwind CSS.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🌐 Environment Variables

```bash
# API Configuration
VITE_API_URL="http://localhost:3000/api"
VITE_WS_URL="ws://localhost:3000"

# Blockchain Configuration
VITE_CHAIN_ID=1
VITE_CONTRACT_ADDRESS="0x..."
VITE_ETHERSCAN_API_KEY="your-etherscan-key"

# Web3 Configuration
VITE_WALLETCONNECT_PROJECT_ID="your-walletconnect-id"
VITE_ALCHEMY_API_KEY="your-alchemy-key"

# Analytics
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker
```bash
docker build -t createx-frontend .
docker run -p 3000:3000 createx-frontend
```

## 🎯 Key Features

### Wallet Connection
- Support for 15+ wallet providers
- Automatic network switching
- Transaction status tracking
- Gas estimation and optimization

### Community Features
- Community discovery and search
- Workshop calendar integration
- Real-time chat and messaging
- File sharing and collaboration

### Governance
- Proposal creation wizard
- Voting interface with delegate options
- Governance token balance display
- Voting history and analytics

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-optimized interactions
- Mobile wallet integration
- Offline functionality (PWA)

## 📄 Documentation

- [Component Library](./docs/components.md)
- [State Management](./docs/state.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

---

*The frontend application is the primary interface for CreateX Protocol users.*
