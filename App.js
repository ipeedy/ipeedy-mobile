import React from 'react';
import { ThemeProvider } from 'styled-components';

import { colors } from './src/utils/constants';

import Welcome from './src/components/Welcome';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <Welcome />
      </ThemeProvider>
    );
  }
}
