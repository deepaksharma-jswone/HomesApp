// src/navigation/types.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes';

// 1. Root stack — top level navigator
export type RootStackParams = {
  App: undefined;
  Login: { redirectTo?: string } | undefined;
  Signup: undefined;
};

// 2. Bottom tabs
export type AppTabParams = {
  [Routes.Home]: undefined;
  [Routes.Search]: undefined;
  [Routes.Activity]: undefined;
  [Routes.Wallet]: undefined;
  [Routes.Profile]: undefined;
};

// 3. Profile nested stack
export type ProfileStackParams = {
  [Routes.Profile]: undefined;
  [Routes.EditProfile]: undefined;
};

// 4. Typed screen props — defined after their param types
export type LoginScreenProps = NativeStackScreenProps<RootStackParams, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<
  RootStackParams,
  'Signup'
>;
export type HomeScreenProps = BottomTabScreenProps<
  AppTabParams,
  typeof Routes.Home
>;
export type ProfileScreenProps = BottomTabScreenProps<
  AppTabParams,
  typeof Routes.Profile
>;
