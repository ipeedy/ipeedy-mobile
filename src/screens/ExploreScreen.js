import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { MapView } from 'expo';

import { getUserInfo } from '../actions/user';
import MapStyle from '../utils/mapstyle';

import ME_QUERY from '../graphql/queries/me';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const MapContainer = styled.View`flex: 7.5;`;

const Map = styled(MapView).attrs({
  provider: MapView.PROVIDER_GOOGLE,
  customMapStyle: MapStyle,
})`
  flex: 1;
`;

const ProductContainer = styled.View`
  flex: 2.5;
  backgroundColor: ${props => props.theme.WHITE};
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
        <MapContainer>
          <Map
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </MapContainer>
        <ProductContainer />
      </Root>
    );
  }
}

export default withApollo(
  compose(connect(undefined, { getUserInfo }), graphql(ME_QUERY))(
    ExploreScreen,
  ),
);
