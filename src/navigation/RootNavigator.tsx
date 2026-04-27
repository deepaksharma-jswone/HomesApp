// src/navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { AppNavigator } from './AppNavigator';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';

const Root = createNativeStackNavigator();

export function RootNavigator() {
  const status = useAuthStore(s => s.status);

  if (status === 'loading') return <SplashScreen />;

  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      {/* App is always mounted — guest and authed both see it */}
      <Root.Screen name="App" component={AppNavigator} />

      {/* Auth screens slide up as modals — only available when not authed */}
      {status !== 'authenticated' && (
        <>
          <Root.Screen
            name="Login"
            component={LoginScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Root.Screen
            name="Signup"
            component={SignupScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
        </>
      )}
    </Root.Navigator>
  );
}
