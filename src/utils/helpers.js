export const getPrice = price => {
  if (price / 1000000 >= 1) {
    return `${price / 1000000}M`;
  } else if (price / 1000 >= 1) {
    return `${price / 1000}K`;
  }
  return `${price}Đ`;
};
