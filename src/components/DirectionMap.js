import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MapView } from 'expo';

import MapStyle from '../utils/mapstyle';
import { getDirections, regionContainingPoints } from '../utils/helpers';
import { colors } from '../utils/constants';

import UserMarker from '../components/UserMarker';

const DEFAULT_DELTA = {
  latitudeDelta: 0.016,
  longitudeDelta: 0.008,
};

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const MarkerWrap = styled.View`
  alignItems: center;
  justifyContent: center;
  width: 60;
  height: 60;
`;

const MarkerRing = styled.View`
  width: 24;
  height: 24;
  borderRadius: 12;
  backgroundColor: rgba(130, 4, 150, 0.3);
  position: absolute;
`;

const Marker = styled.View`
  width: 8;
  height: 8;
  borderRadius: 4;
  backgroundColor: rgba(130, 4, 150, 0.9);
`;

class DirectionMap extends Component {
  state = {
    region: null,
    error: null,
    coordinates: [],
    amount: 0,
  };

  componentDidMount() {
    this._getDirections();
    const { startLoc, destinationLoc } = this.props;
    this.setState({
      region: regionContainingPoints([startLoc, destinationLoc]),
    });
  }

  _getDirections = async () => {
    const { startLoc, destinationLoc } = this.props;
    const coordinates = await getDirections(startLoc, destinationLoc);
    this.setState({ coordinates });
  };

  _handleRegionChange = region => this.setState({ region });

  _renderUserMarker = () =>
    <MapView.Marker
      coordinate={this.props.startLoc}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <UserMarker />
    </MapView.Marker>;

  _renderSellerMarker = () =>
    <MapView.Marker
      coordinate={this.props.destinationLoc}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <MarkerWrap>
        <MarkerRing />
        <Marker />
      </MarkerWrap>
    </MapView.Marker>;

  _renderDirections = () => {
    if (this.state.coordinates.length > 0) {
      return (
        <MapView.Polyline
          coordinates={this.state.coordinates}
          strokeWidth={3}
          strokeColor={colors.SECONDARY_A}
        />
      );
    }
  };

  render() {
    return (
      <Root>
        <MapView
          initialRegion={{ ...this.props.startLoc, ...DEFAULT_DELTA }}
          region={this.state.region}
          onRegionChange={this._handleRegionChange}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={[{ flex: 1 }, this.props.style]}
        >
          {this._renderUserMarker()}
          {this._renderSellerMarker()}
          {this._renderDirections()}
          {this.props.children}
        </MapView>
      </Root>
    );
  }
}

export default DirectionMap;
