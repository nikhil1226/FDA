import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _uniqBy from 'lodash/uniqBy';
import _filter from 'lodash/filter';
import _extend from 'lodash/extend';
import _remove from 'lodash/remove';
import moment from 'moment';
import { userManagerType } from '../actions/ActionTypes';

const loadFromLocalStorage = (key, defaultVal) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const iniatialCurrentUserDataForm = {
  userId: '',
  siteId: '',
  createdBy: '',
  approverId: '',
  level: '',
  approverName: '',
  applicationId: '',
  applicationName: '',
  appObjectId: '',
  description: '',
  roleRecordId: '',
  successMsg: '',
  authUserInfo: []
};

const DEFAULT_STATE = {
  userInfo: loadFromLocalStorage('userInfo', {}),
  isAuthendicated: loadFromLocalStorage('isAuthendicated', false),
  loginMessage: loadFromLocalStorage('loginMessage', ''),
  applicationHeaders: [],
  levelList: [],
  applicationObjectDetail: [],
  userRequestList: [],
  checkedList: [],
  userCreateFormData: iniatialCurrentUserDataForm
};


const setApplicationHeader = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { applicationHeaders: action.applicationHeaderList });
  return newState;
};

const updateApplicationHeader = (state, action) => {
  const userState = {};
  Object.assign(userState, state);
  const index = _findIndex(userState.applicationHeaders, ['applicationRecordId', action.id]);
  if (index > -1) {
    userState.userCreateFormData.applicationId = userState.applicationHeaders[index].applicationRecordId;
    userState.userCreateFormData.applicationName = userState.applicationHeaders[index].applicationName;
    userState.userCreateFormData.approverId = '';
    userState.userCreateFormData.approverName = '';
    userState.userCreateFormData.siteId = '';
    userState.userCreateFormData.level = '';
    userState.userCreateFormData.roleRecordId = '';
    userState.userCreateFormData.isGlobal = false;
    userState.levelList = [];
    userState.approverList = [];
    userState.userSitesList = [];
    userState.roleList = [];
    userState.sitesList = [];
  }
  const newState = {};
  Object.assign(newState, userState, { userCreateFormData: userState.userCreateFormData });
  return newState;
};

const setApplicationObjectLevel = (state, action) => {
  const newState = {};
  const newLevelArr = [];
  _map(action.applicationObjectDetail, item => {
    newLevelArr.push({ level: item.level });
  });
  const filtered = _uniqBy(newLevelArr, 'level');
  Object.assign(newState, state, { levelList: filtered, applicationObjectDetail: action.applicationObjectDetail });
  return newState;
};

const updateLevel = (state, action) => {
  const userState = {};
  Object.assign(userState, state);
  const index = _findIndex(userState.levelList, ['level', action.level]);
  if (index > -1) {
    userState.userCreateFormData.isGlobal = (userState.levelList[index].level === 'Global');
    userState.userCreateFormData.siteId = (userState.levelList[index].level === 'Global') ? '*' : '';
    userState.userCreateFormData.level = action.level;
    userState.userCreateFormData.roleRecordId = '';
    userState.userCreateFormData.approverId = '';
    userState.approverList = [];
    userState.userSitesList = [];
    userState.userCreateFormData.approverName = '';
    const newRoleArr = _filter(userState.applicationObjectDetail, ['roleGlobalLocalStatus', userState.userCreateFormData.isGlobal]);
    const filtered = _uniqBy(newRoleArr, 'roleRecordId');
    const newRoleListArr = [];
    _map(filtered, item => {
      newRoleListArr.push({ roleName: item.roleName, roleRecordId: item.roleRecordId });
    });
    userState.roleList = newRoleListArr;
  }
  const newState = {};
  Object.assign(newState, userState);
  return newState;
};

