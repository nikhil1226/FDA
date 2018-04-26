import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _includes from 'lodash/includes';
import _trimStart from 'lodash/trimStart';
import { metricReportReviewTypes } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  metricReportReivewLists: [],
  metricReportCommentsInfo: [],
  currentMetricReportReivew: [{
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
  checkedList: [],
  scopeInfo: [],
  acceptanceInfo: [],
  NTRSInfo: [],
  IOORSInfo: [],
  PQCInfo: [],
  TDUDInfo: [],
  batchMaintentanceInfo: [],
  scopeListArr: [],
  lotsAcceptance: [],
  IOORSInfoData: [],
  productQuality: [],
  totalDosageUnit: [],
  BMInfo: [],
  numberOfTestAndStability: [],
  metricLinkedScheduleList: [],
  isShowLinkedScheduleList: false
};

const setMetricReportReviewList = (state, action) => {
  const newState = {};
  const newArr = _map(action.metricReivewLists, o => _extend({ checked: false }, o));
  Object.assign(newState, state, { metricReportReivewLists: newArr, isLoading: false });
  return newState;
};

const resetMetricReportReview = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { checkedList: [] });
  return newState;
};

const resetReportReviewPopulateData = (state, action) => {
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
    metricReportCommentsInfo: [],
    lotsAcceptance: [],
    numberOfTestAndStability: [],
    productQuality: [],
    totalDosageUnit: [],
    BMInfo: []
  });
  return newState;
};

const updateMetricReportReviewSelect = (state, action) => {
  const newReportReviewState = {};
  Object.assign(newReportReviewState, state);
  const index = _findIndex(newReportReviewState.metricReportReivewLists, ['metricesId', action.mertricPlanId]);
  if (index > -1) {
    newReportReviewState.metricReportReivewLists[index].checked = !newReportReviewState.metricReportReivewLists[index].checked;
    const checkedListindex = _findIndex(newReportReviewState.checkedList, ['metricPlanId', action.mertricPlanId]);
    if (checkedListindex > -1) {
      _remove(newReportReviewState.checkedList, { metricPlanId: action.mertricPlanId });
    } else {
      const commentObj = {
        metricPlanId: action.mertricPlanId,
        status: action.status,
        comments: '',
        forStatus: newReportReviewState.metricReportReivewLists[index].statusCode
      };
      newReportReviewState.checkedList.push(commentObj);
    }
  }
  const newState = {};
  Object.assign(newState, state, {
    metricReportReivewLists: newReportReviewState.metricReportReivewLists,
    checkedList: newReportReviewState.checkedList
  });
  return newState;
};

const setMetricReportReviewData = (state, action) => {
  const newCurrentMetricState = {};
  Object.assign(newCurrentMetricState, state);
  const result = _omit(action.metricData[0],
    ['metrics', 'siteMetricReviewer', 'siteQAReviewer', 'siteCoordinator', 'materialsList']);
  newCurrentMetricState.currentMetricReportReivew[0] = result;
  newCurrentMetricState.currentMetricReportReivew[0].description = result.metricDescription;
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

const setPopulateAcceptanceData = (state, action) => {
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
    numberOfTestAndStability: action.reportInfo,
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
    totalDosageUnit: newTDUDArr,
    isTDUDInfoLoding: false
  });
  return newState;
};

const setPopulateBatchMaintenanceData = (state, action) => {
  const newBMaintentanceArr = [];
  let BMIndex = -1;
  let previousBMaintentanceRecord = {};

  if (action.reportInfo.length) {
    _map(action.reportInfo, (singleInfo, index) => {
      const currentBMaintentanceRecord = _omit(singleInfo,
        ['maintenanceRecordId', 'kPIRecordId', 'reportingDate', 'updatedOn', 'active']);
      if (!_isEqual(previousBMaintentanceRecord, currentBMaintentanceRecord)) {
        BMIndex += 1;
        newBMaintentanceArr.push(singleInfo);
      }
      previousBMaintentanceRecord = _omit(singleInfo,
        ['maintenanceRecordId', 'kPIRecordId', 'reportingDate', 'updatedOn', 'active']);

      newBMaintentanceArr[BMIndex][`KPIRecordID${singleInfo.kPIRecordId}`] = singleInfo.kPIRecordId;
      newBMaintentanceArr[BMIndex][`KPIRecordID${singleInfo.kPIRecordId}Active`] = (singleInfo.active)
          ? !false : false;
      newBMaintentanceArr[BMIndex].comments = '';
    });
  }

  const newState = {};
  Object.assign(newState, state, {
    batchMaintentanceInfo: newBMaintentanceArr,
    BMInfo: newBMaintentanceArr,
    isBatchMaintentanceInfoLoding: false
  });
  return newState;
};

