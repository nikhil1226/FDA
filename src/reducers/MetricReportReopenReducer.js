import _map from 'lodash/map';
import _extend from 'lodash/extend';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import { metricReportReopenTypes } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  metricReportReopenLists: [],
  latestCommentsInfo: [],
  isLatestComment: false,
  isLoading: true,
  checkedList: [],
  metricLinkedScheduleList: [],
  isShowLinkedScheduleList: false
};

const setMetricReportReopenList = (state, action) => {
  const newState = {};
  const newArr = _map(action.metricReopenLists, o => _extend({ checked: false }, o));
  Object.assign(newState, state, { metricReportReopenLists: newArr, isLoading: false, checkedList: [] });
  return newState;
};

const resetMetricReportReopen = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { checkedList: [] });
  return newState;
};

const updateMetricReportReopenComments = (state, action) => {
  const newReopenState = {};
  Object.assign(newReopenState, state);
  const checkedListindex = _findIndex(newReopenState.checkedList, ['metricPlanId', action.id]);
  if (checkedListindex > -1) {
    newReopenState.checkedList[checkedListindex].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newReopenState.checkedList });
  return newState;
};

const updateMetricReportReopenSelect = (state, action) => {
  const newReportReopenState = {};
  Object.assign(newReportReopenState, state);
  const index = _findIndex(newReportReopenState.metricReportReopenLists, ['metricesId', action.mertricPlanId]);
  if (index > -1) {
    newReportReopenState.metricReportReopenLists[index].checked = !newReportReopenState.metricReportReopenLists[index].checked;
    const checkedListindex = _findIndex(newReportReopenState.checkedList, ['metricPlanId', action.mertricPlanId]);
    if (checkedListindex > -1) {
      _remove(newReportReopenState.checkedList, { metricPlanId: action.mertricPlanId });
    } else {
      const commentObj = {
        metricPlanId: action.mertricPlanId,
        comments: '',
        forStatus: newReportReopenState.metricReportReopenLists[index].statusCode
      };
      newReportReopenState.checkedList.push(commentObj);
    }
  }
  const newState = {};
  Object.assign(newState, state, {
    metricReportReopenLists: newReportReopenState.metricReportReopenLists,
    checkedList: newReportReopenState.checkedList
  });
  return newState;
};

const setReopenLatestComments = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { latestCommentsInfo: action.latestCommentList, isLatestComment: true });
  return newState;
};

const clearReopenLatestComments = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { latestCommentsInfo: [], isLatestComment: false });
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
    case metricReportReopenTypes.IS_LOADING_METRIC_REPORT_REOPEN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case metricReportReopenTypes.GET_ALL_METRIC_REPORT_REOPEN_DATA:
      return setMetricReportReopenList(state, action);

    case metricReportReopenTypes.RESET_METRIC_REPORT_REOPEN:
      return resetMetricReportReopen(state, action);

    case metricReportReopenTypes.TOGGLE_METRIC_REPORT_SELECT_REOPEN_CHECKBOX:
      return updateMetricReportReopenSelect(state, action);

    case metricReportReopenTypes.METRIC_REPORT_REOPEN_UPDATE_COMMENT:
      return updateMetricReportReopenComments(state, action);

    case metricReportReopenTypes.GET_METRIC_REPORT_REOPEN_LATEST_COMMENT:
      return setReopenLatestComments(state, action);

    case metricReportReopenTypes.CLEAR_METRIC_REPORT_REOPEN_LATEST_COMMENT:
      return clearReopenLatestComments(state, action);

    case metricReportReopenTypes.METRIC_REPORT_REOPEN_GET_LINKED_SCHEDULES_BY_ID:
      return setLinkedScheduleLists(state, action);

    case metricReportReopenTypes.METRIC_REPORT_REOPEN_CLEAR_LINKED_SCHEDULES_BY_ID:
      return clearLinkedScheduleLists(state, action);

    default:
      return state;
  }
}
