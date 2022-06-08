export interface AddFavoriteRepoPayload {
  id: string | number;
  fullName: string;
  stargazersCount: number;
  language: string;
  url: string;
  author?: string;
  name?: string;
}

export interface FavoriteRepoResponse extends AddFavoriteRepoPayload {
  createdAt?: string;
}

export interface FavoriteReposResponse {
  repos: FavoriteRepoResponse[];
}

export interface GithubRepoItem {
  id: number;
  full_name: string;
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface GithubRepoSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepoItem[];
}
