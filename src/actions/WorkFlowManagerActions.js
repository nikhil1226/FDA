import axios from 'axios';
import { workFlowType, auditTrial } from './ActionTypes';
import config from '../config';

const HEADER_CONFIG = {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
};

export function getUploadMetricWorkFlow(requestId) {
  return (dispatch) => {
    dispatch({
      type: workFlowType.GET_WORK_FLOW_LIST_REQUEST
    });
    axios
      .get(`${config.BASE_URL}uploadMetric/uploadMetricWorkFlow?requestId=${requestId}&t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: workFlowType.GET_WORK_FLOW_LIST,
          workFlowListData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: workFlowType.ERROR_LOG, message: err });
      });
  };
}

export function getAuditFlow(requestId) {
  return (dispatch) => {
    dispatch({
      type: auditTrial.GET_ALL_AUDITS_REQUEST
    });
    axios
      .get(`${config.BASE_URL}audit/${requestId}?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: auditTrial.GET_ALL_AUDITS,
          auditListData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: auditTrial.AUDIT_ERROR_LOG, message: err });
      });
  };
}

export function getMetricPlanWorkFlow(requestId) {
  return (dispatch) => {
    dispatch({
      type: workFlowType.GET_WORK_FLOW_LIST_REQUEST
    });
    axios
      .get(`${config.BASE_URL}metricReport/${requestId}/WorkFlow?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: workFlowType.GET_WORK_FLOW_LIST,
          workFlowListData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: workFlowType.ERROR_LOG, message: err });
      });
  };
}

export function getScheduleWorkFlow(requestId) {
  return (dispatch) => {
    dispatch({
      type: workFlowType.GET_WORK_FLOW_LIST_REQUEST
    });
    axios
      .get(`${config.BASE_URL}schedules/${requestId}/workFlow?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: workFlowType.GET_WORK_FLOW_LIST,
          workFlowListData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: workFlowType.ERROR_LOG, message: err });
      });
  };
}

export function getUserRequestWorkFlow(requestId) {
  return (dispatch) => {
    dispatch({
      type: workFlowType.GET_WORK_FLOW_LIST_REQUEST
    });
    axios
      .get(`${config.BASE_URL}users/${requestId}/workFlow?t=${Date.now()}`, HEADER_CONFIG)
      .then(response => {
        dispatch({
          type: workFlowType.GET_WORK_FLOW_LIST,
          workFlowListData: response.data.dbData
        });
      })
      .catch(err => {
        dispatch({ type: workFlowType.ERROR_LOG, message: err });
      });
  };
}
