import AWS3_CREDENTIALS from './aws3-credentials.json';

export const colors = {
  PRIMARY: '#AD6CD3',
  SECONDARY_A: '#EF59BA',
  SECONDARY_B: '#FFAEF3',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  DARK: '#282828',
  LIGHT: '#ECEFF1',
  SILVER: '#BDC3C7',
};

export const fonts = [
  {
    'quicksand-bold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'quicksand-light': require('../../assets/fonts/Quicksand-Light.ttf'),
    'quicksand-medium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'quicksand-regular': require('../../assets/fonts/Quicksand-Regular.ttf'),
  },
];

export const images = [
  require('../../assets/images/ipeedy-mark.png'),
  require('../../assets/images/ipeedy-text.png'),
  require('../../assets/images/no-image.png'),
];

export const constants = {
  GRAPHQL_URL: `http://localhost:3000/graphql`,
  DIRECTION_API_URL: 'https://maps.googleapis.com/maps/api/directions/json?',
  DIRECTION_API_KEY: 'AIzaSyDnZjKlct29gM6xqgYqH-ITNw2CpsIOyig',
};

export const icons = {
  MENU: 'ios-menu-outline',
  BACK: 'ios-arrow-round-back-outline',
  NEXT: 'ios-arrow-round-forward-outline',
  EXPLORE: 'ios-map-outline',
  FAVORITES: 'ios-heart-outline',
  HEART: 'heart',
  TIME: 'ios-time-outline',
  PIN: 'ios-pin-outline',
  BASKET: 'ios-basket-outline',
  CHECKMARK: 'ios-checkmark-circle-outline',
  OPTIONS: 'ios-options-outline',
  SETTINGS: 'ios-settings-outline',
  TRASH: 'ios-trash-outline',
  NOTIFICATION: 'ios-notifications-outline',
  PAUSE: 'ios-pause-outline',
  YOURPRODUCTS: 'ios-list-box-outline',
  PROFILE: 'ios-contact-outline',
  INFO: 'ios-information-circle-outline',
  CART: 'ios-cart-outline',
  ADD: 'ios-add',
  SHARE: 'share-google',
  CASH: 'ios-cash-outline',
  REFRESH: 'ios-refresh-circle-outline',
  BEER: 'ios-beer-outline',
  EDIT: 'ios-create-outline',
  DONE: 'ios-checkmark',
  PRICE: 'ios-pricetags-outline',
  PENCIL: 'pencil',
  CLOSE: 'ios-close-outline',
  IMAGES: 'ios-images-outline',
  MESSAGE: 'ios-chatbubbles-outline',
  CALL: 'ios-call-outline',
  NAVIGATE: 'ios-navigate-outline',
  CATEGORY: 'ios-archive-outline',
  SEARCH: 'ios-search-outline',
};

export const aws3Options = {
  keyPrefix: 'uploads/',
  bucket: 'ipeedy',
  region: 'ap-southeast-1',
  accessKey: AWS3_CREDENTIALS.ACCESS_KEY,
  secretKey: AWS3_CREDENTIALS.SECRET_KEY,
  successActionStatus: 201,
};
