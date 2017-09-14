import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import ProductCard from './ProductCard';
import Loading from './Loading';

import { colors } from '../utils/constants';

import GET_NEARBY_PRODUCTS_QUERY from '../graphql/queries/nearbyProducts';

const List = styled(FlatList).attrs({
  horizontal: true,
  contentContainerStyle: {
    left: 4,
  },
  snapToInterval: 175,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 1,
})`
  flex: 1;
`;

const ListSpace = styled.View`
  width: 8;
  height: 100%;
`;

class ProductList extends Component {
  state = {
    selectedProduct: 0,
  };

  _handleScroll = event => {
    LayoutAnimation.spring();
    this.setState({
      selectedProduct: Math.trunc(event.nativeEvent.contentOffset.x / 175),
    });
  };

  render() {
    const { data, productPressed } = this.props;

    if (data.loading) return <Loading size="large" color={colors.PRIMARY} />;

    return (
      <List
        data={data.getNearbyProducts}
        keyExtractor={item => item.obj._id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.props.animation,
                },
              },
            },
          ],
          {
            listener: this._handleScroll,
          },
        )}
        renderItem={({ item, index }) =>
          <ProductCard
            product={{ ...item.obj, dis: item.dis }}
            selected={this.state.selectedProduct === index}
            onPress={productPressed}
          />}
        ListFooterComponent={() => <ListSpace />}
        ListHeaderComponent={() => <ListSpace />}
      />
    );
  }
}

export default graphql(GET_NEARBY_PRODUCTS_QUERY)(ProductList);