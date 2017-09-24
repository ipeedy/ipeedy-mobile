import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import { icons, colors } from '../../utils/constants';
import { getInput, clearInput } from '../../actions/product';

import Snackbar from '../../components/Snackbar';
import CircleButton from '../../components/CircleButton';

import CREATE_PRODUCT_MUTATION from '../../graphql/mutations/createProduct';

const Root = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding',
})`
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
  flexDirection: row;
  paddingBottom: 2;
  width: 80%;
  height: 50;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.PRIMARY};
  alignItems: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT,
  selectionColor: colors.PRIMARY,
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
  flex: 8;
`;

const CurrencyUnit = styled.Text`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
  flex: 2;
`;

class CreatePriceScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    const {
      input: {
        name,
        description,
        price,
        availableCount,
        orderRange,
        images,
        category,
      },
      user,
    } = this.props;
    await this.props.mutate({
      variables: {
        name,
        description,
        images,
        category,
        price,
        availableCount,
        orderRange,
        geometry: {
          coordinates: [user.location.longitude, user.location.latitude],
        },
      },
    });
    this.props.clearInput();
    this.setState({ loading: false });
    this.props.navigation.navigate('ExploreProducts');
  };

  render() {
    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>How much money do you sell it?</Title>
          <InputWrapper>
            <Input
              placeholder="20000"
              returnKeyType="next"
              maxLength={7}
              autoFocus
              value={this.props.input.price}
              onChangeText={value => this.props.getInput('price', value)}
            />
            <CurrencyUnit>VNĐ</CurrencyUnit>
          </InputWrapper>
          <CircleButton
            disabled={this.props.input.price.replace(/\s/g, '').length < 3}
            loading={this.state.loading}
            onPress={this._handleNext}
          >
            <Ionicons name={icons.NEXT} color={colors.WHITE} size={35} />
          </CircleButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  connect(
    state => ({
      input: state.product.form,
      user: state.user.info,
    }),
    { getInput, clearInput },
  ),
  graphql(CREATE_PRODUCT_MUTATION),
)(CreatePriceScreen);
