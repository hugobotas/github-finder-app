import { redirect } from 'react-router-dom';
import { GithubReposResponseType, GithubResponseType } from './GithubReducer';
import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get<GithubResponseType[]>(`${GITHUB_URL}/search/users?${params}`);
  if ('items' in response.data) return response.data.items;
};

export const getUserAndRepos = async (login: string) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '20',
  });
  const [user, repos] = await Promise.all([
    github.get<GithubResponseType>(`${GITHUB_URL}/users/${login}`),
    github.get<GithubReposResponseType[]>(`${GITHUB_URL}/users/${login}/repos?${params}`),
  ]);
  return { user: user.data, repos: repos.data };
};
