import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _includes from 'lodash/includes';
import _trimStart from 'lodash/trimStart';
import { metricMataintanceTypes } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  metricMaintanceLists: [],
  currentMetric: [{
    metricesId: null,
    scheduleId: null,
    description: '',
    startDate: null,
    endDate: null,
    plantCode: null,
    site: null,
    createdBy: null,
    status: null
  }],
  isLoading: true,
  isScopeInfoLoding: true,
  isAcceptanceInfoLoding: true,
  isNTRSInfoLoding: true,
  isIOORSInfoLoding: true,
  isPQCInfoLoding: true,
  isTDUDInfoLoding: true,
  isBatchMaintentanceInfoLoding: true,
  isCreatedReport: false,
  linkScheduleStatus: '',
  isShowSchedulePopUp: false,
  isShowScheduleSuccessMsg: false,
  isShowPopupMsg: false,
  popUpScheduleList: [],
  checkedList: [],
  checkedBatchList: [],
  scopeInfo: [],
  acceptanceInfo: [],
  NTRSInfo: [],
  IOORSInfo: [],
  PQCInfo: [],
  TDUDInfo: [],
  batchMaintentanceInfo: [],
  scopeListArr: [],
  commentsInfo: [],
  isExcelReportPopulated: false,
  lotsAcceptance: [],
  IOORSInfoData: [],
  productQuality: [],
  totaldosageUnit: [],
  BMInfo: [],
  numberOfTestAndstability: [],
  linkScheduleProductList: [],
  metricLinkedScheduleList: [],
  isShowLinkedScheduleList: false
};

const setMetricMaintanceList = (state, action) => {
  const newState = {};
  const newArr = _map(action.metricesList, o => _extend({ checked: false }, o));
  Object.assign(newState, state, { metricMaintanceLists: newArr, isLoading: false });
  return newState;
};

const resetMetricReportMataintance = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { checkedList: [] });
  return newState;
};

const resetPopulateData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    checkedList: [],
    metricReportInfo: [],
    scopeInfo: [],
    acceptanceInfo: [],
    IOORSInfo: [],
    IOORSInfoData: [],
    PQCInfo: [],
    TDUDInfo: [],
    batchMaintentanceInfo: [],
    scopeListArr: [],
    commentsInfo: [],
    lotsAcceptance: [],
    numberOfTestAndstability: [],
    productQuality: [],
    totaldosageUnit: [],
    BMInfo: []
  });
  return newState;
};

const updateMetricSelect = (state, action) => {
  const newMaintanceState = {};
  Object.assign(newMaintanceState, state);
  const index = _findIndex(newMaintanceState.metricMaintanceLists, ['metricesId', action.mertricPlanId]);
  if (index > -1) {
    newMaintanceState.metricMaintanceLists[index].checked = !newMaintanceState.metricMaintanceLists[index].checked;
    const checkedListindex = _findIndex(newMaintanceState.checkedList, ['metricPlanId', action.mertricPlanId]);
    if (checkedListindex > -1) {
      _remove(newMaintanceState.checkedList, { metricPlanId: action.mertricPlanId });
    } else {
      const commentObj = {
        metricPlanId: action.mertricPlanId,
        status: newMaintanceState.metricMaintanceLists[index].status,
        linkedToSchedule: newMaintanceState.metricMaintanceLists[index].scheduleIdLinked,
        comments: '',
        forStatus: newMaintanceState.metricMaintanceLists[index].statusCode,
        approvalFlag: newMaintanceState.metricMaintanceLists[index].approvalFlag
      };
      newMaintanceState.checkedList.push(commentObj);
    }
  }
  const newState = {};
  Object.assign(newState, state, {
    metricMaintanceLists: newMaintanceState.metricMaintanceLists,
    checkedList: newMaintanceState.checkedList
  });
  return newState;
};

const setMetricData = (state, action) => {
  const newCurrentMetricState = {};
  Object.assign(newCurrentMetricState, state);
  const result = _omit(action.metricData[0],
    ['metrics', 'siteMetricReviewer', 'siteQAReviewer', 'siteCoordinator', 'materialsList']);
  newCurrentMetricState.currentMetric[0] = result;
  newCurrentMetricState.currentMetric[0].description = result.metricDescription;
  const newState = {};
  Object.assign(newState, newCurrentMetricState);
  return newState;
};

