import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import GET_CATEGORY_QUERY from '../graphql/queries/category';
import { colors } from '../utils/constants';

import ProductSearchList from '../components/ProductSearchList';
import Loading from '../components/Loading';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Wrapper = styled.View``;

const FeaturedImage = styled.Image`
  width: 100%;
  height: 250;
`;

const TitleContainer = styled.View`
  width: 100%;
  height: 50;
  justifyContent: center;
  alignItems: center;
`;

const Title = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 18;
  color: ${props => props.theme.DARK};
`;

class CategoryScreen extends Component {
  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  render() {
    const { data } = this.props;

    if (data.loading) return <Loading color={colors.PRIMARY} />;

    return (
      <Root>
        <FeaturedImage source={{ uri: data.getCategory.image }} />
        <Wrapper>
          <TitleContainer>
            <Title>
              {data.getCategory.name}
            </Title>
          </TitleContainer>
          <ProductSearchList
            data={{
              products: data.getCategory.products,
              loading: data.loading,
            }}
            productPressed={this._handleProductPressed}
          />
        </Wrapper>
      </Root>
    );
  }
}

export default graphql(GET_CATEGORY_QUERY, {
  options: ({ navigation: { state: { params: { _id } } } }) => ({
    variables: {
      _id,
    },
  }),
})(CategoryScreen);
