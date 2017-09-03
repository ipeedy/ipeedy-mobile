import React, { Component } from 'react';
import styled from 'styled-components/native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import PhoneNumber from 'awesome-phonenumber';

import Loading from '../components/Loading';

const AVATAR_SIZE = 70;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`flex: 1;`;

const HeaderContainer = styled.View`
  flex: 3.5;
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: flex-end;
`;

const InfoContainer = styled.View`
  width: 100%;
  height: 50%;
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

const Name = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 18;
  color: ${props => props.theme.WHITE};
  backgroundColor: transparent;
`;

const Phone = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 15;
  color: ${props => props.theme.LIGHT};
  backgroundColor: transparent;
`;

const MenuContainer = styled.View`
  flex: 6.5;
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
            uri: this.props.info.image || 'https://i.imgur.com/MnRjDje.jpg',
          }}
        />
        <MetaContainer>
          <Name>
            {this.props.info.name || 'Alexandra User'}
          </Name>
          <Phone>
            {this._formattedPhoneNumber(this.props.info.phone)}
          </Phone>
        </MetaContainer>
      </InfoContainer>
    );
  };

  render() {
    return (
      <Root>
        <HeaderContainer>
          {this._renderInfo()}
        </HeaderContainer>
        <MenuContainer>
          <DrawerItems {...this.props} />
        </MenuContainer>
      </Root>
    );
  }
}

export default connect(state => ({ info: state.user.info }))(Drawer);
