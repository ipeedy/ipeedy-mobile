import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import UpdateNameScreen from '../screens/UpdateUserInfo/UpdateNameScreen';
import UpdateEmailScreen from '../screens/UpdateUserInfo/UpdateEmailScreen';

const UpdateInfoStack = StackNavigator(
  {
    UpdateName: {
      screen: UpdateNameScreen,
    },
    UpdateEmail: {
      screen: UpdateEmailScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      title: 'Update Info',
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerLeft: (
        <ButtonHeader side="left" onPress={() => navigation.goBack(null)}>
          <Ionicons size={32} name={icons.BACK} color={colors.WHITE} />
        </ButtonHeader>
      ),
      headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'quicksand-regular',
        fontSize: 18,
        fontWeight: '200',
      },
    }),
  },
);

export default UpdateInfoStack;
