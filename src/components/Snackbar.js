import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Root = styled(Animated.View)`
  position: absolute;
  top: -25;
  width: 100%;
  height: 25;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props =>
    props.secondary ? props.theme.SECONDARY_A : props.theme.PRIMARY}
`;

const Message = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${props => props.theme.WHITE};
  fontFamily: 'quicksand-regular';
  fontSize: 14;
`;

class Snackbar extends Component {
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    if (this.props.message) {
      this._toggleMessage();
    }
  }

  _toggleMessage() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const animatedStyle = {
      transform: [
        {
          translateY: this.animated.interpolate({
            inputRange: [0, 0.1, 0.9, 1],
            outputRange: [0, 24, 24, 0],
          }),
        },
      ],
    };

    return (
      <Root style={animatedStyle} secondary={this.props.secondary}>
        <Message>
          {this.props.message}
        </Message>
      </Root>
    );
  }
}

export default Snackbar;
