import type { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
}

export default function Button({ onPress, children }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
