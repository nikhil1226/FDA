import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _ from 'lodash';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _remove from 'lodash/remove';
import _filter from 'lodash/filter';
import _assign from 'lodash/assign';
import _trim from 'lodash/trim';
import _toString from 'lodash/toString';
import _uniqWith from 'lodash/uniqWith';
import _uniqBy from 'lodash/uniqBy';
import _isEqual from 'lodash/isEqual';
import _indexOf from 'lodash/indexOf';
import moment from 'moment';
import { uploadType } from '../actions/ActionTypes';

const iniatialCurrentUploadDataForm = {
  siteId: '*',
  plantName: '',
  metricId: '',
  metricType: '',
  createdBy: '',
  approverId: '',
  approverName: '',
  applicationId: '',
  applicationName: '',
  appObjectId: '',
  description: '',
  startDate: null,
  endDate: null,
  category: ''
};

const iniatialCurrentUserDataForm = {
  siteId: '',
  createdBy: '',
  approverId: '',
  approverName: '',
  applicationId: '',
  applicationName: '',
  appObjectId: '',
  description: '',
  RoleRecordId: '',
  SuccessMsg: ''
};

const DEFAULT_STATE = {
  uploadedMetricesList: [],
  excelDataValidList: [],
  checkedList: [],
  uploadSitesList: [],
  metricTypeList: [],
  approverList: [],
  levelList: [],
  applicationHeaderList: [],
  uploadDataForm: iniatialCurrentUploadDataForm,
  userDataForm: iniatialCurrentUserDataForm,
  userRequestList: [],
  currentModifyMetric: [{
    siteRecordId: '',
    uploadRequestID: '',
    uploadDescription: '',
    uploadDate: null,
    startDate: null,
    endDate: null,
    metricsUpload: '',
    uploadedBy: '',
    approvedBy: '',
    status: '',
    metricData: []
  }],
  currentModifyMetricDataList: [],
  filteredUploadedMetricList: [],
  applicationHeaderArr: [],
  isProcessSave: false,
  isLoading: true
};

const setUploadedMetricesList = (state, action) => {
  const newState = {};
  const newArr = _map(action.uploadedMetricesList, o => _extend({ checked: false }, o));
  Object.assign(newState, state, { uploadedMetricesList: newArr, checkedList: [], uploadDataForm: iniatialCurrentUploadDataForm, uploadMetricsLoaded: false });
  return newState;
};

const setCurrentUploadedMetricById = (state, action) => {
  const newState = {};
  const newArray = [];
  const arr = [];
  const metrics = state.metricList;
  newArray.push(action.uploadedMetricData);
  const metricArr = newArray[0].mericTypeID.split(',');
  _map(metrics, metric => {
    const metricArray = metric;
    const isValid = _indexOf(metricArr, metric.metricId);
    if (isValid > -1) {
      metricArray.checked = true;
    }
  });
  const newMetricDataArr = _map(newArray[0].metricData, o => _extend({ isUpdate: false }, o));
  Object.assign(newArray[0], { metricsIncluded: metrics });
  Object.assign(newState, state,
    { currentModifyMetric: newArray,
      isLoading: false,
      currentModifyMetricDataList: newMetricDataArr,
      filteredUploadedMetricList: newMetricDataArr });
  return newState;
};

const setUploadSitesList = (state, action) => {
  const newState = {};
  Object.assign(newState, state);
  const newSiteArr = [];
  _map(newState.applicationHeaderArr, item => {
    if (item.applicationRecordId === action.objectId && item.appObjectId === action.appObjectId) {
      newSiteArr.push({ id: item.siteRecordID, site: item.site, plant: item.plant });
    }
  });
  const newArr = _uniqWith(newSiteArr, _isEqual);
  Object.assign(newState, state, { uploadSitesList: newArr });
  return newState;
};

