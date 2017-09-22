import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import Loading from './Loading';
import CategoryCard, { CARD_WIDTH } from './CategoryCard';

const Separator = styled.View`
  width: 8;
  height: 100%;
`;

class CategoryList extends Component {
  render() {
    const { data, selected, onSelect, containerStyle } = this.props;
    if (data.loading) return <Loading />;
    return (
      <FlatList
        horizontal
        contentContainerStyle={containerStyle}
        data={data.getCategories.filter(cat => cat.name !== 'Undefined')}
        keyExtractor={item => item._id}
        snapToInterval={CARD_WIDTH}
        renderItem={({ item }) =>
          <CategoryCard
            selected={selected === item._id}
            onSelect={onSelect}
            category={item}
          />}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={() => <Separator />}
        ListHeaderComponent={() => <Separator />}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}

export default CategoryList;
