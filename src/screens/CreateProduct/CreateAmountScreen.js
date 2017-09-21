import React, { Component } from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { icons, colors } from '../../utils/constants';
import { getInput } from '../../actions/product';

import CircleButton from '../../components/CircleButton';

const Root = styled.View`
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
  height: 80;
  justifyContent: flex-end;
`;

const AmountWrapper = styled.View`
  width: 50;
  height: 50;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 90;
  right: 0;
`;

const Amount = styled(Title)`
  fontFamily: 'quicksand-medium';
  fontSize: 25;
`;

class CreateAmountScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = () => {
    this.props.navigation.navigate('CreateOrderRange');
  };

  render() {
    return (
      <Root>
        <Wrapper>
          <Title>How many products do you currently have?</Title>
          <InputWrapper>
            <Slider
              maximumValue={200}
              step={10}
              minimumValue={30}
              maximumTrackTintColor={colors.SILVER}
              minimumTrackTintColor={colors.PRIMARY}
              value={this.props.input.availableCount}
              onValueChange={value =>
                this.props.getInput('availableCount', value)}
            />
            <AmountWrapper>
              <Amount>
                {this.props.input.availableCount}
              </Amount>
            </AmountWrapper>
          </InputWrapper>
          <CircleButton loading={this.state.loading} onPress={this._handleNext}>
            <Ionicons name={icons.NEXT} color={colors.WHITE} size={35} />
          </CircleButton>
        </Wrapper>
      </Root>
    );
  }
}

export default connect(state => ({ input: state.product.form }), { getInput })(
  CreateAmountScreen,
);
