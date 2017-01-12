import axios from 'axios';
import store from '../store';
import { getShoesSuccess } from '../actions/shoe-actions';
var Config = require('Config');

/**
 * Get Documents
 */

export function getShoes(size,gender) {
    console.log(Config.getShoes + '?filter=gender eq "' + gender + '" and shoeSize eq ' + size);
  return axios.get(Config.getShoes + '?filter=gender eq "' + gender + '" and shoeSize eq ' + size)
    .then(response => {
      if(response.data.resources.length == 0){
            store.dispatch(getShoesSuccess([{error:true}]));
      } else {
            store.dispatch(getShoesSuccess(response.data.resources));   
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
