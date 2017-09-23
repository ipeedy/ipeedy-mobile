import React, { Component } from 'react';
import { Animated, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { icons, colors } from '../utils/constants';

const BUTTON_SIZE = Platform.OS === 'android' ? 65 : 60;
const BUTTON_RADIUS = BUTTON_SIZE / 2;

const Root = styled.View``;

const FloatingButtonContent = styled.View`
  position: absolute;
  bottom: 10;
  right: 10;
  width: ${BUTTON_SIZE};
  minHeight: ${BUTTON_SIZE};
  borderRadius: ${BUTTON_RADIUS};
  backgroundColor: ${props =>
    props.secondary ? props.theme.SECONDARY_A : props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
`;

const ButtonContent = styled(FloatingButtonContent)`
  shadowColor: ${props => props.theme.BLACK};
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const AnimatedFloatingButtonContent = Animated.createAnimatedComponent(
  FloatingButtonContent,
);

const AnimatedButtonContent = Animated.createAnimatedComponent(ButtonContent);

const getTransformStyle = animation => ({
  transform: [{ translateY: animation }],
});

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      fabs: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ],
    };
    this.open = false;
  }

  _toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    const flyouts = this.state.fabs.map((value, i) =>
      Animated.spring(value, {
        toValue: (i + 1) * -75 * toValue,
        friction: 5,
        useNativeDriver: true,
      }),
    );
    Animated.parallel([
      Animated.timing(this.state.animate, {
        toValue,
        duration: 300,
      }),
      Animated.stagger(30, flyouts),
    ]).start();
    this.open = !this.open;
  };

  _handlePressAction = i => {
    this._toggleMenu();
    this.props.pressAction(i);
  };

  render() {
    const { icon, actionIcons, iconSize } = this.props;

    const animatedButtonStyle = {
      backgroundColor: this.state.animate.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.PRIMARY, colors.SECONDARY_A],
      }),
    };

    return (
      <Root>
        {this.state.fabs.map((animation, i) =>
          <TouchableOpacity
            key={i}
            onPress={() => this._handlePressAction(i)}
            style={getTransformStyle(animation)}
          >
            <AnimatedFloatingButtonContent
              style={{ backgroundColor: colors.PRIMARY }}
            >
              <Ionicons
                name={actionIcons[i] || icons.CLOSE}
                size={iconSize || 22}
                color={colors.WHITE}
              />
            </AnimatedFloatingButtonContent>
          </TouchableOpacity>,
        )}
        <TouchableOpacity onPress={this._toggleMenu}>
          <AnimatedButtonContent style={animatedButtonStyle}>
            <Ionicons
              name={icon || icons.OPTIONS}
              size={iconSize || 22}
              color={colors.WHITE}
            />
          </AnimatedButtonContent>
        </TouchableOpacity>
      </Root>
    );
  }
}

export default ActionButton;
