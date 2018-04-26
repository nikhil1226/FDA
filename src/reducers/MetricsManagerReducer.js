import _findIndex from 'lodash/findIndex';
import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _union from 'lodash/union';
import _remove from 'lodash/remove';
import _join from 'lodash/join';
import moment from 'moment';
import { metricManagerType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  siteMaterialsList: [],
  filteredMaterialsList: [],
  selectedMaterialsList: [],
  removedMaterialsList: [],
  checkedList: [],
  sitesList: [],
  siteMetricSchedulesList: [],
  siteQAReviwerList: [],
  siteReviewerList: [],
  sitePlanReviewerList: [],
  metricReportLists: [],
  viewMetricReportList: [],
  newLinkScheduleProductList: [],
  sitesData: [],
  metricEditType: 'create',
  currentMetric: [{
    siteId: '',
    status: 32,
    description: '',
    site: '',
    startDate: null,
    endDate: null,
    plantCode: '',
    metricsIncluded: [],
    createdBy: '',
    authorName: '',
    siteReviewer: [],
    siteQAReviewer: [],
    sitePlanReviewer: [],
    createdOn: ''
  }],
  mapSchedule: false,
  isExcelReportPopulated: false,
  newLinkScheduleStatus: 0,
  isShowNewLinkSchedulePopupMsg: false,
  metricLinkedScheduleList: [],
  isShowLinkedScheduleList: false
};

const setMetricEditType = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { metricEditType: action.metricEditType });
  return newState;
};

const setMetricSitesList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { sitesList: action.sitesList, checkedList: [] });
  return newState;
};

const updateMetricsSiteData = (state, action) => {
  const newCurrentMetricState = {};
  Object.assign(newCurrentMetricState, state);
  const index = _findIndex(newCurrentMetricState.sitesList, ['id', action.id]);
  if (index > -1) {
    newCurrentMetricState.currentMetric[0].siteId = action.id;
    newCurrentMetricState.currentMetric[0].plantCode = newCurrentMetricState.sitesList[index].plantCode;
    newCurrentMetricState.currentMetric[0].site = newCurrentMetricState.sitesList[index].site;
    newCurrentMetricState.siteQAReviwerList = newCurrentMetricState.sitesList[index].siteQAReviewer;
    newCurrentMetricState.siteReviewerList = newCurrentMetricState.sitesList[index].siteReviewer;
    newCurrentMetricState.sitePlanReviewerList = newCurrentMetricState.sitesList[index].sitePlanReviewer;
    newCurrentMetricState.currentMetric[0].siteReviewer = newCurrentMetricState.sitesList[index].siteReviewer;
    newCurrentMetricState.currentMetric[0].siteQAReviewer = newCurrentMetricState.sitesList[index].siteQAReviewer;
    newCurrentMetricState.currentMetric[0].sitePlanReviewer = newCurrentMetricState.sitesList[index].sitePlanReviewer;
    newCurrentMetricState.currentMetric[0].siteReviewer
    = _map(newCurrentMetricState.currentMetric[0].siteReviewer, o => _extend({ checked: false }, o));
    newCurrentMetricState.currentMetric[0].siteQAReviewer
    = _map(newCurrentMetricState.currentMetric[0].siteQAReviewer, o => _extend({ checked: false }, o));
    newCurrentMetricState.currentMetric[0].sitePlanReviewer
    = _map(newCurrentMetricState.currentMetric[0].sitePlanReviewer, o => _extend({ checked: false }, o));
  }
  const newState = {};
  Object.assign(newState, newCurrentMetricState);
  return newState;
};

