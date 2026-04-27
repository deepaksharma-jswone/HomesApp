// src/hooks/useAuthGate.ts
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParams } from '../navigation/types';

export function useAuthGate() {
  const status = useAuthStore(s => s.status);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return function gate(action: () => void) {
    if (status === 'authenticated') {
      action();
    } else {
      navigation.navigate('Login');
    }
  };
}
