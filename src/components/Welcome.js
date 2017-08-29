import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const T = styled.Text`
  fontSize: 20;
  fontFamily: 'quicksand-medium';
  color: ${props => props.theme.PRIMARY};
`;

const LogoMark = styled.Image`
  width: 80;
  height: 80;
  overflow: visible;
`;

const Welcome = () =>
  <Root>
    <LogoMark source={require('../../assets/images/ipeedy-mark.png')} />
    <T>Ipeedy</T>
  </Root>;

export default Welcome;
