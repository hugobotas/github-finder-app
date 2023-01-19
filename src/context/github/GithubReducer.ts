export interface GithubReposResponseType {
  name: string;
  description: string;
  html_url: string;
  forks: string;
  open_issues: string;
  watchers_count: string;
  stargazers_count: string;
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
  followers: string;
  following: string;
  public_repos: string;
  public_gists: string;
  hireable: string;
}
const githubReducer = (
  state: { user: GithubResponseType; users: GithubResponseType[]; loading: boolean },
  action: {
    type: string;
    payload?: GithubResponseType[] | GithubResponseType;
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
    case 'GET_USER':
      if (!action.payload) return state;
      return {
        ...state,
        user: action.payload as GithubResponseType,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
