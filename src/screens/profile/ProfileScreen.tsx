// src/screens/profile/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/common/Button';
import { Colors } from '../../constants/colors';
import type { RootStackParams } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParams>;

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const status = useAuthStore(s => s.status);
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);

  if (status !== 'authenticated') {
    return (
      <View style={styles.gateContainer}>
        <Text style={styles.gateIcon}>👤</Text>
        <Text style={styles.gateTitle}>You're browsing as a guest</Text>
        <Text style={styles.gateSub}>
          Sign in to access your profile, saved homes and more
        </Text>
        <Button
          label="Sign in"
          onPress={() => navigation.navigate('Login')}
          style={styles.gateBtn}
        />
        <Button
          label="Create account"
          variant="outline"
          onPress={() => navigation.navigate('Signup')}
          style={{ marginTop: 12, width: '100%' }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button
        label="Log out"
        variant="outline"
        onPress={logout}
        style={styles.logoutBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, color: '#fff', fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: Colors.text },
  email: { fontSize: 15, color: Colors.textMuted, marginTop: 4 },
  logoutBtn: { marginTop: 32, width: '100%' },
  gateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 32,
  },
  gateIcon: { fontSize: 56, marginBottom: 16 },
  gateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  gateSub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  gateBtn: { marginTop: 24, width: '100%' },
});
