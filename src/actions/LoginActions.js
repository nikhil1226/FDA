import axios from 'axios';
import { userLoginType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function userLogin(userCredentials) {  
  return (dispatch) => {
    axios
       .post(`${config.BASE_URL}users/loginAuth?t=${Date.now()}`, userCredentials, HEADER_CONFIG)
       .then(response => {
         dispatch({
           type: userLoginType.USER_LOGIN_SUCCESS,
           userInfo: response.data.dbData
         });
       })
       .catch(err => {
         dispatch({ type: userLoginType.USER_LOGIN_ERROR, message: err });
       });
  };
}

export function doLogout() {
  return (dispatch) => {
    dispatch({
      type: userLoginType.USER_LOGOUT
    });
  };
}

export function checkNovartisUser(userCredentials) {
  console.log('checkNovartisUser()');
  return (dispatch) => {
    axios
      .post('https://eqarphubd.eu.novartis.net:8443/api/auth', userCredentials, HEADER_CONFIG)
      .then(response => {
        console.log(response, 'response');
        if (response.data) {
          dispatch(userLogin(userCredentials));
        } else {
          const resUserInfo = { isAuthenticated: false, loginMessage: 'InValid Credentials', userInfo: {} };
          dispatch({
            type: userLoginType.USER_LOGIN_SUCCESS,
            userInfo: resUserInfo
          });
        }
      })
      .catch(err => {
        dispatch({ type: userLoginType.USER_LOGIN_ERROR, message: err });
      });
  };
}
