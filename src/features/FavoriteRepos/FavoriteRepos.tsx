import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import debounce from 'lodash.debounce';
import { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '@/core/components/Button';
import { COLOR_STYLES, LAYOUT_STYLES } from '@/core/styles/constants';
import { getFavoriteRepos, searchGithubRepos } from '@/features/FavoriteRepos/api';
import ContentView from '@/features/FavoriteRepos/components/ContentView';
import SearchBar from '@/features/FavoriteRepos/components/SearchBar';
import SearchListItem from '@/features/FavoriteRepos/components/SearchListItem';
import { SEARCH_STYLES } from '@/features/FavoriteRepos/components/constants';
import {
  DEBOUNCE_DURATION,
  FAVORITES_LIST_TITLE,
  SEARCH_LIST_TITLE,
} from '@/features/FavoriteRepos/constants';
import { transformGithubRepos } from '@/features/FavoriteRepos/helpers';
import type { FavoriteRepoResponse } from '@/features/FavoriteRepos/types';

export default function FavoriteRepos() {
  // If favoriteRepos was larger, I'd likely store it as a mapped object by id
  // To improve performance of the getIsFavrorited fn
  const [favoriteRepos, setFavoriteRepos] = useState<FavoriteRepoResponse[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<FavoriteRepoResponse[]>([]);
  const [sortIndex, setSortIndex] = useState(0);
  const hasSearchResults = () => searchResults.length > 0;
  const isSortOn = () => sortIndex > 0;

  const getIsFavorited = (id: string) => favoriteRepos.findIndex((fave) => fave.id === id) !== -1;

  const fetchFavoriteRepos = (controller?: AbortController) => {
    getFavoriteRepos(controller)
      .then(({ data }) => {
        const repos = sortRepos(data.repos);
        setFavoriteRepos(repos);
      })
      .catch((_err) => {
        // For purposes of this takehome, not going to handle error states
        // Will treat the same as no results
      });
  };

  // On mount, populate favoriteRepos with data from API
  useEffect(() => {
    const controller = new AbortController();
    fetchFavoriteRepos(controller);

    return () => controller.abort();
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length <= 3) {
        return setSearchResults([]);
      }

      return searchGithubRepos(query)
        .then(({ data }) => {
          setSearchResults(transformGithubRepos(data.items));
        })
        .catch((_err) => {
          // For purposes of this takehome, not going to handle error states
          // Will treat the same as no results
        });
    }, DEBOUNCE_DURATION),
    []
  );

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    debouncedSearch(query);
  };

  const handleSortPress = () => {
    if (sortIndex === 2) {
      return setSortIndex(0);
    }
    setSortIndex(sortIndex + 1);
  };

  const sortRepos = (repos: FavoriteRepoResponse[]) => {
    const sortedFavorites = [...repos];
    if (sortIndex > 0) {
      sortedFavorites.sort((a, b) =>
        sortIndex === 1
          ? b.stargazersCount - a.stargazersCount
          : a.stargazersCount - b.stargazersCount
      );
    }
    return sortedFavorites;
  };

  useEffect(() => {
    const sortedRepos = sortRepos(favoriteRepos);
    setFavoriteRepos(sortedRepos);
  }, [sortIndex]);

  return (
    <View style={styles.container}>
      <SearchBar
        searchInput={searchInput}
        handleSearchInput={handleSearchChange}
        showBackBtn={hasSearchResults()}
        handleBack={() => setSearchResults([])}
      />
      {/* Render Search Results if we have > 0, else render current favorites */}
      {hasSearchResults() ? (
        <ContentView>
          <Text style={styles.title}>{SEARCH_LIST_TITLE}</Text>
          {searchResults.map((item) => (
            <SearchListItem
              item={item}
              isFavorited={getIsFavorited(String(item.id))}
              searchQuery={searchInput}
              updateCallback={fetchFavoriteRepos}
              key={item.id}
            />
          ))}
        </ContentView>
      ) : (
        <ContentView>
          <View style={styles.header}>
            <Text style={styles.title}>{FAVORITES_LIST_TITLE}</Text>
            <View
              style={{
                ...styles.filterWrapper,
                backgroundColor: isSortOn()
                  ? COLOR_STYLES.TEXT_PRIMARY
                  : COLOR_STYLES.BACKGROUND_LIGHT,
              }}>
              <Button onPress={handleSortPress}>
                <Ionicons
                  name="star"
                  size={SEARCH_STYLES.SMALL_ICON_SIZE}
                  color={isSortOn() ? COLOR_STYLES.BACKGROUND_LIGHT : COLOR_STYLES.TEXT_PRIMARY}
                />
                <MaterialCommunityIcons
                  name={sortIndex > 1 ? 'sort-reverse-variant' : 'sort-variant'}
                  size={SEARCH_STYLES.SMALL_ICON_SIZE}
                  color={isSortOn() ? COLOR_STYLES.BACKGROUND_LIGHT : COLOR_STYLES.TEXT_PRIMARY}
                  style={styles.sortIcon}
                />
              </Button>
            </View>
          </View>
          {favoriteRepos.map((item) => (
            <SearchListItem
              item={item}
              isFavorited
              updateCallback={fetchFavoriteRepos}
              key={item.id}
            />
          ))}
        </ContentView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: LAYOUT_STYLES.SPACING_UNIT,
    marginBottom: LAYOUT_STYLES.SPACING_UNIT,
  },
  title: {
    color: COLOR_STYLES.TEXT_PLACEHOLDER,
  },
  filterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: LAYOUT_STYLES.SPACING_UNIT / 1.5,
    borderRadius: 4,
    backgroundColor: COLOR_STYLES.BACKGROUND_LIGHT,
  },
  sortIcon: {
    marginLeft: LAYOUT_STYLES.SPACING_UNIT / 3,
  },
});