const updateUploadSiteData = (state, action) => {
  const uploadFormSiteData = {};
  Object.assign(uploadFormSiteData, state);
  const index = _findIndex(uploadFormSiteData.uploadSitesList, ['id', action.id]);
  if (index > -1) {
    uploadFormSiteData.uploadDataForm.siteId = uploadFormSiteData.uploadSitesList[index].id;
    uploadFormSiteData.uploadDataForm.sitename = uploadFormSiteData.uploadSitesList[index].site;
    uploadFormSiteData.uploadDataForm.plantName = uploadFormSiteData.uploadSitesList[index].plant;
  }
  const newState = {};
  Object.assign(newState, uploadFormSiteData);
  return newState;
};

const updateUploadFormMetricData = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.uploadDataForm);
  newFromData.metricId = action.metric.uploadObjectId;
  newFromData.metricType = action.metric.uploadObjectDescription;
  newFromData.lintToTemplate = action.metric.uploadTemplate;
  newFromData.uploadTableName = action.metric.uploadTableName;
  newFromData.uploadTableTempName = action.metric.uploadTableTemp;
  newFromData.category = action.metric.category;
  const newState = {};
  Object.assign(newState, state, { uploadDataForm: newFromData });
  return newState;
};

const updateUploadFormApproverData = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.uploadDataForm);
  newFromData.approverId = action.approver.userId;
  newFromData.approverName = action.approver.userName;
  const newState = {};
  Object.assign(newState, state, { uploadDataForm: newFromData });
  return newState;
};

const updateUploadFormDescription = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.uploadDataForm);
  newFromData.description = action.text.substring(0, 100);
  const newState = {};
  Object.assign(newState, state, { uploadDataForm: newFromData });
  return newState;
};

const updateUploadFormStartDate = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.uploadDataForm);
  newFromData.startDate = action.date;
  const newState = {};
  Object.assign(newState, state, { uploadDataForm: newFromData });
  return newState;
};

const updateUploadFormEndDate = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.uploadDataForm);
  newFromData.endDate = action.date;
  const newState = {};
  Object.assign(newState, state, { uploadDataForm: newFromData });
  return newState;
};

const updateCurrentModifyMetricDataList = (state, action) => {
  const newArr = _map(action.metricDatalist, o => {
    const item = o;
    if (o.dataRecordId === action.dataRecordId) {
      item.isUpdate = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state,
    { currentModifyMetricDataList: newArr, filteredUploadedMetricList: action.metricDatalist });
  return newState;
};

const filterUploadedMetricList = (state, action) => {
  const uploadedMetricState = {};
  Object.assign(uploadedMetricState, state);
  const filteredArr = _filter(uploadedMetricState.currentModifyMetricDataList, metrices => {
    let result = '';
    if (_trim(action.recordId).length && _trim(action.material).length) {
      if (parseInt(metrices.recordID, 10) === parseInt(action.recordId, 10) && metrices.materialNumber.toUpperCase() === action.material.toUpperCase()) {
        result = metrices;
      }
    } else if (_trim(action.recordId).length && parseInt(metrices.recordID, 10) === parseInt(action.recordId, 10)) {
      result = metrices;
    } else if (_trim(action.material).length && metrices.materialNumber.toUpperCase() === action.material.toUpperCase()) {
      result = metrices;
    }
    return result;
  });

  const newState = {};
  Object.assign(newState, state, { filteredUploadedMetricList: filteredArr });
  return newState;
};

const resetUploadedMetricList = (state, action) => {
  const uploadedMetricState = {};
  Object.assign(uploadedMetricState, state);
  const filteredArray = uploadedMetricState.currentModifyMetricDataList;
  const newState = {};
  Object.assign(newState, state, { filteredUploadedMetricList: filteredArray });
  return newState;
};

const modifyStartDate = (state, action) => {
  const newCurrentUploadMetricState = [];
  Object.assign(newCurrentUploadMetricState, state.currentModifyMetric);
  newCurrentUploadMetricState[0].startDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentModifyMetric: newCurrentUploadMetricState });
  return newState;
};

const modifyEndDate = (state, action) => {
  const newCurrentUploadMetricState = [];
  Object.assign(newCurrentUploadMetricState, state.currentModifyMetric);
  newCurrentUploadMetricState[0].endDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentModifyMetric: newCurrentUploadMetricState });
  return newState;
};

