import moment from 'moment';
import { userLoginType } from '../actions/ActionTypes';

const loadFromLocalStorage = (key, defaultVal) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const DEFAULT_STATE = {
  userInfo: loadFromLocalStorage('userInfo', {}),
  isAuthendicated: loadFromLocalStorage('isAuthendicated', false),
  loginMessage: loadFromLocalStorage('loginMessage', '')
};

const initialLoginDefaultState = {
  userInfo: {},
  isAuthendicated: false,
  loginMessage: ''
};

const setLogin = (state, action) => {
  const newState = [];
  Object.assign(newState, state);
  localStorage.setItem('userInfo', JSON.stringify(action.userInfo.userInfo));
  localStorage.setItem('isAuthenticated', JSON.stringify(action.userInfo.isAuthenticated));
  localStorage.setItem('loginMessage', JSON.stringify(action.userInfo.loginMessage));
  localStorage.setItem('setupTime', new Date().getTime());
  if (action.userInfo.userInfo.applications) {
    localStorage.setItem('roleName', action.userInfo.userInfo.applications[0].Roles[0].roleName);
  }
  newState.userInfo = action.userInfo.userInfo;
  newState.isAuthendicated = action.userInfo.isAuthenticated;
  newState.loginMessage = action.userInfo.loginMessage;
  return newState;
};

const setDefault = (state, action) => {
  const newState = [];
  Object.assign(newState, state);
  Object.assign(newState, DEFAULT_STATE);
  return newState;
};

const setLoginFailed = (state, action) => {
  const newState = [];
  Object.assign(newState, state);
  newState.isAuthendicated = action.isAuthendicated;
  newState.loginMessage = action.loginMessage;
  return newState;
};

const doLogout = (state, action) => {
  const newState = {};
  Object.assign(newState, state);
  localStorage.removeItem('userInfo');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('loginMessage');
  localStorage.removeItem('setupTime');
  newState.userInfo = {};
  newState.isAuthendicated = false;
  newState.loginMessage = '';
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case userLoginType.USER_LOGIN_SUCCESS:
      return setLogin(state, action);

    case userLoginType.USER_LOGIN_FAILED:
      return setLoginFailed(state, action);

    case userLoginType.USER_LOGIN_ERROR:
      return setDefault(state, action);

    case userLoginType.USER_LOGOUT:
      return doLogout(state, action);

    default:
      return state;
  }
}
