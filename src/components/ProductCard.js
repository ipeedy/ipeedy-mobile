import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import { getPrice } from '../utils/helpers';

import Rating from './Rating';

const Container = styled.View`
  width: 175;
  height: 100%;
  paddingHorizontal: 4px;
  paddingVertical: 8px;
  alignItems: center;
  justifyContent: center;
`;

const Button = styled(Touchable).attrs({
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
  backgroundColor: ${props => props.theme.LIGHT};
`;

const MetaContainer = styled.View`
  flex: 2.5;
  alignSelf: stretch;
  paddingTop: 8px;
  paddingHorizontal: 8px;
  alignItems: flex-start;
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

const Price = styled(MetaText)`
  fontFamily: 'quicksand-medium';
  color: ${props => props.theme.WHITE};
  fontSize: 13;
`;

class ProductCard extends Component {
  render() {
    const {
      product: { images, name, totalRating, ratedTimes, price },
      selected,
    } = this.props;

    return (
      <Container>
        <Button>
          <Image source={{ uri: images[0] }} />
          <PriceContainer>
            <Price>
              {getPrice(price)}
            </Price>
          </PriceContainer>
          <MetaContainer>
            <MetaText>
              {name}
            </MetaText>
            <Rating
              rating={totalRating / ratedTimes || 0}
              reviews={totalRating || 0}
            />
          </MetaContainer>
          {selected && <SeletedBar />}
        </Button>
      </Container>
    );
  }
}

export default ProductCard;