const updateUserRoleData = (state, action) => {
  const userState = {};
  Object.assign(userState, state);
  const index = _findIndex(userState.roleList, ['roleRecordId', action.roleRecordId]);
  if (index > -1) {
    userState.userCreateFormData.roleRecordId = userState.roleList[index].roleRecordId;
    userState.approverList = [];
    userState.userSitesList = [];
    userState.userCreateFormData.siteId = userState.userCreateFormData.isGlobal ? '*' : '';
    userState.userCreateFormData.approverId = '';
    userState.userCreateFormData.approverName = '';
    const AppNewArray = _filter(userState.applicationObjectDetail, ['roleRecordId', userState.roleList[index].roleRecordId]);
    const filtered = _uniqBy(AppNewArray, 'objectValue');
    const AppNewSiteArray = [];
    _map(filtered, item => {
      AppNewSiteArray.push({ siteValue: item.siteValue, ObjectValue: item.objectValue });
    });
    userState.sitesList = AppNewSiteArray;
  }
  const newState = {};
  Object.assign(newState, userState);
  return newState;
};

const updateUserSiteData = (state, action) => {
  const userState = {};
  Object.assign(userState, state);
  const index = _findIndex(userState.sitesList, ['ObjectValue', action.id]);
  if (index > -1) {
    userState.userCreateFormData.siteId = userState.sitesList[index].ObjectValue;
    userState.userCreateFormData.sitename = userState.sitesList[index].siteValue;
    userState.userCreateFormData.approverId = '';
    const newApproverArr = _filter(userState.applicationObjectDetail, { roleRecordId: state.userCreateFormData.roleRecordId, objectValue: action.id });
    const filtered = _uniqBy(newApproverArr, 'userId');
    const newApproverListArr = [];
    _map(filtered, item => {
      newApproverListArr.push({ userName: item.userName, userId: item.userId, userGroupRecordId: item.userGroupRecordId });
    });
    userState.approverList = newApproverListArr;
  }
  const newState = {};
  Object.assign(newState, userState);
  return newState;
};

const updateGlobalApproverData = (state, action) => {
  const userState = {};
  Object.assign(userState, state);
  const newArr = _filter(userState.applicationObjectDetail, { roleRecordId: action.id });
  const filtered = _uniqBy(newArr, 'userId');
  const newApproverListArr = [];
  _map(filtered, item => {
    newApproverListArr.push({ userName: item.userName, userId: item.userId, userGroupRecordId: item.userGroupRecordId });
  });
  userState.approverList = newApproverListArr;
  const newState = {};
  Object.assign(newState, userState);
  return newState;
};

const updateUserApproverData = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.userCreateFormData);
  newFromData.approverId = action.approver.userId;
  newFromData.approverName = action.approver.userName;
  const newState = {};
  Object.assign(newState, state, { userCreateFormData: newFromData });
  return newState;
};

const updateDescription = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.userCreateFormData);
  newFromData.description = action.text;
  const newState = {};
  Object.assign(newState, state, { userCreateFormData: newFromData });
  return newState;
};

const updateUserId = (state, action) => {
  const newFromData = {};
  Object.assign(newFromData, state.userCreateFormData);
  newFromData.userId = action.id;
  const newState = {};
  Object.assign(newState, state, { userCreateFormData: newFromData });
  return newState;
};

const resetUserFormData = (state, action) => {
  const newState = {};
  iniatialCurrentUserDataForm.successMsg = action.userObjectDetail[0].msg;
  iniatialCurrentUserDataForm.createdBy = action.userObjectDetail[0].userId;
  Object.assign(newState, state, {
    approverList: [],
    userSitesList: [],
    roleList: [],
    sitesList: [],
    levelList: [],
    userCreateFormData: iniatialCurrentUserDataForm,
    applicationHeaders: []
  });
  return newState;
};

const setUserRequestList = (state, action) => {
  const newState = {};
  const newArr = _map(action.userRequestLists, o => _extend({ checked: false }, o));
  Object.assign(newState, state, {
    userRequestList: newArr, checkedList: []
  });
  return newState;
};

