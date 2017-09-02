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
  backgroundColor: ${props => {
    if (props.secondary) return props.theme.SECONDARY_A;
    if (props.primary) return props.theme.PRIMARY;
    return props.theme.PRIMARY;
  }};
`;

const Message = styled.Text`
  color: ${props => props.theme.WHITE};
  fontFamily: 'quicksand-regular';
  fontSize: 14;
`;

class Snackbar extends Component {
  state = {
    shown: false,
    animated: new Animated.Value(0),
  };

  componentDidMount() {
    if (this.props.message) {
      this._toggleMessage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this._toggleMessage();
    }
  }

  _toggleMessage() {
    const newState = !this.state.shown;
    this.setState({ shown: newState });
    Animated.timing(this.state.animated, {
      toValue: newState ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start(newState ? this._hideMessage() : null);
  }

  _hideMessage = () => {
    setTimeout(() => this._toggleMessage(), 4000);
    setTimeout(() => this.props.onHide(), 4800);
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          translateY: this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 24],
          }),
        },
      ],
    };

    return (
      <Root style={animatedStyle}>
        <Message>
          {this.props.message}
        </Message>
      </Root>
    );
  }
}

export default Snackbar;
