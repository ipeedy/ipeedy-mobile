import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';

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

const Separator = styled.View`
  width: 8;
  height: 100%;
`;

class ProductList extends Component {
  state = {
    selectedProduct: 0,
  };

  _handleScroll = event => {
    LayoutAnimation.linear();
    this.setState({
      selectedProduct: Math.trunc(event.nativeEvent.contentOffset.x / 175),
    });
  };

  render() {
    const { products, productPressed } = this.props;

    return (
      <List
        data={products}
        keyExtractor={item => item.obj._id}
        extraData={this.state.selectedProduct}
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
        ListFooterComponent={() => <Separator />}
        ListHeaderComponent={() => <Separator />}
      />
    );
  }
}

export default connect(state => ({ products: state.product.products }))(
  ProductList,
);
