import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text } from 'react-native';

import BoldedText from '@/core/components/BoldedText';
import Pill from '@/core/components/Pill';
import { handleLink } from '@/core/helpers';
import { COLOR_STYLES, LAYOUT_STYLES } from '@/core/styles/constants';
import { addFavoriteRepo, removeFavoriteRepoById } from '@/features/FavoriteRepos/api';
import { SEARCH_STYLES } from '@/features/FavoriteRepos/components/constants';
import {
  generateLanguageColor,
  formatCompactNumber,
} from '@/features/FavoriteRepos/components/helpers';
import type { FavoriteRepoResponse } from '@/features/FavoriteRepos/types';

interface SearchListItemProps {
  item: FavoriteRepoResponse;
  isFavorited?: boolean;
  searchQuery?: string;
  updateCallback: () => void;
}

export default function SearchListItem({
  item,
  isFavorited,
  searchQuery,
  updateCallback,
}: SearchListItemProps) {
  const handleFavoritePress = () => {
    if (isFavorited) {
      return removeFavoriteRepoById(String(item.id))
        .then(() => {
          updateCallback();
        })
        .catch((_err) => {
          // For purposes of this takehome, not going to handle error states
          // UI update will either happen or not
        });
    }

    return addFavoriteRepo({
      id: String(item.id),
      fullName: item.fullName,
      stargazersCount: item.stargazersCount,
      language: item.language,
      url: item.url,
    })
      .then(() => {
        updateCallback();
      })
      .catch((_err) => {
        // For purposes of this takehome, not going to handle error states
        // UI update will either happen or not
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={isFavorited ? 'heart' : 'heart-outline'}
        size={SEARCH_STYLES.ICON_SIZE}
        color={isFavorited ? COLOR_STYLES.FAVORITE : COLOR_STYLES.TEXT_PRIMARY}
        style={styles.favoriteIcon}
        onPress={handleFavoritePress}
      />
      <View style={styles.textInfoWrapper}>
        {item.author ? (
          <>
            <Text style={styles.repoAuthor}>{item.author}</Text>
            <BoldedText
              style={styles.repoName}
              text={item.name || ''}
              nonBoldedSubstring={searchQuery || ''}
            />
          </>
        ) : (
          <Text style={styles.repoName}>{item.fullName}</Text>
        )}
      </View>
      <View style={styles.visualInfoWrapper}>
        <Pill color={generateLanguageColor(item.language)}>{item.language}</Pill>
        <Ionicons
          name="star"
          size={SEARCH_STYLES.SMALL_ICON_SIZE}
          color={COLOR_STYLES.TEXT_PRIMARY}
          style={styles.icon}
        />
        <Text style={styles.visualItem}>{formatCompactNumber(item.stargazersCount)}</Text>
        <Ionicons
          name="logo-github"
          size={SEARCH_STYLES.ICON_SIZE}
          color={COLOR_STYLES.TEXT_PRIMARY}
          style={styles.icon}
          onPress={() => handleLink(item.url)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_STYLES.BACKGROUND_LIGHT,
    borderBottomColor: COLOR_STYLES.BACKGROUND,
    borderBottomWidth: 1,
    paddingVertical: LAYOUT_STYLES.SPACING_UNIT * 2,
    paddingHorizontal: LAYOUT_STYLES.SPACING_UNIT,
  },
  favoriteIcon: {
    marginRight: LAYOUT_STYLES.SPACING_UNIT,
  },
  textInfoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  repoAuthor: {
    color: COLOR_STYLES.TEXT_PLACEHOLDER,
  },
  repoName: {
    color: COLOR_STYLES.TEXT_PRIMARY,
    fontSize: 14,
  },
  visualInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: LAYOUT_STYLES.SPACING_UNIT / 2,
    color: COLOR_STYLES.TEXT_PRIMARY,
  },
  visualItem: {
    marginLeft: LAYOUT_STYLES.SPACING_UNIT / 4,
    color: COLOR_STYLES.TEXT_PRIMARY,
    fontSize: 12,
  },
});