const updateRequestItemCheckbox = (state, action) => {
  const newUserState = {};
  Object.assign(newUserState, state);
  const index = _findIndex(newUserState.userRequestList, ['userAccessRecordId', action.recordId]);
  if (index > -1) {
    newUserState.userRequestList[index].checked = !newUserState.userRequestList[index].checked;
    const checkedListindex = _findIndex(newUserState.checkedList, ['userAccessRecordId', action.recordId]);
    if (checkedListindex > -1) {
      _remove(newUserState.checkedList, { userAccessRecordId: action.recordId });
    } else {
      const commentObj = {
        userAccessRecordId: action.recordId,
        userId: newUserState.userRequestList[index].accessUser,
        userGroupRecordId: newUserState.userRequestList[index].userGroupRecordId,
        siteRecordId: newUserState.userRequestList[index].accessFor,
        workflowRecordId: newUserState.userRequestList[index].workflowRecordId,
        comments: ''
      };
      newUserState.checkedList.push(commentObj);
    }
  }

  const newState = {};
  Object.assign(newState, state, { userRequestList: newUserState.userRequestList, checkedList: newUserState.checkedList });
  return newState;
};

const updateSubmitComment = (state, action) => {
  const newUserState = {};
  Object.assign(newUserState, state);
  const checkedListindex = _findIndex(newUserState.checkedList, ['userAccessRecordId', action.id]);
  if (checkedListindex > -1) {
    newUserState.checkedList[checkedListindex].comments = action.text;
  }
  const newState = {};
  Object.assign(newState, state, { checkedList: newUserState.checkedList });
  return newState;
};

const clearComments = (state, action) => {
  const newUserState = {};
  Object.assign(newUserState, state);
  newUserState.checkedList[0].comments = '';
  const newState = {};
  Object.assign(newState, state, { checkedList: newUserState.checkedList });
  return newState;
};

const setUserAuth = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { authUserInfo: action.authDetail });
  return newState;
};


export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case userManagerType.USER_GET_ALL_APPLICATION_HEADER:
      return setApplicationHeader(state, action);

    case userManagerType.USER_UPDATE_APPLICATION_HEADER_DATA:
      return updateApplicationHeader(state, action);

    case userManagerType.USER_GET_ALL_METRIC_LEVEL:
      return setApplicationObjectLevel(state, action);

    case userManagerType.USER_UPDATE_METRIC_LEVEL_DATA:
      return updateLevel(state, action);

    case userManagerType.USER_UPDATE_ROLE_DATA:
      return updateUserRoleData(state, action);

    case userManagerType.USER_UPDATE_SITE_DATA:
      return updateUserSiteData(state, action);

    case userManagerType.USER_UPDATE_GLOBAL_APPROVER_DATA:
      return updateGlobalApproverData(state, action);

    case userManagerType.USER_UPDATE_APPROVER_DATA:
      return updateUserApproverData(state, action);

    case userManagerType.USER_UPDATE_DESCRIPTION:
      return updateDescription(state, action);

    case userManagerType.USER_UPDATE_UESRID:
      return updateUserId(state, action);

    case userManagerType.USER_RESET_DATA:
      return resetUserFormData(state, action);

    case userManagerType.USER_GET_ALL_REQUEST:
      return setUserRequestList(state, action);

    case userManagerType.TOGGLE_USER_CHECKBOX:
      return updateRequestItemCheckbox(state, action);

    case userManagerType.USER_UPDATE_SUBMIT_COMMENT:
      return updateSubmitComment(state, action);

    case userManagerType.USER_LDAP_AUTHENTICATE:
      return setUserAuth(state, action);

    case userManagerType.USER_CLEAR_SUBMIT_COMMENT:
      return clearComments(state, action);

    default:
      return state;
  }
}