const updateMetricDescription = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].description = action.text.substring(0, 100);
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateSiteReviewer = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].siteReviewer = _map(newCurrentMetricState[0].siteReviewer, reviewer => {
    const item = reviewer;
    item.checked = false;
    const index = _findIndex(action.name, ['userId', item.userId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateQAReviewer = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].siteQAReviewer = _map(newCurrentMetricState[0].siteQAReviewer, reviewer => {
    const item = reviewer;
    item.checked = false;
    const index = _findIndex(action.name, ['userId', item.userId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateMetricScheduleId = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].scheduleId = action.scheduleData.scheduleId;
  const newMeatricIncArr = action.scheduleData.metricIncIds.split(',');
  newCurrentMetricState[0].metricsIncluded = _map(newCurrentMetricState[0].metricsIncluded, metric => {
    const item = metric;
    item.checked = false;
    const index = _findIndex(newMeatricIncArr, o => o === item.metricId);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateMapSchedule = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state);
  newCurrentMetricState.mapSchedule = !newCurrentMetricState.mapSchedule;
  if (!newCurrentMetricState.mapSchedule) {
    newCurrentMetricState.siteMetricSchedulesList = [];
  }
  newCurrentMetricState.currentMetric[0].scheduleId = '';
  newCurrentMetricState.currentMetric[0].metricsIncluded =
    _map(newCurrentMetricState.currentMetric[0].metricsIncluded, o => {
      const item = o;
      item.checked = false;
      return item;
    });
  const newState = {};
  Object.assign(newState, newCurrentMetricState);
  return newState;
};

const modifyStartDate = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].startDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const modifyEndDate = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].endDate = action.date;
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateMetricsCheckBox = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  const index = _findIndex(newCurrentMetricState[0].metricsIncluded, ['metricId', action.id]);
  if (index > -1) {
    newCurrentMetricState[0].metricsIncluded[index].checked = !newCurrentMetricState[0].metricsIncluded[index].checked;
  }
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const updateMetricesInclude = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].metricsIncluded = _map(newCurrentMetricState[0].metricsIncluded, included => {
    const item = included;
    item.checked = false;
    const index = _findIndex(action.includeData, ['metricId', item.metricId]);
    if (index > -1) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const resetMetricPlanReportData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    currentMetric: [{
      siteId: '',
      status: 32,
      description: '',
      site: '',
      startDate: null,
      endDate: null,
      plantCode: '',
      metricsIncluded: [],
      createdBy: action.userInfo.userId,
      authorName: action.userInfo.name,
      siteReviewer: [],
      siteQAReviewer: [],
      sitePlanReviewer: [],
      createdOn: ''
    }],
    metricReportLists: [],
    metricEditType: 'create',
    mapSchedule: false,
    siteMaterialsList: [],
    filteredMaterialsList: [],
    selectedMaterialsList: [],
    siteMetricSchedulesList: [],
    checkedList: [],
    siteQAReviwerList: [],
    siteReviewerList: [],
    sitePlanReviewerList: []
  });
  return newState;
};

const editPlanMetric = (state, action) => {
  const {
    siteReviewer, siteQAReviewer, sitePlanReviewer, materialsList
  } = action.planMetric[0];
  const newState = {};
  Object.assign(newState, state);
  const result = _omit(action.planMetric[0], ['materialsList']);
  newState.currentMetric[0] = result;
  newState.currentMetric[0].description = result.metricDescription;
  newState.currentMetric[0].authorName = result.createdBy;
  const newMapschedule = (result.scheduleIdLinked) ? !false : false;

  const newArr = _map(materialsList, o => {
    const item = {};
    Object.assign(item, o, { isSelected: true, excluded: false, comments: '' });
    if (item.materialFlag === '0') {
      item.excluded = true;
    }
    return item;
  });
  Object.assign(newState, state, { currentMetric: newState.currentMetric, selectedMaterialsList: newArr, mapSchedule: newMapschedule, modifyMertricIsloaded: false });
  return newState;
};

const setViewPlanMetricData = (state, action) => {
  const newCurrentMetricState = {};
  Object.assign(newCurrentMetricState, state);
  const result = _omit(action.metricData[0],
  ['metrics', 'siteReviewer', 'siteQAReviewer', 'sitePlanReviewer', 'materialsList']);
  const metricIncludedArr = [];
  _map(action.metricData[0].metricsIncluded, o => {
    metricIncludedArr.push(o.metricName);
  });
  const metricIncludedList = _join(metricIncludedArr, ',');
  newCurrentMetricState.viewMetricReportList[0] = result;
  newCurrentMetricState.viewMetricReportList[0].description = result.metricDescription;
  newCurrentMetricState.viewMetricReportList[0].authorName = result.createdBy;
  newCurrentMetricState.viewMetricReportList[0].metricIncludedList = metricIncludedList;

  newCurrentMetricState.selectedMaterialsList = _filter(action.metricData[0].materialsList, ['materialFlag', '1']);
  newCurrentMetricState.removedMaterialsList = _filter(action.metricData[0].materialsList, ['materialFlag', '0']);
  const newState = {};
  Object.assign(newState, newCurrentMetricState, { viewMetricLoaded: false });
  return newState;
};

const setMaterialsList = (state, action) => {
  const newState = {};
  const newFilterArr = [];
  const newSelectedMaterialArr = state.selectedMaterialsList;

  _map(action.materialsList, o => {
    const item = {};
    Object.assign(item, o, { isDeleted: false, isSelected: false, checked: false, excluded: false, comments: '' });
    const index = _findIndex(newSelectedMaterialArr, ['materialPk', item.materialPk]);
    if (index > -1) {
      if (newSelectedMaterialArr[index].materialFlag === '0') {
        item.isDeleted = true;
        newSelectedMaterialArr[index].excluded = true;
      } else {
        item.isSelected = true;
      }
    }
    newFilterArr.push(item);
  });

  const newRemovedMaterialArr = _filter(newFilterArr, ['isDeleted', true]);
  const unSelectedMaterialArr = _filter(newFilterArr, ['isDeleted', false]);
  const finalUnionArray = _union(newRemovedMaterialArr, unSelectedMaterialArr);

  Object.assign(newState, state, {
    siteMaterialsList: finalUnionArray,
    filteredMaterialsList: finalUnionArray,
    modifyMertricIsloaded: false,
    selectedMaterialsList: newSelectedMaterialArr
  });

  return newState;
};

const filterMaterials = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const queryResult = [];
  const siteMaterialsList = materialsState.siteMaterialsList;
  for (let i = 0, max = siteMaterialsList.length; i <= max; i += 1) {
    if (siteMaterialsList[i]) {
      const material = siteMaterialsList[i];
      if (action.brandName !== '' && action.materialName !== '') {
        if (material.brand !== null && material.materialDescription !== null) {
          if ((material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) && (material.materialDescription.toUpperCase().indexOf(action.materialName.toUpperCase()) !== -1)) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber && queryResult[m].productNdc === material.productNdc) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.brandName !== '') {
        if (material.brand !== null) {
          if (material.brand.toUpperCase().indexOf(action.brandName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber && queryResult[m].productNdc === material.productNdc) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      } else if (action.materialName !== '') {
        if (material.materialDescription !== null) {
          if (material.materialDescription.toUpperCase().indexOf(action.materialName.toUpperCase()) !== -1) {
            let checkForExist = 0;
            for (let m = 0, maxM = queryResult.length; m <= maxM; m += 1) {
              if (queryResult[m]) {
                if (queryResult[m].materialNumber === material.materialNumber && queryResult[m].productNdc === material.productNdc) {
                  checkForExist = 1;
                }
              }
            }
            if (checkForExist === 0) {
              queryResult.push(material);
            }
          }
        }
      }
    }
  }
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: queryResult });
  return newState;
};

const resetMaterialsFilter = (state, action) => {
  const materialsState = {};
  Object.assign(materialsState, state);
  const filteredArray = materialsState.siteMaterialsList;
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: filteredArray });
  return newState;
};

