const initialState = {
  form: {
    name: '',
    description: '',
    price: '',
    availableCount: 30,
    orderRange: [1, 10],
    images: [],
    category: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
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
