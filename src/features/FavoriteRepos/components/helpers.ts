import { COLOR_STYLES } from '@/core/styles/constants';
import { RepoLanguage } from '@/features/FavoriteRepos/components/types';

export const generateLanguageColor = (language: RepoLanguage): string => {
  switch (language) {
    case 'JavaScript': {
      return '#eeff41';
    }
    case 'TypeScript': {
      return '#448aff';
    }
    case 'C': {
      return '#00e676';
    }
    case 'Swift': {
      return '#ef5350';
    }
    case 'Kotlin': {
      return '#7c4dff';
    }
    default:
      return COLOR_STYLES.TEXT_PLACEHOLDER;
  }
};

export const formatCompactNumber = (num: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};
