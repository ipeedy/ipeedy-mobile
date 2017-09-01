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
  autoCorrect: false,
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
`;

class PhoneAuthScreen extends Component {
  state = {
    loading: false,
  };

  _handleNext = async () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    this.props.navigation.navigate('VerifyPhone');
  };

  render() {
    return (
      <Root>
        <Wrapper>
          <Title>Enter your mobile number</Title>
          <InputContainer>
            <DialCode>+84</DialCode>
            <InputWrapper>
              <Input
                placeholder="091 234 56 78"
                keyboardType="phone-pad"
                returnKeyType="next"
                maxLength={11}
                autoFocus
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

export default PhoneAuthScreen;