const addMaterialsToSelectedList = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const selectedNewArray = _filter(newMaterialsState.filteredMaterialsList, ['checked', true]);
  const newArray = _map(selectedNewArray, (o) => {
    const item = o;
    item.isSelected = true;
    return item;
  });
  _map(newArray, (o) => {
    const index = _findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', o.materialPk]);
    if (index === -1) {
      newMaterialsState.selectedMaterialsList.push(o);
    } else {
      newMaterialsState.selectedMaterialsList[index].excluded = false;
      newMaterialsState.selectedMaterialsList[index].isSelected = true;
      newMaterialsState.selectedMaterialsList[index].comments = '';
    }
  });

  const newState = {};
  Object.assign(newState, state, { selectedMaterialsList: newMaterialsState.selectedMaterialsList });
  return newState;
};

const deleteMaterialFromSelectedList = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);

  const index = _findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.selectedMaterialsList[index].excluded = true;
    newMaterialsState.selectedMaterialsList[index].isSelected = false;
    newMaterialsState.selectedMaterialsList[index].checked = false;
  }

  const filterIndex = _findIndex(newMaterialsState.filteredMaterialsList, ['materialPk', action.id]);
  if (filterIndex > -1) {
    newMaterialsState.filteredMaterialsList[filterIndex].isSelected = false;
    newMaterialsState.filteredMaterialsList[filterIndex].excluded = false;
    newMaterialsState.filteredMaterialsList[filterIndex].checked = false;
  }
  const newState = {};
  Object.assign(newState, newMaterialsState);
  return newState;
};

