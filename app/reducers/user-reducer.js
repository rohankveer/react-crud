import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  users: [],
  user: {
      userScanData: []
  },
  userProfile: {
    repos: []
  },
  totalUsers : 0,
  totalUsersArray: [],
  currentPage: 1,
  startIndex: 0,
  filter:{
    query: null,
    sortBy: {
            key: "name",
            order: "ascending"
        }
    }
};

const userReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users, totalUsers: action.totalUsers });
          
    case types.GET_USERS_BY_NAME:
      return Object.assign({}, state, { users: action.users });
          
    case types.GET_USERS_SUCCESS_BY_ID:
      return Object.assign({}, state, { user: action.user });

    case types.DELETE_USER_SUCCESS:

      // Use lodash to create a new user array without the user we want to remove
      const newUsers = _.filter(state.users, user => user.id != action.userId);
      return Object.assign({}, state, { users: newUsers });

    case types.USER_PROFILE_SUCCESS:
      return Object.assign({}, state, { userProfile: action.userProfile });
          
    case types.RESET_USER_STATE:
      return Object.assign({}, state, { user: { userScanData: []  } });
          
    case types.SET_PAGINATION_STATE:
      return Object.assign({}, state, { startIndex: action.startIndex, currentPage: action.currentPage });
          
    case types.GET_TOTAL_USERS_SUCCESS:
      return Object.assign({}, state, { totalUsersArray: action.users, totalUsers: action.totalUsers });

  }

  return state;

}

export default userReducer;
