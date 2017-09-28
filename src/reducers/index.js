import { combineReducers } from 'redux';

import nav from './navigation';
import user from './user';
import map from './map';
import product from './product';
import notification from './notification';
import cart from './cart';

export default client =>
  combineReducers({
    apollo: client.reducer(),
    nav,
    user,
    map,
    product,
    cart,
    notification,
  });
