import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { EvilIcons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import { getPrice } from '../utils/helpers';
import { colors, icons } from '../utils/constants';

import { Text, Caption } from './typography';

export const CARD_WIDTH = 175;

const Container = styled.View`
  width: ${props => {
    const width = props.width || CARD_WIDTH;
    if (props.big) {
      return width * 2;
    }
    return width;
  }};
  height: ${props => (props.height ? props.height : '100%')};
  paddingHorizontal: 4px;
  paddingVertical: 8px;
  alignItems: center;
  justifyContent: center;
`;

const ProductTouchable = styled(Touchable).attrs({
  feedback: 'none',
})`
  width: 100%;
  position: relative;
  height: ${props => (props.height ? props.height : '100%')};
  backgroundColor: ${props => props.theme.WHITE};
`;

const Image = styled.Image`
  flex: 7.5;
  alignSelf: stretch;
  width: 100%;
  borderRadius: 3px;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const HeartButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  width: ${props => (props.large ? 50 : 35)};
  height: ${props => (props.large ? 50 : 35)};
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
  top: 0;
  right: 0;
`;

const MetaContainer = styled.View`
  flex: 2.5;
  alignSelf: stretch;
  paddingTop: 8px;
  paddingHorizontal: 8px;
  alignItems: flex-start;
`;

const FooterMetaContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  top: 3;
`;

const SeletedBar = styled.View`
  position: absolute;
  width: 100%;
  alignSelf: stretch;
  height: 3;
  top: 0;
  backgroundColor: ${props => props.theme.SECONDARY_A};
`;

const PriceContainer = styled.View`
  position: absolute;
  height: 25;
  paddingHorizontal: 7px;
  left: 0;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.SECONDARY_B};
  bottom: 35%;
`;

class ProductCard extends Component {
  render() {
    const {
      product: { images, name, reviews, price, category },
      selected,
      showSelected,
      showCategory,
      featured,
      width,
      onPress,
      height,
      amount,
      hideReviews,
    } = this.props;
    let totalRating = 0;

    reviews.map(review => (totalRating += review.rating)); // eslint-disable-line

    return (
      <Container big={featured} width={width} height={height}>
        <ProductTouchable onPress={() => onPress(this.props.product)}>
          {images.length > 0
            ? <Image source={{ uri: images[0] }} />
            : <Image source={require('../../assets/images/no-image.png')} />}
          <HeartButton large={featured}>
            <EvilIcons
              size={featured ? 32 : 28}
              color={colors.WHITE}
              name={icons.HEART}
            />
          </HeartButton>
          {!featured &&
            <PriceContainer>
              <Text medium bright large={featured}>
                {amount ? `${getPrice(price)} x ${amount}` : getPrice(price)}
              </Text>
            </PriceContainer>}
          <MetaContainer>
            {showCategory &&
              <Caption primary medium large={featured}>
                {category.name.toUpperCase()}
              </Caption>}
            <Text medium large={featured}>
              {name}
            </Text>
            {!hideReviews &&
              <FooterMetaContainer>
                <StarRating
                  disabled
                  rating={totalRating / reviews.length || 0}
                  starSize={featured ? 15 : 11}
                  starColor={colors.SECONDARY_A}
                />
                <Caption medium style={{ left: 8 }} large={featured}>
                  {reviews.length} Reviews
                </Caption>
              </FooterMetaContainer>}
          </MetaContainer>
          {showSelected && selected && <SeletedBar />}
        </ProductTouchable>
      </Container>
    );
  }
}

export default ProductCard;
