import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import slug from 'slug';
import shortid from 'shortid';

import { icons, colors } from '../../utils/constants';
import { getInput, clearInput } from '../../actions/product';

import Snackbar from '../../components/Snackbar';
import CircleButton from '../../components/CircleButton';

import CREATE_PRODUCT_MUTATION from '../../graphql/mutations/createProduct';
import GET_NEARBY_PRODUCTS_QUERY from '../../graphql/queries/nearbyProducts';

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
      input: { name, description, price, availableCount },
      user,
    } = this.props;
    await this.props.mutate({
      variables: {
        name,
        description,
        price,
        availableCount,
        geometry: {
          coordinates: [user.location.longitude, user.location.latitude],
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createProduct: {
          __typename: 'Product',
          _id: Math.round(Math.random() * -1000000),
          name,
          slug: slug(`${name.toLowerCase()}${shortid.generate()}`),
          description,
          availableCount,
          reviews: [],
          soldCount: 0,
          images: [],
          user: {
            __typename: 'User',
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
          },
          price,
          geometry: {
            __typename: 'Geometry',
            coordinates: [user.location.longitude, user.location.latitude],
          },
          createdAt: new Date(),
          favoriteCount: 0,
        },
      },
      update: (store, { data: { createProduct } }) => {
        const data = store.readQuery({
          query: GET_NEARBY_PRODUCTS_QUERY,
          variables: {
            latitude: user.location.latitude,
            longitude: user.location.longitude,
            distance: 10000000,
          },
        });
        if (!data.getNearbyProducts.find(t => t._id === createProduct._id)) {
          store.writeQuery({
            query: GET_NEARBY_PRODUCTS_QUERY,
            data: {
              getNearbyProducts: [
                {
                  __typename: 'ProductWithDistance',
                  obj: createProduct,
                  dis: 0,
                },
              ],
            },
          });
        }
      },
    });
    this.setState({ loading: false });
    this.props.clearInput();
    this.props.navigation.navigate('Explore');
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
