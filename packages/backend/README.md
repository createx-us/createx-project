# CreateX Backend API

Node.js backend service providing authentication, data management, and business logic for the CreateX Protocol ecosystem.

## 🚀 Features

### Core Services
- **Authentication** - JWT-based user authentication with Web3 wallet integration
- **User Management** - Profile management and role-based access control
- **Community API** - Workshop management and community coordination
- **Governance** - Proposal management and voting coordination
- **Analytics** - Community metrics and impact measurement
- **Notifications** - Real-time updates and email notifications

### Infrastructure
- RESTful API with Express.js
- PostgreSQL database with Prisma ORM
- Redis for caching and sessions
- WebSocket for real-time features
- Blockchain integration via ethers.js

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize database
npm run migrate
npm run db:generate
npm run db:seed

# Start development server
npm run dev
```

## 📋 API Structure

```
src/
├── controllers/
│   ├── auth.controller.ts     # Authentication endpoints
│   ├── user.controller.ts     # User management
│   ├── community.controller.ts # Community operations
│   ├── workshop.controller.ts  # Workshop management
│   └── governance.controller.ts # Voting and proposals
├── services/
│   ├── auth.service.ts        # Authentication logic
│   ├── blockchain.service.ts  # Smart contract interaction
│   ├── notification.service.ts # Email and push notifications
│   └── analytics.service.ts   # Data aggregation
├── middleware/
│   ├── auth.middleware.ts     # JWT validation
│   ├── validation.middleware.ts # Request validation
│   └── rate-limit.middleware.ts # Rate limiting
├── models/
│   └── prisma/               # Database schema and models
├── routes/
│   ├── auth.routes.ts        # Authentication routes
│   ├── api.routes.ts         # Main API routes
│   └── public.routes.ts      # Public endpoints
└── utils/
    ├── logger.ts             # Logging utilities
    ├── errors.ts             # Error handling
    └── validation.ts         # Input validation schemas
```

## 🔧 Environment Setup

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/createx"
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# Blockchain
ETHEREUM_RPC_URL="https://mainnet.infura.io/v3/your-key"
CONTRACT_ADDRESS="0x..."
PRIVATE_KEY="your-private-key"

# External Services
SENDGRID_API_KEY="your-sendgrid-key"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - User login with wallet signature
- `POST /auth/register` - New user registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### Communities
- `GET /communities` - List all communities
- `POST /communities` - Create new community
- `GET /communities/:id` - Get community details
- `PUT /communities/:id` - Update community
- `POST /communities/:id/join` - Join community

### Workshops
- `GET /workshops` - List workshops
- `POST /workshops` - Create workshop
- `GET /workshops/:id` - Get workshop details
- `POST /workshops/:id/attend` - Mark attendance

### Governance
- `GET /proposals` - List proposals
- `POST /proposals` - Create proposal
- `POST /proposals/:id/vote` - Submit vote

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t createx-backend .
docker run -p 3000:3000 createx-backend
```

## 📄 Documentation

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Authentication Guide](./docs/auth.md)
- [Deployment Guide](./docs/deployment.md)

---

*The backend service is the central hub for CreateX Protocol operations.*
