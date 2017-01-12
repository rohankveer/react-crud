import axios from 'axios';
import store from '../store';
import { loginSuccess } from '../actions/login-actions';
var Config = require('Config');


/**
 * Login User
 */

export function loginUser(credentials) {
  return new Promise(function (resolve, reject) {
      axios.post(Config.loginUrl, credentials).then(function (response) {
        store.dispatch(loginSuccess(response.data));
        localStorage.setItem('user_token', "asda45asdasd666asd");
        resolve(response.data);
      }).catch(function (error) {
        console.log('Error :');
        console.log(error);
        reject(error);
      });
  });
}
