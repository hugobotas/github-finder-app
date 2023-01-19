import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import githubReducer, { GithubResponseType } from './GithubReducer';

interface GithubProviderType {
  children: ReactNode;
}
interface GithubContextType {
  users: { id: number; login: string; avatar_url: string }[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
  dispatch: Dispatch<{ type: string; payload?: GithubResponseType[] | undefined }>;
}

const GithubContext = createContext<GithubContextType>({} as GithubContextType);

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderType) => {
  const initialState: {
    users: { id: number; login: string; avatar_url: string }[];
    loading: boolean;
  } = {
    users: [],
    loading: false,
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
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
