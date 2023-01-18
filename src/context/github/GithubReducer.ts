const githubReducer = (
  state: { users: { id: number; login: string; avatar_url: string }[]; loading: boolean },
  action: { type: string; payload: { id: number; login: string; avatar_url: string }[] },
) => {
  switch (action.type) {
    case 'GET_USERS':
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
