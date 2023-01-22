export interface GithubReposResponseType {
  id: number;
  name: string;
  description: string;
  html_url: string;
  forks: number;
  open_issues: number;
  watchers_count: number;
  stargazers_count: number;
}

export interface GithubResponseType {
  id: number;
  name: string;
  type: string;
  avatar_url: string;
  location: string;
  bio: string;
  blog: string;
  twitter_username: string;
  login: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  hireable: boolean;
}
const githubReducer = (
  state: {
    repos: GithubReposResponseType[];
    user: GithubResponseType;
    users: GithubResponseType[];
    loading: boolean;
  },
  action: {
    type: string;
    payload?: GithubResponseType[] | { user: GithubResponseType; repos: GithubReposResponseType[] };
  },
) => {
  switch (action.type) {
    case 'GET_USERS':
      if (!action.payload) return state;
      return {
        ...state,
        users: action.payload as GithubResponseType[],
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [] as GithubResponseType[],
      };
    case 'GET_USER_AND_REPOS':
      if (!action.payload) return state;
      if ('user' in action.payload)
        return {
          ...state,
          user: action.payload.user,
          repos: action.payload.repos,
          loading: false,
        };
      return state;
    default:
      return state;
  }
};

export default githubReducer;
