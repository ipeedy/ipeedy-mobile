const initialState = {
  error: false,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return {
        error: action.payload.error,
        message: action.payload.message,
      };
    case 'DELETE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};
