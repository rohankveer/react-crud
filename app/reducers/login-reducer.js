import * as types from '../actions/action-types';

/* check if user has logged in */

let userLoggedin = (localStorage.user_token) ? true : false;

const initialState = {
  loggedinUser: userLoggedin,
  token: null
};

const loginReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, { loggedinUser: true });
    case types.RESET_LOGIN:
      return Object.assign({}, state, { loggedinUser: false });
  }
  return state;
}

export default loginReducer;
