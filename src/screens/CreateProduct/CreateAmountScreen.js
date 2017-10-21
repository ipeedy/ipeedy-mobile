import React, { Component } from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { icons, colors } from '../../utils/constants';
import { getInput } from '../../actions/product';

import CircleButton from '../../components/CircleButton';
import { Title } from '../../components/typography';

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
          <Title large numberOfLines={3}>
            How many products do you currently have?
          </Title>
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
              <Title medium large>
                {this.props.input.availableCount}
              </Title>
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
