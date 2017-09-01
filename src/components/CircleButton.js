import React, { Component } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import Loading from './Loading';

const BUTTON_SIZE = Platform.OS === 'android' ? 65 : 60;
const BUTTON_RADIUS = BUTTON_SIZE / 2;

const Root = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  bottom: 10;
  right: 10;
  width: ${BUTTON_SIZE};
  minHeight: ${BUTTON_SIZE};
  borderRadius: ${BUTTON_RADIUS};
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  shadowColor: ${props => props.theme.BLACK};
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

class CircleButton extends Component {
  render() {
    if (this.props.loading) {
      return (
        <Root disabled>
          <Loading size="small" />
        </Root>
      );
    }

    return (
      <Root onPress={this.props.onPress}>
        {this.props.children}
      </Root>
    );
  }
}

export default CircleButton;