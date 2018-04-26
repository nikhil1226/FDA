import axios from 'axios';
import _get from 'lodash/get';
import { uploadType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllUploadedMetrices() {
  let role = '';

  if (localStorage.getItem('role') === 'Author') {
    role = 'auth';
  }
  if (localStorage.getItem('role') === 'Approver') {
    role = 'appr';
  }

  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    dispatch({
      type: uploadType.GET_UPLOADED_REQUEST
    });
    axios
      .get(`${config.BASE_URL}uploadMetric/role/${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOADED_METRICES,
          uploadedMetricesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateStatusUploadedMetric(data) {
  return (dispatch, getState) => {
    const statusData = data;
    statusData.authorId = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}uploadMetric/uploadMetricAction?t=${Date.now()}`, statusData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.UPDATE_UPLOADED_METRICES_STATUS,
          statusData: statusData.metrics
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateReopenStatus(data) {
  return (dispatch, getState) => {
    const statusData = data;
    statusData.authorId = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}uploadMetric/updateReopenStatus?t=${Date.now()}`, statusData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.UPDATE_UPLOADED_METRICES_STATUS,
          statusData: statusData.metrics
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function createUploadedMetric(metricData) {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}uploadMetric?t=${Date.now()}`, metricData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.RESET_UPLOAD_METRIC_DATA,
          userId
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function getAllSiteforUpload(objectId, appObjectId) {
  return { type: uploadType.GET_SITES_LIST_UPLOAD, objectId, appObjectId };
}

export function getUploadApprover(siteId, objectId) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}uploadMetric/uploadSiteApprover/siteId/${siteId}/objectId/${objectId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOAD_APPROVER_LIST,
          uploadApproverList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetricTypeforUpload(applicationId, appObjectId, siteRecordId) {
  return (dispatch) => {
    dispatch({
      type: uploadType.GET_UPLOAD_METRIC_LIST,
      applicationId,
      appObjectId,
      siteRecordId
    });
  };
}

export function getUploadMetricDetailById(id) {
  return (dispatch) => {
    dispatch({
      type: uploadType.GET_UPLOADED_METRIC_BY_ID_REQUEST
    });
    axios
      .get(`${config.BASE_URL}uploadMetric/uploadRequestId/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOADED_METRIC_BY_ID,
          uploadedMetricData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateUploadMetric(data) {
  return (dispatch, getState) => {
    const updateDate = data;
    updateDate.updateBy = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}uploadMetric/modifyUploadMetric?t=${Date.now()}`, updateDate, HEADER_CONFIG)
      .then(response => {
        dispatch(getUploadMetricDetailById(updateDate.uploadRequestID));
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateMetricData(data) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}uploadMetric/modifyMetricData?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch(getUploadMetricDetailById(data.uploadRequestID));
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function removeMetricData(id) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}uploadMetric/removeMetricData?t=${Date.now()}`, id, HEADER_CONFIG)
      .then(response => {
        dispatch(getUploadMetricDetailById(id.metricId));
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateSitePlantMaintenanceData(data) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}uploadMetric/modifySitePlantMaintenanceData?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        dispatch(getUploadMetricDetailById(data.uploadRequestID));
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

// metric included
export function getAllMetric() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getAllMetric?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_ALL_METRICS,
          metricList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetricIncludes() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}GetAllMetric?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_ALL_METRICS_INCLUDES,
          metricList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function removeSitePlantMaintenanceData(id) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}uploadMetric/removeSitePlantMaintenanceData?t=${Date.now()}`, id, HEADER_CONFIG)
      .then(response => {
        dispatch(getUploadMetricDetailById(id.metricId));
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function getAllApplicationHeader() {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}uploadMetric/getApplicationHeader/userId/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_ALL_APPLICATION_HEADER,
          applicationHeaderList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}
export function getAllLevelLists(id) {
  return (dispatch) => {
    dispatch({
      type: uploadType.GET_ALL_UPLOAD_METRIC_LEVEL,
      applicationRecordId: id
    });
  };
}

export function getGlobalUploadApproverList(applicationRecordId) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getGlobalUploadApprover?appObjectName=${applicationRecordId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOAD_APPROVER_LIST,
          uploadApproverList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function validateSI03AIPCStabilityTests(excelData, errMsg) {
  return (dispatch) => {
    dispatch({
      type: uploadType.ISLOADED_GET_UPLOAD_VALIDATE_SI03A_IPC_STABILITY_TESTS_LIST
    });
    axios
      .post(`${config.BASE_URL}uploadMetric/validation/SI03AIPCStabilityTests?t=${Date.now()}`, excelData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOAD_VALIDATE_SI03A_IPC_STABILITY_TESTS_LIST,
          inValidData: response.data.dbData,
          excelData: excelData.metricData,
          errMsg
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function getAllReopenUploadedMetrices() {
  let role = '';

  if (localStorage.getItem('role') === 'Author') {
    role = 'reOpen_auth';
  }
  if (localStorage.getItem('role') === 'Approver') {
    role = 'reOpen_appr';
  }

  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    dispatch({
      type: uploadType.GET_UPLOADED_REQUEST
    });
    axios
      .get(`${config.BASE_URL}uploadMetric/role/${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: uploadType.GET_UPLOADED_METRICES,
          uploadedMetricesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: uploadType.ERROR_LOG, message: err });
      });
  };
}

export function updateUploadSiteData(id) {
  return { type: uploadType.UPDATE_UPLOAD_SITE_DATA, id };
}

export function updateApplicationHeaderData(id) {
  return { type: uploadType.UPDATE_APPLICATION_HEADER_DATA, id };
}

export function updateUploadLevelData(objectId) {
  return { type: uploadType.UPDATE_UPLOAD_METRIC_LEVEL_DATA, objectId };
}

export function updateUploadFormMetricType(metric) {
  return { type: uploadType.UPDATE_UPLOADFORM_METRICTYPE, metric };
}

export function updateUploadFormApprover(approver) {
  return { type: uploadType.UPDATE_UPLOADFORM_APPROVER, approver };
}

export function updateUploadFormDescription(text) {
  return { type: uploadType.UPDATE_UPLOADFORM_DESCRIPTION, text };
}

export function updateUploadFormStartDate(date) {
  return { type: uploadType.UPDATE_UPLOADFORM_STARTDATE, date };
}

export function updateUploadFormEndDate(date) {
  return { type: uploadType.UPDATE_UPLOADFORM_ENDDATE, date };
}

export function modifyDescription(text) {
  return { type: uploadType.MODIFY_DESCRIPTION, text };
}

export function modifyStartDate(date) {
  return { type: uploadType.MODIFY_START_DATE, date };
}

export function modifyEndDate(date) {
  return { type: uploadType.MODIFY_END_DATE, date };
}

// Modify Uplaod Data Actions
export function updatecurrentModifyMetricDataList(metricDatalist, dataRecordId) {
  return { type: uploadType.UPDATE_CURRENT_UPLOAD_METRIC_DATA_LIST, metricDatalist, dataRecordId };
}

export function filterUploadedMetricList(recordId, material) {
  return { type: uploadType.FILTER_UPLODED_METRICES, recordId, material };
}

export function resetUploadedMetricFilter() {
  return { type: uploadType.FILTER_UPLODED_METRICES_FILTER };
}

export function resetUploadMetricData() {
  return (dispatch, getState) => {
    const userId = _get(getState(), 'login.userInfo.userId');
    dispatch({
      type: uploadType.RESET_UPLOAD_METRIC_DATA,
      userId
    });
  };
}

export function resetUploadSiteData() {
  return { type: uploadType.RESET_UPLOAD_SITE_DATA };
}

export function updateMetricsinclude(includeData) {
  return { type: uploadType.MODIFY_METRICS_METRIC_INCLUDE_LIST, includeData };
}

export function clearIsProcessSave() {
  return { type: uploadType.CLEAR_ISPROCESS_SAVE };
}

export function cleaValidateExcelData() {
  return { type: uploadType.CLEAR_VALIDATE_EXCEL_DATA };
}

