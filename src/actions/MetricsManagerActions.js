import axios from 'axios';
import _get from 'lodash/get';
import _lowerCase from 'lodash/lowerCase';
import _trim from 'lodash/trim';
import { metricManagerType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function clearSingleDeleteMetric() {
  return { type: metricManagerType.CLEAR_METRIC_REPORT_SINGLE_DELETE };
}
export function getAllMetrices(roleName) {
  let role = '';
  if (roleName) {
    role = roleName;
  } else {
    role = _lowerCase(localStorage.getItem('role'));
  }
  return (dispatch, getState) => {
    dispatch({
      type: metricManagerType.GET_ALL_METRICES_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}metricReport/role/${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_ALL_METRIC,
          metricesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetricIncludes() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getAllMetricIncludes?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_ALL_METRICS_INCLUDES,
          metricList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getViewMetricData(id) {
  return (dispatch) => {
    dispatch({
      type: metricManagerType.GET_VIEW_METRICES_REQUEST
    });
    axios
      .get(`${config.BASE_URL}metricReport/metricId/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_VIEW_METRIC_DATA,
          metricData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getMetricById(id) {
  return (dispatch) => {
    dispatch({
      type: metricManagerType.METRICS_LOADING
    });
    axios
      .get(`${config.BASE_URL}metricReport/metricId/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_METRIC_DATA_BY_ID,
          planMetric: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetricSite() {
  return (dispatch, getState) => {
    const authorId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}getSiteList/A/${authorId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_ALL_METRIC_SITES,
          sitesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function submitMetricPlan(metricData) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}metricReport?t=${Date.now()}`, metricData, HEADER_CONFIG)
      .then(response => {
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateMetricPlan(metricData) {
  return (dispatch) => {
    axios
      .put(`${config.BASE_URL}metricReport?t=${Date.now()}`, metricData, HEADER_CONFIG)
      .then(response => {
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getScheduleBySiteId(siteId) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}schedules/site/${siteId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.METRIC_GET_SCHEDULE_BY_SITEID,
          metricSchedules: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMaterialsBySite(siteId) {
  return (dispatch) => {
    dispatch({
      type: metricManagerType.METRICS_LOADING
    });
    axios
      .get(`${config.BASE_URL}metricReport/materials/site/${siteId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.METRICS_GET_ALL_MATERIALS,
          materialsList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMaterialsBySchedule(scheduleId) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}metricReport/materials/schedule/${scheduleId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.METRICS_GET_ALL_MATERIALS,
          materialsList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateMetricStatus(data) {
  return (dispatch, getState) => {
    const statusData = data;
    statusData.authorId = _get(getState(), 'login.userInfo.userId');
    axios
      .post(`${config.BASE_URL}metricReport/status?t=${Date.now()}`, statusData, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.UPDATE_METRICES_STATUS,
          statusData: statusData.metricPlans
        });
        dispatch(clearSingleDeleteMetric());
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getLinkScheduleNewMetricReport(data) {
  return (dispatch, getState) => {
    axios
      .post(`${config.BASE_URL}metricReport/linkScheduleNewMetricReport?t=${Date.now()}`, data, HEADER_CONFIG)
      .then(response => {
        if (response.data.status === '10' || response.data.status === '20') {
          dispatch(submitMetricPlan(data));
        }
        dispatch({
          type: metricManagerType.GET_LINK_SCHEDULE_NEW_METRIC_REPORT_STATUS,
          status: response.data.status,
          productList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getLinkedSchedules(metricId) {
  return (dispatch, getState) => {
    axios
      .get(`${config.BASE_URL}metricReport/linkSchedules/metricId/${metricId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.METRIC_REPORT_GET_LINKED_SCHEDULES_BY_ID,
          linkSchedules: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllFDASubmissionMetrices() {
  const role = `fdas_${_lowerCase(localStorage.getItem('role'))}`;
  return (dispatch, getState) => {
    dispatch({
      type: metricManagerType.GET_ALL_METRICES_REQUEST
    });
    const userId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}/metricReport/role/${role}/id/${userId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: metricManagerType.GET_ALL_METRIC,
          metricesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: metricManagerType.ERROR_LOG, message: err });
      });
  };
}

export function clearLinkedSchedules() {
  return { type: metricManagerType.METRIC_REPORT_CLEAR_LINKED_SCHEDULES_BY_ID };
}

export function setEditMetricType(metricEditType) {
  return { type: metricManagerType.METRIC_EDIT_TYPE, metricEditType };
}

export function updateCurrentScheduleValues(schedule) {
  return { type: metricManagerType.METRIC_UPADTE_CURRENT_SCHEDULE_VALUE, schedule };
}

export function modifyStartDate(date) {
  return { type: metricManagerType.MODIFY_METRIC_START_DATE, date };
}

export function modifyEndDate(date) {
  return { type: metricManagerType.MODIFY_METRIC_END_DATE, date };
}

export function updateMetricsCheckBox(id) {
  return { type: metricManagerType.MODIFY_METRICS_METRICLIST_CHECKBOX, id };
}

export function updateMetricsInclude(includeData) {
  return { type: metricManagerType.MODIFY_METRICS_METRIC_INCLUDE_LIST, includeData };
}

export function updateMetricDescription(text) {
  return { type: metricManagerType.UPDATE_METRIC_DESCRIPTION, text };
}

export function updateScheduleSiteData(id) {
  return { type: metricManagerType.UPDATE_METRICS_SITEDATA, id };
}

export function updateMetricSiteReviewer(name) {
  return { type: metricManagerType.UPDATE_METRIC_SITEREVIEWER, name };
}
export function updateMetricScheduleId(scheduleData) {
  return { type: metricManagerType.UPDATE_METRIC_SCEDULEID, scheduleData };
}

export function updateSiteQAReviewer(name) {
  return { type: metricManagerType.UPDATE_METRIC_QA_REVIEWER, name };
}

export function updateMapSchedule() {
  return { type: metricManagerType.UPDATE_METRIC_MAPSCHEDULE };
}

export function resetMetricData() {
  return (dispatch, getState) => {
    const userInfo = _get(getState(), 'login.userInfo');
    dispatch({
      type: metricManagerType.RESET_METRIC_PLAN_REPORT_DATA,
      userInfo
    });
  };
}

export function editPlanMetric(planMetric) {
  return { type: metricManagerType.METRIC_EDIT_PLAN_METRIC, planMetric };
}

// Scope Modifiation Methods
export function filterMaterials(materialName, brandName) {
  return { type: metricManagerType.METRIC_FILTER_MATERIALS, materialName, brandName };
}

export function resetMaterialFilter() {
  return { type: metricManagerType.METRIC_RESET_FILTER_MATERIALS };
}

export function addMaterialsToSelectedList() {
  return { type: metricManagerType.METRIC_ADD_METRIC_MATERIALS_TO_SELECTEDLIST };
}

export function updateMaterialListItemCheckBox(id) {
  return { type: metricManagerType.METRIC_TOGGLE_MATERIALS_SELECT_CHECKBOX, id };
}

export function updateSelectedMaterialCheckbox(id) {
  return { type: metricManagerType.METRIC_TOGGLE_MATERIAL_EXCLUDE_SCOPE, id };
}

export function deleteMaterialFromSelectedList(id) {
  return { type: metricManagerType.METRIC_DELETE_SELECTED_MATERIAL_METRICS, id };
}

export function updateMetricSitePlanReviewer(name) {
  return { type: metricManagerType.METRIC_UPDATE_METRIC_SITE_PLAN_REVIEWER, name };
}

export function updateMetricSelect(mertricPlanId) {
  return { type: metricManagerType.TOGGLE_METRIC_SELECT_CHECKBOX, mertricPlanId };
}

export function updateAllMaterialListItemCheckbox(checked) {
  return { type: metricManagerType.ALL_METRIC_TOGGLE_MATERIALS_SELECT_CHECKBOX, checked };
}

export function setRemoveMaterialComment(text, id) {
  return { type: metricManagerType.SET_REMOVE_MATERIAL_COMMENT, text, id };
}

export function updateCommentsByMetricId(text, id) {
  return { type: metricManagerType.METRIC_UPDATE_SUBMIT_COMMENT_BY_METRICID, text, id };
}

export function clearNewLinkSchedulesMsgPopUp() {
  return { type: metricManagerType.CLEAR_LINK_SCHEDULE_NEW_METRIC_REPORT_STATUS };
}

export function deleteSingleMetric(mertricPlanId) {
  return { type: metricManagerType.METRIC_REPORT_SINGLE_DELETE, mertricPlanId };
}