const modifyDescription = (state, action) => {
  const newCurrentUploadMetricState = [];
  Object.assign(newCurrentUploadMetricState, state.currentModifyMetric);
  newCurrentUploadMetricState[0].uploadDescription = action.text;
  const newState = {};
  Object.assign(newState, state, { currentModifyMetric: newCurrentUploadMetricState });
  return newState;
};

const setUploadMetricsList = (state, action) => {
  const uploadFormSiteData = {};
  const newArray = (action.appObjectId === 'FQM_GBL')
    ? _filter(state.applicationHeaderArr, { applicationRecordId: action.applicationId, appObjectId: action.appObjectId })
    : _filter(state.applicationHeaderArr, { applicationRecordId: action.applicationId, appObjectId: action.appObjectId, siteRecordID: action.siteRecordId });

  const newmetricTypeArr = [];
  _map(newArray, item => {
    newmetricTypeArr.push({
      uploadObjectId: item.uploadObjectId,
      uploadObjectDescription: item.metricTypeForUpload,
      uploadTemplate: item.uploadTemplate,
      uploadTableName: item.uploadTableName,
      uploadTableTemp: item.uploadTableTemp,
      category: item.category
    });
  });
  Object.assign(uploadFormSiteData, state);
  uploadFormSiteData.metricTypeList = newmetricTypeArr;

  uploadFormSiteData.uploadDataForm.metricId = newArray[0].uploadObjectId;
  uploadFormSiteData.uploadDataForm.lintToTemplate = newArray[0].uploadTemplate;
  uploadFormSiteData.uploadDataForm.uploadTableName = newArray[0].uploadTableName;
  uploadFormSiteData.uploadDataForm.uploadTableTempName = newArray[0].uploadTableTemp;
  uploadFormSiteData.uploadDataForm.category = newArray[0].category;
  const newState = {};
  Object.assign(newState, uploadFormSiteData);
  return newState;
};

const setUploadApprover = (state, action) => {
  const uploadFormSiteData = {};
  Object.assign(uploadFormSiteData, state);
  uploadFormSiteData.approverList = action.uploadApproverList;
  uploadFormSiteData.uploadDataForm.approverId = '';
  uploadFormSiteData.uploadDataForm.approverName = '';
  const newState = {};
  Object.assign(newState, uploadFormSiteData);

  return newState;
};

const resetUploadMetriData = (state, action) => {
  const newState = {};
  iniatialCurrentUploadDataForm.createdBy = action.userId;
  Object.assign(newState, state, {
    approverList: [],
    uploadDataForm: iniatialCurrentUploadDataForm,
    checkedList: [],
    excelDataValidList: [],
    currentModifyMetric: [{
      siteRecordId: '',
      uploadRequestID: '',
      uploadDescription: '',
      uploadDate: null,
      startDate: null,
      endDate: null,
      metricsUpload: '',
      uploadedBy: '',
      approvedBy: '',
      status: '',
      metricData: []
    }]
  });
  return newState;
};

const setApplicationHeader = (state, action) => {
  const newState = {};
  const appNewArray = [];
  _map(action.applicationHeaderList, item => {
    appNewArray.push({ applicationRecordId: item.applicationRecordId, applicationName: item.application });
  });
  const newArr = _uniqWith(appNewArray, _isEqual);
  Object.assign(newState, state, { applicationHeaderArr: action.applicationHeaderList, applicationHeaderList: newArr });
  return newState;
};

const setUploadLevel = (state, action) => {
  const newState = {};
  const appNewArray = [];
  _map(state.applicationHeaderArr, item => {
    appNewArray.push({ applicationRecordId: item.applicationRecordId, appObjectId: item.appObjectId, level: item.level });
  });
  const filtered = _uniqWith(_filter(appNewArray, ['applicationRecordId', action.applicationRecordId]), _isEqual);
  Object.assign(newState, state, { levelList: filtered });
  return newState;
};

