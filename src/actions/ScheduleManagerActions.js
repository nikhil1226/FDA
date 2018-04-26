import axios from 'axios';
import _get from 'lodash/get';
import { scheduleManagerType } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getAllSiteProducts(siteId) {
  return (dispatch) => {
    dispatch({
      type: scheduleManagerType.REQUEST_PRODUCTS_LOADING
    });
    axios
      .get(`${config.BASE_URL}getProducts/site/${siteId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_ALL_SITE_PRODUCTS,
          siteProductsList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllSite() {
  return (dispatch, getState) => {
    const authorId = _get(getState(), 'login.userInfo.userId');
    axios
      .get(`${config.BASE_URL}getSiteList/G/${authorId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_ALL_SITES,
          sitesList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetricIncludes() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getAllMetricIncludes?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_ALL_METRICS_INCLUDES,
          metricList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllMetric() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getAllMetric?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_ALL_METRICS,
          metricList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getScheduleById(scheduleId, type) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}schedules/id/${scheduleId}/${type}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        if (type === 'schedule') {
          dispatch({
            type: scheduleManagerType.GET_EDIT_SCHEDULE,
            schedule: response.data.dbData
          });
        } else {
          dispatch({
            type: scheduleManagerType.GET_EDIT_SCOPE,
            schedule: response.data.dbData
          });
        }
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getMatrialsByProduct(scheduleID) {
  return (dispatch) => {
    dispatch({
      type: scheduleManagerType.REQUEST_MATERIALS_LOADING
    });
    axios
      .get(`${config.BASE_URL}schedules/materials/${scheduleID}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_PRODUCT_MATERIALS,
          materialList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function submitSchedule(schedule) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}schedules?t=${Date.now()}`, schedule, HEADER_CONFIG)
      .then(response => {
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function updateSchedule(schedule) {
  return (dispatch) => {
    axios
      .put(`${config.BASE_URL}schedules?t=${Date.now()}`, schedule, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.SCHEDULE_UPDATE_STATUS,
          status: response.data.status
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function submitScheduleScope(schedule) {
  return (dispatch) => {
    axios
      .post(`${config.BASE_URL}schedules/scopeUpdate?t=${Date.now()}`, schedule, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.SCHEDULE_SCOPE_UPDATE_STATUS,
          status: response.data.status
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getAllSiteMaterials() {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}getMaterialsBySite?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_ALL_SITE_MATERIALS,
          siteMaterialList: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function getSendForApprovalStatus(id) {
  return (dispatch) => {
    axios
      .get(`${config.BASE_URL}schedules/approvalStatus/${id}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: scheduleManagerType.GET_SEND_FOR_APPROVAL_STATUS,
          productNDCList: response.data.dbData,
          status: response.data.status
        });
      })
      .catch(err => {
        dispatch({ type: scheduleManagerType.ERROR_LOG, message: err });
      });
  };
}

export function resetScheduleData() {
  return { type: scheduleManagerType.RESET_SCHEDULE_DATA };
}

export function updateProductListItemCheckBox(id) {
  return { type: scheduleManagerType.TOGGLE_PRODUCTS_SELECT_CHECKBOX, id };
}

export function addProductsToSlectedList() {
  return { type: scheduleManagerType.ADD_PRODUCTS_TO_SELECTEDLIST };
}

export function updateCurrentScheduleValues(schedule) {
  return { type: scheduleManagerType.UPADTE_CURRENT_SCHEDULE_VALUE, schedule };
}

export function modifyStartDate(date) {
  return { type: scheduleManagerType.MODIFY_START_DATE, date };
}

export function modifyEndDate(date) {
  return { type: scheduleManagerType.MODIFY_END_DATE, date };
}

export function updateMetricsCheckBox(id) {
  return { type: scheduleManagerType.MODIFY_METRICLIST_CHECKBOX, id };
}

export function updateMetricsListCheckBox(id) {
  return { type: scheduleManagerType.UPDATE_METRICLIST_CHECKBOX, id };
}

export function updateMetricsInclude(includeData) {
  return { type: scheduleManagerType.MODIFY_METRICS_METRIC_INCLUDE_LIST, includeData };
}

export function updateSchduleDescription(text) {
  return { type: scheduleManagerType.UPDATE_SCHEDULE_DESCRIPTION, text };
}

export function updateScheduleSiteData(id) {
  return { type: scheduleManagerType.UPDATE_SCHEDULE_SITEDATA, id };
}

export function updatePlanCoordinator(userId) {
  return { type: scheduleManagerType.UPDATE_SCHEDULE_PLAN_COORDINATOR, userId };
}

export function updatePlanReviewer(userId) {
  return { type: scheduleManagerType.UPDATE_SCHEDULE_PLAN_REVIEWER, userId };
}

export function editSchedule(schedule) {
  return { type: scheduleManagerType.SCHEDULE_EDIT_SCHEDULE, schedule };
}

export function updateSelectedProductsCheckbox(id) {
  return { type: scheduleManagerType.TOGGLE_PRODUCT_EXCLUDE_SCOPE, id };
}
export function deleteProductFromSelectedList(id) {
  return { type: scheduleManagerType.DELETE_SELECTED_PRODUCT, id };
}
export function filterProducts(productName, brandName) {
  return { type: scheduleManagerType.FILTER_PRODUCT, productName, brandName };
}
export function resetProductFilter() {
  return { type: scheduleManagerType.RESET_FILTER };
}

// Scope Modifiation Methods
export function filterMaterials(productName, brandName) {
  return { type: scheduleManagerType.FILTER_MATERIALS, productName, brandName };
}

export function resetMaterialFilter() {
  return { type: scheduleManagerType.RESET_FILTER_MATERIALS };
}

// @sp Filter for deleted
export function filterProductsDeleted(productName, brandName) {
  return { type: scheduleManagerType.FILTER_PRODUCT_DELETED, productName, brandName };
}
export function resetProductFilterDeleted() {
  return { type: scheduleManagerType.RESET_FILTER_DELETED };
}

export function filterMaterialsDeleted(productName, brandName) {
  return { type: scheduleManagerType.FILTER_MATERIALS_DELETED, productName, brandName };
}

export function resetMaterialFilterDeleted() {
  return { type: scheduleManagerType.RESET_FILTER_MATERIALS_DELETED };
}
// @sp
export function addMaterialsToSelectedList() {
  return { type: scheduleManagerType.ADD_MATERIALS_TO_SELECTEDLIST };
}

export function updateMaterialListItemCheckBox(id) {
  return { type: scheduleManagerType.TOGGLE_MATERIALS_SELECT_CHECKBOX, id };
}

export function updateSelectedMaterialCheckbox(id) {
  return { type: scheduleManagerType.TOGGLE_MATERIAL_EXCLUDE_SCOPE, id };
}

export function deleteMaterialFromSelectedList(id) {
  return { type: scheduleManagerType.DELETE_SELECTED_MATERIAL_SCOPE, id };
}

export function setRemoveProductComment(text, id) {
  return { type: scheduleManagerType.SET_REMOVE_PRODUCT_COMMENT, text, id };
}

export function setRemoveMaterialComment(text, id) {
  return { type: scheduleManagerType.SET_REMOVE_MATERIAL_COMMENT, text, id };
}

export function updateScopeAllMaterialListItemCheckbox(checked) {
  return { type: scheduleManagerType.ALL_SCHEDULE_SCOPE_TOGGLE_MATERIALS_SELECT_CHECKBOX, checked };
}
export function updateAllProductsListItemCheckbox(checked) {
  return { type: scheduleManagerType.ALL_SCHEDULE_TOGGLE_PRODUCTS_SELECT_CHECKBOX, checked };
}

export function clearUpdateScheduleStatus() {
  return { type: scheduleManagerType.SCHEDULE_CLEAR_UPDATE_STATUS };
}

export function clearUpdateScheduleScopeStatus(checked) {
  return { type: scheduleManagerType.SCHEDULE_CLEAR_SCOPE_UPDATE_STATUS };
}

export function clearSendForApprovalStatus() {
  return { type: scheduleManagerType.CLEAR_SEND_FOR_APPROVAL_STATUS };
}

export function getBackSelectedProductList() {
  return { type: scheduleManagerType.GET_BACK_SCHEDULE_SELECTED_PRODUCT_LIST };
}

export function getBackSelectedMaterialList() {
  return { type: scheduleManagerType.GET_BACK_SCHEDULE_SELECTED_MATERIAL_LIST };
}

export function requestLoading() {
  return { type: scheduleManagerType.SCHEDULE_REQUEST_LOADING };
}
