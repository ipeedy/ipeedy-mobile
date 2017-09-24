import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { MapView } from 'expo';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/product';
import { clearCart } from '../actions/cart';
import GET_NEARBY_PRODUCTS_QUERY from '../graphql/queries/nearbyProducts';

import MapStyle from '../utils/mapstyle';

import UserMarker from '../components/UserMarker';
import Loading from '../components/Loading';
import ProductList from '../components/ProductList';
import ProductListPlaceholder from '../components/ProductListPlaceholder';
import Snackbar from '../components/Snackbar';
import FuncButton from '../components/FuncButton';
import { CARD_WIDTH } from '../components/ProductCard';

const DEFAULT_DELTA = {
  latitudeDelta: 0.016,
  longitudeDelta: 0.008,
};

const DISTANCE = 2000;

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const MapContainer = styled.View`
  flex: 7.5;
  position: relative;
`;

const MarkerWrap = styled(Animated.View)`
  alignItems: center;
  justifyContent: center;
  width: 60;
  height: 60;
`;

const MarkerRing = styled(Animated.View)`
  width: 24;
  height: 24;
  borderRadius: 12;
  backgroundColor: rgba(130,4,150, 0.3);
  position: absolute;
`;

const Marker = styled.View`
  width: 8;
  height: 8;
  borderRadius: 4;
  backgroundColor: rgba(130, 4, 150, 0.9);
`;

const ProductsContainer = styled.View`
  flex: 3;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

const FuncContainer = styled.View`
  position: absolute;
  height: 50px;
  bottom: 0px;
  width: 100%;
  justifyContent: center;
  alignItems: center;
`;

class ExploreScreen extends Component {
  state = {
    error: null,
    region: null,
    regionInited: false,
    userRegion: this.props.user.location,
    selectedProduct: 0,
    showRefreshButton: false,
  };

  componentWillMount() {
    this.animation = new Animated.Value(0);
    this.index = 0;
    if (
      this.props.user.info &&
      (!this.props.user.info.name || !this.props.user.info.email)
    ) {
      this.props.screenProps.rootNavigation.navigate('UpdateInfo');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this._addMapViewEventListener(nextProps.data);
    }
    if (!nextProps.user.fetchingLocation && !this.state.regionInited) {
      this.setState({
        region: {
          ...nextProps.user.info.location,
          ...DEFAULT_DELTA,
        },
        regionInited: true,
      });
    }
  }

  _handleRegionChange = region =>
    this.setState({ region, showRefreshButton: true });

  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  _addMapViewEventListener = ({ getNearbyProducts: products }) => {
    if (products.length)
      this.map.animateToRegion({
        longitude: products[0].obj.geometry.coordinates[0],
        latitude: products[0].obj.geometry.coordinates[1],
        ...DEFAULT_DELTA,
      });

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= products.length) {
        index = products.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const coordinate = {
            longitude: products[index].obj.geometry.coordinates[0],
            latitude: products[index].obj.geometry.coordinates[1],
          };
          this.map.animateToRegion(
            {
              ...coordinate,
              ...DEFAULT_DELTA,
            },
            250,
          );
        }
      }, 10);
    });
  };

  _handleMarkerPress = index => {
    this.list._triggerScrollTo(index * CARD_WIDTH);
  };

  _renderProductsList = () => {
    if (this.props.data.loading) {
      return <ProductListPlaceholder />;
    }
    return (
      <ProductList
        _ref={c => {
          this.list = c;
        }} // eslint-disable-line
        distance={10000000}
        animation={this.animation}
        productPressed={this._handleProductPressed}
        products={this.props.data.getNearbyProducts}
      />
    );
  };

  _renderUserMarker = () => {
    const { user } = this.props;
    if (!user.fetchingLocation && !user.error) {
      return (
        <MapView.Marker
          coordinate={user.info.location}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <UserMarker />
        </MapView.Marker>
      );
    }
  };

  _renderProductMarkers = () => {
    if (!this.props.data.loading) {
      const markers = [];
      this.props.data.getNearbyProducts.map((product, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          (index + 1) * CARD_WIDTH,
        ];
        const sizeInterpolate = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.25, 1],
          extrapolate: 'clamp',
        });
        const scaleStyle = {
          transform: [
            {
              scale: sizeInterpolate,
            },
          ],
        };
        const opacityStyle = {
          opacity: this.animation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp',
          }),
        };
        const longitude = product.obj.geometry.coordinates[0];
        const latitude = product.obj.geometry.coordinates[1];
        return markers.push(
          <MapView.Marker
            key={product.obj._id}
            coordinate={{
              longitude,
              latitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={() => this._handleMarkerPress(index)}
          >
            <MarkerWrap style={opacityStyle}>
              <MarkerRing style={scaleStyle} />
              <Marker />
            </MarkerWrap>
          </MapView.Marker>,
        );
      });

      return markers;
    }
  };

  _renderMapView = () => {
    if (this.props.user.fetchingLocation) {
      return <Loading size="large" />;
    }
    return (
      <MapContainer>
        <MapView
          ref={map => (this.map = map)} // eslint-disable-line
          initialRegion={{ ...this.props.user.info.location, ...DEFAULT_DELTA }}
          region={this.state.region}
          onRegionChange={this._handleRegionChange}
          showsMyLocationButton
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={{ flex: 1 }}
        >
          {this._renderProductMarkers()}
          {this._renderUserMarker()}
        </MapView>

        <FuncContainer>
          {this.state.showRefreshButton &&
            <FuncButton title="Refresh" onPress={this._handleRefreshProduct} />}
        </FuncContainer>
      </MapContainer>
    );
  };

  _handleRefreshProduct = () => {
    const { longitude, latitude } = this.state.region;
    this.props.data.refetch({ latitude, longitude, DISTANCE });
    this.setState({ showRefreshButton: false });
  };

  render() {
    const { user } = this.props;

    return (
      <Root>
        {user.error && <Snackbar message={user.error} secondary />}
        {this._renderMapView()}
        <ProductsContainer>
          {this._renderProductsList()}
        </ProductsContainer>
      </Root>
    );
  }
}

export default compose(
  connect(
    state => ({
      user: state.user,
      products: state.product.products,
      cart: state.cart,
    }),
    {
      fetchProducts,
      clearCart,
    },
  ),
  graphql(GET_NEARBY_PRODUCTS_QUERY, {
    options: ({ user: { info: { location: { longitude, latitude } } } }) => ({
      variables: {
        longitude,
        latitude,
        distance: DISTANCE,
      },
    }),
  }),
)(ExploreScreen);
