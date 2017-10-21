import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { Title } from '../components/typography';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

class ProfileScreen extends Component {
  state = {};
  render() {
    return (
      <Root>
        <Title>PROFILE SCREEN</Title>
      </Root>
    );
  }
}

export default connect(state => ({ user: state.user.info }))(ProfileScreen);
