import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import githubReducer, { GithubReposResponseType, GithubResponseType } from './GithubReducer';

interface GithubProviderType {
  children: ReactNode;
}

interface GithubContextType {
  user: GithubResponseType;
  users: GithubResponseType[];
  loading: boolean;
  repos: GithubReposResponseType[];
  dispatch: Dispatch<{
    type: string;
    payload?: GithubResponseType[] | GithubResponseType | GithubReposResponseType[] | undefined;
  }>;
}

const GithubContext = createContext<GithubContextType>({} as GithubContextType);

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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
