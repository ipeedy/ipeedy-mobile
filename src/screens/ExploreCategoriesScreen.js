import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Title = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 20;
  color: ${props => props.theme.PRIMARY};
`;

class ExploreCategoriesScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <Title>Explore Categories</Title>
      </Root>
    );
  }
}

export default ExploreCategoriesScreen;
