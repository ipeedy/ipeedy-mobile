import React, { Component } from 'react';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import ExploreStack from './ExploreStack';
import FavoritesStack from './FavoritesStack';
import YourProductsStack from './YourProductsStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';

const AppMainNav = DrawerNavigator({
  Explore: {
    screen: ExploreStack,
  },
  Favorites: {
    screen: FavoritesStack,
  },
  YourProducts: {
    screen: YourProductsStack,
  },
  Profile: {
    screen: ProfileStack,
  },
  Settings: {
    screen: SettingsStack,
  },
});

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });

    return <AppMainNav navigation={nav} />;
  }
}

export default connect(state => ({
  nav: state.nav,
}))(AppNavigator);

export const router = AppMainNav.router;
