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

export const getUser = async (login: string) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    redirect('/notfound');
  } else {
    const data: GithubResponseType = await response.json();
    return data;
  }
};
export const getUserRepos = async (login: string) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '20',
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const data: GithubReposResponseType[] = await response.json();
  return data;
};
