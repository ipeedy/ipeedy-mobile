import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import PhoneNumber from 'awesome-phonenumber';

import { logout } from '../actions/user';

import Loading from '../components/Loading';
import { Subtitle } from '../components/typography';

const AVATAR_SIZE = 55;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const List = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const InfoContainer = styled(Touchable).attrs({
  feedback: 'none',
  native: false,
})`
  width: 100%;
  height: 80;
  paddingHorizontal: 5%;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
  alignSelf: stretch;
`;

const Avatar = styled.Image`
  width: ${AVATAR_SIZE};
  height: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
  backgroundColor: ${props => props.theme.WHITE};
`;

const MetaContainer = styled.View`
  left: 20;
  justifyContent: center;
`;

const ListItem = styled.View`
  height: 44;
  width: 100%;
  alignSelf: stretch;
  borderTopWidth: 1px;
  borderColor: ${props => props.theme.LIGHT};
`;

const ListItemButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flex: 1;
  justifyContent: center;
  paddingHorizontal: 5%;
`;

class SettingsScreen extends Component {
  _handleLogout = () => {
    this.props.client.resetStore();
    return this.props.logout();
  };

  _renderInfo = () => {
    if (!this.props.info) {
      return (
        <InfoContainer>
          <Loading size="small" />
        </InfoContainer>
      );
    }

    return (
      <InfoContainer
        onPress={() =>
          this.props.screenProps.rootNavigation.navigate('Profile')}
      >
        <Avatar
          source={{
            uri: this.props.info.avatar || 'https://i.imgur.com/MnRjDje.jpg',
          }}
        />
        <MetaContainer>
          <Subtitle medium>
            {this.props.info.name || 'Alexandra User'}
          </Subtitle>
          <Subtitle>
            {PhoneNumber(this.props.info.phone, 'VN').getNumber(
              'international',
            )}
          </Subtitle>
        </MetaContainer>
      </InfoContainer>
    );
  };

  render() {
    return (
      <Root>
        <List>
          {this._renderInfo()}
          <ListItem>
            <ListItemButton>
              <Subtitle>Privacy Settings</Subtitle>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onPress={this._handleLogout}>
              <Subtitle>Sign Out</Subtitle>
            </ListItemButton>
          </ListItem>
        </List>
      </Root>
    );
  }
}

export default withApollo(
  connect(state => ({ info: state.user.info }), { logout })(SettingsScreen),
);
