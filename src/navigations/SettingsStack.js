import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import SettingsScreen from '../screens/SettingsScreen';

export default StackNavigator(
  {
    Setting: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
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
      headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'quicksand-regular',
        fontSize: 18,
        fontWeight: '200',
      },
    }),
  },
);
