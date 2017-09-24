import React, { Component } from 'react';
import styled from 'styled-components/native';
import PhoneNumber from 'awesome-phonenumber';

import { icons } from '../utils/constants';

import Connecting from '../components/Connecting';
import ActionButton from '../components/ActionButton';
import ProductCard from '../components/ProductCard';

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

const Username = styled.Text`
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-medium';
  fontSize: 18;
`;

const Phone = styled.Text`
  color: ${props => props.theme.DARK};
  fontFamily: 'quicksand-regular';
  fontSize: 14;
`;

const Title = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-regular';
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
    const { product, amount } = this.props.navigation.state.params;

    return (
      <Root>
        <Wrapper>
          <Title>Connecting to seller...</Title>
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
              <Connecting avatar={product.user.avatar} />
            </AvatarWrapper>
            <UserInfoContainer>
              <Username>
                {product.user.name}
              </Username>
              <Phone>
                {PhoneNumber(product.user.phone, 'VN').getNumber(
                  'international',
                )}
              </Phone>
            </UserInfoContainer>
          </UserContainer>
        </Wrapper>
        <ActionButtonContainer>
          <ActionButton
            actionIcons={[icons.CLOSE, icons.MESSAGE, icons.CALL]}
            actionIconSize={[33, 24, 25]}
          />
        </ActionButtonContainer>
      </Root>
    );
  }
}

export default ConnectingScreen;
