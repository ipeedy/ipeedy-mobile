import React, { Component } from 'react';
import styled from 'styled-components/native';
import { RefreshControl, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import StarRating from 'react-native-star-rating';
import { withApollo } from 'react-apollo';

import GET_PRODUCT_QUERY from '../graphql/queries/product';
import { colors, icons } from '../utils/constants';
import { getPrice } from '../utils/helpers';

import CircleButton from '../components/CircleButton';

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
  height: 600;
  paddingHorizontal: 20;
  paddingVertical: 20;
`;

const Name = styled.Text`
  fontFamily: 'quicksand-bold';
  fontSize: 25;
  color: ${props => props.theme.DARK};
`;

const MetaContainer = styled.View`
  flexDirection: row;
  width: 100%;
  height: 70;
  alignSelf: stretch;
  alignItems: center;
  justifyContent: space-between;
`;

const ReviewMetaContainer = styled(MetaContainer)`
  justifyContent: flex-start;
`;

const OwnerInfoContainer = styled.View`justifyContent: flex-start;`;

const MetaText = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 16;
  color: ${props => props.theme.DARK};
`;

const MetaTitle = styled(MetaText)`
  fontFamily: 'quicksand-medium';
`;

const MetaButtonText = styled(MetaText)`
  color: ${props => props.theme.PRIMARY};
`;

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

const MetaItemText = styled.Text`
  fontFamily: 'quicksand-regular';
  fontSize: 14;
  color: ${props => props.theme.DARK};
`;

const DescriptionContainer = styled.View`
  width: 100%;
  maxHeight: 130;
`;

const ReviewContainer = styled.View`
  width: 100%;
  maxHeight: 200;
`;

const Description = styled(MetaItemText)`
  top: 10;
  paddingBottom: 20;
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
              <MetaTitle>
                {reviews[0].user.name}
              </MetaTitle>
              <MetaItemText>{`${distanceInWordsToNow(
                reviews[0].createdAt,
              )} ago`}</MetaItemText>
            </OwnerInfoContainer>
          </ReviewMetaContainer>
          <Description>
            {reviews[0].text}
          </Description>
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
            {this._renderImages(product.images)}
          </Swiper>

          <ContentWrapper>
            <Name>
              {product.name}
            </Name>

            <MetaContainer>
              <OwnerInfoContainer>
                <MetaTitle>
                  {product.category || 'Fast food'}
                </MetaTitle>
                <MetaText>
                  by
                  <MetaButtonText>
                    {' '}{product.user.name || 'Alexandra Seller'}
                  </MetaButtonText>
                </MetaText>
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
                <Ionicons size={30} color={colors.DARK} name={icons.CASH} />
                <MetaItemText>
                  {getPrice(product.price)}
                </MetaItemText>
              </MetaItem>
              <MetaItem>
                <Ionicons size={30} color={colors.DARK} name={icons.TIME} />
                <MetaItemText>8h - 19h</MetaItemText>
              </MetaItem>
              <MetaItem>
                <Ionicons size={30} color={colors.DARK} name={icons.BASKET} />
                <MetaItemText>
                  {product.availableCount} left
                </MetaItemText>
              </MetaItem>
              <MetaItem>
                <Ionicons
                  size={30}
                  color={colors.DARK}
                  name={icons.CHECKMARK}
                />
                <MetaItemText>
                  {product.soldCount} done
                </MetaItemText>
              </MetaItem>
            </MetaContainer>

            <Divider />

            <DescriptionContainer>
              <MetaTitle>Description</MetaTitle>
              <Description>
                {product.description}
              </Description>
            </DescriptionContainer>

            <Divider />

            <ReviewContainer>
              <MetaTitle>Reviews</MetaTitle>
              {this._renderReview(product.reviews)}
              <ReviewFooterContainer>
                <MetaButtonText>
                  Read all {product.reviews.length} reviews
                </MetaButtonText>
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
          </ContentWrapper>
        </Container>
        <CircleButtonContainer>
          <CircleButton secondary>
            <Ionicons name={icons.CART} size={27} color={colors.WHITE} />
          </CircleButton>
        </CircleButtonContainer>
      </Root>
    );
  }
}

export default withApollo(ProductDetailScreen);
