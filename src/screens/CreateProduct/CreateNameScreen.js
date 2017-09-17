import React, { Component } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { icons, colors } from '../../utils/constants';
import { getInput } from '../../actions/product';

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

class CreateNameScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    this.props.navigation.navigate('CreateDescription');
  };

  render() {
    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>Enter your product's name:</Title>
          <InputWrapper>
            <Input
              placeholder="Vé số Vĩnh Long"
              returnKeyType="next"
              maxLength={25}
              autoFocus
              value={this.props.input.name}
              onChangeText={value => this.props.getInput('name', value)}
            />
          </InputWrapper>
          <CircleButton
            disabled={this.props.input.name.replace(/\s/g, '').length < 5}
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

export default connect(state => ({ input: state.product.form }), { getInput })(
  CreateNameScreen,
);
