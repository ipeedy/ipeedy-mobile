const initialState = {
  product: null,
  amount: 0,
  createdAt: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CART':
      return {
        product: action.payload.product,
        amount: action.payload.amount,
        createdAt: new Date().valueOf(),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};
