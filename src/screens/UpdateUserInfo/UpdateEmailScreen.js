import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';

import UPDATE_INFO_MUTATION from '../../graphql/mutations/updateInfo';
import { icons, colors } from '../../utils/constants';

import Snackbar from '../../components/Snackbar';
import CircleButton from '../../components/CircleButton';

const Root = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding',
})`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 70%;
  width: 80%;
  position: relative;
`;

const Title = styled.Text`
  fontSize: 20;
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-regular';
`;

const InputWrapper = styled.View`
  paddingBottom: 2;
  width: 80%;
  height: 50;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.PRIMARY};
  justifyContent: flex-end;
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

class UpdateNameScreen extends Component {
  state = {
    loading: false,
    value: '',
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true });
    const {
      data: { updateInfo: { error, message } },
    } = await this.props.mutate({
      variables: {
        email: this.state.value,
      },
    });
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: message });
    }
    Keyboard.dismiss();
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>What's your email?</Title>
          <InputWrapper>
            <Input
              placeholder="Alexandra User"
              returnKeyType="next"
              maxLength={25}
              autoFocus
              keyboardType="email-address"
              autoCapitalize="none"
              value={this.state.displayNumber}
              onChangeText={value => this.setState({ value })}
            />
          </InputWrapper>
          <CircleButton
            disabled={this.state.value.replace(/\s/g, '').length < 5}
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

export default graphql(UPDATE_INFO_MUTATION)(UpdateNameScreen);
