import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import ProductCard, { CARD_WIDTH } from './ProductCard';
import ProductListPlaceholder from './ProductListPlaceholder';

const { width } = Dimensions.get('window');

const List = Animated.createAnimatedComponent(FlatList);

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

  componentDidMount() {
    this.props._ref(this);
  }

  _handleScroll = event => {
    LayoutAnimation.linear();
    this.setState({
      selectedProduct: Math.trunc(
        event.nativeEvent.contentOffset.x / CARD_WIDTH,
      ),
    });
  };

  _triggerScrollTo = x => {
    this._flatlist._component._listRef._scrollRef.scrollTo({
      x,
      animated: false,
    });
  };

  render() {
    const {
      data: { loading, products },
      productPressed,
      showCategory,
      showSelected,
      featured,
    } = this.props;

    if (loading) return <ProductListPlaceholder featured={featured} />;

    return (
      <List
        horizontal
        contentContainerStyle={{
          left: 4,
        }}
        snapToInterval={featured ? CARD_WIDTH * 2 : CARD_WIDTH}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        data={products}
        ref={c => {
          this._flatlist = c;
        }} // eslint-disable-line
        keyExtractor={item => (item.obj ? item.obj._id : item._id)}
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
            useNativeDriver: true,
            listener: this._handleScroll,
          },
        )}
        renderItem={({ item, index }) =>
          <ProductCard
            product={item.obj ? { ...item.obj, dis: item.dis } : { ...item }}
            selected={this.state.selectedProduct === index}
            onPress={productPressed}
            showCategory={showCategory}
            showSelected={showSelected}
            featured={featured}
          />}
        ListFooterComponent={() => <ListFooter />}
        ListHeaderComponent={() => <ListSeparator />}
      />
    );
  }
}

export default ProductList;