const searchScope = (state, data, action) => {
  const reportQuarter = _trimStart(data.data.reportQuarter);
  const materialValue = _trimStart(data.data.materialNumber);
  const description = _trimStart(data.data.description);
  let searchResult = [];
  if ((reportQuarter) !== '' && (materialValue) !== '' && (description) !== '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) !== '' && (materialValue) === '' && (description) === '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) === '' && (materialValue) !== '' && (description) === '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue));
  } else if ((reportQuarter) === '' && (materialValue) === '' && (description) !== '') {
    console.log('search by description');
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((reportQuarter) !== '' && (materialValue) !== '' && (description) === '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialNumber, materialValue) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) !== '' && (materialValue) === '' && (description) !== '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.reportingQuarter, reportQuarter));
  } else if ((reportQuarter) === '' && (materialValue) !== '' && (description) !== '') {
    searchResult = _filter(state.scopeListArr, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.materialNumber, materialValue));
  }
  const newState = {};
  if (reportQuarter === '' && materialValue === '' && description === '') {
    Object.assign(newState, state, {
      scopeInfo: state.scopeListArr
    });
  } else {
    Object.assign(newState, state, {
      scopeInfo: searchResult
    });
  }
  return newState;
};

function searchValue(value, comment, material, Batch) {
  let searchResult = [];
  const description = _trimStart(comment);
  const materialValue = _trimStart(material);
  const batchValue = _trimStart(Batch);
  if ((description) !== '' && (materialValue) !== '' && (batchValue) !== '') {
    searchResult = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()) && _includes(item.batch.toUpperCase(), batchValue.toUpperCase()));
  } else if ((description) !== '' && (batchValue) === '' && (materialValue) === '') {
    searchResult = _filter(value, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) === '' && (batchValue) === '' && (materialValue) !== '') {
    searchResult = _filter(value, item => _includes(item.materialNumber, materialValue));
  } else if ((description) === '' && (batchValue) !== '' && (materialValue) === '') {
    searchResult = _filter(value, item => _includes(item.batch.toUpperCase(), batchValue.toUpperCase()));
  } else if ((description) === '' && (batchValue) !== '' && (materialValue) !== '') {
    searchResult = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.batch.toUpperCase(), batchValue.toUpperCase()));
  } else if ((description) !== '' && (batchValue) === '' && (materialValue) !== '') {
    searchResult = _filter(value, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) !== '' && (batchValue) !== '' && (materialValue) === '') {
    searchResult = _filter(value, item => _includes(item.batch.toUpperCase(), batchValue.toUpperCase()) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  }
  return searchResult;
}