const setPopulateScopeData = (state, action) => {
  const newScopeArr = [];
  let resultScopeIndex = -1;
  let previousScopeRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, singleInfo => {
      const currentScopeRecord = _omit(singleInfo, ['kPIRecordId', 'numberofBatches']);
      if (!_isEqual(previousScopeRecord, currentScopeRecord)) {
        resultScopeIndex += 1;
        newScopeArr.push(singleInfo);
      }
      previousScopeRecord = _omit(singleInfo, ['kPIRecordId', 'numberofBatches']);
      newScopeArr[resultScopeIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = singleInfo.numberofBatches;
    });
  }

  const newState = {};
  Object.assign(newState, state, {
    scopeInfo: newScopeArr,
    scopeListArr: newScopeArr,
    isScopeInfoLoding: false
  });
  return newState;
};

const setPopulateAcceptancetData = (state, action) => {
  const newLotAccptanceArr = [];
  let resultAcceptanceIndex = -1;
  let previousAcceptanceRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentAcceptanceRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      if (!_isEqual(previousAcceptanceRecord, currentAcceptanceRecord)) {
        resultAcceptanceIndex += 1;
        newLotAccptanceArr.push(singleInfo);
      }
      previousAcceptanceRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      newLotAccptanceArr[resultAcceptanceIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = 'checked';
    });
  }
  const newState = {};
  Object.assign(newState, state, {
    acceptanceInfo: newLotAccptanceArr,
    lotsAcceptance: newLotAccptanceArr,
    isAcceptanceInfoLoding: false
  });
  return newState;
};

const setPopulateNTRSData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    NTRSInfo: action.reportInfo,
    numberOfTestAndstability: action.reportInfo,
    isNTRSInfoLoding: false
  });
  return newState;
};

const setPopulateIOORSData = (state, action) => {
  const newIOORSArr = [];
  let resultIOORSIndex = -1;
  let previousIOORSRecord = {};
  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentIOORSRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      if (!_isEqual(previousIOORSRecord, currentIOORSRecord)) {
        resultIOORSIndex += 1;
        newIOORSArr.push(singleInfo);
      }
      previousIOORSRecord = _omit(singleInfo, ['kPIRecordId', 'reportingDate']);
      if (newIOORSArr[resultIOORSIndex]) {
        newIOORSArr[resultIOORSIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = 'checked';
      }
    });
  }
  const newState = {};
  Object.assign(newState, state, {
    IOORSInfo: newIOORSArr,
    IOORSInfoData: newIOORSArr,
    isIOORSInfoLoding: false
  });
  return newState;
};

const setPopulatePQCData = (state, action) => {
  const newPQCArr = [];
  let previousPQCRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentPQCRecord = singleInfo;
      if (!_isEqual(previousPQCRecord, currentPQCRecord)) {
        newPQCArr.push(singleInfo);
      }
      previousPQCRecord = singleInfo;
    });
  }
  const newState = {};
  Object.assign(newState, state, {
    PQCInfo: newPQCArr,
    productQuality: newPQCArr,
    isPQCInfoLoding: false
  });
  return newState;
};

const setPopulateTDUDData = (state, action) => {
  const newTDUDArr = [];
  let previousTDUDRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentTDUDRecord = singleInfo;
      if (!_isEqual(previousTDUDRecord, currentTDUDRecord)) {
        newTDUDArr.push(singleInfo);
      }
      previousTDUDRecord = singleInfo;
    });
  }
  const newState = {};
  Object.assign(newState, state, {
    TDUDInfo: newTDUDArr,
    totaldosageUnit: newTDUDArr,
    isTDUDInfoLoding: false
  });
  return newState;
};

const setPopulateBatchMaintenanceData = (state, action) => {
  const newbMaintentanceArr = [];
  let resultbMaintentanceIndex = -1;
  let previousBMaintentanceRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentBMaintentanceRecord = _omit(singleInfo,
        ['maintenanceRecordId', 'kPIRecordId', 'reportingDate', 'updatedOn', 'active']);
      if (!_isEqual(previousBMaintentanceRecord, currentBMaintentanceRecord)) {
        resultbMaintentanceIndex += 1;
        newbMaintentanceArr.push(singleInfo);
      }
      previousBMaintentanceRecord = _omit(singleInfo,
        ['maintenanceRecordId', 'kPIRecordId', 'reportingDate', 'updatedOn', 'active']);

      newbMaintentanceArr[resultbMaintentanceIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = singleInfo.kPIRecordId;
      newbMaintentanceArr[resultbMaintentanceIndex][`KPIRecordID${singleInfo.kPIRecordId}Active`] = (singleInfo.active)
          ? !false : false;
      newbMaintentanceArr[resultbMaintentanceIndex].comments = '';
    });
  }

  const newState = {};
  Object.assign(newState, state, {
    batchMaintentanceInfo: newbMaintentanceArr,
    BMInfo: newbMaintentanceArr,
    isBatchMaintentanceInfoLoding: false
  });
  return newState;
};

