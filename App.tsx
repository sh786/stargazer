import { StyleSheet, View } from 'react-native';

import { COLOR_STYLES, LAYOUT_STYLES } from '@/core/styles/constants';
import FavoriteRepos from '@/features/FavoriteRepos';

export default function App() {
  return (
    <View style={styles.container}>
      <FavoriteRepos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_STYLES.BACKGROUND,
    color: COLOR_STYLES.TEXT_PRIMARY,
    paddingTop: LAYOUT_STYLES.TOP_BUFFER,
  },
});
