import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  flexDirection: row;
`;

const Stars = styled.Text`
  fontSize: 12;
  color: ${props => props.theme.SECONDARY_A};
`;

const Review = styled.Text`
  fontSize: 10;
  fontFamily: 'quicksand-medium';
  paddingLeft: 8;
  top: 2;
  color: ${props => props.theme.DARK};
`;

const Rating = ({ rating, reviews, displayText, displayNumber }) => {
  let rates = '';
  let i = 0;
  for (i = 0; i < rating; i++) rates += '★';
  for (i = rating; i < 5; i++) rates += '☆';
  return (
    <Root>
      <Stars>
        {rates}
      </Stars>
      <Review>
        {`${displayNumber ? reviews : ''}${displayText ? ' Reviews' : ''}`}
      </Review>
    </Root>
  );
};

Rating.defaultProps = {
  displayText: true,
  displayNumber: true,
};

export default Rating;
