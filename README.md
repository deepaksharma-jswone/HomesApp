# HomesApp

A production-grade React Native application built with a senior engineering mindset — every architectural decision is intentional and documented.

---

## Tech Stack

| Layer          | Library                      | Why                                              |
| -------------- | ---------------------------- | ------------------------------------------------ |
| Framework      | React Native 0.85 (Bare CLI) | Full native control, no Expo abstractions        |
| Language       | TypeScript                   | Catch bugs at compile time, not runtime          |
| Navigation     | React Navigation v6          | Most mature, flexible auth flow support          |
| Global state   | Zustand                      | Zero boilerplate, no Provider needed             |
| Server state   | TanStack Query               | Caching, background refetch, loading states free |
| Secure storage | react-native-keychain        | Encrypted — never AsyncStorage for tokens        |
| Local storage  | react-native-mmkv            | 10x faster than AsyncStorage                     |
| HTTP client    | Axios                        | Interceptors for auth token injection            |
| Payments       | Stripe React Native SDK      | PCI compliant, App Store approved                |

---

## Architecture

The app is built in strict layers. Each layer has one responsibility and depends only on the layer below it.

```
Screens / UI
     ↓
Navigation (React Navigation)
     ↓
State (Zustand + TanStack Query)
     ↓
Services (API, Auth, Payment, Storage)
     ↓
Infrastructure (Axios, Keychain, Stripe, MMKV)
     ↓
Backend / Cloud
```

---

## Folder Structure

```
src/
├── screens/
│   ├── auth/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SignupScreen.tsx
│   ├── home/
│   │   └── HomeScreen.tsx
│   ├── profile/
│   │   ├── ProfileScreen.tsx
│   │   └── EditProfileScreen.tsx
│   ├── search/
│   │   └── SearchScreen.tsx
│   ├── activity/
│   │   └── ActivityScreen.tsx
│   └── wallet/
│       └── WalletScreen.tsx
├── navigation/
│   ├── RootNavigator.tsx       ← single source of truth for all routes
│   ├── AppNavigator.tsx        ← bottom tab navigator
│   └── types.ts                ← all route param types
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── AuthGate.tsx
│   └── layout/
│       └── FloatingAuthButton.tsx
├── hooks/
│   └── useAuthGate.ts          ← wraps any action behind auth check
├── store/
│   └── authStore.ts            ← Zustand auth state machine
├── services/
│   ├── api.ts                  ← Axios instance + interceptors
│   ├── authService.ts          ← login, signup, logout
│   └── storageService.ts       ← MMKV wrapper
├── utils/
├── constants/
│   ├── colors.ts
│   └── routes.ts
└── types/
    └── user.ts
```

---

## Navigation Architecture

The app uses a **three-state auth model** — not a binary logged-in/logged-out. This is the key architectural decision that makes guest mode, future suspended accounts, and trial users trivial to add.

```
Auth status: 'loading' | 'guest' | 'authenticated'
```

```
RootNavigator
  ├── status === 'loading'       → SplashScreen
  ├── status === 'guest'         → AppNavigator (bottom tabs) + Login/Signup modals available
  └── status === 'authenticated' → AppNavigator (bottom tabs) — Login/Signup removed from stack
```

**Why this matters:** When a user logs in, Zustand updates auth status, and React Navigation automatically removes the Login/Signup screens from the stack. No manual `navigation.navigate()` call needed after login. When logged out, the screens reappear. The navigator is a pure function of state.

### Bottom Tab Navigator

| Tab      | Guest access           | Authenticated access |
| -------- | ---------------------- | -------------------- |
| Home     | ✅ Full access         | ✅ Full access       |
| Search   | ✅ Full access         | ✅ Full access       |
| Activity | ✅ Read only           | ✅ Full access       |
| Wallet   | ⛔ Gate → Login prompt | ✅ Full access       |
| Profile  | ⛔ Gate → Login prompt | ✅ Full profile      |

### Login as Modal

Login and Signup slide up from the bottom (`presentation: 'modal'`). This signals to the user they haven't left the app and can swipe down to dismiss and continue browsing as a guest. This is the pattern used by Airbnb, Uber, and Instagram.

---

## Auth Gate Pattern

Any action in the app can be gated behind authentication with a single hook:

```tsx
const withAuth = useAuthGate()

<Button
  label="Save property"
  onPress={() => withAuth(() => saveProperty(id))}
/>
```

- Guest taps → Login modal slides up
- Authenticated user taps → action fires immediately

One hook, applied anywhere, consistent behaviour everywhere. No scattered `if (isLoggedIn)` checks across screens.

---

## State Management

Two tools for two different kinds of state — this is a deliberate separation.

**Zustand** handles UI/global state: auth status, user object, theme, local UI flags. State that lives in the app, not the server.

**TanStack Query** handles server state: API data, loading/error states, caching, background refetching. State that lives on the server and needs to be synced.

Using one tool for both leads to either manual cache management (if you use only Zustand) or overly complex reducers (if you use only Redux).

---

## Security Decisions

| Concern            | Decision                  | Why                                                    |
| ------------------ | ------------------------- | ------------------------------------------------------ |
| Token storage      | `react-native-keychain`   | Encrypted native keychain — AsyncStorage is plain text |
| Access tokens      | Short-lived (15 min)      | Limits damage window if stolen                         |
| Refresh tokens     | Long-lived (30 days)      | Stored in keychain only                                |
| Payment processing | Server-side PaymentIntent | Secret key never touches the client                    |
| Environment config | `react-native-config`     | API keys never hardcoded in source                     |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Ruby 3.3+ (via rbenv)
- CocoaPods
- Xcode 15+ (iOS)
- Android Studio (Android)

### Install

```bash
git clone https://github.com/yourusername/HomesApp.git
cd HomesApp
npm install
cd ios && pod install && cd ..
```

### Environment setup

```bash
cp .env.example .env
# Fill in your API base URL, Stripe publishable key, etc.
```

### Run

```bash
# Start Metro
npx react-native start --reset-cache

# iOS (new terminal)
npx react-native run-ios

# Android (new terminal)
npx react-native run-android
```

---

## Development Phases

- [x] Phase 1 — Project scaffold, folder structure, navigation skeleton
- [x] Phase 2 — Auth screens, Zustand store, guest gate, auth modal flow
- [ ] Phase 3 — Screen content, tab bar icons, shared components
- [ ] Phase 4 — API service layer, Axios interceptors, TanStack Query
- [ ] Phase 5 — Keychain token persistence, silent token refresh
- [ ] Phase 6 — Stripe payment integration
- [ ] Phase 7 — Push notifications
- [ ] Phase 8 — Production build, App Store / Play Store submission

---

## Key Engineering Decisions & Tradeoffs

### Why Bare CLI over Expo?

Full control over native code. Stripe SDK, Keychain, and MMKV all require native module linking that Expo managed workflow restricts. Tradeoff: more setup upfront, no Expo Go QR scanning.

### Why Zustand over Redux?

Redux Toolkit adds ~3 files of boilerplate per feature (slice, selectors, types). Zustand is one file. For a team of 1-3, Zustand's simplicity wins. Tradeoff: fewer devtools than Redux, less familiar to enterprise Redux developers.

### Why TanStack Query over SWR?

TanStack Query has better React Native support, more granular cache invalidation, and built-in optimistic updates. SWR is more popular in Next.js ecosystems. Tradeoff: slightly larger bundle size.

### Why modal login over stack push?

A pushed login screen implies the user has navigated away from where they were. A modal implies a temporary interruption. The distinction matters for conversion — users are more likely to dismiss a modal and continue browsing than to hit back from a pushed screen.
