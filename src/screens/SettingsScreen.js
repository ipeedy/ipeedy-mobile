import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const Title = styled.Text`
  fontSize: 25;
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-bold';
`;

class SettingsScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <Title>SETTINGS SCREEN</Title>
      </Root>
    );
  }
}

export default SettingsScreen;