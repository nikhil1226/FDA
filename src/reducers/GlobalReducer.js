import { GlobalType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  notificationList: []
};

const setNotifications = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { notificationList: action.notificationList });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GlobalType.GET_NOTIFICATIONS:
      return setNotifications(state, action);

    default:
      return state;
  }
}
