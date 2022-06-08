import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, View, StyleSheet } from 'react-native';

import { COLOR_STYLES, LAYOUT_STYLES } from '@/core/styles/constants';
import {
  SEARCH_INPUT_PLACEHOLDER,
  SEARCH_STYLES,
} from '@/features/FavoriteRepos/components/constants';

interface SearchBarProps {
  searchInput: string;
  handleSearchInput: (e: string) => void;
  showBackBtn: boolean;
  handleBack: () => void;
}

export default function SearchBar({
  searchInput,
  handleSearchInput,
  showBackBtn,
  handleBack,
}: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <Ionicons
        name={showBackBtn ? 'chevron-back' : 'search'}
        size={SEARCH_STYLES.ICON_SIZE}
        color={COLOR_STYLES.TEXT_PRIMARY}
        onPress={() => showBackBtn && handleBack()}
      />
      <TextInput
        value={searchInput}
        onChangeText={handleSearchInput}
        style={styles.searchInput}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        placeholderTextColor={COLOR_STYLES.TEXT_PLACEHOLDER}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SEARCH_STYLES.HEIGHT,
    marginHorizontal: LAYOUT_STYLES.SPACING_UNIT,
    paddingHorizontal: LAYOUT_STYLES.SPACING_UNIT,
    backgroundColor: COLOR_STYLES.BACKGROUND_LIGHT,
    borderRadius: SEARCH_STYLES.BORDER_RADIUS_FULL,
  },
  searchInput: {
    flex: 1,
    marginLeft: LAYOUT_STYLES.SPACING_UNIT,
    fontSize: LAYOUT_STYLES.FONT_SIZE,
    color: COLOR_STYLES.TEXT_PRIMARY,
  },
});
