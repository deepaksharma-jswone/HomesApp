import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import type { AppTabParams } from './types';

const Tab = createBottomTabNavigator<AppTabParams>();

export function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={Routes.Home} component={HomeScreen} />
      <Tab.Screen name={Routes.Search} component={SearchScreen} />
      <Tab.Screen name={Routes.Activity} component={ActivityScreen} />
      <Tab.Screen name={Routes.Wallet} component={WalletScreen} />
      <Tab.Screen name={Routes.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
