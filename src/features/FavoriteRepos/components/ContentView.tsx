import { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { LAYOUT_STYLES } from '@/core/styles/constants';

interface ContentViewProps {
  children: ReactNode;
}

export default function ContentView({ children }: ContentViewProps) {
  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: LAYOUT_STYLES.SPACING_UNIT,
  },
});
