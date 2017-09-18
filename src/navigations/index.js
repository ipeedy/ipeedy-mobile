import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';

import AuthenticationStack from './AuthenticationStack';
import AuthenticatedStack from './AuthenticatedStack';

const Root = styled.View`flex: 1;`;

const StatusBarView = styled.View`
  backgroundColor: ${props => props.theme.PRIMARY};
  height: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
`;

class AppNavigator extends Component {
  _renderApp = () => {
    if (!this.props.user.isAuthenticated) return <AuthenticationStack />;
    return <AuthenticatedStack />;
  };

  render() {
    return (
      <Root>
        <StatusBar
          backgroundColor={colors.PRIMARY}
          barStyle="light-content"
          translucent
        />
        <StatusBarView />
        {this._renderApp()}
      </Root>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(AppNavigator);
