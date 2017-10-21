import React, { Component } from 'react';
import styled from 'styled-components/native';
import PhoneNumber from 'awesome-phonenumber';

import Connecting from '../components/Connecting';
import ActionButton from '../components/ActionButton';
import ProductCard from '../components/ProductCard';
import { Title, Subtitle } from '../components/typography';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Wrapper = styled.View`
  height: 70%;
  width: 80%;
  position: relative;
`;

const UserContainer = styled.View`
  height: 70;
  width: 100%;
  top: 20px;
  alignItems: center;
  overflow: visible;
  flexDirection: row;
`;

const ProductContainer = styled.View`
  height: 150;
  width: 100%;
  marginTop: 110px;
  marginLeft: 70px;
  position: absolute;
`;

const AvatarWrapper = styled.View`
  width: 50;
  height: 50;
  overflow: visible;
  justifyContent: center;
  alignItems: center;
`;

const UserInfoContainer = styled.View`
  justifyContent: space-around;
  paddingLeft: 20px;
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  overflow: visible;
  bottom: 20;
  right: 20;
`;

class ConnectingScreen extends Component {
  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  render() {
    const {
      product,
      amount,
      user,
      title,
      actionIcons,
      actionIconSize,
      pressAction,
    } = this.props.navigation.state.params;

    return (
      <Root>
        <Wrapper>
          <Title large numberOfLines={2}>
            {title}
          </Title>
          <ProductContainer>
            <ProductCard
              product={product}
              onPress={this._handleProductPressed}
              showCategory
              amount={amount}
              hideReviews
              width={170}
              height={150}
            />
          </ProductContainer>
          <UserContainer>
            <AvatarWrapper>
              <Connecting avatar={user.avatar} />
            </AvatarWrapper>
            <UserInfoContainer>
              <Title primary medium>
                {user.name}
              </Title>
              <Subtitle>
                {PhoneNumber(user.phone, 'VN').getNumber('international')}
              </Subtitle>
            </UserInfoContainer>
          </UserContainer>
        </Wrapper>
        <ActionButtonContainer>
          <ActionButton
            actionIcons={actionIcons}
            actionIconSize={actionIconSize}
            pressAction={pressAction}
          />
        </ActionButtonContainer>
      </Root>
    );
  }
}

export default ConnectingScreen;
