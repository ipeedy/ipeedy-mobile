/* eslint-disable no-param-reassign */

import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { constants } from './utils/constants';

const networkInterface = createNetworkInterface({
  uri: constants.GRAPHQL_URL,
});

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
  connectionParams: {},
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

const networkInterfaceWithSubs = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
