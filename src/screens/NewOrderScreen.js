import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Title = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-medium';
`;

class NewOrderScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <Title>New order screen</Title>
      </Root>
    );
  }
}

export default NewOrderScreen;
