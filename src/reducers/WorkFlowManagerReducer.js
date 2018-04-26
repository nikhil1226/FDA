import { workFlowType } from '../actions/ActionTypes';

const DEFAULT_STATE = {
  workflowList: [],
  isWorkFlowLoading: false
};

const setWorkFlowLists = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { workflowList: action.workFlowListData, isWorkFlowLoading: false });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case workFlowType.GET_WORK_FLOW_LIST:
      return setWorkFlowLists(state, action);

    case workFlowType.GET_WORK_FLOW_LIST_REQUEST:
      return {
        ...state,
        isWorkFlowLoading: true
      };

    default:
      return state;
  }
}