const updateMaterialListItemCheckbox = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const index = _findIndex(newMaterialsState.filteredMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.filteredMaterialsList[index].checked = !newMaterialsState.filteredMaterialsList[index].checked;
  }
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: newMaterialsState.filteredMaterialsList });
  return newState;
};

const addDummyMaterialstoSelectedList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { selectedMaterialsList: action.materialList });
  return newState;
};

const updatesitePlanReviewer = (state, action) => {
  const newCurrentMetricState = [];
  Object.assign(newCurrentMetricState, state.currentMetric);
  newCurrentMetricState[0].sitePlanReviewer = _map(newCurrentMetricState[0].sitePlanReviewer, reviewer => {
    const item = reviewer;
    item.checked = false;
    const index = _findIndex(action.name, ['userId', item.userId]);
    if (action.name.userId === item.userId) {
      item.checked = true;
    }
    return item;
  });
  const newState = {};
  Object.assign(newState, state, { currentMetric: newCurrentMetricState });
  return newState;
};

const setSiteMetricSchedulesList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { siteMetricSchedulesList: action.metricSchedules });
  return newState;
};

const updateAllMaterialListItemCheckbox = (state, checkedValue, action) => {
  const newMaterialsState = {};
  const newSelectedAllmaterialArr = [];
  Object.assign(newMaterialsState, state);
  _filter(newMaterialsState.filteredMaterialsList, item => {
    const material = item;
    if (material) {
      material.checked = checkedValue.checked;
    }
    newSelectedAllmaterialArr.push(material);
  });
  const newState = {};
  Object.assign(newState, state, { filteredMaterialsList: newSelectedAllmaterialArr });
  return newState;
};

const setMetricList = (state, action) => {
  const newState = {};
  const newArr = _map(action.metricesList, o => _extend({ checked: false }, o));
  Object.assign(newState, state, { metricReportLists: newArr, metricsIsLoading: false });
  return newState;
};

const updateMetricSelect = (state, action) => {
  const newMetricState = {};
  const filteredProductsArray = [];
  Object.assign(newMetricState, state);
  _remove(newMetricState.checkedList, { isSingleDelete: true });
  const index = _findIndex(newMetricState.metricReportLists, ['metricesId', action.mertricPlanId]);
  if (index > -1) {
    newMetricState.metricReportLists[index].checked
    = !newMetricState.metricReportLists[index].checked;
    const checkedListindex = _findIndex(newMetricState.checkedList, ['metricPlanId', action.mertricPlanId]);
    if (checkedListindex > -1) {
      _remove(newMetricState.checkedList, {
        metricPlanId: action.mertricPlanId
      });
    } else {
      const commentObj = {
        metricPlanId: action.mertricPlanId,
        comments: '',
        forStatus: newMetricState.metricReportLists[index].statusCode,
        isSingleDelete: false
      };
      newMetricState.checkedList.push(commentObj);
    }
  }
  const newState = {};
  Object.assign(newState, state, { metricReportLists: newMetricState.metricReportLists, checkedList: newMetricState.checkedList });
  return newState;
};

const updateSubmitCommentByMetricId = (state, action) => {
  const newMetricState = {};
  const filteredProductsArray = [];
  Object.assign(newMetricState, state);
  const checkedListindex = _findIndex(newMetricState.checkedList, ['metricPlanId', action.id]);
  if (checkedListindex > -1) {
    newMetricState.checkedList[checkedListindex].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newMetricState.checkedList });
  return newState;
};

