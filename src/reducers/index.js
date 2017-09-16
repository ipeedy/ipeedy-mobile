import { combineReducers } from 'redux';

import nav from './navigation';
import user from './user';
import productForm from './productForm';
import map from './map';

export default client =>
  combineReducers({
    apollo: client.reducer(),
    nav,
    user,
    map,
    productForm,
  });
