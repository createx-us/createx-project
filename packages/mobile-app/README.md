# CreateX Mobile App

React Native mobile application providing native iOS and Android access to the CreateX Protocol ecosystem.

## 📱 Features

### Core Functionality
- **Wallet Integration** - Native mobile wallet support and WalletConnect
- **Workshop Check-in** - QR code scanning for workshop attendance
- **Community Chat** - Real-time messaging with workshop participants
- **Push Notifications** - Workshop reminders and governance alerts
- **Offline Support** - Basic functionality when internet is unavailable
- **Location Services** - Find nearby workshops and communities

### Mobile-Optimized Features
- Biometric authentication (Touch ID, Face ID, Fingerprint)
- Camera integration for QR codes and profile photos
- Background sync for notifications
- Deep linking for sharing workshop invitations
- Native performance optimizations

## ⚡ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation and routing
- **React Query** - Server state management
- **Reanimated** - High-performance animations
- **WalletConnect** - Web3 wallet integration
- **Expo modules** - Native device features

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Studio

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📋 Project Structure

```
src/
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── forms/               # Form components
│   ├── camera/              # Camera and QR scanner
│   └── charts/              # Data visualization
├── screens/
│   ├── auth/                # Authentication screens
│   ├── dashboard/           # Main dashboard
│   ├── workshops/           # Workshop management
│   ├── community/           # Community features
│   ├── wallet/              # Token management
│   └── profile/             # User profile
├── navigation/
│   ├── AppNavigator.tsx     # Main navigation
│   ├── AuthNavigator.tsx    # Auth flow navigation
│   └── TabNavigator.tsx     # Bottom tab navigation
├── services/
│   ├── api.service.ts       # API client
│   ├── auth.service.ts      # Authentication
│   ├── wallet.service.ts    # Wallet operations
│   ├── notification.service.ts # Push notifications
│   └── storage.service.ts   # Local storage
├── hooks/
│   ├── useAuth.ts           # Authentication state
│   ├── useWorkshops.ts      # Workshop data
│   ├── useWallet.ts         # Wallet connection
│   └── useNotifications.ts  # Notification handling
├── types/
│   ├── auth.types.ts        # Authentication types
│   ├── workshop.types.ts    # Workshop interfaces
│   └── navigation.types.ts  # Navigation types
├── utils/
│   ├── constants.ts         # App constants
│   ├── formatters.ts        # Data formatting
│   └── validators.ts        # Input validation
└── assets/
    ├── images/              # Image assets
    ├── icons/               # Icon files
    └── fonts/               # Custom fonts
```

## 🎨 Design System

### Colors
- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Purple)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Orange)
- Error: `#EF4444` (Red)

### Typography
- Headers: System font bold
- Body: System font regular
- Code: Menlo/Monaco

### Spacing
- Base unit: 4px
- Common spacings: 8, 12, 16, 20, 24, 32px

## 📱 Screen Overview

### Authentication Flow
- **Welcome** - App introduction and onboarding
- **Login** - Wallet connection or email login
- **Signup** - New user registration
- **Biometric Setup** - Enable biometric authentication

### Main Application
- **Dashboard** - Overview of activities and communities
- **Workshops** - Browse, join, and manage workshops
- **Community** - Chat, members, and local events
- **Wallet** - CTX balance, transactions, and rewards
- **Profile** - Personal settings and achievements

### Special Features
- **QR Scanner** - Workshop check-in and quick actions
- **Camera** - Profile photos and workshop documentation
- **Map** - Nearby workshops and community locations
- **Notifications** - Workshop reminders and updates

## 🔧 Configuration

### Environment Variables
```bash
# API Configuration
EXPO_PUBLIC_API_URL="https://api.createx.protocol"
EXPO_PUBLIC_WS_URL="wss://api.createx.protocol"

# Blockchain Configuration
EXPO_PUBLIC_CHAIN_ID="1"
EXPO_PUBLIC_CONTRACT_ADDRESS="0x..."

# WalletConnect
EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id"

# Push Notifications
EXPO_PUBLIC_PUSH_TOKEN="your-expo-push-token"

# Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "CreateX",
    "slug": "createx-mobile",
    "scheme": "createx",
    "platforms": ["ios", "android"],
    "version": "1.0.0",
    "permissions": [
      "CAMERA",
      "LOCATION",
      "NOTIFICATIONS",
      "BIOMETRIC"
    ]
  }
}
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check
```

## 📱 Platform-Specific Features

### iOS
- Face ID / Touch ID authentication
- Apple Wallet integration (future)
- iOS-specific design patterns
- App Store compliance

### Android
- Fingerprint authentication
- Android-specific material design
- Google Play compliance
- Android Auto support (future)

## 🚀 Deployment

### Development Builds
```bash
# iOS development build
npm run build:ios

# Android development build
npm run build:android
```

### Production Builds
```bash
# Build for app stores
eas build --platform all

# Submit to stores
npm run submit:ios
npm run submit:android
```

### Over-the-Air Updates
```bash
# Publish update
eas update --branch production
```

## 🔔 Push Notifications

### Notification Types
- Workshop reminders (30 min, 1 hour, 1 day before)
- New proposals requiring votes
- Community messages and announcements
- Reward notifications
- Security alerts

### Implementation
- Expo push notifications for cross-platform support
- Background notification handling
- Deep linking from notifications
- Notification preferences and scheduling

## 🌍 Offline Support

### Cached Data
- Recent workshop information
- User profile and preferences
- Cached community messages
- Token balance (last known)

### Offline Features
- View cached workshops
- Read offline messages
- Update profile information
- Queue actions for later sync

## 📄 App Store Information

### iOS App Store
- **Category**: Education
- **Age Rating**: 4+
- **Keywords**: education, blockchain, community, workshops
- **Privacy**: Clear data usage policies

### Google Play Store
- **Category**: Education
- **Content Rating**: Everyone
- **Target SDK**: Latest stable
- **Privacy Policy**: Comprehensive data handling

---

*The mobile app brings CreateX Protocol to users' pockets for seamless workshop participation.*
