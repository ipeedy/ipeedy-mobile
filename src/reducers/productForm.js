const initialState = {
  name: '',
  description: '',
  price: '',
  availableCount: 30,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_INPUT':
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };
    case 'CLEAR_INPUT':
      return initialState;
    default:
      return state;
  }
};
