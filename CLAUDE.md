# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
# Start Metro bundler (required for development)
npm start

# Run on iOS (requires CocoaPods setup first)
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Run a single test file
npm test -- path/to/test.tsx

# Lint the codebase
npm run lint
```

### iOS Setup (first time or after native dependency changes)

```bash
bundle install              # Install CocoaPods (first time only)
bundle exec pod install     # Install iOS native dependencies
```

## Architecture

This is a React Native 0.83 motivational quote notification app using TypeScript.

### Source Structure (`src/`)

- `components/` - Reusable UI components (NotificationToggle, IntervalSlider, QuoteCard)
- `screens/` - Screen components (HomeScreen)
- `context/` - React Context for state management (SettingsContext)
- `services/` - Business logic services (notificationService, storageService)
- `data/` - Static data (Korean motivational quotes)
- `theme/` - Theming (light/dark mode colors)
- `types/` - TypeScript type definitions

### Key Files

- `App.tsx` - Root component with SafeAreaProvider and SettingsProvider
- `index.js` - Entry point with Notifee background event handler
- `jest.setup.js` - Jest mocks for native modules

## Key Dependencies

- `@notifee/react-native` - Local push notifications with background scheduling
- `@react-native-async-storage/async-storage` - Persistent settings storage
- `@react-native-community/slider` - Time interval slider UI
- `react-native-safe-area-context` - Safe area handling
