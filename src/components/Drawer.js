import React, { Component } from 'react';
import styled from 'styled-components/native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import PhoneNumber from 'awesome-phonenumber';
import Touchable from '@appandflow/touchable';
import { LinearGradient } from 'expo';

import { colors } from '../utils/constants';

import Loading from '../components/Loading';
import { Title, Subtitle } from './typography';

const AVATAR_SIZE = 60;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`flex: 1;`;

const HeaderContainer = styled(Touchable).attrs({
  feedback: 'none',
})`
  flex: 2;
  background-color: ${props => props.theme.SECONDARY_A};
  justifyContent: flex-end;
`;

const InfoContainer = styled.View`
  width: 100%;
  paddingHorizontal: 8%;
  paddingVertical: 8%;
  flexDirection: row;
  alignItems: center;
`;

const Avatar = styled.Image`
  width: ${AVATAR_SIZE};
  height: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
  backgroundColor: ${props => props.theme.WHITE};
`;

const MetaContainer = styled.View`
  left: 20;
  paddingVertical: 10;
`;

const MenuContainer = styled.View`
  flex: 8;
  backgroundColor: ${props => props.theme.WHITE};
`;

class Drawer extends Component {
  _formattedPhoneNumber(phone) {
    return PhoneNumber(phone, 'VN').getNumber('international');
  }

  _renderInfo = () => {
    if (!this.props.info) return <Loading size="small" />;
    return (
      <InfoContainer>
        <Avatar
          source={{
            uri: this.props.info.avatar || 'https://i.imgur.com/MnRjDje.jpg',
          }}
        />
        <MetaContainer>
          <Title medium bright>
            {this.props.info.name || 'Alexandra User'}
          </Title>
          <Subtitle bright>
            {this.props.info.phone
              ? this._formattedPhoneNumber(this.props.info.phone)
              : '0912 345 678'}
          </Subtitle>
        </MetaContainer>
      </InfoContainer>
    );
  };

  render() {
    return (
      <Root>
        <HeaderContainer
          onPress={() =>
            this.props.screenProps.rootNavigation.navigate('Profile')}
        >
          <LinearGradient colors={[colors.SECONDARY_A, colors.PRIMARY]}>
            {this._renderInfo()}
          </LinearGradient>
        </HeaderContainer>
        <MenuContainer>
          <DrawerItems {...this.props} />
        </MenuContainer>
      </Root>
    );
  }
}

export default connect(state => ({ info: state.user.info }))(Drawer);
