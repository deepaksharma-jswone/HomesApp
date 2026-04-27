// src/screens/auth/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useAuthStore } from '../../store/authStore';

export function SplashScreen() {
  const setGuest = useAuthStore(s => s.setGuest);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Setting guest state...'); // add this to confirm it fires
      setGuest();
    }, 1500);
    return () => clearTimeout(timer);
  }, [setGuest]); // ← add setGuest to dependency array

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>HomesApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: { marginTop: 16, fontSize: 18, color: '#333' },
});
