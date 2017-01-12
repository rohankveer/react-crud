import axios from 'axios';
import store from '../store';
import { getUsersSuccess, getTotalUsersSuccess, getUsersByIdSuccess, deleteUserSuccess, userProfileSuccess, getUsersByNameSuccess } from '../actions/user-actions';
require('../interceptor/interceptor');
var Config = require('Config');

/**
 * Get all users
 */

export function getUsers() {

    // add sort by query
  let sort_query = "";
  if(store.getState().filterState.filter.sortBy !== null ){
      sort_query = "?sortBy=" + store.getState().filterState.filter.sortBy.key + "&sortOrder=" + store.getState().filterState.filter.sortBy.order + "&startIndex=" + store.getState().userState.startIndex + "&count=" + Config.itemsPerPage;
  }
  if( store.getState().filterState.filter.query !== null ){
      sort_query = sort_query + '&filter=name co "' + store.getState().filterState.filter.query + '"';
  }
    console.log(Config.getUsers + sort_query);
  return axios.get(Config.getUsers + sort_query)
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getTotalUsers() {

  return axios.get(Config.getUsers)
    .then(response => {
      store.dispatch(getTotalUsersSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}


/**
 * Get all users by name
 */

export function getUsersByName(name) {

    /* for now lets handle it on client side */
    
    /*let users_by_name = store.getState().userState.users.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
    })
    store.dispatch(getUsersByNameSuccess(users_by_name));*/
    
    return axios.get(Config.getUsers)
    .then(response => {
      let users_by_name = response.data.resources.filter((user) => {
            return ( user.name.toLowerCase().includes(name.toLowerCase()) || user.email.toLowerCase().includes(name.toLowerCase() ) );
        });
      store.dispatch(getUsersByNameSuccess(users_by_name));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  /*return axios.get(Config.getUsersByName + encodeURIComponent(name))
    .then(response => {
      store.dispatch(getUsersByName(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });*/
}

/**
 * Get User By id
 */

export function getUserById(email_id) {

  // add sort by query
  let sort_query = "";
  if(store.getState().filterState.filter.sortBy !== null ){
      sort_query = "?sortBy=" + store.getState().filterState.filter.sortBy.key + "&sortOrder=" + store.getState().filterState.filter.sortBy.order;
  }
  return axios.get(Config.getUsersById + encodeURIComponent(email_id))
    .then(response => {
      store.dispatch(getUsersByIdSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Search users
 */

export function searchUsers(query = '') {
  return axios.get(userApiUrl+'?q='+ query)
    .then(response => {
      store.dispatch(getUsersSuccess(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete a user
 */

export function deleteUser(userEmail) {
  return axios.delete(userApiUrl+'/email/'+userEmail)
    .then(response => {
      store.dispatch(deleteUserSuccess(userEmail));
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * getProfile() is much more complex because it has to make
 * three XHR requests to get all the profile info.
 */

export function getProfile(userId) {
  let profile = {};
  return axios.get(userApiUrl+'/'+ userId)
    .then(response => {
      let user = response.data;
      profile.name = user.name;
      profile.twitter = user.twitter;
      profile.worksOn = user.worksOn;
      store.dispatch(userProfileSuccess(profile));
      return profile;
    });
}
