import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _trimStart from 'lodash/trimStart';
import moment from 'moment';
import { reviewerManagerType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  metricesReviewerList: [],
  metricesReviewerListArr: [],
  scheduleReviewerList: [],
  globalReviewerStatus: 0,
  sitePlanReviewerStatus: 0,
  siteQAReviewerStatus: 0,
  siteReviewerStatus: 0,
  isShowPopupMsg: false
};

const setGlobalReviewerStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { globalReviewerStatus: action.status, isShowPopupMsg: true });
  return newState;
};

const setSitePlanReviewerStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { sitePlanReviewerStatus: action.status, isShowPopupMsg: true });
  return newState;
};

const setSiteQAReviewerStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { siteQAReviewerStatus: action.status, isShowPopupMsg: true });
  return newState;
};

const setSiteReviewerStatus = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { siteReviewerStatus: action.status, isShowPopupMsg: true });
  return newState;
};

const setMetricesReviewer = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { metricesReviewerList: action.metricesReviewerList, metricesReviewerListArr: action.metricesReviewerList });
  return newState;
};

const clearPopUpMsg = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isShowPopupMsg: false });
  return newState;
};

const searchMetricReport = (state, action) => {
  const site = _trimStart(action.data.site);
  const startDate = _trimStart(action.data.startDate);
  const endDate = _trimStart(action.data.endDate);
  let searchValue = state.metricesReviewerListArr;
  if ((site) !== '' && (startDate) !== '' && (endDate) !== '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(item.site, site)
      && _includes(moment(item.startDate).format('DD-MMM-YYYY'), startDate)
      && _includes(moment(item.endDate).format('DD-MMM-YYYY'), endDate));
  } else if ((site) !== '' && (startDate) === '' && (endDate) === '') {
    searchValue = _filter(state.metricesReviewerListArr, item => _includes(item.site, site));
  } else if ((site) === '' && (startDate) !== '' && (endDate) === '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(moment(item.startDate).format('DD-MMM-YYYY'), startDate));
  } else if ((site) === '' && (startDate) === '' && (endDate) !== '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(moment(item.endDate).format('DD-MMM-YYYY'), endDate));
  } else if ((site) !== '' && (startDate) !== '' && (endDate) === '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(item.site, site)
      && _includes(moment(item.startDate).format('DD-MMM-YYYY'), startDate));
  } else if ((site) !== '' && (startDate) === '' && (endDate) !== '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(item.site, site)
      && _includes(moment(item.endDate).format('DD-MMM-YYYY'), endDate));
  } else if ((site) === '' && (startDate) !== '' && (endDate) !== '') {
    searchValue = _filter(state.metricesReviewerListArr, item =>
      _includes(moment(item.startDate).format('DD-MMM-YYYY'), startDate)
      && _includes(moment(item.endDate).format('DD-MMM-YYYY'), endDate));
  }

  const newState = {};
  Object.assign(newState, state, {
    metricesReviewerList: searchValue, isShowPopupMsg: false
  });

  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case reviewerManagerType.GET_ALL_METRICES_REVIEWER:
      return setMetricesReviewer(state, action);

    case reviewerManagerType.GET_STATUS_ADD_REMOVE_GLOBAL_REVIEWER:
      return setGlobalReviewerStatus(state, action);

    case reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_PLAN_REVIEWER:
      return setSitePlanReviewerStatus(state, action);

    case reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_QA_REVIEWER:
      return setSiteQAReviewerStatus(state, action);

    case reviewerManagerType.GET_STATUS_ADD_REMOVE_SITE_REVIEWER:
      return setSiteReviewerStatus(state, action);

    case reviewerManagerType.CLEAR_SHOW_POPUP_MSG:
      return clearPopUpMsg(state, action);

    case reviewerManagerType.SEARCH_METRIC_REPORT:
      return searchMetricReport(state, action);

    default:
      return state;
  }
}
