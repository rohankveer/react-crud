import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // add token before sending request
    if(localStorage.getItem("user_token")){
        config.headers.Authentication = localStorage.getItem("user_token");   
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });