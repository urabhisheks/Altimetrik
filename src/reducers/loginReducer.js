import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state=initialState, action){
    console.log('courseReducer');

  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
       logging: true,
       username: action.username
      };
      break;
    case types.LOGIN_SUCCESS:
      console.log('login success');
      return {
      isAuthenticated: true,
      username: action.username
      };
      break;
      case types.LOGOUT:
      console.log('logout success');
      return {
      isAuthenticated: false,
      username: ''
      };
      break;
    default:
      return state;
  }
}