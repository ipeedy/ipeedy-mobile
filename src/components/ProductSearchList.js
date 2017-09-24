import React, { Component } from 'react';
import { FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { colors } from '../utils/constants';

import ProductCard from './ProductCard';
import Loading from './Loading';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2;

const LoadingRoot = styled.View`
  flex: 1;
  alignItems: center;
  top: 20px;
`;

const ListFooterPadding = styled.View`
  width: 100%;
  height: 100px;
`;

class ProductSearchList extends Component {
  render() {
    const { data: { loading, products }, productPressed } = this.props;

    if (loading)
      return (
        <LoadingRoot>
          <Loading color={colors.PRIMARY} size="large" />
        </LoadingRoot>
      );

    return (
      <FlatList
        snapToInterval={CARD_WIDTH}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        data={products}
        contentContainerStyle={{
          paddingHorizontal: 4,
        }}
        numColumns={2}
        keyExtractor={item => (item.obj ? item.obj._id : item._id)}
        renderItem={({ item }) =>
          <ProductCard
            product={item.obj ? { ...item.obj, dis: item.dis } : { ...item }}
            onPress={productPressed}
            showCategory
            width={CARD_WIDTH - 4}
            height={CARD_WIDTH}
          />}
        ListFooterComponent={() => <ListFooterPadding />}
      />
    );
  }
}

export default ProductSearchList;
