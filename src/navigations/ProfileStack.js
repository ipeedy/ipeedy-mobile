import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { colors, icons } from '../utils/constants';

import ButtonHeader from '../components/ButtonHeader';

import ProfileScreen from '../screens/ProfileScreen';
import UpdateNameScreen from '../screens/UpdateUserInfo/UpdateNameScreen';
import UpdateEmailScreen from '../screens/UpdateUserInfo/UpdateEmailScreen';

const ProfileDetail = StackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
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

const UpdateInfo = StackNavigator(
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
    navigationOptions: () => ({
      title: 'Update Info',
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerLeft: null,
      headerTitleStyle: {
        color: colors.WHITE,
        fontFamily: 'quicksand-regular',
        fontSize: 18,
        fontWeight: '200',
      },
    }),
  },
);

class ProfileStack extends Component {
  render() {
    const { user } = this.props;
    if (!user.name || !user.email) return <UpdateInfo screenProps={user} />;
    return <ProfileDetail />;
  }
}

export default connect(state => ({ user: state.user.info }))(ProfileStack);
