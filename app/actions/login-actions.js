import * as types from '../actions/action-types';

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function resetLoginState() {
  return {
    type: types.RESET_LOGIN,
  };
}
