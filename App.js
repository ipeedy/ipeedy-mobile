import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppLoading } from 'expo';

import { colors, fonts, images } from './src/utils/constants';
import { cacheFonts, cacheImages } from './src/utils/caches';

import Welcome from './src/components/Welcome';

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
        <ThemeProvider theme={colors}>
          <Welcome />
        </ThemeProvider>
      );
    }

    return <AppLoading />
  }
}
