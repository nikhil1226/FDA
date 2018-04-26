import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import { Modal, Row, Col } from 'react-bootstrap';
import { RadioButton } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import {
  getAllReopenSchedules,
  updateScheduleItemCheckBox,
  updateCommentsByScheduleId,
  updateStatusByScheduleId,
  updateStatusSelectedReOpenSchedules,
  updateDeleteByScheduleId
} from '../../../actions/ScheduleActions';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';
import { submitStatus } from '../../../constants/submitStatus';
import { resetScheduleData } from '../../../actions/ScheduleManagerActions';
import ErrorDialog from '../../../shared/error-dialog';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad, SvgiTick } from '../../SVGIcons';
import './ScheduleReopen.scss';

class ScheduleReopen extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        loading: false,
        showPagination: false,
        showPageSizeOptions: false,
        showPageJump: false,
        collapseOnSortingChange: false,
        collapseOnPageChange: false,
        collapseOnDataChange: false,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: true,
        resizable: true
      },
      showErrorModal: false,
      errorText: '',
      showSubmitSchedulesModal: false,
      submitSchedulesModalText: '',
      statusId: 0,
      showSnackBar: false,
      snackBarMessage: '',
      showCommentsError: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllReopenSchedules());
  }

  componentDidMount() {
    this.props.dispatch(resetScheduleData());
  }

  onRowExpand = () => {
    if (document.getElementsByClassName('scheduleGrid')[0].getElementsByClassName('rt-tbody')[0].scrollHeight > document.getElementsByClassName('scheduleGrid')[0].getElementsByClassName('rt-tbody')[0].clientHeight) {
      document.getElementsByClassName('scheduleGrid')[0].classList.remove('scrollbarSpace');
      document.getElementsByClassName('scheduleGrid')[0].className += ' scrollbarSpace';
    } else {
      document.getElementsByClassName('scheduleGrid')[0].classList.remove('scrollbarSpace');
    }
  }

  closeErrorModal = () => {
    this.setState({ showErrorModal: false });
  }

  closeSubmitModal = () => {
    this.setState({ showSubmitSchedulesModal: false, showCommentsError: false });
  }

  closeSneakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  handleScheduleIdClick = (schedule) => {
    this.context.router.push(`/ScheduleReopen/View/${schedule.scheduleId}`);
  }

  handleScheduleSelect = (row) => {
    this.props.dispatch(updateScheduleItemCheckBox(row.scheduleId));
  }

  showSubmitModal = (typeId) => {
    const { checkedList, scheduleList } = this.props.schedules;
    let errorTextMsg = '';

    if (checkedList.length === 0) {
      errorTextMsg = 'Please select atleast one schedule';
    } else if (checkedList.length > 1) {
      errorTextMsg = 'Please select only one schedule';
    } else if ((checkedList[0].status === '26' && typeId !== 27) || (checkedList[0].status === '46' && typeId !== 28) || (checkedList[0].status === '46' && typeId !== 29)) {
      const errorSchedule = [];
      _map(checkedList, item => {
        const scheduleArr = _filter(scheduleList, ['scheduleId', item.id]);
        if (scheduleArr[0]) {
          errorSchedule.push(item.id);
        }
      });

      if (errorSchedule.length) {
        const errorScheduleStr = errorSchedule.join();
        if (checkedList[0].status === '26' && typeId === 28) {
          errorTextMsg = `Published can't be Approved for following Schedule(s): ${errorScheduleStr}`;
        }
        if (checkedList[0].status === '26' && typeId === 29) {
          errorTextMsg = `Published can't be Rejected for following Schedule(s): ${errorScheduleStr}`;
        }
        if (checkedList[0].status === '46' && typeId === 27) {
          errorTextMsg = `Already Request Sent For Reopen for following Schedule(s): ${errorScheduleStr}`;
        }
      }
    }

    if (errorTextMsg.length) {
      this.setState({
        showErrorModal: true,
        errorText: errorTextMsg
      });
    } else {
      const index = _findIndex(submitStatus, ['id', typeId]);
      this.setState({
        submitSchedulesModalText: submitStatus[index].displayText
      });
      this.setState({ statusId: _toNumber(submitStatus[index].statusId), indexId: _toNumber(submitStatus[index].id) });
      setTimeout(() => {
        this.setState({ showSubmitSchedulesModal: true });
      }, 50);
    }
  }

  submitSchedules = () => {
    const { checkedList } = this.props.schedules;
    const emptyComment = _filter(checkedList, ['comment', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const { statusId, indexId } = this.state;
      const { statusUpdateSchedule } = this.props.schedules;
      const statusName = _find(submitStatus, { id: indexId }).text;
      const userId = this.props.login.userInfo.userId;
      this.props.dispatch(updateStatusByScheduleId(statusId, statusName, userId));
      this.props.dispatch(updateStatusSelectedReOpenSchedules(statusUpdateSchedule));
      this.setState({ showSubmitSchedulesModal: false });
      this.setState({ showSnackBar: true, snackBarMessage: _find(submitStatus, { id: indexId }).message });
      setTimeout(() => {
        this.closeSneakBar();
      }, 2000);
    }
  }

  updateComments = (e, id) => {
    this.props.dispatch(updateCommentsByScheduleId(e.target.value, id));
    this.setState({ showCommentsError: false });
  }

  render() {
    const { checkedList, scheduleList, isScheduleLoading } = this.props.schedules;
    const {
      errorText, showErrorModal, showSubmitSchedulesModal, submitSchedulesModalText,
      showCommentsError, tableOptions, showSnackBar, snackBarMessage
    } = this.state;
    const columns = [{
      Header: '',
      accessor: '',
      maxWidth: 30,
      Cell: row => (
        <div> {row.original.statusCode !== '22' &&
          <Checkbox
            className="gridCheckbox"
            onCheck={() => this.handleScheduleSelect(row.row)}
            checked={row.value.checked}
          />
        }
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
      accessor: 'statusName'
    }];

    const GPCRoleButtons = (
      <div className="padding-left">
        <RaisedButton
          className="table-button"
          label="Request Reopen"
          onTouchTap={() => this.showSubmitModal(27)}
          icon={<SvgiNotepad />}
        />
      </div>
    );
    const SPCRoleButtons = (
      <div className="padding-top padding-left">
        <RaisedButton
          className="table-button"
          label="Request Reopen"
          onTouchTap={() => this.showSubmitModal(27)}
          icon={<SvgiNotepad />}
        />
      </div>
    );
    const GBMRoleButtons = (
      <div className="padding-top padding-left">
        <RaisedButton
          className="table-button"
          label="Approve"
          onTouchTap={() => this.showSubmitModal(28)}
          icon={<SvgiTick />}
        />
        <RaisedButton
          className="table-button"
          label="Reject"
          onTouchTap={() => this.showSubmitModal(29)}
          icon={<SvgiMinus />}
        />
      </div>
    );
    let buttonViewByRole = GPCRoleButtons;

    if (localStorage.getItem('role') === 'GPC') {
      buttonViewByRole = GPCRoleButtons;
    } else if (localStorage.getItem('role') === 'SPC') {
      buttonViewByRole = SPCRoleButtons;
    } else {
      buttonViewByRole = GBMRoleButtons;
    }

    const commentsArray = checkedList.map((item, i) => (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={6}>
          Comments for Schedule {item.id}*
        </Col>
        <Col xs={12} md={6}>
          <TextField
            className="textarea"
            hintText="Description Max 300 Characters"
            onChange={e => this.updateComments(e, item.id)}
            maxLength="300"
            multiLine
            value={item.comment}
            rows={2}
          />
        </Col>
      </Row>
    ));

    const commentArraySuccessButton = (
      <RaisedButton
        className="table-button"
        label="Submit"
        onTouchTap={this.submitSchedules}
        icon={<SvgiPlus />}
        primary
      />
    );

    return (
      <div className="box box-primary">
        <ErrorDialog
          errorText={errorText}
          showErrorModal={showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={showSubmitSchedulesModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {submitSchedulesModalText}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {commentsArray}
            {showCommentsError && <p className="danger">Please enter comments</p>}
          </Modal.Body>
          <Modal.Footer>
            {commentArraySuccessButton}
            <RaisedButton
              className="table-button"
              label="Close"
              onTouchTap={this.closeSubmitModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        {buttonViewByRole}

        <div className="metricDiv">
          <ReactTable
            onExpandedChange={this.onRowExpand}
            className="-striped -highlight scheduleGrid scrollbarSpace"
            data={scheduleList}
            columns={columns}
            noDataText={isScheduleLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
            pageSize={scheduleList.length}
            showPagination={false}
            {...tableOptions}
          />
        </div>
        <Snackbar
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

export default connect(mapStateToProps)(ScheduleReopen);
