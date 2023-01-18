import { createContext, ReactNode, useState } from 'react';

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
  const [users, setUsers] = useState([] as { id: number; login: string; avatar_url: string }[]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
