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
  height: 150;
  borderBottomWidth: 2;
  top: 20;
  borderBottomColor: ${props => props.theme.PRIMARY};
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT,
  selectionColor: colors.PRIMARY,
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  multiline: true,
  autoFocus: true,
})`
  color: ${props => props.theme.BLACK};
  fontFamily: 'quicksand-medium';
  fontSize: 20;
  height: 150;
`;

class CreateDescriptionScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = async () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    this.props.navigation.navigate('CreateAmount');
  };

  render() {
    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <Wrapper>
          <Title>Let's describe your product:</Title>
          <InputWrapper>
            <Input
              placeholder="Say something about your product!"
              returnKeyType="next"
              maxLength={200}
              value={this.props.input.description}
              onChangeText={value => this.props.getInput('description', value)}
            />
          </InputWrapper>
          <CircleButton
            disabled={
              this.props.input.description.replace(/\s/g, '').length < 11
            }
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

export default connect(state => ({ input: state.productForm }), { getInput })(
  CreateDescriptionScreen,
);
