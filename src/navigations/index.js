import React, { Component } from 'react';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

import Drawer from '../components/Drawer';

import ExploreStack from './ExploreStack';
import FavoritesStack from './FavoritesStack';
import YourProductsStack from './YourProductsStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';

const AppMainNav = DrawerNavigator(
  {
    Explore: {
      screen: ExploreStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.EXPLORE} size={24} />,
      },
    },
    Favorites: {
      screen: FavoritesStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.FAVORITES} size={24} />,
      },
    },
    YourProducts: {
      screen: YourProductsStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.YOURPRODUCTS} size={24} />,
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.PROFILE} size={24} />,
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.SETTINGS} size={24} />,
      },
    },
  },
  {
    contentComponent: props => <Drawer {...props} />,
    contentOptions: {
      labelStyle: {
        fontFamily: 'quicksand-regular',
        fontSize: 17,
      },
      style: {
        marginLeft: 10,
      },
      activeTintColor: colors.PRIMARY,
      activeBackgroundColor: colors.WHITE,
      inactiveTintColor: colors.BLACK,
      inactiveBackgroundColor: colors.WHITE,
    },
  },
);

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
