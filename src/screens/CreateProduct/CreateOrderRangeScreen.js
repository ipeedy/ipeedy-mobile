import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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
  height: 50;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 90;
  right: 0;
`;

class CreateOrderRangeScreen extends Component {
  state = {
    loading: false,
    error: null,
  };

  _handleNext = () => {
    this.props.navigation.navigate('CreatePrice');
  };

  render() {
    const { input } = this.props;

    return (
      <Root>
        <Wrapper>
          <Title large numberOfLines={3}>
            How many products do your customer can buy each time?
          </Title>
          <InputWrapper>
            <MultiSlider
              max={input.availableCount}
              step={1}
              min={1}
              unselectedStyle={{
                backgroundColor: colors.SILVER,
              }}
              selectedStyle={{
                backgroundColor: colors.PRIMARY,
              }}
              snapped
              allowOverlap
              values={[input.orderRange[0], input.orderRange[1]]}
              onValuesChange={value => this.props.getInput('orderRange', value)}
            />
            <AmountWrapper>
              <Title medium large>
                {`${input.orderRange[0]} - ${input.orderRange[1]}/order`}
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
  CreateOrderRangeScreen,
);
