import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { getUserInfo } from '../actions/user';

import ME_QUERY from '../graphql/queries/me';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Title = styled.Text`
  fontSize: 25;
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-bold';
`;

class ExploreScreen extends Component {
  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };

  render() {
    return (
      <Root>
        <Title>EXPLORE SCREEN</Title>
      </Root>
    );
  }
}

export default withApollo(
  compose(connect(undefined, { getUserInfo }), graphql(ME_QUERY))(
    ExploreScreen,
  ),
);