const setLotsAcceptanceRate = (state, data, action) => {
  const { description, materialNumber, batchNumber } = this.state;
  const searchResult = searchValue(state.lotsAcceptance, description, materialNumber, batchNumber);
  const newState = {};
  if ((description) === '' && (batchNumber) === '' && (materialNumber) === '') {
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
const setNumberOfTestAndStability = (state, data, action) => {
  const { description, materialNumber, batchNumber } = data.data;
  const searchResult = searchValue(state.numberOfTestAndStability, description, materialNumber, batchNumber);
  const newState = {};
  if ((description) === '' && (materialNumber) === '' && (batchNumber) === '') {
    Object.assign(newState, state, {
      NTRSInfo: state.numberOfTestAndStability
    });
  } else {
    Object.assign(newState, state, {
      NTRSInfo: searchResult
    });
  }
  return newState;
};

const setIOORSData = (state, data, action) => {
  const { description, materialNumber, batchNumber } = data.data;
  const searchResult = searchValue(state.IOORSInfoData, description, materialNumber, batchNumber);
  const newState = {};
  if ((description) === '' && (materialNumber) === '' && (batchNumber) === '') {
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

const setProductComplaints = (state, data, action) => {
  const { description, materialNumber, batchNumber } = data.data;
  const searchResult = searchValue(state.productQuality, description, materialNumber, batchNumber);
  const newState = {};
  if ((description) === '' && (materialNumber) === '' && (batchNumber) === '') {
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

const setDosageUnitDistributes = (state, data, action) => {
  const materialValue = _trimStart(data.data.materialNumber);
  const description = _trimStart(data.data.description);
  let dosageUnit = [];
  if ((description) !== '' && (materialValue) !== '') {
    dosageUnit = _filter(state.totalDosageUnit, item => _includes(item.materialNumber, materialValue) && _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) !== '' && (materialValue) === '') {
    dosageUnit = _filter(state.totalDosageUnit, item => _includes(item.materialDescription.toUpperCase(), description.toUpperCase()));
  } else if ((description) === '' && (materialValue) !== '') {
    dosageUnit = _filter(state.totalDosageUnit, item => _includes(item.materialNumber, materialValue));
  }
  const newState = {};
  if ((materialValue) === '' && (description) !== '') {
    Object.assign(newState, state, {
      TDUDInfo: state.totalDosageUnit
    });
  } else {
    Object.assign(newState, state, {
      TDUDInfo: dosageUnit
    });
  }
  return newState;
};

const setBatchMaintenanceInfo = (state, data, action) => {
  const { description, materialNumber, batchNumber } = data.data;
  const searchResult = searchValue(state.BMInfo, description, materialNumber, batchNumber);
  const newState = {};
  if ((description) === '' && (materialNumber) === '' && (batchNumber) === '') {
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

const clearSearchValue = (state, data, action) => {
  const newState = {};
  if ((typeof data) === 'undefined') {
    Object.assign(newState, state, {
      scopeInfo: state.scopeListArr
    });
  }
  return newState;
};

const updateSubmitCommentByMetricId = (state, action) => {
  const newReportState = {};
  Object.assign(newReportState, state);
  const index = _findIndex(newReportState.checkedList, ['metricPlanId', action.id]);
  if (index > -1) {
    newReportState.checkedList[index].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newReportState.checkedList });
  return newState;
};

const setMetricReportReviewCommentsList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { metricReportCommentsInfo: action.commentList });
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
    case metricReportReviewTypes.IS_LOADING_METRIC_REPORT_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_SCOPE_LODING:
      return {
        ...state,
        isScopeInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_ACCEPTANCE_LODING:
      return {
        ...state,
        isAcceptanceInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_NTRS_LODING:
      return {
        ...state,
        isNTRSInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_IOORS_LODING:
      return {
        ...state,
        isIOORSInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_PQC_LODING:
      return {
        ...state,
        isPQCInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_TDUD_LODING:
      return {
        ...state,
        isTDUDInfoLoding: true
      };

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_POPULATE_BATCH_MAINTENTANCE_LODING:
      return {
        ...state,
        isBatchMaintentanceInfoLoding: true
      };

    case metricReportReviewTypes.GET_ALL_METRIC_REPORT_REVIEW:
      return setMetricReportReviewList(state, action);

    case metricReportReviewTypes.RESET_METRIC_REPORT_REVIEW:
      return resetMetricReportReview(state, action);

    case metricReportReviewTypes.RESET_POPULATE_REPORT_REVIEW_METRIC_DATA:
      return resetReportReviewPopulateData(state, action);

    case metricReportReviewTypes.TOGGLE_METRIC_REPORT_SELECT_REVIEW_CHECKBOX:
      return updateMetricReportReviewSelect(state, action);

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_UPDATE_COMMENT_BY_METRICID:
      return updateSubmitCommentByMetricId(state, action);

    case metricReportReviewTypes.GET_METRIC_REPORT_REVIEW_DATA:
      return setMetricReportReviewData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_SCOPE:
      return setPopulateScopeData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_ACCEPTANCE:
      return setPopulateAcceptanceData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_NTRS:
      return setPopulateNTRSData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_IOORS:
      return setPopulateIOORSData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_PQC:
      return setPopulatePQCData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_TDUD:
      return setPopulateTDUDData(state, action);

    case metricReportReviewTypes.GET_POPULATE_METRIC_REPORT_REVIEW_BATCH_MAINTENANCE:
      return setPopulateBatchMaintenanceData(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_SCOPE:
      return searchScope(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_LOTS_ACCEPTANCE_RATE:
      return setLotsAcceptanceRate(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_IOORSINFO:
      return setIOORSData(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_PRODUCT_QUALITY_COMPLAINTS:
      return setProductComplaints(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_BATCH_MAINTENANCE:
      return setBatchMaintenanceInfo(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_DOSAGE_UNIT:
      return setDosageUnitDistributes(state, action);

    case metricReportReviewTypes.SEARCH_METRIC_REPORT_REVIEW_NTRSINFO:
      return setNumberOfTestAndStability(state, action);

    case metricReportReviewTypes.CLEAR_METRIC_REPORT_REVIEW_SEARCH_VALUE:
      return clearSearchValue(state, action);

    case metricReportReviewTypes.GET_METRIC_REPORT_REVIEW_COMMENTS:
      return setMetricReportReviewCommentsList(state, action);

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_GET_LINKED_SCHEDULES_BY_ID:
      return setLinkedScheduleLists(state, action);

    case metricReportReviewTypes.METRIC_REPORT_REVIEW_CLEAR_LINKED_SCHEDULES_BY_ID:
      return clearLinkedScheduleLists(state, action);

    default:
      return state;
  }
}
