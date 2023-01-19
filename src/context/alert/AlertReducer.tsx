const alertReducer = (
  state: { msg: string; type: string } | null,
  action: { type: string; payload?: { msg: string; type: string } },
) => {
  switch (action.type) {
    case 'SET_ALERT':
      if (!action.payload) return state;
      return action.payload;
    case 'REMOVE_ALERT':
      return null;
    default:
      return state;
  }
};

export default alertReducer;
