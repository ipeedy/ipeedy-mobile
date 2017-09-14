import { StackNavigator } from 'react-navigation';

import { colors } from '../utils/constants';

import UpdateNameScreen from '../screens/UpdateUserInfo/UpdateNameScreen';
import UpdateEmailScreen from '../screens/UpdateUserInfo/UpdateEmailScreen';

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

export default UpdateInfo;
