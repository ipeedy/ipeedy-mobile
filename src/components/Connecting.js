import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';

const Root = styled.View`
  width: 260;
  height: 260;
  justifyContent: center;
  alignItems: center;
`;

const Circle = styled.View`
  width: 50;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 25;
  alignSelf: center;
  justifyContent: center;
  alignItems: center;
`;

const Marker = styled(Animated.View)`
  backgroundColor: transparent;
  width: 50;
  height: 50;
  borderRadius: 25;
  borderWidth: 2;
  alignSelf: center;
  borderColor: ${props => props.theme.PRIMARY};
`;

class Connecting extends Component {
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation = () => {
    Animated.sequence([
      Animated.timing(this.animated, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        delay: 2000,
      }),
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      this.cycleAnimation();
    });
  };

  render() {
    const sizeInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 260],
    });

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const animatedStyle = {
      width: sizeInterpolate,
      height: sizeInterpolate,
      borderRadius: sizeInterpolate,
      opacity: opacityInterpolate,
    };

    return (
      <Root>
        <Circle source={{ uri: this.props.avatar }}>
          <Marker style={animatedStyle} />
        </Circle>
      </Root>
    );
  }
}

export default Connecting;
