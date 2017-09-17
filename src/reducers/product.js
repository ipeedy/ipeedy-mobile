const initialState = {
  products: [],
  form: {
    name: '',
    description: '',
    price: '',
    availableCount: 30,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload.getNearbyProducts,
      };
    case 'GET_INPUT':
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.type]: action.payload.value,
        },
      };
    case 'CLEAR_INPUT':
      return {
        ...state,
        form: initialState.form,
      };
    default:
      return state;
  }
};
