import { createContext, ReactNode, useReducer } from 'react';
import githubReducer from './GithubReducer';

interface GithubProviderType {
  children: ReactNode;
}
interface GithubContextType {
  users: { id: number; login: string; avatar_url: string }[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
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
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
