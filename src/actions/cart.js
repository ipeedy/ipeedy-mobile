export function createCart({ product, amount }) {
  return {
    type: 'CREATE_CART',
    payload: {
      product,
      amount,
    },
  };
}

export function clearCart() {
  return {
    type: 'CLEAR_CART',
  };
}
