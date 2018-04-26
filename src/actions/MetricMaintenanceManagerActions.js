import axios from 'axios';
import _get from 'lodash/get';
import _lowerCase from 'lodash/lowerCase';
import { metricMataintanceTypes } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllMetrices() {
  const role = _lowerCase(localStorage.getItem('role'));
  return (dispatch, getState) => {
    dispatch({
      type: metricMataintanceTypes.GET_ALL_METRIC_MAINTANCE_REPORT_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}metricReport/role/mmr_${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricMataintanceTypes.GET_ALL_METRIC_MAINTANCE_REPORT,
          metricesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}


export function getMetricById(id) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}metricMaintenance/metricId/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricMataintanceTypes.GET_METRIC_DATA,
          metricData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}

export function getScheduleBySite(siteId) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}schedules/site/${siteId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricMataintanceTypes.GET_SCHEDULES_BY_SITE,
          scheduleData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}

export function resetMetricReportMaintance() {
  return (dispatch, getState) => {
    dispatch({ type: metricMataintanceTypes.RESET_METRIC_REPORT_MATAINTANCE });
  };
}

export function resetPopulateData() {
  return (dispatch, getState) => {
    dispatch({ type: metricMataintanceTypes.RESET_POPULATE_METRIC_DATA });
  };
}

export function updateBatchMaintenance(data) {
  return (dispatch) => {
    axios
      .put(`${config.BASE_URL}metricMaintenance/updateKPIRecord?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch({ type: metricMataintanceTypes.UPDATE_KPIRECORD, updatedData: data });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}


export function generateMaintenanceReport(metricId) {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    const data = { metricId, userId };
    axios
    .post(`${config.BASE_URL}metricMaintenance/createReport?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      dispatch({ type: metricMataintanceTypes.CREATE_REPORT });
      dispatch(getAllMetrices());
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateScopeById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_SCOPE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateScope/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_SCOPE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateAcceptanceById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_ACCEPTANCE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateAcceptance/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_ACCEPTANCE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateNTRSById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_NTRS_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateNTRSData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_NTRS,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateIOORSById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_IOORS_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateIOORSData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_IOORS,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulatePQCById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_TDUD_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populatePQCData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_PQC,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateTDUDById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_TDUD_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateTDUDData/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_TDUD,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getPopulateBatchMaintenanceById(id) {
  return (dispatch) => {
    dispatch({
      type: metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_BATCH_MAINTENTANCE_LODING
    });
    axios
    .get(`${config.BASE_URL}metricMaintenance/populateBatchMaintenance/${id}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_BATCH_MAINTENANCE,
        reportInfo: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function generateExcelReport(id) {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    const randId = Date.now();
    axios
      .get(`${config.BASE_URL}populateExcelReport/metricId/${id}/userId/${userId}/randId/${randId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        if (response.data.isExcelPopulated) {
          window.location = `/public/template/xlsTemp/FQM_Metric_Report_${id}_${randId}.xlsx`;
        }
        dispatch({
          type: metricMataintanceTypes.DOWNLOAD_EXCEL_REPORT
        });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}

export function getCommentByMetricID(metricId) {
  return (dispatch) => {
    axios
    .get(`${config.BASE_URL}metricMaintenance/comment/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
    .then(response => {
      dispatch({
        type: metricMataintanceTypes.GET_METRIC_REPORT_COMMENTS,
        commentList: response.data.dbData
      });
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function saveComment(data) {
  return (dispatch) => {
    axios
    .post(`${config.BASE_URL}metricMaintenance/saveComment?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      dispatch(getCommentByMetricID(data.metricReportRecordId));
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function updateMetricSiteReviewerStatus(data) {
  return (dispatch) => {
    axios
    .put(`${config.BASE_URL}metricMaintenance/status?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      dispatch(getAllMetrices());
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function updateScheduleLink(data) {
  return (dispatch, getState) => {
    const updateData = data;
    updateData.actionUser = _get(getState(), 'login.userInfo.userId');
    axios
      .put(`${config.BASE_URL}metricMaintenance/updateScheduleLink?t=${Date.now()}`, updateData, HEADER_CONFIG)
      .then(response => {
        dispatch({ type: metricMataintanceTypes.SUCCESS_UPDATE_SCHEDULE_LINK });
        dispatch(getAllMetrices());
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}

export function getLinkScheduleandMetricReportDetails(data) {
  return (dispatch) => {
    axios
    .post(`${config.BASE_URL}metricMaintenance/linkSchedule?t=${Date.now()}`, data, HEADER_CONFIG)
    .then(response => {
      if (response.data.status !== '10' && response.data.status !== '20') {
        dispatch({
          type: metricMataintanceTypes.GET_STATUS_UPDATE_LINK_SCHEDULE,
          status: response.data.status,
          productList: response.data.dbData
        });
      } else {
        dispatch(updateScheduleLink(data));
      }
    })
    .catch(err => {
      dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
    });
  };
}

export function getLinkedSchedules(metricId) {
  return (dispatch, getState) => {
    axios
      .get(`${config.BASE_URL}metricReport/linkSchedules/metricId/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricMataintanceTypes.METRIC_REPORT_MAINTENANCE_GET_LINKED_SCHEDULES_BY_ID,
          linkSchedules: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricMataintanceTypes.ERROR_LOG, message: err });
      });
  };
}

export function clearLinkedSchedules() {
  return { type: metricMataintanceTypes.METRIC_REPORT_MAINTENANCE_CLEAR_LINKED_SCHEDULES_BY_ID };
}

export function emptyCreatedReport() {
  return { type: metricMataintanceTypes.REMOVE_CREATE_REPORT };
}

export function emptyCreatedExcelReport() {
  return { type: metricMataintanceTypes.REMOVE_EXCEL_REPORT };
}


export function updateReportSelect(mertricPlanId, status, statusCode, scheduleIdLinked) {
  return { type: metricMataintanceTypes.TOGGLE_METRIC_REPORT_SELECT_CHECKBOX, mertricPlanId };
}

export function searchScope(data) {
  return { type: metricMataintanceTypes.SEARCH_REPORT, data };
}

export function updateCommentsByMetricId(text, id) {
  return { type: metricMataintanceTypes.METRIC_UPDATE_SUBMIT_COMMENT_BY_METRICID, text, id };
}
export function searchLotsAcceptanceRate(data) {
  return { type: metricMataintanceTypes.SEARCH_LOTS_ACCEPTANCE_RATE, data };
}

export function searchIoorsInfo(data) {
  return { type: metricMataintanceTypes.SEARCH_IOORSINFO, data };
}
export function searchNtrsInfo(data) {
  return { type: metricMataintanceTypes.SEARCH_NTRSINFO, data };
}
export function searchProductQuality(data) {
  return { type: metricMataintanceTypes.SEARCH_PRODUCT_QUALITY_COMPLAINTS, data };
}
export function searchBatchMaintenance(data) {
  return { type: metricMataintanceTypes.SEARCH_BATCH_MAINTENANCE, data };
}
export function serachDosageUnit(data) {
  return { type: metricMataintanceTypes.SEARCH_DOSAGE_UNIT, data };
}

export function clearSearchValue(data) {
  return { type: metricMataintanceTypes.CLEAR_SEARCH_VALUE, data };
}

export function clearShowSchedulePopUp() {
  return { type: metricMataintanceTypes.CLEAR_SHOW_SCHEDULE_POPUP };
}

export function clearSuccessMsgPopUp() {
  return { type: metricMataintanceTypes.CLEAR_SUCCESS_UPDATE_SCHEDULE_LINK };
}
