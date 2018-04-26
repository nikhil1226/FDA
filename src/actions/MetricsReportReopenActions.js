import axios from 'axios';
import _get from 'lodash/get';
import _lowerCase from 'lodash/lowerCase';
import { metricReportReopenTypes } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json' }
};

export function getAllMetricReportReopens() {
  const role = _lowerCase(localStorage.getItem('role'));
  return (dispatch, getState) => {
    dispatch({
      type: metricReportReopenTypes.IS_LOADING_METRIC_REPORT_REOPEN_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}metricReport/role/mrro_${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReopenTypes.GET_ALL_METRIC_REPORT_REOPEN_DATA,
          metricReopenLists: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReopenTypes.ERROR_LOG, message: err });
      });
  };
}

export function updateMetricReportReopenStatus(data) {
  return (dispatch, getState) => {
    axios
      .post(`${config.BASE_URL}metricReportReopen/status?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch(getAllMetricReportReopens());
      })
      .catch(err => {
        dispatch({ type: metricReportReopenTypes.ERROR_LOG, message: err });
      });
  };
}

export function getLatestReopenComment(id) {
  return (dispatch, getState) => {
    axios
      .get(`${config.BASE_URL}metricReportReopen/latestComments/id/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReopenTypes.GET_METRIC_REPORT_REOPEN_LATEST_COMMENT,
          latestCommentList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReopenTypes.ERROR_LOG, message: err });
      });
  };
}

export function getLinkedSchedules(metricId) {
  return (dispatch, getState) => {
    axios
      .get(`${config.BASE_URL}metricReport/linkSchedules/metricId/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReopenTypes.METRIC_REPORT_REOPEN_GET_LINKED_SCHEDULES_BY_ID,
          linkSchedules: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReopenTypes.ERROR_LOG, message: err });
      });
  };
}

export function clearLinkedSchedules() {
  return { type: metricReportReopenTypes.METRIC_REPORT_REOPEN_CLEAR_LINKED_SCHEDULES_BY_ID };
}

export function resetMetricReportReopen() {
  return (dispatch, getState) => {
    dispatch({ type: metricReportReopenTypes.RESET_METRIC_REPORT_REOPEN });
  };
}

export function updateReportReopenSelect(mertricPlanId) {
  return { type: metricReportReopenTypes.TOGGLE_METRIC_REPORT_SELECT_REOPEN_CHECKBOX, mertricPlanId };
}

export function updateMetricReopenComments(text, id) {
  return { type: metricReportReopenTypes.METRIC_REPORT_REOPEN_UPDATE_COMMENT, text, id };
}

export function clearMetricReopenLatestComments() {
  return { type: metricReportReopenTypes.CLEAR_METRIC_REPORT_REOPEN_LATEST_COMMENT };
}
