/* eslint-disable no-unused-expressions*/
/* eslint-disable no-return-assign*/

import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import CircleButton from '../components/CircleButton';

import { icons, colors } from '../utils/constants';

const Root = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding',
})`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 70%;
  width: 80%;
  position: relative;
`;

const Title = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 20;
  color: ${props => props.theme.BLACK};
  ${props =>
    props.bold &&
    `
    fontFamily: 'quicksand-medium';
  `};
`;

const InputContainer = styled.View`
  flexDirection: row;
  height: 50;
  width: 80%;
  alignItems: flex-end;
`;

const InputWrapper = styled.View`
  marginLeft: 10;
  paddingBottom: 2;
  width: 35;
  alignItems: center;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.PRIMARY};
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT,
  selectionColor: colors.PRIMARY,
  autoCorrect: false,
  placeholder: '0',
  keyboardType: 'number-pad',
  maxLength: 1,
  underlineColorAndroid: 'transparent',
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
`;

class PhoneVerifyScreen extends Component {
  state = {
    loading: false,
  };

  _handleNext = () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
  };

  render() {
    return (
      <Root>
        <Wrapper>
          <Title>
            Enter the 4-digit code sent you at{' '}
            <Title bold>+84 91 234 56 78</Title>
          </Title>
          <InputContainer>
            <InputWrapper>
              <Input
                returnKeyType="next"
                onChangeText={event => {
                  event && this.secondInput.focus();
                }}
                autoFocus
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="next"
                onChangeText={event => {
                  event && this.thirdInput.focus();
                }}
                innerRef={r => (this.secondInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="next"
                onChangeText={event => {
                  event && this.fourthInput.focus();
                }}
                innerRef={r => (this.thirdInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="done"
                onChangeText={() => {
                  this._handleNext();
                }}
                innerRef={r => (this.fourthInput = r)}
              />
            </InputWrapper>
          </InputContainer>
          <CircleButton loading={this.state.loading} onPress={this._handleNext}>
            <Ionicons name={icons.NEXT} color={colors.WHITE} size={35} />
          </CircleButton>
        </Wrapper>
      </Root>
    );
  }
}

export default PhoneVerifyScreen;
