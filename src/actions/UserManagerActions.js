import axios from 'axios';
import _get from 'lodash/get';
import { userManagerType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllApplicationHeader() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}users/getAllApplicationHeader?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: userManagerType.USER_GET_ALL_APPLICATION_HEADER,
          applicationHeaderList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}
export function getAllLevelLists(applicationRecordId, isGlobal) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}users/getAllLevelLists/applicationRecordId/${applicationRecordId}/isGlobal/${isGlobal}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: userManagerType.USER_GET_ALL_METRIC_LEVEL,
          applicationObjectDetail: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllUserRequestLists() {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}users/requestLists/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: userManagerType.USER_GET_ALL_REQUEST,
          userRequestLists: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}

export function createNewUser(userData) {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}users?t=${Date.now()}`, userData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: userManagerType.USER_RESET_DATA,
          userObjectDetail: response.data.dbData
        });
        dispatch(getAllApplicationHeader());
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateStatus(data) {
  return (dispatch) => {
    axios
      .put(`${config.BASE_URL}users/status?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch(getAllUserRequestLists());
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}

export function userLdapAuthenticate(userData) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}users/ldap/authenticate?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: userManagerType.USER_LDAP_AUTHENTICATE,
          authDetail: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: userManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateApplicationHeaderData(id) {
  return { type: userManagerType.USER_UPDATE_APPLICATION_HEADER_DATA, id };
}

export function updateUserLevelData(level) {
  return { type: userManagerType.USER_UPDATE_METRIC_LEVEL_DATA, level };
}

export function updateUserRoleData(roleRecordId) {
  return { type: userManagerType.USER_UPDATE_ROLE_DATA, roleRecordId };
}

export function updateUserSiteData(id) {
  return { type: userManagerType.USER_UPDATE_SITE_DATA, id };
}

export function updateGlobalApproverData(id) {
  return { type: userManagerType.USER_UPDATE_GLOBAL_APPROVER_DATA, id };
}

export function updateUserFormApprover(approver) {
  return { type: userManagerType.USER_UPDATE_APPROVER_DATA, approver };
}

export function updateUserFormDescription(text) {
  return { type: userManagerType.USER_UPDATE_DESCRIPTION, text };
}

export function updateUserFormUserID(id) {
  return { type: userManagerType.USER_UPDATE_UESRID, id };
}

export function updateRequestItemCheckBox(recordId) {
  return { type: userManagerType.TOGGLE_USER_CHECKBOX, recordId };
}

export function updateComments(text, id) {
  return { type: userManagerType.USER_UPDATE_SUBMIT_COMMENT, text, id };
}

export function clearComments() {
  return { type: userManagerType.USER_CLEAR_SUBMIT_COMMENT };
}
