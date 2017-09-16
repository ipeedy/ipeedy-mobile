import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { EvilIcons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import { getPrice } from '../utils/helpers';
import { colors, icons } from '../utils/constants';

const Container = styled.View`
  width: 175;
  height: 100%;
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
  height: 100%;
  backgroundColor: ${props => props.theme.WHITE}
`;

const Image = styled.Image`
  flex: 7.5;
  alignSelf: stretch;
  width: 100%;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const HeartButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  width: 35;
  height: 35;
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
  width: 28%;
  left: 0;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.SECONDARY_B};
  bottom: 35%;
`;

const MetaText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-regular';
  fontSize: 13;
`;

const Review = styled.Text`
  fontSize: 10;
  fontFamily: 'quicksand-medium';
  paddingLeft: 8;
  color: ${props => props.theme.DARK};
`;
const Price = styled(MetaText)`
  fontFamily: 'quicksand-medium';
  color: ${props => props.theme.WHITE};
  fontSize: 13;
`;

class ProductCard extends Component {
  render() {
    const { product: { images, name, reviews, price }, selected } = this.props;

    let totalRating = 0;

    reviews.map(review => (totalRating += review.rating)); // eslint-disable-line

    return (
      <Container>
        <ProductTouchable
          onPress={() => this.props.onPress(this.props.product)}
        >
          {images.length > 0
            ? <Image source={{ uri: images[0] }} />
            : <Image source={require('../../assets/images/no-image.png')} />}
          <HeartButton>
            <EvilIcons size={28} color={colors.WHITE} name={icons.HEART} />
          </HeartButton>
          <PriceContainer>
            <Price>
              {getPrice(price)}
            </Price>
          </PriceContainer>
          <MetaContainer>
            <MetaText>
              {name}
            </MetaText>
            <FooterMetaContainer>
              <StarRating
                disabled
                rating={totalRating / reviews.length || 0}
                starSize={11}
                starColor={colors.SECONDARY_A}
              />
              <Review>
                {reviews.length} Reviews
              </Review>
            </FooterMetaContainer>
          </MetaContainer>
          {selected && <SeletedBar />}
        </ProductTouchable>
      </Container>
    );
  }
}

export default ProductCard;
