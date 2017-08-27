import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: ${props => props.theme.WHITE}
`;

const T = styled.Text`
  fontSize: 25;
  color: ${props => props.theme.PRIMARY};
`;

const Welcome = () => (
  <Root>
    <T>Ipeedy</T>
  </Root>
);

export default Welcome;
