import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import ExploreScreen from '../screens/ExploreScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const View = styled.View`flexDirection: row;`;

export default StackNavigator(
  {
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        title: 'Explore',
      },
    },
    CreateProduct: {
      screen: CreateProductScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Create Product',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
        headerRight: null,
      }),
    },
    ProductDetail: {
      screen: ProductDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Product Detail',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
        headerRight: (
          <View>
            <ButtonHeader side="right" onPress={() => {}}>
              <EvilIcons size={28} name={icons.SHARE} color={colors.WHITE} />
            </ButtonHeader>
            <ButtonHeader side="right" onPress={() => {}}>
              <EvilIcons size={28} name={icons.HEART} color={colors.WHITE} />
            </ButtonHeader>
          </View>
        ),
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerLeft: (
        <ButtonHeader
          side="left"
          onPress={() => navigation.navigate('DrawerOpen')}
        >
          <Ionicons size={27} name={icons.MENU} color={colors.WHITE} />
        </ButtonHeader>
      ),
      headerRight: (
        <ButtonHeader
          side="right"
          onPress={() => navigation.navigate('CreateProduct')}
        >
          <Ionicons size={33} name={icons.ADD} color={colors.WHITE} />
        </ButtonHeader>
      ),
      headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'quicksand-regular',
        fontSize: 19,
        fontWeight: '200',
      },
    }),
  },
);
