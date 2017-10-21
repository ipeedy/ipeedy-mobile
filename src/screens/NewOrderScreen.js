import React, { Component } from 'react';
import styled from 'styled-components/native';

import { Title } from '../components/typography';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

class NewOrderScreen extends Component {
  state = {
    order: this.props.navigation.state.params.order,
  };
  render() {
    return (
      <Root>
        <Title large medium>
          New order from {this.state.order.user.name}
        </Title>
      </Root>
    );
  }
}

export default NewOrderScreen;
