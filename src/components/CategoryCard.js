import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

export const CARD_WIDTH = 150;

const Wrapper = styled.View`
  width: ${CARD_WIDTH};
  height: 135;
  paddingHorizontal: 4px;
  paddingVertical: 8px;
  alignItems: center;
  justifyContent: center;
`;

const Category = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  width: 100%;
  height: 100%;
  backgroundColor: ${props => props.theme.WHITE};
  shadowOffset: 0px 0px;
  shadowRadius: 2px;
  shadowOpacity: 0.3;
  shadowColor: ${props => props.theme.BLACK};
  borderRadius: 2px;
`;

const SelectedOverlay = styled.View`
  backgroundColor: rgba(0, 0, 0, 0.2);
  position: absolute;
  justifyContent: center;
  alignItems: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.Image`
  flex: 7.5;
  alignSelf: stretch;
  width: 100%;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const MetaContainer = styled.View`
  flex: 2.5;
  alignSelf: stretch;
  justifyContent: center;
  paddingHorizontal: 8px;
`;

const CategoryName = styled.Text`
  fontFamily: 'quicksand-medium';
  color: ${props => props.theme.DARK};
  fontSize: 14;
`;

class CategoryCard extends Component {
  render() {
    const { category: { name, _id, image }, selected, onSelect } = this.props;

    return (
      <Wrapper>
        <Category selected={selected} onPress={() => onSelect(_id)}>
          <Image source={{ uri: image }} />
          <MetaContainer>
            <CategoryName>
              {name}
            </CategoryName>
          </MetaContainer>
        </Category>
        {selected &&
          <SelectedOverlay>
            <Ionicons name={icons.CHECKMARK} color={colors.WHITE} size={25} />
          </SelectedOverlay>}
      </Wrapper>
    );
  }
}

export default CategoryCard;
