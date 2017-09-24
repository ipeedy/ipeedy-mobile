import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import Placeholder from 'rn-placeholder';

import CategoryCard, { CARD_WIDTH } from './CategoryCard';

import CATEGORIES_QUERY from '../graphql/queries/categories';

const Separator = styled.View`
  width: 8;
  height: 100%;
`;

const CardWrapper = styled.View`
  width: ${CARD_WIDTH};
  height: 135;
  paddingHorizontal: 4px;
  paddingVertical: 8px;
  overflow: hidden;
  alignItems: center;
  justifyContent: center;
`;

const Card = styled.View`
  width: 100%;
  height: 100%;
  backgroundColor: ${props => props.theme.WHITE};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0.2;
  shadowColor: ${props => props.theme.BLACK};
  borderRadius: 2px;
`;

const CardImage = styled.View`
  flex: 7.5;
  alignSelf: stretch;
  width: 100%;
  backgroundColor: ${props => props.theme.LIGHT};
  overflow: hidden;
`;

const CardMeta = styled.View`
  flex: 2.5;
  alignSelf: stretch;
  justifyContent: center;
  paddingHorizontal: 8px;
`;

class CategoryList extends Component {
  _renderPlaceholderCard = () =>
    <CardWrapper>
      <Card>
        <CardImage>
          <Placeholder.Media size={CARD_WIDTH} animate="shine" />
        </CardImage>
        <CardMeta>
          <Placeholder.Line textSize={12} animate="shine" width="50%" />
        </CardMeta>
      </Card>
    </CardWrapper>;

  render() {
    const { data, selected, onSelect, containerStyle } = this.props;
    if (data.loading)
      return (
        <FlatList
          horizontal
          contentContainerStyle={containerStyle}
          data={[1, 2, 3]}
          keyExtractor={item => item}
          snapToInterval={CARD_WIDTH}
          renderItem={() => this._renderPlaceholderCard()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <Separator />}
          ListHeaderComponent={() => <Separator />}
          ItemSeparatorComponent={() => <Separator />}
        />
      );
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

export default graphql(CATEGORIES_QUERY)(CategoryList);
