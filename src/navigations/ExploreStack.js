import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import ExploreMapScreen from '../screens/ExploreMapScreen';
import SearchScreen from '../screens/SearchScreen';
import ExploreProductsScreen from '../screens/ExploreProductsScreen';
import CreateProductStack from './CreateProductStack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ConnectingScreen from '../screens/ConnectingScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import NewOrderScreen from '../screens/NewOrderScreen';

const RowView = styled.View`flexDirection: row;`;

const ExploreTab = TabNavigator(
  {
    ExploreProducts: {
      screen: ExploreProductsScreen,
      navigationOptions: {
        tabBarLabel: 'Products',
        tabBarIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.CART} size={22} />,
      },
    },
    ExploreMap: {
      screen: ExploreMapScreen,
      navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.EXPLORE} size={22} />,
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) =>
          <Ionicons color={tintColor} name={icons.SEARCH} size={22} />,
      },
    },
  },
  {
    tabBarPosition: 'top',
    animationEnabled: true,
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.SILVER,
      activeBackgroundColor: colors.WHITE,
      inactiveBackgroundColor: colors.WHITE,
      showLabel: false,
      showIcon: true,
      style: {
        height: 40,
        borderBottomColor: colors.LIGHT,
        borderBottomWidth: 1,
      },
    },
  },
);

export default StackNavigator(
  {
    Explore: {
      screen: ExploreTab,
      navigationOptions: ({ navigation, screenProps }) => ({
        title: 'Explore',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => navigation.navigate('DrawerOpen')}
          >
            <Ionicons size={27} name={icons.MENU} color={colors.WHITE} />
          </ButtonHeader>
        ),
        headerRight: (
          <RowView>
            {screenProps.cart &&
              screenProps.cart.product &&
              <ButtonHeader
                side="right"
                onPress={() =>
                  navigation.navigate('Checkout', screenProps.cart)}
              >
                <Ionicons size={33} name={icons.CART} color={colors.WHITE} />
              </ButtonHeader>}
            {/* <ButtonHeader
              side="right"
              onPress={() => navigation.navigate('Delivery')}
            >
              <Ionicons size={28} name={icons.NAVIGATE} color={colors.WHITE} />
            </ButtonHeader> */}
            <ButtonHeader
              side="right"
              onPress={() => navigation.navigate('CreateProduct')}
            >
              <Ionicons size={33} name={icons.ADD} color={colors.WHITE} />
            </ButtonHeader>
          </RowView>
        ),
      }),
    },
    CreateProduct: {
      screen: CreateProductStack,
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
          <RowView>
            <ButtonHeader side="right" onPress={() => {}}>
              <EvilIcons size={28} name={icons.SHARE} color={colors.WHITE} />
            </ButtonHeader>
            <ButtonHeader side="right" onPress={() => {}}>
              <EvilIcons size={28} name={icons.HEART} color={colors.WHITE} />
            </ButtonHeader>
          </RowView>
        ),
      }),
    },
    Category: {
      screen: CategoryScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Category',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
        headerRight: (
          <RowView>
            <ButtonHeader side="right" onPress={() => {}}>
              <EvilIcons size={28} name={icons.SHARE} color={colors.WHITE} />
            </ButtonHeader>
            <ButtonHeader side="right" onPress={() => {}}>
              <Ionicons size={22} name={icons.SEARCH} color={colors.WHITE} />
            </ButtonHeader>
          </RowView>
        ),
      }),
    },
    Connecting: {
      screen: ConnectingScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Connecting',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Checkout',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    Delivery: {
      screen: DeliveryScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Delivery',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    NewOrder: {
      screen: NewOrderScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'NewOrder',
        headerLeft: (
          <ButtonHeader side="left" onPress={() => navigation.goBack()}>
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'quicksand-regular',
        fontSize: 19,
        fontWeight: '200',
      },
    },
  },
);
