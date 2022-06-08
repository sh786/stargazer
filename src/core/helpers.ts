import * as WebBrowser from 'expo-web-browser';

export const handleLink = (url: string) => {
  WebBrowser.openBrowserAsync(url);
};
