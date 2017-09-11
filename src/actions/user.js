import { AsyncStorage } from 'react-native';

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

export function updateUserLocation(coordinates) {
  return {
    type: 'UPDATE_USER_LOCATION',
    coordinates,
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
