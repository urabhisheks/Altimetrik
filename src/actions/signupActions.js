import * as types from './actionTypes';
import axios from 'axios';

export function signupRequest(username, password){
  console.log('signup Actions signupRequest');

  return {type: types.signup_REQUEST, username, password}
}

export function signupError(error){
   console.log('signup Actions signupError');
   return {type: types.signup_ERROR}
}


export function signupSuccess(username){
  console.log('signup Actions signupSuccess');

  return {type: types.signup_SUCCESS, username}
}

export  function initiateSignup(userdata){
  console.log('signup Actions initiatesignup');
  return function (dispatch) {
    const {firstname, lastname, username, email, password} = userdata;
    const postBody = {firstname,
                      lastname,
                      username,
                      email,
                      password};
    return axios.post(`/signup`, postBody);
  };
}

  export  function doesUserExists(val){
    console.log('signup Actions isUserExists', val);
    return function (dispatch) {
      return axios.get(`/${val}`);
    };
  };


