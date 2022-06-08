import { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { COLOR_STYLES, LAYOUT_STYLES } from '@/core/styles/constants';

interface PillProps {
  color: string;
  children: ReactNode;
}

export default function Pill({ color, children }: PillProps) {
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    maxHeight: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: LAYOUT_STYLES.SPACING_UNIT / 1.5,
    paddingVertical: LAYOUT_STYLES.SPACING_UNIT / 4,
  },
  text: {
    fontSize: 11,
    color: COLOR_STYLES.BACKGROUND,
  },
});
