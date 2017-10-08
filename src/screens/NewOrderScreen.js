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
  state = {
    order: this.props.navigation.state.params.order,
  };
  render() {
    return (
      <Root>
        <Title>
          New order from {this.state.order.user.name}
        </Title>
      </Root>
    );
  }
}

export default NewOrderScreen;
