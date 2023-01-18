interface GithubResponseType {
  id: number;
  login: string;
  avatar_url: string;
}
const githubReducer = (
  state: { users: GithubResponseType[]; loading: boolean },
  action: {
    type: string;
    payload?: GithubResponseType[];
  },
) => {
  switch (action.type) {
    case 'GET_USERS':
      if (!action.payload) return state;
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
