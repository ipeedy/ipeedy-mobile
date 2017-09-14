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
      navigationOptions: ({ navigation }) => ({
        title: 'Settings',
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
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
);
