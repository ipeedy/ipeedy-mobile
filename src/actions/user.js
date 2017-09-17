import { AsyncStorage, Platform } from 'react-native';
import { Location, Permissions, Constants } from 'expo';

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info,
  };
}

export function updateUserLocation() {
  return async dispatch => {
    dispatch({ type: 'UPDATE_USER_LOCATION' });
    try {
      if (Platform.OS === 'android' && !Constants.isDevice)
        throw new Error(
          'Not support Android emulator. Try again on your device!',
        );
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted')
        throw new Error('Permission to access location was denied');
      const { coords } = await Location.getCurrentPositionAsync({});
      return dispatch({
        type: 'UPDATE_USER_LOCATION_SUCCESSED',
        payload: {
          location: coords,
        },
      });
    } catch (error) {
      return dispatch({
        type: 'UPDATE_USER_LOCATION_FAILED',
        payload: {
          error: error.message,
        },
      });
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('@ipeedy');
      return dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      throw error;
    }
  };
}
