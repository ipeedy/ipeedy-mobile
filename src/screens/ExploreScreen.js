import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { MapView } from 'expo';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/product';
import GET_NEARBY_PRODUCTS_QUERY from '../graphql/queries/nearbyProducts';

import MapStyle from '../utils/mapstyle';
import { colors } from '../utils/constants';

import UserMarker from '../components/UserMarker';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Snackbar from '../components/Snackbar';
import FuncButton from '../components/FuncButton';
import { CARD_WIDTH } from '../components/ProductCard';

const DEFAULT_DELTA = {
  latitudeDelta: 0.016,
  longitudeDelta: 0.008,
};

const DISTANCE = 10000;

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
    userRegion: this.props.user.location,
    productFetched: false,
    selectedProduct: 0,
    showRefreshButton: false,
  };

  componentWillMount() {
    this.animation = new Animated.Value(0);
    this.index = 0;
  }

  componentDidMount() {
    const {
      user: { info: { location: { longitude, latitude } } },
    } = this.props;
    this._getNearbyProduct(latitude, longitude, DISTANCE);
  }

  _handleRegionChange = region =>
    this.setState({ region, showRefreshButton: true });

  _handleProductPressed = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  _getNearbyProduct = async (latitude, longitude, distance) => {
    this.setState({ productFetched: false });
    const { data } = await this.props.client.query({
      query: GET_NEARBY_PRODUCTS_QUERY,
      variables: {
        latitude,
        longitude,
        distance,
      },
    });
    this.props.fetchProducts(data);
    this.setState({ productFetched: true });
    this._addMapViewEventListener();
  };

  _addMapViewEventListener = () => {
    const { products } = this.props;

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

  _renderProductsList = () => {
    if (!this.state.productFetched) {
      return <Loading size="large" color={colors.PRIMARY} />;
    }

    return (
      <ProductList
        distance={10000000}
        animation={this.animation}
        productPressed={this._handleProductPressed}
        onRefresh={ref => (this.productList = ref)}
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
    if (this.state.productFetched) {
      const markers = [];
      this.props.products.map((product, index) => {
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

  _handleRefreshProduct = () => {
    const { longitude, latitude } = this.state.region;
    this._getNearbyProduct(latitude, longitude, DISTANCE);
    this.setState({ showRefreshButton: false });
  };

  render() {
    const { user } = this.props;

    return (
      <Root>
        {user.error && <Snackbar message={user.error} secondary />}
        <MapContainer>
          <MapView
            ref={map => (this.map = map)} // eslint-disable-line
            initialRegion={{ ...user.info.location, ...DEFAULT_DELTA }}
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
              <FuncButton
                title="Refresh"
                onPress={this._handleRefreshProduct}
              />}
          </FuncContainer>
        </MapContainer>
        <ProductsContainer>
          {this._renderProductsList()}
        </ProductsContainer>
      </Root>
    );
  }
}

export default withApollo(
  connect(state => ({ user: state.user, products: state.product.products }), {
    fetchProducts,
  })(ExploreScreen),
);
