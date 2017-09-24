import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { graphql } from 'react-apollo';

import GET_PRODUCTS_QUERY from '../graphql/queries/products';
import { colors, icons } from '../utils/constants';

import ProductSearchList from '../components/ProductSearchList';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const SearchWrapper = styled.View`
  paddingHorizontal: 15px;
  paddingTop: 20px;
  height: 70px;
`;

const ResultWrapper = styled.View``;

const SearchInput = styled.TextInput`
  fontFamily: 'quicksand-medium';
  fontSize: 20;
  color: ${props => props.theme.PRIMARY};
`;

const SearchContainer = styled.View`
  width: 100%;
  flex: 1;
`;

const SuggestionWrapper = styled.View`paddingHorizontal: 15px;`;

const SuggestionButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flexDirection: row;
  alignItems: center;
  height: 40px;
`;

const Suggestion = styled.View`
  borderBottomWidth: 1;
  borderBottomColor: ${props => props.theme.LIGHT};
`;

const SuggestionIcon = styled.View`
  width: 25;
  justifyContent: center;
  alignItems: center;
`;

const Text = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 15;
  left: 10px;
  color: ${props => props.theme.DARK};
`;

class SearchScreen extends Component {
  state = {
    value: '',
  };

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  _handleSearch = value => {
    this.setState({ value });
  };

  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  render() {
    return (
      <Root>
        <SearchWrapper>
          <SearchInput
            autoCapitalize="none"
            autoFocus
            maxLength={30}
            onChangeText={this._handleSearch}
            placeholder="What do you need?"
            placeholderTextColor={colors.LIGHT}
            underlineColorAndroid="transparent"
            selectionColor={colors.PRIMARY}
          />
        </SearchWrapper>
        <SearchContainer>
          <SuggestionWrapper>
            <Suggestion>
              <SuggestionButton>
                <SuggestionIcon>
                  <Ionicons name={icons.PIN} color={colors.DARK} size={16} />
                </SuggestionIcon>
                <Text>Nearby</Text>
              </SuggestionButton>
            </Suggestion>
            <Suggestion>
              <SuggestionButton>
                <SuggestionIcon>
                  <Ionicons
                    name={icons.FAVORITES}
                    color={colors.DARK}
                    size={16}
                  />
                </SuggestionIcon>
                <Text>Featured</Text>
              </SuggestionButton>
            </Suggestion>
          </SuggestionWrapper>
          <ResultWrapper>
            <ProductSearchList
              data={{
                products: this.props.data.getProducts,
                loading: this.props.data.loading,
              }}
              productPressed={this._handleProductPressed}
            />
          </ResultWrapper>
        </SearchContainer>
      </Root>
    );
  }
}

export default graphql(GET_PRODUCTS_QUERY)(SearchScreen);
