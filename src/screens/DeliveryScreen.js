import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import PhoneNumber from 'awesome-phonenumber';
import { Ionicons } from '@expo/vector-icons';

import { icons, colors } from '../utils/constants';

import DirectionMap from '../components/DirectionMap';
import ActionButton from '../components/ActionButton';
import Connecting from '../components/Connecting';
import ProductCard from '../components/ProductCard';
import ButtonHeader from '../components/ButtonHeader';

const customer = {
  _id: '59b0e0b78971f55a9ff3ffb8',
  phone: '0917679524',
  avatar:
    'https://pbs.twimg.com/profile_images/820791841284993024/Z4Y14Iw5_400x400.jpg',
  email: 'bkdev98@gmail.com',
  name: 'Quốc Khánh',
};

const product = {
  _id: { $oid: '59b0e049bf908b599ca47754' },
  updatedAt: { $date: '2017-09-07T05:59:37.784Z' },
  createdAt: { $date: '2017-09-07T05:59:37.784Z' },
  slug: 'refined-cotton-chickenH1IGIgwCKW',
  user: { $oid: '59b0e049bf908b599ca4771a' },
  name: 'Refined Cotton Chicken',
  description:
    'Áo giết viết vẽ. Ghế ờ vàng biển thôi ác ghét phá. Thuyền ngọt một. Bàn em lỗi tủ đồng chỉ.',
  price: 121,
  geometry: {
    updatedAt: { $date: '2017-09-07T05:59:37.771Z' },
    createdAt: { $date: '2017-09-07T05:59:37.771Z' },
    coordinates: [56.1339, 66.7312],
    _id: { $oid: '59b0e049bf908b599ca47758' },
    type: 'point',
  },
  favoriteCount: 0,
  reviews: [
    {
      updatedAt: { $date: '2017-09-07T05:59:37.771Z' },
      createdAt: { $date: '2017-09-07T05:59:37.771Z' },
      user: { $oid: '59b0e049bf908b599ca4771a' },
      text: 'Ghế trăng biết đồng khâu trời trời. Lỗi khoảng dép.',
      rating: 4,
      _id: { $oid: '59b0e049bf908b599ca47757' },
    },
    {
      updatedAt: { $date: '2017-09-07T05:59:37.771Z' },
      createdAt: { $date: '2017-09-07T05:59:37.771Z' },
      user: { $oid: '59b0e049bf908b599ca4771a' },
      text: 'Hóa gì việc. Nón được hóa lầu đạp em yêu viết biết quê.',
      rating: 3,
      _id: { $oid: '59b0e049bf908b599ca47756' },
    },
    {
      updatedAt: { $date: '2017-09-07T05:59:37.771Z' },
      createdAt: { $date: '2017-09-07T05:59:37.771Z' },
      user: { $oid: '59b0e049bf908b599ca4771a' },
      text: 'Tô xanh cửa vá. Kim cái một mây đá.',
      rating: 5,
      _id: { $oid: '59b0e049bf908b599ca47755' },
    },
  ],
  availableCount: 88,
  soldCount: 20,
  images: [
    'http://lorempixel.com/640/480/food',
    'http://lorempixel.com/640/480/food',
    'http://lorempixel.com/640/480/food',
  ],
  __v: 0,
  orderRange: [5.0, 20.0],
  category: { $oid: '59c3b776410ba0f1168e12c8' },
};

const STARTLOC = {
  longitude: 106.674716277238,
  latitude: 10.8357100985339,
};

const DESTINATIONLOC = {
  longitude: 106.685600255083,
  latitude: 10.8365290624157,
};

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
`;

const MapContainer = styled.View`
  flex: 6.5;
  width: 100%;
`;

const InfoContainer = styled.View`
  width: 100%;
  height: 300px;
  justifyContent: center;
  alignItems: center;
  paddingHorizontal: 20px;
`;

const ProductCardWrapper = styled.View`top: 20px;`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 20;
  right: 20;
`;

const UserContainer = styled.View`
  height: 70;
  width: 100%;
  top: 20px;
  alignItems: center;
  overflow: visible;
  flexDirection: row;
`;

const AvatarWrapper = styled.View`
  width: 50;
  height: 50;
  overflow: visible;
  justifyContent: center;
  alignItems: center;
`;

const UserInfoContainer = styled.View`
  justifyContent: space-around;
  paddingLeft: 20px;
  backgroundColor: transparent;
`;

const Username = styled.Text`
  color: ${props => props.theme.PRIMARY};
  fontFamily: 'quicksand-medium';
  fontSize: 18;
`;

const Phone = styled.Text`
  color: ${props => props.theme.DARK};
  fontFamily: 'quicksand-regular';
  fontSize: 14;
`;

class DeliveryScreen extends Component {
  static navigationOptions = () => ({
    headerRight: (
      <ButtonHeader side="right">
        <Ionicons name={icons.INFO} size={24} color={colors.WHITE} />
      </ButtonHeader>
    ),
  });

  state = {
    modalVisible: false,
  };

  _handleOpenModal = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <Root>
        <MapContainer>
          <DirectionMap startLoc={STARTLOC} destinationLoc={DESTINATIONLOC} />
        </MapContainer>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <InfoContainer>
            <UserContainer>
              <AvatarWrapper>
                <Connecting avatar={customer.avatar} />
              </AvatarWrapper>
              <UserInfoContainer>
                <Username>
                  {customer.name}
                </Username>
                <Phone>
                  {PhoneNumber(customer.phone, 'VN').getNumber('international')}
                </Phone>
              </UserInfoContainer>
            </UserContainer>
            <ProductCardWrapper>
              <ProductCard
                product={product}
                showSelected={false}
                showCategory={false}
                hideReviews
                onPress={this._handleProductPressed}
                height={150}
              />
            </ProductCardWrapper>
          </InfoContainer>
        </Modal>
        <ActionButtonContainer>
          <ActionButton
            actionIcons={[icons.MESSAGE, icons.CALL, icons.NAVIGATE]}
            actionIconSize={[26, 26, 28]}
            icon={icons.MENU}
            iconSize={26}
          />
        </ActionButtonContainer>
      </Root>
    );
  }
}

export default DeliveryScreen;
