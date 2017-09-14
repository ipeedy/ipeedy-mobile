import React, { Component } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { MapView, Location, Permissions, Constants } from 'expo';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { updateUserLocation } from '../actions/user';

import MapStyle from '../utils/mapstyle';
import { colors } from '../utils/constants';

import UserMarker from '../components/UserMarker';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Snackbar from '../components/Snackbar';

const DEFAULT_DELTA = {
  latitudeDelta: 0.0922 / 2,
  longitudeDelta: 0.0421 / 2,
};

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const MapContainer = styled.View`flex: 7.5;`;

const ProductsContainer = styled.View`
  flex: 3;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

class ExploreScreen extends Component {
  state = {
    error: null,
    region: null,
    userRegion: this.props.user.location,
    fetchingUserRegion: true,
    products: [],
    selectedProduct: 0,
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Not support Android emulator. Try again on your device!',
      });
    } else {
      this._getUserPositionAsync();
    }
  }

  // componentWillUnmount() {
  //   if (this.watchLocation) this.watchLocation.remove();
  // }

  _getUserPositionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied!',
      });
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState(
      {
        region: {
          ...coords,
          ...DEFAULT_DELTA,
        },
        userRegion: {
          ...coords,
        },
        fetchingUserRegion: false,
      },
      () => {
        this._map.animateToCoordinate(coords, 1);
        this.props.updateUserLocation(coords);
      },
    );

    // this.watchLocation = await Location.watchPositionAsync(
    //   {
    //     enableHighAccuracy: true,
    //     timeInterval: 36000,
    //     distanceInterval: 10,
    //   },
    //   ({ coords: { latitude, longitude } }) => {
    //     this.setState({
    //       userRegion: {
    //         latitude,
    //         longitude,
    //       },
    //     });
    //   },
    // );
  };

  _handleRegionChange = region => this.setState({ region });

  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  _renderProductsList = () => {
    if (!this.state.userRegion) {
      return <Loading size="large" color={colors.PRIMARY} />;
    }

    return (
      <ProductList
        latitude={this.state.userRegion.latitude}
        longitude={this.state.userRegion.longitude}
        distance={10000000}
        productPressed={this._handleProductPressed}
      />
    );
  };

  render() {
    const INITIAL_REGION = this.props.user.location || {
      latitude: 37.78825,
      longitude: -122.4324,
    };

    return (
      <Root>
        {this.state.error && <Snackbar message={this.state.error} secondary />}
        <MapContainer>
          <MapView
            ref={component => (this._map = component)} // eslint-disable-line
            initialRegion={{ ...INITIAL_REGION, ...DEFAULT_DELTA }}
            region={this.state.region}
            onRegionChange={this._handleRegionChange}
            showsMyLocationButton
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={MapStyle}
            style={{ flex: 1 }}
          >
            <MapView.Marker
              coordinate={
                this.state.userRegion ||
                this.props.user.location ||
                INITIAL_REGION
              }
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <UserMarker />
            </MapView.Marker>
          </MapView>
        </MapContainer>
        <ProductsContainer>
          {this._renderProductsList()}
        </ProductsContainer>
      </Root>
    );
  }
}

export default withApollo(
  connect(state => ({ user: state.user.info }), { updateUserLocation })(
    ExploreScreen,
  ),
);
