const initialState = {
  isAuthenticated: false,
  info: null,
  fetchingLocation: false,
  error: null,
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
        info: {
          ...state.info,
          ...action.info,
        },
      };
    case 'UPDATE_USER_LOCATION':
      return {
        ...state,
        fetchingLocation: true,
        error: null,
      };
    case 'UPDATE_USER_LOCATION_SUCCESSED':
      return {
        ...state,
        fetchingLocation: false,
        error: null,
        info: {
          ...state.info,
          location: action.payload.location,
        },
      };
    case 'UPDATE_USER_LOCATION_FAILED':
      return {
        ...state,
        fetchingLocation: false,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
