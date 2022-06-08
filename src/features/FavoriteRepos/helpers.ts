import { FavoriteRepoResponse, GithubRepoItem } from '@/features/FavoriteRepos/types';

export const transformGithubRepos = (repos: GithubRepoItem[]): FavoriteRepoResponse[] =>
  repos.map((repo) => ({
    id: repo.id,
    fullName: repo.full_name,
    name: repo.name,
    author: repo.owner.login,
    stargazersCount: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
  }));
