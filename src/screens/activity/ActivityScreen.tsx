// Copy this pattern for: LoginScreen, SignupScreen,
// HomeScreen, SearchScreen, ActivityScreen, WalletScreen, ProfileScreen

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
