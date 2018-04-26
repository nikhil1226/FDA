import axios from 'axios';
import _get from 'lodash/get';
import _lowerCase from 'lodash/lowerCase';
import { metricReportReviewTypes } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllMetricReportReviews() {
  const role = _lowerCase(localStorage.getItem('role'));
  return (dispatch, getState) => {
    dispatch({
      type: metricReportReviewTypes.IS_LOADING_METRIC_REPORT_REVIEW_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}metricReport/role/mrr_${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReviewTypes.GET_ALL_METRIC_REPORT_REVIEW,
          metricReivewLists: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
      });
  };
}


export function getMetricReportReviewById(id) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}metricMaintenance/metricId/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReviewTypes.GET_METRIC_REPORT_REVIEW_DATA,
          metricData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
      });
  };
}

export function resetMetricReportReview() {
  return (dispatch, getState) => {
    dispatch({ type: metricReportReviewTypes.RESET_METRIC_REPORT_REVIEW });
  };
}

export function resetReportReviewPopulateData() {
  return (dispatch, getState) => {
    dispatch({ type: metricReportReviewTypes.RESET_POPULATE_REPORT_REVIEW_METRIC_DATA });
  };
}

export function getReportReviewPopulateScopeById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_SCOPE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateScope/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_SCOPE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulateAcceptanceById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_ACCEPTANCE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateAcceptance/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_ACCEPTANCE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulateNTRSById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_NTRS_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateNTRSData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_NTRS,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulateIOORSById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_IOORS_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateIOORSData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_IOORS,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulatePQCById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_PQC_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populatePQCData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_PQC,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulateTDUDById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_TDUD_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateTDUDData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_TDUD,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function updateMetricReportReviewStatus(data) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.IS_LOADING_METRIC_REPORT_REVIEW_REQUEST
    });
    axios
    .post(`${config.BASE_URL}metricReportReview/status?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      dispatch(getAllMetricReportReviews());
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewPopulateBatchMaintenanceById(id) {
  return (dispatch) => {
    dispatch({
      type: metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_BATCH_MAINTENTANCE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateBatchMaintenance/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_BATCH_MAINTENANCE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getReportReviewCommentByMetricId(metricId) {
  return (dispatch) => {
    axios
    .get(`${config.BASE_URL}metricMaintenance/comment/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricReportReviewTypes.GET_METRIC_REPORT_REVIEW_COMMENTS,
        commentList: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function saveReportReviewComment(data) {
  return (dispatch) => {
    axios
    .post(`${config.BASE_URL}metricMaintenance/saveComment?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      dispatch(getReportReviewCommentByMetricId(data.metricReportRecordId));
    })
    .catch(err => {
      dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
    });
  };
}

export function getLinkedSchedules(metricId) {
  return (dispatch, getState) => {
    axios
      .get(`${config.BASE_URL}metricReport/linkSchedules/metricId/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricReportReviewTypes.METRIC_REPORT_REVIEW_GET_LINKED_SCHEDULES_BY_ID,
          linkSchedules: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricReportReviewTypes.ERROR_LOG, message: err });
      });
  };
}

export function clearLinkedSchedules() {
  return { type: metricReportReviewTypes.METRIC_REPORT_REVIEW_CLEAR_LINKED_SCHEDULES_BY_ID };
}

export function updateReportReviewSelect(mertricPlanId, status) {
  return { type: metricReportReviewTypes.TOGGLE_METRIC_REPORT_SELECT_REVIEW_CHECKBOX, mertricPlanId, status };
}

export function updateCommentsByMetricId(text, id) {
  return { type: metricReportReviewTypes.METRIC_REPORT_REVIEW_UPDATE_COMMENT_BY_METRICID, text, id };
}

export function searchScope(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_SCOPE, data };
}

export function searchLotsAcceptanceRate(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_LOTS_ACCEPTANCE_RATE, data };
}

export function searchIoorsInfo(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_IOORSINFO, data };
}

export function searchNtrsInfo(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_NTRSINFO, data };
}

export function searchProductQuality(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_PRODUCT_QUALITY_COMPLAINTS, data };
}

export function serachDosageUnit(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_DOSAGE_UNIT, data };
}

export function searchBatchMaintenance(data) {
  return { type: metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_BATCH_MAINTENANCE, data };
}

export function clearSearchValue() {
  return { type: metricReportReviewTypes.CLEAR_METRIC_REPORT_REVIEW_SEARCH_VALUE };
}

