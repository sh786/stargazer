import axios from 'axios';
import Constants from 'expo-constants';

export const axiosStargazer = axios.create({
  baseURL: Constants.manifest?.extra?.STARGAZER_API_BASE_URL || '',
});

export const axiosGithub = axios.create({
  baseURL: Constants.manifest?.extra?.GITHUB_API_BASE_URL || '',
});
