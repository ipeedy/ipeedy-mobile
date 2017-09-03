/* eslint-disable no-param-reassign */

import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { constants } from './utils/constants';

const networkInterface = createNetworkInterface({
  uri: constants.GRAPHQL_URL,
});

networkInterface.use([
  {
    async applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      try {
        const token = await AsyncStorage.getItem('@ipeedy');
        if (token != null) {
          req.options.headers.authorization = `Bearer ${token}` || null;
        }
      } catch (error) {
        throw error;
      }
      return next();
    },
  },
]);

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
