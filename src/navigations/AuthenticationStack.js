import React from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { icons, colors } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import PhoneVerifyScreen from '../screens/PhoneVerifyScreen';
import SocialAuthScreen from '../screens/SocialAuthScreen';

const PhoneStack = StackNavigator(
  {
    EnterPhone: {
      screen: PhoneAuthScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
    VerifyPhone: {
      screen: PhoneVerifyScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Verify',
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
          >
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
    headerMode: 'none',
  },
);

export default StackNavigator(
  {
    Authentication: {
      screen: AuthenticationScreen,
      navigationOptions: {
        header: null,
      },
    },
    PhoneAuth: {
      screen: PhoneStack,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
          >
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
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
    SocialAuth: {
      screen: SocialAuthScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Login',
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerLeft: (
          <ButtonHeader
            side="left"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack();
            }}
          >
            <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
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
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
);
