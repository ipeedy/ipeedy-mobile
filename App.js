import React from 'react';
import { UIManager } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AppLoading } from 'expo';
import { ApolloProvider } from 'react-apollo';

import { colors, fonts, images } from './src/utils/constants';
import { cacheFonts, cacheImages } from './src/utils/caches';
import { store, client } from './src/store';

import Welcome from './src/components/Welcome';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const fontAssets = cacheFonts(fonts);
    const imageAssets = cacheImages(images);

    await Promise.all([
      ...fontAssets,
      ...imageAssets,
    ]);

    this.setState({ appIsReady: true });
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <ApolloProvider client={client} store={store}>
          <ThemeProvider theme={colors}>
            <Welcome />
          </ThemeProvider>
        </ApolloProvider>
      );
    }

    return <AppLoading />
  }
}
