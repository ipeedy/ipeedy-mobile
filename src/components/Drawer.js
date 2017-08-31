import React, { Component } from 'react';
import styled from 'styled-components/native';
import { DrawerItems } from 'react-navigation';

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

const name = 'Quốc Khánh';
const phone = '0917679524';
const image =
  'https://pbs.twimg.com/profile_images/820791841284993024/Z4Y14Iw5_400x400.jpg';

class Drawer extends Component {
  render() {
    return (
      <Root>
        <HeaderContainer>
          <InfoContainer>
            <Avatar source={{ uri: image }} />
            <MetaContainer>
              <Name>
                {name}
              </Name>
              <Phone>
                {phone}
              </Phone>
            </MetaContainer>
          </InfoContainer>
        </HeaderContainer>
        <MenuContainer>
          <DrawerItems {...this.props} />
        </MenuContainer>
      </Root>
    );
  }
}

export default Drawer;
