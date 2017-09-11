import { combineReducers } from 'redux';

import nav from './navigation';
import user from './user';
import productForm from './productForm';

export default client =>
  combineReducers({
    apollo: client.reducer(),
    nav,
    user,
    productForm,
  });
