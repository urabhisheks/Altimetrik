import * as types from './actionTypes';
import axios from 'axios';


export function loginRequest(username, password){
  console.log('Login Actions loginRequest');

  return {type: types.LOGIN_REQUEST, username, password}
}

export function loginError(error){
   console.log('Login Actions loginError');
   return {type: types.LOGIN_ERROR}
}


export function loginSuccess(username){
  console.log('Login Actions loginSuccess');

  return {type: types.LOGIN_SUCCESS, username}
}
export function logoutSuccess(){
  console.log('logout Actions logoutSuccess');

  return {type: types.LOGOUT}
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('username');
    dispatch(logoutSuccess());
  }
}


export  function initiateLogin(username, password){
  console.log('Login Actions initiateLogin');
  return function (dispatch) {
    return axios.get(`/${username}/${username}`)
           .then(res => {
             console.log(res.data);
             localStorage.setItem('username', res.data);
             dispatch(loginSuccess(res.data))
           });
  };
}

