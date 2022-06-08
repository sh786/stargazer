import { AxiosPromise } from 'axios';

import { axiosStargazer, axiosGithub } from '@/core/api';
import {
  AddFavoriteRepoPayload,
  FavoriteRepoResponse,
  FavoriteReposResponse,
  GithubRepoSearchResponse,
} from '@/features/FavoriteRepos/types';

export const getFavoriteRepos = (
  controller?: AbortController
): AxiosPromise<FavoriteReposResponse> =>
  axiosStargazer.get('repo/', {
    signal: controller?.signal,
  });

export const removeFavoriteRepoById = (id: string): AxiosPromise<undefined> =>
  axiosStargazer.delete(`repo/${id}`);

export const addFavoriteRepo = ({
  id,
  fullName,
  stargazersCount,
  language,
  url,
}: AddFavoriteRepoPayload): AxiosPromise<FavoriteRepoResponse> =>
  axiosStargazer.post(`repo/`, {
    id,
    fullName,
    stargazersCount,
    language,
    url,
    createdAt: new Date().toISOString(),
  });

export const searchGithubRepos = (
  searchQuery: string = ''
): AxiosPromise<GithubRepoSearchResponse> =>
  axiosGithub.get(`search/repositories?q=${encodeURIComponent(searchQuery)}&per_page=10`);
