import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

import Drawer from '../components/Drawer';

import ExploreStack from './ExploreStack';
import FavoritesStack from './FavoritesStack';
import YourProductsStack from './YourProductsStack';
import SettingsStack from './SettingsStack';
import ProfileStack from './ProfileStack';
import UpdateInfoStack from './UpdateInfoStack';

export const AppMainNav = DrawerNavigator(
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

export const AppMainNavWithProfile = StackNavigator(
  {
    Main: {
      screen: ({ navigation }) =>
        <AppMainNav screenProps={{ rootNavigation: navigation }} />,
    },
    Profile: {
      screen: ProfileStack,
    },
    UpdateInfo: {
      screen: UpdateInfoStack,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
