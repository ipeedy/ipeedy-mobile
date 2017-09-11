const initialState = {
  isAuthenticated: false,
  info: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        info: action.info,
      };
    case 'UPDATE_USER_LOCATION':
      return {
        ...state,
        info: {
          ...state.info,
          location: action.coordinates,
        },
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