const updateApplicationHeaderData = (state, action) => {
  const uploadFormSiteData = {};
  Object.assign(uploadFormSiteData, state);
  const index = _findIndex(uploadFormSiteData.applicationHeaderList, ['applicationRecordId', action.id]);
  if (index > -1) {
    uploadFormSiteData.uploadDataForm.applicationId = uploadFormSiteData.applicationHeaderList[index].applicationRecordId;
    uploadFormSiteData.uploadDataForm.applicationName = uploadFormSiteData.applicationHeaderList[index].applicationName;
    uploadFormSiteData.levelList = [];
    uploadFormSiteData.approverList = [];
    uploadFormSiteData.uploadSitesList = [];
    uploadFormSiteData.metricTypeList = [];
    uploadFormSiteData.uploadDataForm.appObjectId = '';
    uploadFormSiteData.uploadDataForm.approverId = '';
    uploadFormSiteData.uploadDataForm.approverName = '';
    uploadFormSiteData.uploadDataForm.siteId = '*';
  }
  const newState = {};
  Object.assign(newState, uploadFormSiteData);
  return newState;
};

const updateUploadMetricLevelData = (state, action) => {
  const uploadFormSiteData = {};
  Object.assign(uploadFormSiteData, state);
  const index = _findIndex(uploadFormSiteData.levelList, ['appObjectId', action.objectId]);
  if (index > -1) {
    uploadFormSiteData.uploadDataForm.appObjectId = uploadFormSiteData.levelList[index].appObjectId;
    uploadFormSiteData.approverList = [];
    uploadFormSiteData.uploadSitesList = [];
    uploadFormSiteData.uploadDataForm.siteId = '*';
    uploadFormSiteData.uploadDataForm.approverId = '';
    uploadFormSiteData.uploadDataForm.approverName = '';
  }
  const newState = {};
  Object.assign(newState, uploadFormSiteData);
  return newState;
};

const resetUploadSiteData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { uploadSitesList: [] });
  return newState;
};

const updateUploadMetricesStatus = (state, action) => {
  const uploadMetricStatusData = {};
  Object.assign(uploadMetricStatusData, state, { checkedList: action.statusData });
  _map(uploadMetricStatusData.checkedList, item => {
    _remove(uploadMetricStatusData.uploadedMetricesList, i => i.uploadRequestID === item.uploadMetricId);
  });
  const newState = {};
  Object.assign(newState, uploadMetricStatusData, { checkedList: [] });
  return newState;
};

const setValidationSI03AIPCExcelData = (state, action) => {
  const uploadexcelDataValidList = {};
  Object.assign(uploadexcelDataValidList, state);
  const newArr = _map(action.excelData, (o, index) => {
    const item = o;
    item.valid = 'Valid';
    let errMsg = '';
    const inValidDataindex = _findIndex(action.inValidData, ['rowNumber', _toString(index)]);
    const errMsgArr = _filter(action.errMsg, ['rowNum', index]);

    if (inValidDataindex > -1) {
      item.valid = 'In Valid';
      errMsg = 'Material Batch Combination must be validated \n';
    }

    if (errMsgArr.length) {
      item.valid = 'In Valid';
      errMsg = `${errMsg} \n ${errMsgArr[0].msg}`;
    }
    item.errorMsg = errMsg;
    return item;
  });
  const newState = {};
  Object.assign(newState, uploadexcelDataValidList, { excelDataValidList: newArr, isProcessSave: true, isValidationProcessLoading: false });
  return newState;
};

const setMetricLists = (state, action) => {
  const newState = {};
  const metricsIncluded = _.map(action.metricList, o => _.extend({ checked: false }, o));
  Object.assign(newState, state, { metricList: metricsIncluded });
  return newState;
};

const updateMetricesInclude = (state, action) => {
  const newCurrentUploadState = [];
  Object.assign(newCurrentUploadState, state.metricList);
  const currentUploadState = _.map(newCurrentUploadState, included => {
    const item = included;
    item.checked = false;
    const index = _.findIndex(action.includeData, ['metricId', item.metricId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { metricList: currentUploadState });
  return newState;
};

const clearIsProcessSave = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isProcessSave: false });
  return newState;
};

