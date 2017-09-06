import React, { Component } from 'react';
import { Platform, FlatList, Animated, LayoutAnimation } from 'react-native';
import styled from 'styled-components/native';
import { MapView, Location, Permissions, Constants } from 'expo';
import { graphql, withApollo } from 'react-apollo';

import GET_PRODUCTS_QUERY from '../graphql/queries/products';

import MapStyle from '../utils/mapstyle';
import { colors } from '../utils/constants';

import UserMarker from '../components/UserMarker';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

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
  showsMyLocationButton: true,
  provider: MapView.PROVIDER_GOOGLE,
  customMapStyle: MapStyle,
})`
  flex: 1;
`;

const ProductsContainer = styled.View`
  flex: 3;
  backgroundColor: ${props => props.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`;

const ProductList = styled(FlatList).attrs({
  horizontal: true,
  contentContainerStyle: {
    left: 4,
  },
  snapToInterval: 175,
  showsHorizontalScrollIndicator: false,
  scrollEventThrottle: 1,
})`
  flex: 1;
`;

const ProductListSpace = styled.View`
  width: 8;
  height: 100%;
`;

class ExploreScreen extends Component {
  state = {
    error: null,
    region: null,
    userRegion: null,
    fetchingProducts: true,
    products: [],
    selectedProduct: 0,
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Not support Android emulator. Try again on your device!',
      });
    } else {
      this._watchUserPositionAsync();
    }
  }

  componentWillUnmount() {
    this.watchLocation.remove();
  }

  _watchUserPositionAsync = async () => {
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
      },
      () => this._getProducts(),
    );

    this.watchLocation = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 15000,
        distanceInterval: 10,
      },
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          userRegion: {
            latitude,
            longitude,
          },
        });
      },
    );
  };

  _getProducts = async () => {
    const { data: { getProducts } } = await this.props.client.query({
      query: GET_PRODUCTS_QUERY,
    });
    this.setState({
      fetchingProducts: false,
      products: getProducts,
    });
  };

  _handleRegionChange = region => this.setState({ region });

  _handleScroll = event => {
    LayoutAnimation.spring();
    this.setState({
      selectedProduct: Math.trunc(event.nativeEvent.contentOffset.x / 175),
    });
  };

  _renderProductsList = () => {
    if (this.state.fetchingProducts) {
      return <Loading size="large" color={colors.PRIMARY} />;
    }

    return (
      <ProductList
        data={this.state.products}
        keyExtractor={product => product._id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.props.animation,
                },
              },
            },
          ],
          {
            listener: this._handleScroll,
          },
        )}
        renderItem={({ item, index }) =>
          <ProductCard
            product={item}
            selected={this.state.selectedProduct === index}
          />}
        ListFooterComponent={() => <ProductListSpace />}
        ListHeaderComponent={() => <ProductListSpace />}
      />
    );
  };

  render() {
    return (
      <Root>
        <MapContainer>
          <Map
            initialRegion={{ ...INITIAL_REGION, ...DEFAULT_DELTA }}
            region={this.state.region}
            onRegionChange={this._handleRegionChange}
          >
            <MapView.Marker
              coordinate={this.state.userRegion || INITIAL_REGION}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <UserMarker />
            </MapView.Marker>
          </Map>
        </MapContainer>
        <ProductsContainer>
          {this._renderProductsList()}
        </ProductsContainer>
      </Root>
    );
  }
}

export default withApollo(graphql(GET_PRODUCTS_QUERY)(ExploreScreen));
