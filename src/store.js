import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { constants } from './utils/constants';

const networkInterface = createNetworkInterface({
  uri: constants.GRAPHQL_URL,
});

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
