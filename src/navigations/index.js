import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  addNavigationHelpers,
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, withApollo, compose } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';
import ME_QUERY from '../graphql/queries/me';
import { getUserInfo, updateUserLocation } from '../actions/user';

import Drawer from '../components/Drawer';
import Loading from '../components/Loading';

import AuthenticationStack from './AuthenticationStack';
import ExploreStack from './ExploreStack';
import FavoritesStack from './FavoritesStack';
import YourProductsStack from './YourProductsStack';
import SettingsStack from './SettingsStack';
import ProfileStack from './ProfileStack';
import UpdateInfoStack from './UpdateInfoStack';

const Root = styled.View`flex: 1;`;

const StatusBarView = styled.View`
  backgroundColor: ${props => props.theme.PRIMARY};
  height: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
`;

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
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.SETTINGS} size={24} />,
      },
    },
  },
  {
    initialRouteName: 'Explore',
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

const AppMainNavWithProfile = StackNavigator(
  {
    Main: {
      screen: AppMainNav,
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

class AppNavigator extends Component {
  state = {
    fetchingInfo: false,
  };

  componentDidMount() {
    this._fetchUserInfo();
    this.props.updateUserLocation();
  }

  _fetchUserInfo = async () => {
    this.setState({ fetchingInfo: true });
    if (this.props.user.isAuthenticated) {
      const { data: { me } } = await this.props.client.query({
        query: ME_QUERY,
      });
      if (me) this.props.getUserInfo(me);
    }
    this.setState({ fetchingInfo: false });
  };

  _renderApp = () => {
    if (this.state.fetchingInfo || this.props.user.fetchingLocation)
      return <Loading color={colors.PRIMARY} />;
    const { user } = this.props;
    if (!user.isAuthenticated) return <AuthenticationStack />;
    if (!user.info.name) return <UpdateInfoStack />;
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    return <AppMainNavWithProfile navigation={nav} />;
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

export default withApollo(
  compose(
    connect(
      state => ({
        nav: state.nav,
        user: state.user,
      }),
      dispatch =>
        Object.assign(
          { dispatch },
          bindActionCreators({ getUserInfo, updateUserLocation }, dispatch),
        ),
    ),
    graphql(ME_QUERY),
  )(AppNavigator),
);

export const router = AppMainNavWithProfile.router;
