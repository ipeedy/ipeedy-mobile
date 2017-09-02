/* eslint-disable no-unused-expressions*/
/* eslint-disable no-return-assign*/

import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import CircleButton from '../components/CircleButton';

import { icons, colors } from '../utils/constants';
import { login } from '../actions/user';

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
  keyboardType: 'numeric',
  maxLength: 1,
  selectTextOnFocus: true,
  underlineColorAndroid: 'transparent',
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
`;

class PhoneVerifyScreen extends Component {
  state = {
    loading: false,
    buttonDisabled: true,
    firstInputValue: '',
    secondInputValue: '',
    thirdInputValue: '',
    fourthInputValue: '',
  };

  _handleChangeText = (value, position) => {
    const {
      firstInputValue,
      secondInputValue,
      thirdInputValue,
      fourthInputValue,
    } = this.state;
    this.setState(
      {
        [position]: value,
      },
      () => {
        this.setState({
          buttonDisabled: !(
            firstInputValue &&
            secondInputValue &&
            thirdInputValue &&
            fourthInputValue
          ),
        });
      },
    );
    if (position === 'fourthInputValue') {
      Keyboard.dismiss();
      return this._handleNext();
    }
    let nextInput = null;
    switch (position) {
      case 'firstInputValue':
        nextInput = 'secondInput';
        break;
      case 'secondInputValue':
        nextInput = 'thirdInput';
        break;
      case 'thirdInputValue':
        nextInput = 'fourthInput';
        break;
      default:
        break;
    }
    if (nextInput && value) this[nextInput].focus();
  };

  _handleBackspace(nativeEvent, input) {
    if (!nativeEvent.key || nativeEvent.key === 'Backspace') {
      this[input].focus();
    }
  }

  _handleNext = () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    this.props.login();
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
                value={this.state.firstInputValue}
                onChangeText={value =>
                  this._handleChangeText(value, 'firstInputValue')}
                innerRef={r => (this.firstInput = r)}
                autoFocus
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="next"
                value={this.state.secondInputValue}
                onKeyPress={({nativeEvent}) => this._handleBackspace(nativeEvent, 'firstInput')}
                onChangeText={value =>
                  this._handleChangeText(value, 'secondInputValue')}
                innerRef={r => (this.secondInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="next"
                value={this.state.thirdInputValue}
                onKeyPress={(nativeEvent) => this._handleBackspace(nativeEvent, 'secondInput')}
                onChangeText={value =>
                  this._handleChangeText(value, 'thirdInputValue')}
                innerRef={r => (this.thirdInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="done"
                value={this.state.fourthInputValue}
                onKeyPress={(nativeEvent) => this._handleBackspace(nativeEvent, 'thirdInput')}
                onChangeText={value =>
                  this._handleChangeText(value, 'fourthInputValue')}
                innerRef={r => (this.fourthInput = r)}
              />
            </InputWrapper>
          </InputContainer>
          <CircleButton
            disabled={this.state.buttonDisabled}
            loading={this.state.loading}
            onPress={this._handleNext}
          >
            <Ionicons name={icons.NEXT} color={colors.WHITE} size={35} />
          </CircleButton>
        </Wrapper>
      </Root>
    );
  }
}

export default connect(undefined, { login })(PhoneVerifyScreen);
