export const Routes = {
  Splash: 'Splash',
  Login: 'Login',
  Signup: 'Signup',
  // App tabs
  Home: 'Home',
  Search: 'Search',
  Activity: 'Activity',
  Wallet: 'Wallet',
  Profile: 'Profile',
  // Nested
  EditProfile: 'EditProfile',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
