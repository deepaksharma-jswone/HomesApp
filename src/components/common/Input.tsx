// src/components/common/Input.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';

type Props = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

export function Input({ label, error, isPassword, ...props }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          error ? styles.inputError : styles.inputNormal,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !show}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShow(s => !s)} style={styles.eye}>
            <Text style={styles.eyeText}>{show ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  inputNormal: { borderColor: Colors.border, backgroundColor: Colors.surface },
  inputError: { borderColor: Colors.error, backgroundColor: '#FEF2F2' },
  input: { flex: 1, height: 50, fontSize: 15, color: Colors.text },
  eye: { paddingLeft: 8 },
  eyeText: { fontSize: 13, color: Colors.primary, fontWeight: '500' },
  error: { fontSize: 12, color: Colors.error, marginTop: 4 },
});
