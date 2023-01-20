import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import githubReducer, { GithubReposResponseType, GithubResponseType } from './GithubReducer';
import { redirect } from 'react-router-dom';

interface GithubProviderType {
  children: ReactNode;
}

interface GithubContextType {
  users: GithubResponseType[];
  repos: GithubReposResponseType[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
  dispatch: Dispatch<{
    type: string;
    payload?: GithubResponseType[] | GithubResponseType | undefined;
  }>;
  user: GithubResponseType;
  getUser: (text: string) => Promise<void>;
  getUserRepos: (login: string) => Promise<void>;
}

const GithubContext = createContext<GithubContextType>({} as GithubContextType);

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderType) => {
  const initialState: {
    user: GithubResponseType;
    users: GithubResponseType[];
    loading: boolean;
    repos: GithubReposResponseType[];
  } = {
    user: {} as GithubResponseType,
    users: [] as GithubResponseType[],
    loading: false,
    repos: [] as GithubReposResponseType[],
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const getUser = async (login: string) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      redirect('/notfound');
    } else {
      const data: GithubResponseType = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getUserRepos = async (login: string) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: '20',
    });

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
        dispatch,
        user: state.user,
        repos: state.repos,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
