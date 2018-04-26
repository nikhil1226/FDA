import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _remove from 'lodash/remove';
import _isEqual from 'lodash/isEqual';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';
import {
  getAllSchedules,
  updateScheduleItemCheckBox,
  updateCommentsByScheduleId,
  updateDeleteByScheduleId,
  updateStatusByScheduleId,
  updateStatusSelectedSchedules
} from '../../../actions/ScheduleActions';
import { submitStatus } from '../../../constants/submitStatus';
import {
  resetScheduleData,
  getSendForApprovalStatus,
  clearSendForApprovalStatus
} from '../../../actions/ScheduleManagerActions';
import ModelCustom from '../../../shared/CustomModel';
import './ScheduleHome.scss';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad, SvgiTick } from '../../SVGIcons';
import CheckBoxField from '../../Fields/CheckBoxField/CheckBoxField';
import CommentBoxField from '../../Fields/CommentBoxField/CommentBoxField';
import { TableField, ButtonField } from '../../FormInputs';

class ScheduleHome extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowErrorModal: false,
      errorText: '',
      isShowConfirmModal: false,
      confirmModalText: '',
      statusSubmitModalText: '',
      isShowStatusSubmitModal: false,
      successComment: '',
      statusId: 0,
      showSnackBar: false,
      snackBarMessage: '',
      showSendForApprovalStatusModal: false,
      showCommentsError: false,
      checkedListInfo: []
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllSchedules());
  }

  componentDidMount() {
    this.props.dispatch(resetScheduleData());
  }

  componentWillReceiveProps(nextProps) {
    const { isShowSendForApprovalStatus, sendForApprovalProductList, sendForApprovalStatus } = nextProps.scheduleManager;
    if (isShowSendForApprovalStatus && sendForApprovalProductList.length && sendForApprovalStatus > 0) {
      this.setState({ showSendForApprovalStatusModal: true });
    } else if (isShowSendForApprovalStatus) {
      this.showSubmitModal(23);
      this.props.dispatch(clearSendForApprovalStatus());
    }
  }

  onRowExpand = () => {
    if (document.getElementsByClassName('scheduleGrid')[0].getElementsByClassName('rt-tbody')[0].scrollHeight > document.getElementsByClassName('scheduleGrid')[0].getElementsByClassName('rt-tbody')[0].clientHeight) {
      document.getElementsByClassName('scheduleGrid')[0].classList.remove('scrollbarSpace');
      document.getElementsByClassName('scheduleGrid')[0].className += ' scrollbarSpace';
    } else {
      document.getElementsByClassName('scheduleGrid')[0].classList.remove('scrollbarSpace');
    }
  }

  getCheckedStatus = (row) => {
    const { checkedListInfo } = this.state;
    let index = -1;
    index = _findIndex(checkedListInfo, o => o.scheduleId === row.original.scheduleId && !o.isSingleDeleteItem);
    return (index > -1);
  }

  getComment = (row) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['scheduleId', row.original.scheduleId]);
    const comment = index > -1 ? checkedListInfo[index].comments : '';
    return comment;
  }

  closeErrorModal = (value) => {
    this.setState({ isShowErrorModal: false });
  }

  closeConfirmModal = () => {
    this.setState({ isShowConfirmModal: false, confirmModalText: '' });
  }

  handleCheckedListValidation = () => {
    const { checkedListInfo } = this.state;
    let errorMsg = '';
    if (checkedListInfo.length === 0) {
      errorMsg = 'No schedules selected';
    } else if (checkedListInfo.length > 1) {
      errorMsg = 'Please select only one schedule Item';
    }
    return errorMsg;
  }

  handleConfirmModal = (typeId) => {
    const resValid = this.handleCheckedListValidation();
    if (resValid !== '') {
      this.setState({
        isShowErrorModal: true,
        errorText: resValid
      });
    } else if (this.checkIsAccessDenied()) {
      setTimeout(() => {
        const titleTxt = (typeId === 25) ? 'Are you sure you want to delete' : 'Are you sure you want to reject';
        this.setState({ isShowConfirmModal: true, confirmModalText: titleTxt, statusId: typeId });
      }, 50);
    }
  }

  submitConfirm = () => {
    const { statusId } = this.state;
    setTimeout(() => {
      this.setState({ isShowConfirmModal: false });
    }, 50);
    this.showSubmitModal(statusId);
  }

  closeSubmitModal = (value) => {
    this.setState({ isShowStatusSubmitModal: false, successComment: '', showCommentsError: false });
  }

  closeSneakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  closeApprovalStatusModal = () => {
    this.setState({ showSendForApprovalStatusModal: false });
    this.props.dispatch(clearSendForApprovalStatus());
  }

  handleScheduleIdClick = (schedule) => {
    this.context.router.push(`/Schedule/View/${schedule.scheduleId}`);
  }

  handleScheduleSelect = (row) => {
    const { checkedListInfo } = this.state;
    _remove(checkedListInfo, { isSingleDeleteItem: true });
    const index = _findIndex(checkedListInfo, ['scheduleId', row.original.scheduleId]);
    if (index > -1) {
      _remove(checkedListInfo, { scheduleId: row.original.scheduleId });
    } else {
      const commentObj = {
        scheduleId: row.original.scheduleId,
        statusCode: row.original.statusCode,
        comments: '',
        rowValue: row,
        isSingleDeleteItem: false
      };
      checkedListInfo.push(commentObj);
    }
    return true;
  }

  viewWorkFlow = () => {
    const { checkedListInfo } = this.state;
    const resValid = this.handleCheckedListValidation();
    if (resValid !== '') {
      this.setState({ isShowErrorModal: true, errorText: resValid });
    } else {
      this.context.router.push(`/workflow/Schedule/${checkedListInfo[0].scheduleId}`);
    }
  }

  viewAudit = () => {
    const { checkedListInfo } = this.state;
    const resValid = this.handleCheckedListValidation();
    if (resValid !== '') {
      this.setState({ isShowErrorModal: true, errorText: resValid });
    } else {
      this.props.dispatch(getAuditFlow(checkedListInfo[0].scheduleId));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  validSendForApprovalStatus = typeID => {
    const { checkedListInfo } = this.state;
    const resValid = this.handleCheckedListValidation();
    if (resValid !== '') {
      this.setState({ isShowErrorModal: true, errorText: resValid });
    } else if (this.checkIsAccessDenied()) {
      this.props.dispatch(getSendForApprovalStatus(checkedListInfo[0].scheduleId));
    }
  }

  showSubmitModal = (TypeID) => {
    const { scheduleList } = this.props.schedules;
    const { checkedListInfo } = this.state;
    let errorTextMsg = '';
    const resValid = this.handleCheckedListValidation();
    if (resValid !== '') {
      errorTextMsg = resValid;
    } else if (TypeID === 23) {
      const errorSchedule = [];
      _map(checkedListInfo, list => {
        const ScheduleArr = _filter(scheduleList, ['scheduleId', list.scheduleId]);
        if (ScheduleArr[0].materialCount === 0) {
          errorSchedule.push(list.scheduleId);
        }
      });
      if (errorSchedule.length) {
        const errorScheduleStr = errorSchedule.join();
        errorTextMsg = `You cannot send for approval without selecting at least one materials for following Schedule(s): ${errorScheduleStr}`;
      }
    }

    if (errorTextMsg.length) {
      this.setState({
        isShowErrorModal: true,
        errorText: errorTextMsg
      });
    } else {
      const index = _findIndex(submitStatus, ['id', TypeID]);
      this.setState({
        statusSubmitModalText: submitStatus[index].displayText
      });
      this.setState({ statusId: _toNumber(TypeID) });
      setTimeout(() => {
        this.setState({ isShowStatusSubmitModal: true });
      }, 50);
    }
  }

  deleteSingleSchedule = (row) => {
    const { scheduleId, statusCode } = row.original;
    const newArr = [{
      scheduleId,
      statusCode,
      comments: '',
      rowValue: row,
      isSingleDeleteItem: true
    }];
    this.setState({
      checkedListInfo: newArr,
      isShowConfirmModal: true,
      statusId: 25,
      confirmModalText: 'Are you sure you want to delete'
    });
  }

  submitSchedules = () => {
    const { statusId, checkedListInfo } = this.state;
    const { userId } = this.props.login.userInfo;
    const EmptyComment = _filter(checkedListInfo, ['comments', '']);
    if (EmptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const StatusName = _find(submitStatus, { id: statusId }).text;
      const UserId = this.props.login.userInfo.userId;
      const data = {
        statusName: _find(submitStatus, { id: statusId }).text,
        schedules: checkedListInfo,
        statusId,
        userId
      };
      this.props.dispatch(updateStatusSelectedSchedules(data));
      this.setState({ isShowStatusSubmitModal: false });
      this.setState({ showSnackBar: true, snackBarMessage: _find(submitStatus, { id: statusId }).message, checkedListInfo: [] });
      setTimeout(() => {
        this.closeSneakBar();
      }, 2000);
    }
  }

  editSchedule = (Schedule) => {
    this.context.router.push(`/Schedule/Modify/${Schedule.scheduleId}`);
  }

  editScope = (Schedule) => {
    this.context.router.push(`/Schedule/Modify/Scope/${Schedule.scheduleId}`);
  }

  updateCommentsByScheduleId = (value, requestID) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['scheduleId', requestID]);
    checkedListInfo[index].comments = value;
    this.setState({ showCommentsError: false });
  }

  checkIsAccessDenied = () => {
    const { checkedListInfo } = this.state;
    const restricted = [];
    _filter(checkedListInfo, o => {
      if (o.statusCode === '22' || o.statusCode === '25' || o.statusCode === '26') {
        restricted.push(o);
      }
    });
    if (restricted.length) {
      if (checkedListInfo.length > 1) {
        this.setState({ isShowErrorModal: true, errorText: 'Please select execept "Approved" And "Rejected" And "Deleted" Schedule' });
      } else {
        this.setState({ isShowErrorModal: true, errorText: 'Access Denied' });
      }
      return false;
    }
    return true;
  }

  newCreateRequest = () => {
    if (this.checkIsAccessDenied()) {
      this.context.router.push('/Schedule/add');
    }
  }

  render() {
    const { scheduleList, isScheduleLoading } = this.props.schedules;
    const { sendForApprovalProductList } = this.props.scheduleManager;
    const {
      checkedListInfo, errorText, isShowErrorModal, isShowConfirmModal, confirmModalText,
      showSendForApprovalStatusModal, isShowStatusSubmitModal, statusSubmitModalText, showCommentsError,
      showSnackBar, snackBarMessage
    } = this.state;

    const columns = [{
      Header: '',
      accessor: '',
      maxWidth: 30,
      Cell: row => (
        <div>
          <CheckBoxField
            onClick={this.handleScheduleSelect}
            onChecked={this.getCheckedStatus(row)}
            rowValue={row}
            name={row.original.scheduleId}
            onDisable={false}
          />
        </div>
      )
    }, {
      Header: 'Actions',
      accessor: '',
      maxWidth: 140,
      Cell: row => (
        <div
          style={{
            textAlign: 'center'
          }}
        >
          {(row.original.statusCode === '19' || row.original.statusCode === '21') &&
            localStorage.getItem('role') === 'GPC' &&
            <div>
              <IconButton
                tooltip="Edit" className="actionButtons"
                onClick={() => this.editSchedule(row.original)}
              >
                <FontIcon className="fa fa-pencil-square-o" />
              </IconButton>
              <IconButton
                tooltip="Delete" className="actionButtons"
                onClick={() => this.deleteSingleSchedule(row)}
              >
                <FontIcon className="fa fa-minus-circle" />
              </IconButton>
            </div>}
          {localStorage.getItem('role') !== 'GPC' && (row.original.statusCode !== '22' && row.original.statusCode !== '26') &&
            <div>
              <IconButton
                className="editActionButton"
                tooltip="Modify Scope"
                onClick={() => this.editScope(row.original)}
              >
                <FontIcon className="fa fa-pencil-square-o" />
              </IconButton>
            </div>}
        </div>
      )
    }, {
      Header: 'Schedule ID',
      accessor: 'scheduleId',
      headerClassName: 'header-class',
      maxWidth: 180,
      width: 180,
      Cell: row => (
        <span
          style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => this.handleScheduleIdClick(row.original)}
        >
          {row.value}
        </span>
      )
    }, {
      Header: 'Site',
      accessor: 'site'
    }, {
      Header: 'FEI Number',
      accessor: 'feiNumber'
    }, {
      Header: 'Start Date',
      accessor: 'startDate',
      Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
    }, {
      Header: 'End Date',
      accessor: 'endDate',
      Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
    }, {
      Header: 'Metrics Included',
      accessor: 'metricsIncluded',
      minWidth: 106
    }, {
      Header: 'Created By',
      accessor: 'createdBy',
      minWidth: 123
    }, {
      Header: 'Site Plan Coordinator',
      accessor: 'sitePlanCoordinator',
      minWidth: 123
    }, {
      Header: 'Site Plan Reviewer',
      accessor: 'sitePlanReviewer',
      minWidth: 123
    }, {
      Header: 'Created On',
      accessor: 'createdOn',
      Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
    }, {
      Header: 'Status',
      accessor: 'statusName',
      minWidth: 123
    }];

    const GPCRoleButtons = (
      <span>
        <ButtonField
          buttonLabel={'Create Schedule'}
          onClick={() => this.newCreateRequest()}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Delete Schedule'}
          onClick={() => this.handleConfirmModal(25)}
          buttonIcon={<SvgiMinus />}
        />
        <ButtonField
          buttonLabel={'Submit for Scope Definition'}
          onClick={() => this.showSubmitModal(20)}
          buttonIcon={<SvgiUpload />}
        />
      </span>
    );

    const SPRRoleButtons = (
      <span>
        <ButtonField
          buttonLabel={'Approve'}
          onClick={() => this.showSubmitModal(26)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Reject'}
          onClick={() => this.handleConfirmModal(22)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Send for Schedule Modification'}
          onClick={() => this.showSubmitModal(21)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Send for Scope Modification'}
          onClick={() => this.showSubmitModal(24)}
          buttonIcon={<SvgiPlus />}
        />
      </span>
    );
    const buttonViewByRole = (
      <div className="padding-top padding-left">
        {localStorage.getItem('role') === 'GPC' && GPCRoleButtons }
        {localStorage.getItem('role') === 'SPR' && SPRRoleButtons}
        {localStorage.getItem('role') === 'SPC' && <ButtonField
          buttonLabel={'Send for Approval'}
          onClick={() => this.validSendForApprovalStatus(23)}
          buttonIcon={<SvgiPlus />}
        />}
        <ButtonField
          buttonLabel={'Workflow'}
          onClick={() => this.viewWorkFlow()}
          buttonIcon={<SvgiWorkflow />}
        />
        <ButtonField
          buttonLabel={'Audit Trail'}
          onClick={() => this.viewAudit()}
          buttonIcon={<SvgiNotepad />}
        />
      </div>
    );

    const commentBoxBody = (
      <div>
        {checkedListInfo.map((item, i) => (
          <CommentBoxField
            rowValue={checkedListInfo[0].rowValue}
            comment={this.getComment(checkedListInfo[0].rowValue)}
            commentLabel={'Schedule'}
            requestRecordId={checkedListInfo[0].scheduleId}
            onChange={this.updateCommentsByScheduleId}
          />
        ))}
        {showCommentsError && <p className="danger">Please enter comments</p>}
      </div>
    );

    const approvalProductNdcList = [
      {
        Header: 'ProductNdcFda',
        accessor: 'productNdcFda'
      },
      {
        Header: 'ProperietryName',
        accessor: 'properietryName'
      }
    ];

    const approvalProductNdcListArray = (
      <TableField
        dataSource={sendForApprovalProductList}
        columns={approvalProductNdcList}
      />
    );

    return (
      <div className="box box-primary">
        <ModelCustom
          showModel={isShowErrorModal}
          bodyContent={<h4 className="text-center"> {errorText} </h4>}
          closeLabel={'Close'}
          onCloseClick={this.closeErrorModal}
          bodyClassName={'no-padding'}
        />

        <ModelCustom
          showModel={isShowConfirmModal}
          bodyContent={<h4 className="text-center"> {confirmModalText} </h4>}
          submitLabel={'Yes'}
          closeLabel={'No'}
          onSubmitClick={this.submitConfirm}
          onCloseClick={this.closeConfirmModal}
          bodyClassName={'no-padding'}
        />

        <ModelCustom
          showModel={isShowStatusSubmitModal}
          title={statusSubmitModalText}
          bodyContent={commentBoxBody}
          submitLabel={'Submit'}
          closeLabel={'Close'}
          onSubmitClick={this.submitSchedules}
          onCloseClick={this.closeSubmitModal}
        />

        <ModelCustom
          showModel={showSendForApprovalStatusModal}
          title={'Following Product NDC’s have not been linked to any Material ID, hence Schedule cannot be sent for approval'}
          bodyContent={approvalProductNdcListArray}
          closeLabel={'Close'}
          onCloseClick={this.closeApprovalStatusModal}
        />

        {buttonViewByRole}

        <div className="metricDiv">
          <TableField
            onHandleRowExpand={this.onRowExpand}
            dataSource={scheduleList}
            columns={columns}
            isScheduleLoading={isScheduleLoading}
          />
        </div>
        <Snackbar
          className="notificationBox"
          open={showSnackBar}
          message={snackBarMessage}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { schedules: state.schedules, scheduleManager: state.scheduleManager, login: state.login };
}

export default connect(mapStateToProps)(ScheduleHome);
