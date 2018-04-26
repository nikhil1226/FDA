import axios from 'axios';
import _get from 'lodash/get';

import { scheduleType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllSchedules() {
  let Role = 'gpc';
  if (localStorage.getItem('role') === 'SPR') {
    Role = 'spr';
  }
  if (localStorage.getItem('role') === 'SPC') {
    Role = 'spc';
  }
  return (dispatch, getState) => {
    const UserID = _get(getState(), 'login.userInfo.userId');
    dispatch({
      type: scheduleType.GET_ALL_SCHEDULES_REQUEST
    });
    axios
      .get(`${config.BASE_URL}schedules/role/${Role}/id/${UserID}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleType.GET_ALL_SCHEDULES,
          scheduleList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleType.ERROR_LOG, message: err });
      });
  };
}

export function getAllReopenSchedules() {
  let Role = 'gpc';
  if (localStorage.getItem('role') === 'SPR') {
    Role = 'spr';
  }
  if (localStorage.getItem('role') === 'SPC') {
    Role = 'spc';
  }
  if (localStorage.getItem('role') === 'GBM') {
    Role = 'gbm';
  }
  return (dispatch, getState) => {
    const UserID = _get(getState(), 'login.userInfo.userId');
    dispatch({
      type: scheduleType.GET_ALL_SCHEDULES_REQUEST
    });
    axios
      .get(`${config.BASE_URL}schedules/reopen/role/${Role}/id/${UserID}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleType.GET_ALL_SCHEDULES,
          scheduleList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleType.ERROR_LOG, message: err });
      });
  };
}

export function updateStatusSelectedSchedules(scheduleArray) {
  return (dispatch) => {
    axios
    .post(`${config.BASE_URL}schedules/status?t=${Date.now()}`, scheduleArray, HEADER_CONFIG)
      .then(response => {
        dispatch({ type: scheduleType.REMOVE_STATUS_OBJECT_STATE });
        dispatch(getAllSchedules());
      })
      .catch(err => {
        dispatch({ type: scheduleType.ERROR_LOG, message: err });
      });
  };
}

export function updateStatusSelectedReOpenSchedules(scheduleArray) {
  return (dispatch) => {
    axios
    .post(`${config.BASE_URL}schedules/status?t=${Date.now()}`, scheduleArray, HEADER_CONFIG)
      .then(response => {
        dispatch({ type: scheduleType.REMOVE_STATUS_OBJECT_STATE });
        dispatch(getAllReopenSchedules());
      })
      .catch(err => {
        dispatch({ type: scheduleType.ERROR_LOG, message: err });
      });
  };
}

export function updateScheduleItemCheckBox(scheduleId) {
  return { type: scheduleType.TOGGLE_SCHEDULE_CHECKBOX, scheduleId };
}

export function updateCommentsByScheduleId(text, id) {
  return { type: scheduleType.UPDATE_SUBMIT_COMMENT_BY_SCHEDULEID, text, id };
}

export function updateStatusByScheduleId(statusId, statusName, userId) {
  return { type: scheduleType.UPDATE_SUBMIT_STATUS_BY_SCHEDULEDID, statusId, statusName, userId };
}
