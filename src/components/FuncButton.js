import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import { Caption } from './typography';

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  borderRadius: 15;
  paddingVertical: 7;
  paddingHorizontal: 20;
  backgroundColor: ${props => props.theme.WHITE};
  flexDirection: row;
  alignItems: center;
  justifyContent: center;
  shadowColor: ${props => props.theme.BLACK};
  shadowOpacity: 0.1;
  shadowOffset: 0px 0px;
`;

const FuncButton = ({ title, onPress }) =>
  <Button onPress={onPress}>
    <Caption large medium>
      {title}
    </Caption>
  </Button>;

export default FuncButton;
