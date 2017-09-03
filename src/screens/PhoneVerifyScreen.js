/* eslint-disable no-unused-expressions*/
/* eslint-disable no-return-assign*/

import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';

import CircleButton from '../components/CircleButton';
import Snackbar from '../components/Snackbar';
import CountDown from '../components/CountDown';

import { icons, colors } from '../utils/constants';
import { login } from '../actions/user';
import GENERATEOTP_MUTATION from '../graphql/mutations/generateOTP';
import VERIFYOTP_MUTATION from '../graphql/mutations/verifyOTP';

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

const BottomText = styled.Text`
  position: absolute;
  bottom: 25;
  left: 0;
  fontFamily: 'quicksand-medium';
  fontSize: 16;
  color: ${props => props.theme.DARK};
`;

const BottomButton = styled(Touchable).attrs({
  feedback: 'opacity',
  native: false,
  hitSlop: { top: 10, left: 10, right: 10, bottom: 10 },
})`
  position: absolute;
  bottom: 25;
  left: 0;
`;

const BottomButtonText = styled(BottomText)`
  bottom: 0;
  color: ${props => props.theme.PRIMARY};
`;

class PhoneVerifyScreen extends Component {
  state = {
    loading: false,
    error: null,
    message: null,
    buttonDisabled: true,
    firstInputValue: '',
    secondInputValue: '',
    thirdInputValue: '',
    fourthInputValue: '',
    diffTime: this.props.navigation.state.params.diffTime || 30,
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
    if (position === 'fourthInputValue' && value) {
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

  _handleNext = async () => {
    this.setState({ loading: true, error: null });
    const { navigation: { state: { params: { phone } } } } = this.props;
    const {
      firstInputValue,
      secondInputValue,
      thirdInputValue,
      fourthInputValue,
    } = this.state;
    const { data } = await this.props.verifyOTPMutation({
      variables: {
        phone: phone.replace(/\s/g, ''),
        code:
          firstInputValue +
          secondInputValue +
          thirdInputValue +
          fourthInputValue,
      },
    });
    if (data.verifyOTP.error) {
      this.setState({ loading: false });
      return this.setState({ error: data.verifyOTP.message });
    }
    Keyboard.dismiss();
    await AsyncStorage.setItem('@ipeedy', data.verifyOTP.token);
    this.setState({ loading: false });
    return this.props.login();
  };

  _handleResendCode = async () => {
    this.setState({ loading: true, error: null });
    const { navigation: { state: { params: { phone } } } } = this.props;
    const { data } = await this.props.generateOTPMutation({
      variables: {
        phone: phone.replace(/\s/g, ''),
      },
    });
    this.setState({ loading: false });
    if (data.generateOTP.error) {
      await setTimeout(
        this.setState({ error: data.generateOTP.message }),
        4000,
      );
      this.setState({ error: null });
    } else {
      this.setState({
        message: 'Validation code have just been sent!',
        diffTime: data.generateOTP.diff_time,
      });
    }
  };

  _handleCountDownFinish = () => {
    this.setState({ diffTime: 0 });
  };

  renderBottom() {
    if (!this.state.diffTime) {
      return (
        <BottomButton onPress={this._handleResendCode}>
          <BottomButtonText>Resend code</BottomButtonText>
        </BottomButton>
      );
    }
    return (
      <BottomText>
        Resend code in{' '}
        <CountDown
          time={this.state.diffTime}
          onFinish={this._handleCountDownFinish}
        />
      </BottomText>
    );
  }

  renderError = () =>
    this.state.error && <Snackbar message={this.state.error} secondary />;

  renderMessage = () =>
    this.state.message && <Snackbar message={this.state.message} primary />;

  render() {
    return (
      <Root>
        {this.renderError()}
        {this.renderMessage()}
        <Wrapper>
          <Title>
            Enter the 4-digit code sent you at{' '}
            <Title bold>{this.props.navigation.state.params.phone}</Title>
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
                onKeyPress={({ nativeEvent }) =>
                  this._handleBackspace(nativeEvent, 'firstInput')}
                onChangeText={value =>
                  this._handleChangeText(value, 'secondInputValue')}
                innerRef={r => (this.secondInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="next"
                value={this.state.thirdInputValue}
                onKeyPress={nativeEvent =>
                  this._handleBackspace(nativeEvent, 'secondInput')}
                onChangeText={value =>
                  this._handleChangeText(value, 'thirdInputValue')}
                innerRef={r => (this.thirdInput = r)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                returnKeyType="done"
                value={this.state.fourthInputValue}
                onKeyPress={nativeEvent =>
                  this._handleBackspace(nativeEvent, 'thirdInput')}
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
          {this.renderBottom()}
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  connect(undefined, { login }),
  graphql(GENERATEOTP_MUTATION, { name: 'generateOTPMutation' }),
  graphql(VERIFYOTP_MUTATION, { name: 'verifyOTPMutation' }),
)(PhoneVerifyScreen);
