import { auditTrial } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  auditListSchedule: []
};

const setAuditList = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { isAuditLoading: false });
  newState.auditListSchedule = action.auditListData;
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case auditTrial.GET_ALL_AUDITS:
      return setAuditList(state, action);
    case auditTrial.GET_ALL_AUDITS_REQUEST:
      return {
        ...state,
        isAuditLoading: true
      };
    default:
      return state;
  }
}