// Method for comments in selected material list in Modify Scope
const setRemoveMaterialComment = (state, action) => {
  const newMaterialsState = {};
  Object.assign(newMaterialsState, state);
  const index = _findIndex(newMaterialsState.selectedMaterialsList, ['materialPk', action.id]);
  if (index > -1) {
    newMaterialsState.selectedMaterialsList[index].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { selectedMaterialsList: newMaterialsState.selectedMaterialsList });
  return newState;
};

const updateMetricesStatus = (state, action) => {
  const newMetricState = {};
  Object.assign(newMetricState, state, { checkedList: action.statusData });
  _map(newMetricState.checkedList, item => {
    _remove(newMetricState.metricReportLists, i => i.metricesId === item.metricPlanId);
  });
  const newState = {};
  Object.assign(newState, newMetricState, { checkedList: [] });
  return newState;
};

const setMetricListsIncludes = (state, action) => {
  const newState = {};
  Object.assign(newState, state);
  newState.currentMetric[0].metricsIncluded = _map(action.metricList, o => _extend({ checked: false }, o));
  return newState;
};

const setNewLinkScheduleStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, {
    newLinkScheduleStatus: action.status,
    isShowNewLinkSchedulePopupMsg: true,
    newLinkScheduleProductList: action.productList
  });
  return newState;
};

const clearNewLinkScheduleStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { newLinkScheduleStatus: 0, isShowNewLinkSchedulePopupMsg: false, newLinkScheduleProductList: [] });
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

const updateSingleMetricDelete = (state, action) => {
  const newMetricState = {};
  Object.assign(newMetricState, state);
  const newArr = [];
  const newMetricReportLists = _map(newMetricState.metricReportLists, o => {
    const item = o;
    item.checked = false;
    return item;
  });
  const index = _findIndex(newMetricState.metricReportLists, ['metricesId', action.mertricPlanId]);
  if (index > -1) {
    newArr.push({
      metricPlanId: action.mertricPlanId,
      comments: '',
      forStatus: newMetricState.metricReportLists[index].statusCode,
      isSingleDelete: true
    });
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newArr, metricReportLists: newMetricReportLists });
  return newState;
};

const clearSingleMetricDelete = (state, action) => {
  const newMetricState = {};
  Object.assign(newMetricState, state);
  _remove(newMetricState.checkedList, { isSingleDelete: true });
  const newState = {};
  Object.assign(newState, state, { checkedList: newMetricState.checkedList });
  return newState;
};

