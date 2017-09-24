import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  native: false,
  hitSlop: { top: 10, bottom: 10, right: 10, left: 10 },
})`
  marginLeft: ${props => (props.side === 'left' ? 15 : 0)};
  marginRight: ${props => (props.side === 'right' ? 15 : 0)};
  justifyContent: center;
  alignItems: center;
`;

const ButtonHeader = ({ side, children, onPress, disabled }) =>
  <Button onPress={onPress} disabled={disabled} side={side}>
    {children}
  </Button>;

export default ButtonHeader;
