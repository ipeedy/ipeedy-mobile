import React from 'react';
import { FlatList } from 'react-native';
import Placeholder from 'rn-placeholder';
import styled from 'styled-components/native';

export const CARD_WIDTH = 175;

const Card = styled.View`
  width: ${props => (props.large ? CARD_WIDTH * 2 : CARD_WIDTH)};
  height: 100%;
  paddingHorizontal: 4px;
  paddingVertical: 8px;
  alignItems: center;
  justifyContent: center;
`;

const Image = styled.View`
  flex: 7.5;
  alignSelf: stretch;
  width: 100%;
  overflow: hidden;
`;

const MetaContainer = styled.View`
  flex: 2.5;
  alignSelf: stretch;
  paddingTop: 8px;
  paddingHorizontal: 8px;
`;

const ListSeparator = styled.View`
  width: 8;
  height: 100%;
`;

const ProductListPlaceholder = ({ featured }) =>
  <FlatList
    horizontal
    contentContainerStyle={{
      left: 4,
    }}
    showsHorizontalScrollIndicator={false}
    data={featured ? [1] : [1, 2, 3]}
    ListHeaderComponent={() => <ListSeparator />}
    keyExtractor={item => item}
    renderItem={() =>
      <Card large={featured}>
        <Image>
          <Placeholder.Media
            size={featured ? CARD_WIDTH * 2 : CARD_WIDTH}
            animate="shine"
          />
        </Image>
        <MetaContainer>
          <Placeholder.Paragraph
            lineNumber={2}
            textSize={featured ? 14 : 11}
            lineSpacing={featured ? 9 : 6}
            animate="shine"
            width="100%"
            lastLineWidth={featured ? '30%' : '70%'}
            firstLineWidth={featured ? '35%' : '80%'}
          />
        </MetaContainer>
      </Card>}
  />;

export default ProductListPlaceholder;
