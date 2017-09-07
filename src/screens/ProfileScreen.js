import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const Title = styled.Text`
  fontSize: 25;
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-bold';
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
