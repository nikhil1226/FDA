import _ from 'lodash';
import { scheduleType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  isScheduleLoading: false,
  scheduleList: [],
  checkedList: [],
  deletedSchedules: {
    scheduleIds: [],
    statusId: 25,
    statusName: 'Delete',
    userId: 1
  },
  statusUpdateSchedule: {
    schedules: [],
    statusId: 0,
    statusName: '',
    userId: 1
  }
};

const setScheduleList = (state, action) => {
  const newState = {};
  const newArr = _.map(action.scheduleList, o => _.extend({ checked: false }, o));
  Object.assign(newState, state,
    { scheduleList: newArr, checkedList: [], isScheduleLoading: false });
  return newState;
};

const updateScheduleCheckbox = (state, action) => {
  const newScheduleState = {};
  Object.assign(newScheduleState, state);
  const index = _.findIndex(newScheduleState.scheduleList, ['scheduleId', action.scheduleId]);
  if (index > -1) {
    newScheduleState.scheduleList[index].checked = !newScheduleState.scheduleList[index].checked;
    const checkedListindex = _.findIndex(newScheduleState.checkedList, ['id', action.scheduleId]);
    if (checkedListindex > -1) {
      _.remove(newScheduleState.checkedList, {
        id: action.scheduleId
      });
    } else {
      const commentObj = {
        id: action.scheduleId,
        comment: '',
        status: newScheduleState.scheduleList[index].status
      };
      newScheduleState.checkedList.push(commentObj);
    }
  }
  const newState = {};
  Object.assign(newState, state, { scheduleList: newScheduleState.scheduleList, checkedList: newScheduleState.checkedList });
  return newState;
};

const updateSubmitCommentByScheduleId = (state, action) => {
  const newScheduleState = {};
  Object.assign(newScheduleState, state);
  const index = _.findIndex(newScheduleState.checkedList, ['id', action.id]);
  if (index > -1) {
    newScheduleState.checkedList[index].comment = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newScheduleState.checkedList });
  return newState;
};

const updateStatusByScheduleId = (state, action) => {
  const newState = [];
  Object.assign(newState, state);
  _.forEach(newState.checkedList, (schedule) => {
    const nSchedule = {
      scheduleId: _.toString(schedule.id),
      comments: schedule.comment,
      forStatus: schedule.status
    };
    newState.statusUpdateSchedule.schedules.push(nSchedule);
  });
  newState.statusUpdateSchedule.statusId = _.toNumber(action.statusId);
  newState.statusUpdateSchedule.statusName = action.statusName;
  newState.statusUpdateSchedule.userId = action.userId;
  return newState;
};

const removeSelectedStatusState = (state, action) => {
  const newState = [];
  Object.assign(newState, state);
  newState.statusUpdateSchedule.schedules = [];
  newState.statusUpdateSchedule.statusId = 0;
  newState.statusUpdateSchedule.statusName = '';
  newState.checkedList = [];
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case scheduleType.GET_ALL_SCHEDULES_REQUEST:
      return {
        ...state,
        isScheduleLoading: true
      };

    case scheduleType.GET_ALL_SCHEDULES:
      return setScheduleList(state, action);

    case scheduleType.TOGGLE_SCHEDULE_CHECKBOX:
      return updateScheduleCheckbox(state, action);

    case scheduleType.UPDATE_SUBMIT_COMMENT_BY_SCHEDULEID:
      return updateSubmitCommentByScheduleId(state, action);

    case scheduleType.UPDATE_SUBMIT_STATUS_BY_SCHEDULEDID:
      return updateStatusByScheduleId(state, action);

    case scheduleType.REMOVE_STATUS_OBJECT_STATE:
      return removeSelectedStatusState(state, action);

    default:
      return state;
  }
}