const updateBatchMaintenance = (state, action) => {
  const newReportState = {};
  Object.assign(newReportState, state);
  _map(action.updatedData.KPIRecords, item => {
    const index = _findIndex(newReportState.batchMaintentanceInfo, ['materialBatchRecord', item.materialBatchRecord]);
    newReportState.batchMaintentanceInfo[index][`KPIRecordID${item.KPIRecordId}Active`] = item.active;
    newReportState.batchMaintentanceInfo[index].comments = '';
  });
  const newState = {};
  Object.assign(newState, state, {
    batchMaintentanceInfo: newReportState.batchMaintentanceInfo,
    checkedBatchList: [] });
  return newState;
};

const searchScope = (state, data, action) => {
  const reportQuarter = _trimStart(data.data.reportQuarter);
  const materialValue = _trimStart(data.data.materialNumber);
  const description = _trimStart(data.data.description);
  let searchValue = [];
  if ((reportQuarter) !== '' && (materialValue) !== '' && (description) !== '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) !== '' && (materialValue) === '' && (description) === '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) === '' && (materialValue) !== '' && (description) === '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue));
  } else if ((reportQuarter) === '' && (materialValue) === '' && (description) !== '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((reportQuarter) !== '' && (materialValue) !== '' && (description) === '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) !== '' && (materialValue) === '' && (description) !== '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) === '' && (materialValue) !== '' && (description) !== '') {
    searchValue = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.materialNumber, materialValue));
  }

  const newState = {};
  if ((reportQuarter) === '' && (materialValue) === '' && (description) === '') {
    Object.assign(newState, state, {
      scopeInfo: state.scopeListArr
    });
  } else {
    Object.assign(newState, state, {
      scopeInfo: searchValue
    });
  }
  return newState;
};

function searchvalue(value, comment, material, batch) {
  let searchValue = [];
  const description = _trimStart(comment);
  const materialValue = _trimStart(material);
  const batchvalue = _trimStart(batch);
  if ((description) !== '' && (materialValue) !== '' && (batchvalue) !== '') {
    searchValue = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.batch.toUpperCase(), batchvalue.toUpperCase()));
  } else if ((description) !== '' && (batchvalue) === '' && (materialValue) === '') {
    searchValue = _filter(value, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) === '' && (batchvalue) === '' && (materialValue) !== '') {
    searchValue = _filter(value, item => _includes(item.materialNumber, materialValue));
  } else if ((description) === '' && (batchvalue) !== '' && (materialValue) === '') {
    searchValue = _filter(value, item => _includes(item.batch.toUpperCase(), batchvalue.toUpperCase()));
  } else if ((description) === '' && (batchvalue) !== '' && (materialValue) !== '') {
    searchValue = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.batch.toUpperCase(), batchvalue.toUpperCase()));
  } else if ((description) !== '' && (batchvalue) === '' && (materialValue) !== '') {
    searchValue = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) !== '' && (batchvalue) !== '' && (materialValue) === '') {
    searchValue = _filter(value, item => _includes(item.batch.toUpperCase(), batchvalue.toUpperCase()) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  }
  return searchValue;
}

const lotsAcceptanceRate = (state, data, action) => {
  const description = data.data.description;
  const materialValue = data.data.materialNumber;
  const batchValue = data.data.batchNumber;
  const searchResult = searchvalue(state.lotsAcceptance, description, materialValue, batchValue);
  const newState = {};
  if ((description) === '' && (materialValue) === '' && (batchValue) === '') {
    Object.assign(newState, state, {
      acceptanceInfo: state.lotsAcceptance
    });
  } else {
    Object.assign(newState, state, {
      acceptanceInfo: searchResult
    });
  }
  return newState;
};
const numberOfTestAndstability = (state, data, action) => {
  const description = data.data.description;
  const materialValue = data.data.materialNumber;
  const batchValue = data.data.batchNumber;
  const searchResult = searchvalue(state.numberOfTestAndstability, description, materialValue, batchValue);
  const newState = {};
  if ((description) === '' && (materialValue) === '' && (batchValue) === '') {
    Object.assign(newState, state, {
      NTRSInfo: state.numberOfTestAndstability
    });
  } else {
    Object.assign(newState, state, {
      NTRSInfo: searchResult
    });
  }
  return newState;
};

