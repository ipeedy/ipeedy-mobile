import React, { Component } from 'react';
import styled from 'styled-components/native';
import { RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import StarRating from 'react-native-star-rating';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import GET_PRODUCT_QUERY from '../graphql/queries/product';
import GET_NEARBY_PRODUCT_QUERY from '../graphql/queries/nearbyProducts';
import DELETE_PRODUCT_MUTATION from '../graphql/mutations/deleteProduct';
import { createNotification } from '../actions/notification';
import { colors, icons } from '../utils/constants';
import { getPrice } from '../utils/helpers';

import CircleButton from '../components/CircleButton';
import ActionButton from '../components/ActionButton';
import DirectionMap from '../components/DirectionMap';
import { Header, Text, Subtitle } from '../components/typography';

const Root = styled.View`
  flex: 1;
  position: relative;
`;

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {},
})`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const Divider = styled.View`
  width: 100%;
  height: 1;
  backgroundColor: ${props => props.theme.LIGHT};
  marginTop: 10;
  marginBottom: 10;
`;

const Image = styled.Image`
  width: 100%;
  height: 200;
  alignSelf: stretch;
  backgroundColor: ${props => props.theme.LIGHT};
`;

const ContentWrapper = styled.View`
  width: 100%;
  minHeight: 700;
  paddingHorizontal: 20;
  paddingVertical: 20;
`;

const MetaContainer = styled.View`
  flexDirection: row;
  width: 100%;
  height: 60;
  alignSelf: stretch;
  alignItems: center;
  justifyContent: space-between;
`;

const ReviewMetaContainer = styled(MetaContainer)`
  justifyContent: flex-start;
  top: 5;
`;

const OwnerInfoContainer = styled.View`justifyContent: flex-start;`;

const OwnerAvatar = styled.Image`
  width: 54;
  height: 54;
  borderRadius: 27;
  backgroundColor: pink;
`;

const MetaItem = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  height: 100%;
`;

const DescriptionContainer = styled.View`
  width: 100%;
  maxHeight: 130;
`;

const ReviewContainer = styled.View`
  width: 100%;
  maxHeight: 200;
`;

const LocationContainer = styled.View`
  width: 100%;
  maxHeight: 200;
`;

const MapContainer = styled.View`
  height: 180;
  top: 10;
  marginBottom: 10;
`;

const CircleButtonContainer = styled.View`
  position: absolute;
  bottom: 20;
  right: 20;
`;

const ReviewFooterContainer = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  top: 10;
  paddingBottom: 10;
