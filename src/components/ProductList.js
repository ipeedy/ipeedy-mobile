import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import ProductCard, { CARD_WIDTH } from './ProductCard';

const { width } = Dimensions.get('window');

const List = styled(Animated.createAnimatedComponent(FlatList)).attrs({
  horizontal: true,
  contentContainerStyle: {
    left: 4,
  },
  snapToInterval: CARD_WIDTH,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 1,
})`
  flex: 1;
`;

const ListSeparator = styled.View`
  width: 8;
  height: 100%;
`;

const ListFooter = styled.View`
  width: ${width - CARD_WIDTH};
  height: 100%;
`;

class ProductList extends Component {
  state = {
    selectedProduct: 0,
  };

  _handleScroll = event => {
    LayoutAnimation.linear();
    this.setState({
      selectedProduct: Math.trunc(
        event.nativeEvent.contentOffset.x / CARD_WIDTH,
      ),
    });
  };

  render() {
    const { products, productPressed } = this.props;

    return (
      <List
        data={products}
        keyExtractor={item => item.obj._id}
        extraData={this.state.selectedProduct}
        snapToInterval={CARD_WIDTH}
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
            useNativeDriver: true,
            listener: this._handleScroll,
          },
        )}
        renderItem={({ item, index }) =>
          <ProductCard
            product={{ ...item.obj, dis: item.dis }}
            selected={this.state.selectedProduct === index}
            onPress={productPressed}
          />}
        ListFooterComponent={() => <ListFooter />}
        ListHeaderComponent={() => <ListSeparator />}
      />
    );
  }
}

export default connect(state => ({ products: state.product.products }))(
  ProductList,
);
