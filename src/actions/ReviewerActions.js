import axios from 'axios';
import _get from 'lodash/get';
import _lowerCase from 'lodash/lowerCase';
import { reviewerManagerType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllMetricesReviewer() {
  const role = _lowerCase(localStorage.getItem('role'));
  return (dispatch, getState) => {
    dispatch({
      type: reviewerManagerType.GET_ALL_REVIEWER_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}reviewer/metricReport/role/${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: reviewerManagerType.GET_ALL_METRICES_REVIEWER,
          metricesReviewerList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateRoleModification(data) {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .put(`${config.BASE_URL}reviewer/updateRoleModification?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch(getAllMetricesReviewer());
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAddRemoveSitePlanReviewer(data) {
  return (dispatch, getState) => {
    const updateStatus = data;
    axios
      .post(`${config.BASE_URL}reviewer/addRemoveSitePlanReviewer?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        if (response.data.dbData !== '20') {
          dispatch({
            type: reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_PLAN_REVIEWER,
            status: response.data.dbData
          });
        } else {
          updateStatus.entryIndicator = response.data.dbData;
          dispatch(updateRoleModification(updateStatus));
        }
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAddRemoveSiteReviewer(data) {
  return (dispatch, getState) => {
    const updateStatus = data;
    axios
      .post(`${config.BASE_URL}reviewer/addRemoveSiteReviewer?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        if (response.data.dbData !== '10' && response.data.dbData !== '20') {
          dispatch({
            type: reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_REVIEWER,
            status: response.data.dbData
          });
        } else {
          updateStatus.entryIndicator = response.data.dbData;
          dispatch(updateRoleModification(updateStatus));
        }
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAddRemoveSiteQAReviewer(data) {
  return (dispatch, getState) => {
    const updateStatus = data;
    axios
      .post(`${config.BASE_URL}reviewer/addRemoveSiteQAReviewer?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        if (response.data.dbData !== '10' && response.data.dbData !== '20') {
          dispatch({
            type: reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_QA_REVIEWER,
            status: response.data.dbData
          });
        } else {
          updateStatus.entryIndicator = response.data.dbData;
          dispatch(updateRoleModification(updateStatus));
        }
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAddRemoveGlobalReviewer(data) {
  return (dispatch, getState) => {
    const updateStatus = data;
    axios
      .post(`${config.BASE_URL}reviewer/addRemoveGlobalReviewer?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        if (response.data.dbData !== '10' && response.data.dbData !== '20') {
          dispatch({
            type: reviewerManagerType.GET_STATUS_ADD_REMOVE_GLOBAL_REVIEWER,
            status: response.data.dbData
          });
        } else {
          updateStatus.entryIndicator = response.data.dbData;
          dispatch(updateRoleModification(updateStatus));
        }
      })
      .catch(err => {
        dispatch({ type: reviewerManagerType.ERROR_LOG, message: err });
      });
  };
}

export function clearShowPopupMsg() {
  return { type: reviewerManagerType.CLEAR_SHOW_POPUP_MSG };
}

export function searchMetricReport(data) {
  return { type: reviewerManagerType.SEARCH_METRIC_REPORT, data };
}

