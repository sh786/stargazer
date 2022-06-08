import 'dotenv/config';

export default {
  name: 'stargazer',
  slug: 'stargazer',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/core/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/core/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/core/assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './src/core/assets/favicon.png',
  },
  extra: {
    STARGAZER_API_BASE_URL: process.env.STARGAZER_API_BASE_URL,
    GITHUB_API_BASE_URL: process.env.GITHUB_API_BASE_URL,
  },
};
