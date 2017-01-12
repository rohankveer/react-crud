import * as types from '../actions/action-types';

export function getUsersSuccess(data) {
  return {
    type: types.GET_USERS_SUCCESS,
    users : data.resources,
    startIndex: data.startIndex,
    itemsPerPage: data.itemsPerPage,
    totalUsers : data.totalResults
  };
}

export function getUsersByNameSuccess(data){
    return {
        type: types.GET_USERS_BY_NAME,
        users : data,
      };
}

export function getTotalUsersSuccess( data ){
    return {
        type: types.GET_TOTAL_USERS_SUCCESS,
        users : data.resources,
        startIndex: data.startIndex,
        itemsPerPage: data.itemsPerPage,
        totalUsers : data.totalResults
      };
}

export function resetUserState(){
    return {
        type: types.RESET_USER_STATE,
      };
}

export function getUsersByIdSuccess(data) {
  return {
    type: types.GET_USERS_SUCCESS_BY_ID,
    user : data,
  };
}

export function deleteUserSuccess(userEmail) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userEmail
  };
}

export function userProfileSuccess(userProfile) {
  return {
    type: types.USER_PROFILE_SUCCESS,
    userProfile
  };
}

export function setFilterState(filter) {
  return {
    type: types.SET_FILTER_STATE,
    filter
  };
}

export function setQueryState(query) {
  return {
    type: types.SET_QUERY_STATE,
    query
  };
}

export function setPaginationState( startIndex , currentPage ){
    return {
        type: types.SET_PAGINATION_STATE,
        startIndex,
        currentPage
      };
}
