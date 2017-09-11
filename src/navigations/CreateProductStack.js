import React from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import CreateNameScreen from '../screens/CreateProduct/CreateNameScreen';
import CreateDescriptionScreen from '../screens/CreateProduct/CreateDescriptionScreen';
import CreateAmountScreen from '../screens/CreateProduct/CreateAmountScreen';
import CreatePriceScreen from '../screens/CreateProduct/CreatePriceScreen';

export default StackNavigator(
  {
    CreateName: {
      screen: CreateNameScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Create Product',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
          >
            <Ionicons size={27} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    CreateDescription: {
      screen: CreateDescriptionScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Create Product',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('CreateName');
            }}
          >
            <Ionicons size={27} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    CreateAmount: {
      screen: CreateAmountScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Create Product',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('CreateDescription');
            }}
          >
            <Ionicons size={27} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
    CreatePrice: {
      screen: CreatePriceScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Create Product',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('CreateAmount');
            }}
          >
            <Ionicons size={27} name={icons.BACK} color={colors.WHITE} />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
    headerMode: 'none',
    navigationOptions: {
      title: 'Login',
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