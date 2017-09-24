import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AppLoading } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { colors, fonts, images } from './src/utils/constants';
import { cacheFonts, cacheImages } from './src/utils/caches';
import { store, client } from './src/store';
import { login } from './src/actions/user';

import AppNavigator from './src/navigations';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  async componentWillMount() {
    // AsyncStorage.removeItem('@ipeedy');
    await this._checkIfToken();
    await this._loadAssetsAsync();
  }

  _checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@ipeedy');
      if (token != null) {
        store.dispatch(login());
      }
    } catch (error) {
      throw error;
    }
  };

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts(fonts);
    const imageAssets = cacheImages(images);

    await Promise.all([...fontAssets, ...imageAssets]);

    this.setState({ appIsReady: true });
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <ApolloProvider client={client} store={store}>
          <ActionSheetProvider>
            <ThemeProvider theme={colors}>
              <AppNavigator />
            </ThemeProvider>
          </ActionSheetProvider>
        </ApolloProvider>
      );
    }

    return <AppLoading />;
  }
}