const clearValidateExcelData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { excelDataValidList: [], isValidationProcessLoading: false });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case uploadType.GET_UPLOADED_REQUEST:
      return {
        ...state,
        uploadMetricsLoaded: true
      };
    case uploadType.GET_UPLOADED_METRIC_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case uploadType.GET_UPLOADED_METRICES:
      return setUploadedMetricesList(state, action);

    case uploadType.GET_UPLOADED_METRIC_BY_ID:
      return setCurrentUploadedMetricById(state, action);

    case uploadType.GET_SITES_LIST_UPLOAD:
      return setUploadSitesList(state, action);

    case uploadType.UPDATE_UPLOAD_SITE_DATA:
      return updateUploadSiteData(state, action);

    case uploadType.UPDATE_APPLICATION_HEADER_DATA:
      return updateApplicationHeaderData(state, action);

    case uploadType.UPDATE_UPLOAD_METRIC_LEVEL_DATA:
      return updateUploadMetricLevelData(state, action);

    case uploadType.UPDATE_UPLOADFORM_METRICTYPE:
      return updateUploadFormMetricData(state, action);

    case uploadType.UPDATE_UPLOADFORM_APPROVER:
      return updateUploadFormApproverData(state, action);

    case uploadType.UPDATE_UPLOADFORM_DESCRIPTION:
      return updateUploadFormDescription(state, action);

    case uploadType.UPDATE_UPLOADFORM_STARTDATE:
      return updateUploadFormStartDate(state, action);

    case uploadType.UPDATE_UPLOADFORM_ENDDATE:
      return updateUploadFormEndDate(state, action);

    case uploadType.UPDATE_CURRENT_UPLOAD_METRIC_DATA_LIST:
      return updateCurrentModifyMetricDataList(state, action);

    case uploadType.FILTER_UPLODED_METRICES:
      return filterUploadedMetricList(state, action);

    case uploadType.FILTER_UPLODED_METRICES_FILTER:
      return resetUploadedMetricList(state, action);

    case uploadType.MODIFY_START_DATE:
      return modifyStartDate(state, action);

    case uploadType.MODIFY_END_DATE:
      return modifyEndDate(state, action);

    case uploadType.MODIFY_DESCRIPTION:
      return modifyDescription(state, action);

    case uploadType.GET_UPLOAD_METRIC_LIST:
      return setUploadMetricsList(state, action);

    case uploadType.GET_UPLOAD_APPROVER_LIST:
      return setUploadApprover(state, action);

    case uploadType.RESET_UPLOAD_METRIC_DATA:
      return resetUploadMetriData(state, action);

    case uploadType.GET_ALL_APPLICATION_HEADER:
      return setApplicationHeader(state, action);

    case uploadType.GET_ALL_UPLOAD_METRIC_LEVEL:
      return setUploadLevel(state, action);

    case uploadType.RESET_UPLOAD_SITE_DATA:
      return resetUploadSiteData(state, action);

    case uploadType.UPDATE_UPLOADED_METRICES_STATUS:
      return updateUploadMetricesStatus(state, action);

    case uploadType.GET_UPLOAD_VALIDATE_SI03A_IPC_STABILITY_TESTS_LIST:
      return setValidationSI03AIPCExcelData(state, action);

    case uploadType.GET_ALL_METRICS:
      return setMetricLists(state, action);

    case uploadType.MODIFY_METRICS_METRIC_INCLUDE_LIST:
      return updateMetricesInclude(state, action);

    case uploadType.CLEAR_ISPROCESS_SAVE:
      return clearIsProcessSave(state, action);

    case uploadType.CLEAR_VALIDATE_EXCEL_DATA:
      return clearValidateExcelData(state, action);

    case uploadType.ISLOADED_GET_UPLOAD_VALIDATE_SI03A_IPC_STABILITY_TESTS_LIST:
      return {
        ...state,
        isValidationProcessLoading: true
      };

    default:
      return state;
  }
}
