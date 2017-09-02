import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import PhoneNumber from 'awesome-phonenumber';
import { graphql } from 'react-apollo';

import CircleButton from '../components/CircleButton';
import Snackbar from '../components/Snackbar';

import { icons, colors } from '../utils/constants';
import GENERATEOTP_MUTATION from '../graphql/mutations/generateOTP';

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
`;

const InputContainer = styled.View`
  flexDirection: row;
  height: 50;
  width: 80%;
  alignItems: flex-end;
`;

const DialCode = styled.Text`
  fontSize: 20;
  bottom: 4;
  fontFamily: 'quicksand-medium';
  color: ${props => props.theme.BLACK};
`;

const InputWrapper = styled.View`
  left: 10;
  paddingBottom: 2;
  width: 100%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.PRIMARY};
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT,
  selectionColor: colors.PRIMARY,
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
`;

class PhoneAuthScreen extends Component {
  state = {
    loading: false,
    displayNumber: '',
    isPhoneValid: false,
    error: null,
  };

  componentDidMount() {
    this.formattedNumber = PhoneNumber.getAsYouType('VN');
  }

  _clearError = () => {
    this.setState({ error: null });
  };

  _handleChangeText = value => {
    if (value.replace(/\s/g, '').length === 0) {
      this.formattedNumber = PhoneNumber.getAsYouType('VN');
    } else {
      this.formattedNumber.reset(value.replace(/\s/g, ''));
    }
    this.setState({
      isPhoneValid: this.formattedNumber.getPhoneNumber().isValid(),
      displayNumber: this.formattedNumber.number(),
    });
  };

  _handleNext = async () => {
    this.setState({ loading: true, error: false });
    const { data } = await this.props.mutate({
      variables: {
        phone: this.state.displayNumber.replace(/\s/g, ''),
      },
    });
    this.setState({ loading: false });
    if (!data.generateOTP.error) {
      Keyboard.dismiss();
      this.props.navigation.navigate('VerifyPhone', {
        diffTime: data.generateOTP.diff_time,
        phone: this.state.displayNumber,
      });
    } else {
      this.setState({ error: data.generateOTP.message });
    }
  };

  render() {
    return (
      <Root>
        <Snackbar
          message={this.state.error}
          secondary
          onHide={this._clearError}
        />
        <Wrapper>
          <Title>Enter your mobile number</Title>
          <InputContainer>
            <DialCode>+84</DialCode>
            <InputWrapper>
              <Input
                placeholder="091 234 56 78"
                keyboardType="phone-pad"
                returnKeyType="next"
                maxLength={15}
                autoFocus
                value={this.state.displayNumber}
                onChangeText={value => this._handleChangeText(value)}
              />
            </InputWrapper>
          </InputContainer>
          <CircleButton
            disabled={!this.state.isPhoneValid}
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

export default graphql(GENERATEOTP_MUTATION)(PhoneAuthScreen);