const setMetricSiteData = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { sitesData: action.sitesList });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case metricManagerType.GET_ALL_METRICES_REQUEST:
      return {
        ...state,
        metricsIsLoading: true
      };
    case metricManagerType.METRIC_EDIT_TYPE:
      return setMetricEditType(state, action);

    case metricManagerType.GET_ALL_METRIC_SITES:
      return setMetricSitesList(state, action);

    case metricManagerType.MODIFY_METRIC_START_DATE:
      return modifyStartDate(state, action);

    case metricManagerType.MODIFY_METRIC_END_DATE:
      return modifyEndDate(state, action);

    case metricManagerType.MODIFY_METRICS_METRICLIST_CHECKBOX:
      return updateMetricsCheckBox(state, action);

    case metricManagerType.UPDATE_METRIC_DESCRIPTION:
      return updateMetricDescription(state, action);

    case metricManagerType.UPDATE_METRICS_SITEDATA:
      return updateMetricsSiteData(state, action);

    case metricManagerType.UPDATE_METRIC_SITEREVIEWER:
      return updateSiteReviewer(state, action);

    case metricManagerType.UPDATE_METRIC_QA_REVIEWER:
      return updateQAReviewer(state, action);

    case metricManagerType.UPDATE_METRIC_SCEDULEID:
      return updateMetricScheduleId(state, action);

    case metricManagerType.UPDATE_METRIC_MAPSCHEDULE:
      return updateMapSchedule(state, action);

    case metricManagerType.RESET_METRIC_PLAN_REPORT_DATA:
      return resetMetricPlanReportData(state, action);

    case metricManagerType.METRICS_GET_ALL_MATERIALS:
      return setMaterialsList(state, action);

    case metricManagerType.METRIC_ADD_METRIC_MATERIALS_TO_SELECTEDLIST:
      return addMaterialsToSelectedList(state, action);

    case metricManagerType.METRIC_FILTER_MATERIALS:
      return filterMaterials(state, action);

    case metricManagerType.METRIC_RESET_FILTER_MATERIALS:
      return resetMaterialsFilter(state, action);

    case metricManagerType.METRIC_TOGGLE_MATERIALS_SELECT_CHECKBOX:
      return updateMaterialListItemCheckbox(state, action);

    case metricManagerType.METRIC_DELETE_SELECTED_MATERIAL_METRICS:
      return deleteMaterialFromSelectedList(state, action);

    case metricManagerType.METRIC_METRIC_ADD_DUMMY_MATERIALS_TO_SELECTEDLIST:
      return addDummyMaterialstoSelectedList(state, action);

    case metricManagerType.METRIC_UPDATE_METRIC_SITE_PLAN_REVIEWER:
      return updatesitePlanReviewer(state, action);

    case metricManagerType.METRIC_GET_SCHEDULE_BY_SITEID:
      return setSiteMetricSchedulesList(state, action);

    case metricManagerType.GET_ALL_METRIC:
      return setMetricList(state, action);

    case metricManagerType.TOGGLE_METRIC_SELECT_CHECKBOX:
      return updateMetricSelect(state, action);

    case metricManagerType.METRIC_UPDATE_SUBMIT_COMMENT_BY_METRICID:
      return updateSubmitCommentByMetricId(state, action);

    case metricManagerType.UPDATE_METRICES_STATUS:
      return updateMetricesStatus(state, action);

    case metricManagerType.MODIFY_METRICS_METRIC_INCLUDE_LIST:
      return updateMetricesInclude(state, action);

    case metricManagerType.GET_METRIC_DATA_BY_ID:
      return editPlanMetric(state, action);

    case metricManagerType.DOWNLOAD_EXCEL_REPORT:
      return { ...state,
        isExcelReportPopulated: true
      };
    case metricManagerType.REMOVE_EXCEL_REPORT:
      return { ...state,
        isExcelReportPopulated: false
      };
    case metricManagerType.METRICS_LOADING:
      return { ...state,
        modifyMertricIsloaded: true
      };

    case metricManagerType.GET_VIEW_METRICES_REQUEST:
      return {
        ...state,
        viewMetricLoaded: true
      };
    case metricManagerType.GET_VIEW_METRIC_DATA:
      return setViewPlanMetricData(state, action);

    case metricManagerType.ALL_METRIC_TOGGLE_MATERIALS_SELECT_CHECKBOX:
      return updateAllMaterialListItemCheckbox(state, action);

    case metricManagerType.GET_ALL_METRICS_INCLUDES:
      return setMetricListsIncludes(state, action);

    case metricManagerType.GET_LINK_SCHEDULE_NEW_METRIC_REPORT_STATUS:
      return setNewLinkScheduleStatus(state, action);

    case metricManagerType.SET_REMOVE_MATERIAL_COMMENT:
      return setRemoveMaterialComment(state, action);

    case metricManagerType.CLEAR_LINK_SCHEDULE_NEW_METRIC_REPORT_STATUS:
      return clearNewLinkScheduleStatus(state, action);

    case metricManagerType.METRIC_REPORT_GET_LINKED_SCHEDULES_BY_ID:
      return setLinkedScheduleLists(state, action);

    case metricManagerType.METRIC_REPORT_CLEAR_LINKED_SCHEDULES_BY_ID:
      return clearLinkedScheduleLists(state, action);

    case metricManagerType.METRIC_REPORT_SINGLE_DELETE:
      return updateSingleMetricDelete(state, action);

    case metricManagerType.CLEAR_METRIC_REPORT_SINGLE_DELETE:
      return clearSingleMetricDelete(state, action);

    case metricManagerType.GET_METRIC_SITE_DATA_BY_ID:
      return setMetricSiteData(state, action);

    default:
      return state;
  }
}
