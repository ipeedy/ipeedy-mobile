import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { MapView } from 'expo';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/product';
import GET_NEARBY_PRODUCTS_QUERY from '../graphql/queries/nearbyProducts';

import MapStyle from '../utils/mapstyle';
import { colors, icons } from '../utils/constants';

import UserMarker from '../components/UserMarker';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Snackbar from '../components/Snackbar';
import FuncButton from '../components/FuncButton';

const DEFAULT_DELTA = {
  latitudeDelta: 0.0922 / 2,
  longitudeDelta: 0.0421 / 2,
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
`;

const MarkerRing = styled(Animated.View)`
  width: 24;
  height: 24;
  borderRadius: 12;
  backgroundColor: rgba(130,4,150, 0.3);
  position: absolute;
  borderWidth: 1;
  borderColor: rgba(130,4,150, 0.5);
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

  _renderProductMarkers = () => {};

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
            ref={component => (this._map = component)} // eslint-disable-line
            initialRegion={{ ...user.info.location, ...DEFAULT_DELTA }}
            region={this.state.region}
            onRegionChange={this._handleRegionChange}
            showsMyLocationButton
            provider={MapView.PROVIDER_GOOGLE}
            customMapStyle={MapStyle}
            style={{ flex: 1 }}
          >
            {this._renderUserMarker()}
            {this._renderProductMarkers()}
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
