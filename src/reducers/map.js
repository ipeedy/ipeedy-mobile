const initialState = {
  latitude: null,
  longitude: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_REGION': {
      return {
        ...state,
        ...action.region,
      };
    }
    default:
      return state;
  }
};
