// Copy this pattern for: LoginScreen, SignupScreen,
// HomeScreen, SearchScreen, ActivityScreen, WalletScreen, ProfileScreen

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text>WalletScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
