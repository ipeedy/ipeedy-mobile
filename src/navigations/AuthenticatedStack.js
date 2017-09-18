import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { graphql, compose } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ME_QUERY from '../graphql/queries/me';
import { getUserInfo, updateUserLocation } from '../actions/user';

import Loading from '../components/Loading';

import { AppMainNavWithProfile } from './AppMainNav';

class AuthenticatedStack extends Component {
  state = {
    gotUserInfo: false,
  };

  componentDidMount() {
    this.props.updateUserLocation();
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.gotUserInfo &&
      !nextProps.data.loading &&
      typeof nextProps.data.me !== 'undefined'
    ) {
      this.props.getUserInfo(nextProps.data.me);
      this.setState({ gotUserInfo: true });
    }
  }

  render() {
    if (
      this.props.data.loading ||
      (!this.props.user.info ||
        (this.props.user.info && !this.props.user.info.location)) ||
      !this.state.gotUserInfo
    )
      return <Loading />;
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    return <AppMainNavWithProfile navigation={nav} />;
  }
}

export default compose(
  connect(
    state => ({
      user: state.user,
      nav: state.nav,
    }),
    dispatch =>
      Object.assign(
        { dispatch },
        bindActionCreators({ getUserInfo, updateUserLocation }, dispatch),
      ),
  ),
  graphql(ME_QUERY),
)(AuthenticatedStack);

export const router = AppMainNavWithProfile.router;
