import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Touchable from '@appandflow/touchable';

import GET_PRODUCTS_QUERY from '../graphql/queries/products';
import GET_NEARBY_PRODUCTS_QUERY from '../graphql/queries/nearbyProducts';
import GET_MOST_FAV_PRODUCTS_QUERY from '../graphql/queries/mostFavProducts';

import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';
import Snackbar from '../components/Snackbar';
import { CARD_WIDTH as CATEGORY_CARD_WIDTH } from '../components/CategoryCard';
import { CARD_WIDTH as PRODUCT_CARD_WIDTH } from '../components/ProductCard';

const DISTANCE = 2000;

const Root = styled.ScrollView`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Header = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flexDirection: row;
  justifyContent: space-between;
  paddingHorizontal: 15px;
  height: 40px;
  alignItems: center;
`;

const CategoriesContainer = styled.View`
  width: 100%;
  height: ${CATEGORY_CARD_WIDTH + 20};
  marginTop: 20px;
`;

const ProductsContainer = styled(CategoriesContainer)`
  height: ${PRODUCT_CARD_WIDTH + 30};
`;

const FeaturedContainer = styled(CategoriesContainer)`
  height: ${PRODUCT_CARD_WIDTH * 2 - 50};
`;

const BottomContainer = styled(CategoriesContainer)`
  height: ${PRODUCT_CARD_WIDTH / 5};
`;

const Title = styled.Text`
  fontFamily: 'quicksand-medium';
  fontSize: 18;
  color: ${props => props.theme.DARK};
`;

const More = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 14;
  color: ${props => props.theme.DARK};
`;

class ExploreProductsScreen extends Component {
  state = {};

  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  _handleCategoryPressed = _id => {
    this.props.navigation.navigate('Category', { _id });
  };

  _renderNotification = () => {
    if (this.props.noti.message) {
      if (this.props.noti.error) {
        return <Snackbar message={this.props.noti.message} secondary />;
      }
      return <Snackbar message={this.props.noti.message} />;
    }
  }

  render() {
    return (
      <Root>
        {this._renderNotification()}
        <CategoriesContainer>
          <Header>
            <Title>Explore Ipeedy</Title>
          </Header>
          <CategoryList onSelect={this._handleCategoryPressed} />
        </CategoriesContainer>
        <ProductsContainer>
          <Header>
            <Title>Near you</Title>
            <More>See all ></More>
          </Header>
          <ProductList
            _ref={c => {
              this.list = c;
            }}
            productPressed={this._handleProductPressed}
            showCategory
            data={{
              products: this.props.nearByProducts.getNearbyProducts,
              loading: this.props.nearByProducts.loading,
            }}
          />
        </ProductsContainer>
        <FeaturedContainer>
          <Header>
            <Title>Featured</Title>
            <More>See all ></More>
          </Header>
          <ProductList
            _ref={c => {
              this.newestList = c;
            }}
            productPressed={this._handleProductPressed}
            showCategory
            featured
            data={{
              products: this.props.mostFavProducts.getMostFavProducts,
              loading: this.props.mostFavProducts.loading,
            }}
          />
        </FeaturedContainer>
        <ProductsContainer>
          <Header>
            <Title>Recently</Title>
            <More>See all ></More>
          </Header>
          <ProductList
            _ref={c => {
              this.newestList = c;
            }}
            productPressed={this._handleProductPressed}
            showCategory
            data={{
              products: this.props.newestProducts.getProducts,
              loading: this.props.newestProducts.loading,
            }}
          />
        </ProductsContainer>
        <BottomContainer />
      </Root>
    );
  }
}

export default compose(
  connect(state => ({
    user: state.user,
    noti: state.notification,
  })),
  graphql(GET_NEARBY_PRODUCTS_QUERY, {
    options: ({ user: { info: { location: { longitude, latitude } } } }) => ({
      variables: {
        longitude,
        latitude,
        distance: DISTANCE,
      },
    }),
    name: 'nearByProducts',
  }),
  graphql(GET_PRODUCTS_QUERY, {
    name: 'newestProducts',
  }),
  graphql(GET_MOST_FAV_PRODUCTS_QUERY, {
    name: 'mostFavProducts',
  }),
)(ExploreProductsScreen);
