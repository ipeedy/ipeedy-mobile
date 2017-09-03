import React, { Component } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { graphql, withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { MapView, Location, Permissions, Constants } from 'expo';

import { getUserInfo } from '../actions/user';
import MapStyle from '../utils/mapstyle';

import ME_QUERY from '../graphql/queries/me';

import UserMarker from '../components/UserMarker';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const DEFAULT_DELTA = {
  latitudeDelta: 0.0922 / 2,
  longitudeDelta: 0.0421 / 2,
};

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
  state = {
    error: null,
    region: INITIAL_REGION,
    userRegion: null,
  };

  componentDidMount() {
    this._getUserInfo();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Not support Android emulator. Try again on your device!',
      });
    } else {
      this._getUserPosition();
      this._watchUserPositionAsync();
    }
  }

  componentWillUnmount() {
    this.watchLocation.remove();
  }

  _getUserPosition = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied!',
      });
    }

    const { coords } = await Location.getCurrentPositionAsync();
    this.setState({
      region: coords,
    });
  };

  _watchUserPositionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied!',
      });
    }

    this.watchLocation = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 15000,
        distanceInterval: 10,
      },
      ({ coords: { longitude, latitude } }) => {
        this.setState({
          userRegion: {
            longitude,
            latitude,
          },
        });
      },
    );
  };

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
              ...INITIAL_REGION,
              ...DEFAULT_DELTA,
            }}
            region={{
              ...this.state.region,
              ...DEFAULT_DELTA,
            }}
          >
            <MapView.Marker
              coordinate={this.state.userRegion || INITIAL_REGION}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <UserMarker />
            </MapView.Marker>
          </Map>
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
