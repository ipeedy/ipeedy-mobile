import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { icons, colors } from '../../utils/constants';
import { getInput } from '../../actions/product';

import CircleButton from '../../components/CircleButton';
import CategoryList from '../../components/CategoryList';
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

class CreateCategoryScreen extends Component {
  state = {
    value: '',
  };

  _handleNext = () => {
    this.props.getInput('category', this.state.value);
    this.props.navigation.navigate('CreateName');
  };

  _handleSelectCategory = id => {
    this.setState({ value: id });
  };

  render() {
    return (
      <Root>
        <Wrapper>
          <Title large numberOfLines={3}>
            Select type of product you want to sell:
          </Title>
          <CategoryList
            containerStyle={{
              top: 20,
            }}
            selected={this.state.value}
            onSelect={this._handleSelectCategory}
          />
          <CircleButton
            disabled={!this.state.value.length}
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
  CreateCategoryScreen,
);