const ioorsData = (state, data, action) => {
  const description = data.data.description;
  const materialValue = data.data.materialNumber;
  const batchvalue = data.data.batchNumber;
  const searchResult = searchvalue(state.IOORSInfoData, description, materialValue, batchvalue);
  const newState = {};
  if ((description) === '' && (materialValue) === '' && (batchvalue) === '') {
    Object.assign(newState, state, {
      IOORSInfo: state.IOORSInfoData
    });
  } else {
    Object.assign(newState, state, {
      IOORSInfo: searchResult
    });
  }
  return newState;
};

const productComplaints = (state, data, action) => {
  const description = data.data.description;
  const materialValue = data.data.materialNumber;
  const batchvalue = data.data.batchNumber;
  const searchResult = searchvalue(state.productQuality, description, materialValue, batchvalue);
  const newState = {};
  if ((description) === '' && (materialValue) === '' && (batchvalue) === '') {
    Object.assign(newState, state, {
      PQCInfo: state.productQuality
    });
  } else {
    Object.assign(newState, state, {
      PQCInfo: searchResult
    });
  }
  return newState;
};

const dosageUnitDistributes = (state, data, action) => {
  const materialValue = _trimStart(data.data.materialNumber);
  const description = _trimStart(data.data.description);
  let dosageUnit = [];
  if ((description) !== '' && (materialValue) !== '') {
    dosageUnit = _filter(state.totaldosageUnit, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) !== '' && (materialValue) === '') {
    dosageUnit = _filter(state.totaldosageUnit, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) === '' && (materialValue) !== '') {
    dosageUnit = _filter(state.totaldosageUnit, item => _includes(item.materialNumber, materialValue));
  }
  const newState = {};
  if ((materialValue) === '' && (description) !== '') {
    Object.assign(newState, state, {
      TDUDInfo: state.totaldosageUnit
    });
  } else {
    Object.assign(newState, state, {
      TDUDInfo: dosageUnit
    });
  }
  return newState;
};

const batchMaintenanceInfo = (state, data, action) => {
  const description = data.data.description;
  const materialValue = data.data.materialNumber;
  const batchValue = data.data.batchNumber;
  const searchResult = searchvalue(state.BMInfo, description, materialValue, batchValue);
  const newState = {};
  if ((description) === '' && (materialValue) === '' && (batchValue) === '') {
    Object.assign(newState, state, {
      batchMaintentanceInfo: state.BMInfo
    });
  } else {
    Object.assign(newState, state, {
      batchMaintentanceInfo: searchResult
    });
  }
  return newState;
};

const clearTheSearchValue = (state, data, action) => {
  const newState = {};
  if ((typeof data) === 'undefined') {
    Object.assign(newState, state, {
      scopeInfo: state.scopeListArr
    });
  }
  return newState;
};

const setCommentsList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { commentsInfo: action.commentList });
  return newState;
};

const updateSubmitCommentByMetricId = (state, action) => {
  const newReportState = {};
  const filteredProductsArray = [];
  Object.assign(newReportState, state);
  const checkedListindex = _findIndex(newReportState.checkedList, ['metricPlanId', action.id]);
  if (checkedListindex > -1) {
    newReportState.checkedList[checkedListindex].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newReportState.checkedList });
  return newState;
};

const setSchedulesBySite = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowSchedulePopUp: true, popUpScheduleList: action.scheduleData });
  return newState;
};

const clearShowSchedulePopup = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowSchedulePopUp: false, popUpScheduleList: [], isShowPopupMsg: false });
  return newState;
};

const setStatusUpdateLinkSchedule = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    linkScheduleStatus: action.status,
    linkScheduleProductList: action.productList,
    isShowPopupMsg: true,
    isShowSchedulePopUp: false
  });
  return newState;
};

const setSuccessLinkSchedule = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleSuccessMsg: true });
  return newState;
};

const clearSuccessLinkSchedule = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowScheduleSuccessMsg: false });
  return newState;
};

const setLinkedScheduleLists = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { metricLinkedScheduleList: action.linkSchedules, isShowLinkedScheduleList: true });
  return newState;
};

