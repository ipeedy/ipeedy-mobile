import React, { Component } from 'react';
import { Animated, FlatList, LayoutAnimation, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import { icons, colors } from '../utils/constants';

import ProductCard, { CARD_WIDTH } from './ProductCard';
import ProductListPlaceholder from './ProductListPlaceholder';
import { Subtitle } from './typography';

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

const ProductEmpty = styled(LinearGradient).attrs({
  colors: [colors.PRIMARY, colors.SECONDARY_A],
})`
  width: ${CARD_WIDTH * 2};
  height: 100%;
  justify-content: space-around;
  align-items: center;
  border-radius: 3;
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
        ListEmptyComponent={() =>
          <Touchable
            feedback="none"
            style={{
              borderRadius: 3,
              paddingVertical: 8,
            }}
            onPress={() => this.props.navigation.navigate('CreateProduct')}
          >
            <ProductEmpty>
              <Subtitle numberOfLines={2} bright>
                No product here
              </Subtitle>
              <Ionicons
                name={icons.CART}
                size={40}
                color={colors.WHITE}
                style={{ backgroundColor: 'transparent' }}
              />
              <Subtitle numberOfLines={2} bright>
                Start selling
              </Subtitle>
            </ProductEmpty>
          </Touchable>}
      />
    );
  }
}

export default ProductList;