`;

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.product.name,
  });

  state = {
    product: this.props.navigation.state.params.product,
    refreshing: false,
  };

  _renderImages = images => {
    if (images.length > 0)
      return images.map(
        (image, idx) => <Image key={idx} source={{ uri: image }} />, // eslint-disable-line
      );
    return <View />;
  };

  _renderReview = reviews => {
    if (reviews.length > 0)
      return (
        <View>
          <ReviewMetaContainer>
            <OwnerAvatar source={{ uri: reviews[0].user.avatar }} />
            <OwnerInfoContainer style={{ left: 20 }}>
              <Subtitle medium>
                {reviews[0].user.name}
              </Subtitle>
              <Text>{`${distanceInWordsToNow(reviews[0].createdAt)} ago`}</Text>
            </OwnerInfoContainer>
          </ReviewMetaContainer>
          <Text numberOfLines={3} style={{ top: 5 }}>
            {reviews[0].text}
          </Text>
        </View>
      );
    return <View />;
  };

  _onRefresh = async () => {
    const { data: { getProduct } } = await this.props.client.query({
      query: GET_PRODUCT_QUERY,
      variables: { _id: this.state.product._id },
    });
    this.setState({ product: getProduct });
  };

  _handleCheckout = () => {
    this.props.navigation.navigate('Checkout', {
      product: this.state.product,
    });
  };

  _handleDeleteProduct = () => {
    this.props.client.mutate({
      mutation: DELETE_PRODUCT_MUTATION,
      variables: {
        _id: this.state.product._id,
      },
      update: (store, { data: { deleteProduct } }) => {
        const variables = {
          latitude: this.props.user.location.latitude,
          longitude: this.props.user.location.longitude,
          distance: 2000,
        };
        const data = store.readQuery({
          query: GET_NEARBY_PRODUCT_QUERY,
          variables,
        });
        data.getNearbyProducts = data.getNearbyProducts.filter(
          product => product.obj._id !== deleteProduct._id,
        );
        store.writeQuery({ query: GET_NEARBY_PRODUCT_QUERY, variables, data });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteProduct: {
          __typename: 'DeleteStatus',
          message: 'Product removed!',
          error: false,
          _id: this.state.product._id,
        },
      },
    });
    this.props.createNotification({
      error: false,
      message: 'Product removed!',
    });
    this.props.navigation.navigate('Explore');
  };

  _renderActionButton = () => {
    if (this.state.product.user._id !== this.props.user._id) {
      return (
        <CircleButtonContainer>
          <CircleButton secondary onPress={this._handleCheckout}>
            <Ionicons name={icons.CART} size={27} color={colors.WHITE} />
          </CircleButton>
        </CircleButtonContainer>
      );
    }
    return (
      <CircleButtonContainer>
        <ActionButton
          actionIcons={[icons.TRASH, icons.PAUSE, icons.EDIT]}
          pressAction={i => i === 0 && this._handleDeleteProduct()}
        />
      </CircleButtonContainer>
    );
  };

  render() {
    const { product } = this.state;

    let totalRating = 0;

    product.reviews.map(review => (totalRating += review.rating)); // eslint-disable-line

    return (
      <Root>
        <Container
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Swiper autoplay style={{ height: 200 }} showsPagination={false}>
            {product.images.length > 0
              ? this._renderImages(product.images)
              : <Image source={require('../../assets/images/no-image.png')} />}
          </Swiper>

          <ContentWrapper>
            <Header bold>
              {product.name}
            </Header>

            <MetaContainer>
              <OwnerInfoContainer>
                <Subtitle medium>
                  {product.category.name || 'Undefined'}
                </Subtitle>
                <Subtitle>
                  by
                  <Subtitle primary>
                    {' '}{product.user.name || 'Alexandra Seller'}
                  </Subtitle>
                </Subtitle>
              </OwnerInfoContainer>
              <OwnerAvatar
                source={{
                  uri: product.user.avatar || 'https://i.imgur.com/MnRjDje.jpg',
                }}
              />
            </MetaContainer>

            <Divider />

            <MetaContainer>
              <MetaItem>
                <Ionicons size={28} color={colors.DARK} name={icons.PRICE} />
                <Text>
                  {getPrice(product.price)}
                </Text>
              </MetaItem>
              <MetaItem>
                <Ionicons
                  size={28}
                  color={colors.DARK}
                  name={icons.FAVORITES}
                />
                <Text>
                  {product.favoriteCount
                    ? `${product.favoriteCount} love`
                    : 'no love'}
                </Text>
              </MetaItem>
              <MetaItem>
                <Ionicons size={30} color={colors.DARK} name={icons.CART} />
                <Text>
                  {`${product.orderRange[0]} - ${product.orderRange[1]}/order`}
                </Text>
              </MetaItem>
            </MetaContainer>

            <MetaContainer>
              <MetaItem>
                <Ionicons size={30} color={colors.DARK} name={icons.TIME} />
                <Text>8h - 19h</Text>
              </MetaItem>
              <MetaItem>
                <Ionicons size={30} color={colors.DARK} name={icons.BASKET} />
                <Text>
                  {product.availableCount} left
                </Text>
              </MetaItem>
              <MetaItem>
                <Ionicons
                  size={30}
                  color={colors.DARK}
                  name={icons.CHECKMARK}
                />
                <Text>
                  {product.soldCount} done
                </Text>
              </MetaItem>
            </MetaContainer>

            <Divider />

            <DescriptionContainer>
              <Subtitle medium>Description</Subtitle>
              <Text numberOfLines={3} style={{ top: 5 }}>
                {product.description}
              </Text>
            </DescriptionContainer>

            <Divider />

            <ReviewContainer>
              <Subtitle medium>Reviews</Subtitle>
              {this._renderReview(product.reviews)}
              <ReviewFooterContainer>
                <Subtitle primary>
                  Read all {product.reviews.length} reviews
                </Subtitle>
                <StarRating
                  disabled
                  rating={totalRating / product.reviews.length}
                  starColor={colors.SECONDARY_A}
                  emptyStarColor={colors.SECONDARY_B}
                  starSize={15}
                />
              </ReviewFooterContainer>
            </ReviewContainer>

            <Divider />

            <LocationContainer>
              <Subtitle medium>Location</Subtitle>
              <MapContainer>
                <DirectionMap
                  startLoc={this.props.user.location}
                  destinationLoc={{
                    longitude: product.geometry.coordinates[0],
                    latitude: product.geometry.coordinates[1],
                  }}
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Text medium primary>
                    {parseInt(product.dis, 10)}m from here
                  </Text>
                </DirectionMap>
              </MapContainer>
            </LocationContainer>

            <Divider />
          </ContentWrapper>
        </Container>
        {this._renderActionButton()}
      </Root>
    );
  }
}

export default withApollo(
  connect(state => ({ user: state.user.info }), { createNotification })(
    ProductDetailScreen,
  ),
);
