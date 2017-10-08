import React, { Component } from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { compose, graphql } from 'react-apollo';

import CREATE_ORDER_MUTATION from '../graphql/mutations/createOrder';
import { createCart } from '../actions/cart';
import { colors, icons } from '../utils/constants';

import CircleButton from '../components/CircleButton';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 70%;
  width: 80%;
  position: relative;
`;

const Title = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-regular';
`;

const InputWrapper = styled.View`
  paddingBottom: 2;
  width: 80%;
  height: 80;
  justifyContent: flex-end;
`;

const AmountWrapper = styled.View`
  width: 50;
  height: 50;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 90;
  right: 0;
`;

const PriceWrapper = styled.View`
  height: 50;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
  position: absolute;
  top: 120;
  right: 15;
`;

const Amount = styled(Title)`
fontFamily: 'quicksand-medium';
fontSize: 25;
`;

const Price = styled(Amount)`
  color: ${props => props.theme.PRIMARY}
`;

class CheckoutScreen extends Component {
  state = {
    error: null,
    loading: false,
    amount: this.props.navigation.state.params.product.orderRange[0],
  };

  _handleNext = async () => {
    const { product } = this.props.navigation.state.params;
    await this.props.mutate({
      variables: {
        product: product._id,
        seller: product.user._id,
        user: this.props.user._id,
        amount: this.state.amount,
      },
    });
    this.props.navigation.navigate('Connecting', {
      product,
      amount: this.state.amount,
      user: product.user,
      actionIcons: [icons.CLOSE, icons.MESSAGE, icons.CALL],
      actionIconSize: [33, 24, 25],
      pressAction: [],
      title: 'Connecting to seller...',
    });
  };

  render() {
    const { product } = this.props.navigation.state.params;

    return (
      <Root>
        <Wrapper>
          <Title>How many products do you want?</Title>
          <InputWrapper>
            <Slider
              maximumValue={product.orderRange[1]}
              step={1}
              minimumValue={product.orderRange[0]}
              maximumTrackTintColor={colors.SILVER}
              minimumTrackTintColor={colors.PRIMARY}
              value={this.state.amount}
              onValueChange={value => this.setState({ amount: value })}
            />
            <AmountWrapper>
              <Amount>
                {this.state.amount}
              </Amount>
            </AmountWrapper>
            <PriceWrapper>
              <Price>
                {` ${this.state.amount * product.price} VNĐ`}
              </Price>
            </PriceWrapper>
          </InputWrapper>
        </Wrapper>
        <CircleButton
          containerStyle={{
            bottom: 30,
            right: 30,
          }}
          loading={this.state.loading}
          onPress={this._handleNext}
        >
          <Ionicons name={icons.DONE} color={colors.WHITE} size={35} />
        </CircleButton>
      </Root>
    );
  }
}

export default compose(
  connect(state => ({ user: state.user.info }), {
    createCart,
  }),
  graphql(CREATE_ORDER_MUTATION),
)(CheckoutScreen);