const clearLinkedScheduleLists = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { metricLinkedScheduleList: [], isShowLinkedScheduleList: false });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case metricMataintanceTypes.GET_ALL_METRIC_MAINTANCE_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case metricMataintanceTypes.CREATE_REPORT:
      return {
        ...state,
        isCreatedReport: true
      };

    case metricMataintanceTypes.REMOVE_CREATE_REPORT:
      return {
        ...state,
        isCreatedReport: false
      };
    case metricMataintanceTypes.MODIFY_MAINTANCE_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_SCOPE_LODING:
      return {
        ...state,
        isScopeInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_ACCEPTANCE_LODING:
      return {
        ...state,
        isAcceptanceInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_NTRS_LODING:
      return {
        ...state,
        isNTRSInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_IOORS_LODING:
      return {
        ...state,
        isIOORSInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_PQC_LODING:
      return {
        ...state,
        isPQCInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_TDUD_LODING:
      return {
        ...state,
        isTDUDInfoLoding: true
      };

    case metricMataintanceTypes.METRIC_MAINTANCE_POPULATE_BATCH_MAINTENTANCE_LODING:
      return {
        ...state,
        isBatchMaintentanceInfoLoding: true
      };

    case metricMataintanceTypes.GET_ALL_METRIC_MAINTANCE_REPORT:
      return setMetricMaintanceList(state, action);

    case metricMataintanceTypes.RESET_METRIC_REPORT_MATAINTANCE:
      return resetMetricReportMataintance(state, action);

    case metricMataintanceTypes.TOGGLE_METRIC_REPORT_SELECT_CHECKBOX:
      return updateMetricSelect(state, action);

    case metricMataintanceTypes.GET_METRIC_DATA:
      return setMetricData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_SCOPE:
      return setPopulateScopeData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_ACCEPTANCE:
      return setPopulateAcceptancetData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_NTRS:
      return setPopulateNTRSData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_IOORS:
      return setPopulateIOORSData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_PQC:
      return setPopulatePQCData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_TDUD:
      return setPopulateTDUDData(state, action);

    case metricMataintanceTypes.GET_POPULATE_METRIC_REPORT_BATCH_MAINTENANCE:
      return setPopulateBatchMaintenanceData(state, action);

    case metricMataintanceTypes.RESET_POPULATE_METRIC_DATA:
      return resetPopulateData(state, action);

    case metricMataintanceTypes.UPDATE_KPIRECORD:
      return updateBatchMaintenance(state, action);

    case metricMataintanceTypes.SEARCH_REPORT:
      return searchScope(state, action);

    case metricMataintanceTypes.GET_METRIC_REPORT_COMMENTS:
      return setCommentsList(state, action);
    case metricMataintanceTypes.DOWNLOAD_EXCEL_REPORT:
      return { ...state,
        isExcelReportPopulated: true
      };
    case metricMataintanceTypes.REMOVE_EXCEL_REPORT:
      return { ...state,
        isExcelReportPopulated: false
      };
    case metricMataintanceTypes.METRICS_LOADING:
      return { ...state,
        modifyMertricIsloaded: true
      };

    case metricMataintanceTypes.METRIC_UPDATE_SUBMIT_COMMENT_BY_METRICID:
      return updateSubmitCommentByMetricId(state, action);

    case metricMataintanceTypes.SEARCH_LOTS_ACCEPTANCE_RATE:
      return lotsAcceptanceRate(state, action);

    case metricMataintanceTypes.SEARCH_IOORSINFO:
      return ioorsData(state, action);

    case metricMataintanceTypes.SEARCH_PRODUCT_QUALITY_COMPLAINTS:
      return productComplaints(state, action);

    case metricMataintanceTypes.SEARCH_BATCH_MAINTENANCE:
      return batchMaintenanceInfo(state, action);

    case metricMataintanceTypes.SEARCH_DOSAGE_UNIT:
      return dosageUnitDistributes(state, action);

    case metricMataintanceTypes.SEARCH_NTRSINFO:
      return numberOfTestAndstability(state, action);

    case metricMataintanceTypes.CLEAR_SEARCH_VALUE:
      return clearTheSearchValue(state, action);

    case metricMataintanceTypes.GET_SCHEDULES_BY_SITE:
      return setSchedulesBySite(state, action);

    case metricMataintanceTypes.CLEAR_SHOW_SCHEDULE_POPUP:
      return clearShowSchedulePopup(state, action);

    case metricMataintanceTypes.GET_STATUS_UPDATE_LINK_SCHEDULE:
      return setStatusUpdateLinkSchedule(state, action);

    case metricMataintanceTypes.SUCCESS_UPDATE_SCHEDULE_LINK:
      return setSuccessLinkSchedule(state, action);

    case metricMataintanceTypes.CLEAR_SUCCESS_UPDATE_SCHEDULE_LINK:
      return clearSuccessLinkSchedule(state, action);

    case metricMataintanceTypes.METRIC_REPORT_MAINTENANCE_GET_LINKED_SCHEDULES_BY_ID:
      return setLinkedScheduleLists(state, action);

    case metricMataintanceTypes.METRIC_REPORT_MAINTENANCE_CLEAR_LINKED_SCHEDULES_BY_ID:
      return clearLinkedScheduleLists(state, action);

    default:
      return state;
  }
}
