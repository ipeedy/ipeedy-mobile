export function getInput(type, value) {
  return {
    type: 'GET_INPUT',
    payload: {
      type,
      value,
    },
  };
}

export function clearInput() {
  return {
    type: 'CLEAR_INPUT',
  };
}

export function fetchProducts(payload) {
  return {
    type: 'FETCH_PRODUCTS',
    payload,
  };
}
