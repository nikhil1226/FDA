import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Modal, Row, Col } from 'react-bootstrap';
import { SvgiTick, SvgiPlus } from '../../SVGIcons';
import './UserRequest.scss';
import ErrorDialog from '../../../shared/error-dialog';

import {
  getAllUserRequestLists,
  updateRequestItemCheckBox,
  updateStatus,
  updateComments,
  clearComments
} from '../../../actions/UserManagerActions';

class UserRequest extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      submitTypes: [{
        id: 1,
        displayText: 'Approved',
        message: 'User Request has been Approved',
        indicator: '1'
      }, {
        id: 2,
        displayText: 'Rejected',
        message: 'User Request has been Rejected',
        indicator: '0'
      }],
      showSubmitStatusModal: false,
      submitStatusModalText: '',
      showCommentsError: false,
      showErrorModal: false,
      showSnackBar: false,
      snackBarMessage: '',
      errorText: '',
      actionUser: this.props.login.userInfo.userId
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllUserRequestLists());
  }

  handleUserSelect = (row) => {
    this.props.dispatch(updateRequestItemCheckBox(row.userAccessRecordId));
  }

  viewWorkFlow = (row) => {
    this.context.router.push(`/workflow/UserRequest/${row.userAccessRecordId}`);
  }

  closeSubmitModal = () => {
    this.props.dispatch(clearComments());
    this.setState({ submitStatusModalText: '', showSubmitStatusModal: false });
  }

  closeErrorModal = () => {
    this.setState({ showErrorModal: false, errorText: '' });
  }

  showSubmitModal = (typeID) => {
    const { checkedList } = this.props.userManager;
    let errorTextMsg = '';
    if (checkedList.length === 0) {
      errorTextMsg = 'Please select atleast one User Request Item';
    } else if (checkedList.length > 1) {
      errorTextMsg = 'Please select only one User Request Item';
    }

    if (errorTextMsg !== '') {
      this.setState({ showErrorModal: true, errorText: errorTextMsg });
    } else {
      this.setState({
        showSubmitStatusModal: true,
        submitStatusModalText: _find(this.state.submitTypes, ['id', typeID]).displayText,
        statusId: _toNumber(typeID),
        showCommentsError: false
      });
    }
  }

  updateComments = (event, id) => {
    this.props.dispatch(updateComments(event.target.value, id));
    this.setState({ showCommentsError: false });
  }

  submitRquestStatus = () => {
    const { checkedList } = this.props.userManager;
    const { submitTypes, statusId, actionUser } = this.state;
    const emptyComment = _filter(checkedList, ['comments', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const submitTypesArr = _filter(submitTypes, ['id', statusId]);
      this.setState({ submitStatusModalText: '', showSubmitStatusModal: false, showCommentsError: false });
      const data = checkedList[0];
      data.approvalStatus = submitTypesArr[0].indicator;
      data.actionUser = actionUser;
      this.props.dispatch(updateStatus(data));
      this.setState({ snackBarMessage: submitTypesArr[0].message, showSnackBar: true });
    }
  }

  resetSnackBar = () => {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  render() {
    const { userRequestList, checkedList } = this.props.userManager;
    const { name } = this.props.login.userInfo;
    const {
      errorText, showErrorModal, showSubmitStatusModal, submitStatusModalText,
      showCommentsError, showSnackBar, snackBarMessage
    } = this.state;
    const columns = [{
      Header: '',
      accessor: '',
      Cell: row => (
        <div>
          {(row.original.approvers === name && row.original.workflowRecordId === '2') && <Checkbox
            key={row.original.userAccessRecordId}
            className="gridCheckbox"
            onCheck={() => this.handleUserSelect(row.original)}
            checked={row.value.checked}
          />}
        </div>
      )
    }, {
      Header: 'Action',
      accessor: '',
      Cell: row => (
        <span>
          <IconButton
            tooltip="View Work Flow" className="actionButtons"
            onClick={() => this.viewWorkFlow(row.original)}
          >
            <FontIcon className="fa fa-share-square-o" />
          </IconButton>
        </span>
      )
    }, {
      Header: 'User Access request',
      accessor: 'userAccessRecordId'
    }, {
      Header: 'Description',
      accessor: 'userAccessDescription'
    }, {
      Header: 'Created On',
      accessor: 'createdOn',
      Cell: row => (
        moment(row.value).utc().format('DD-MMM-YYYY')
      )
    }, {
      Header: 'Created By',
      accessor: 'requestedBy'
    }, {
      Header: 'Requested For',
      accessor: 'requestedFor'
    }, {
      Header: 'Requested Role',
      accessor: 'requestedRole'
    }, {
      Header: 'Authorization for',
      accessor: 'siteAccess'
    }, {
      Header: 'Selected Approves',
      accessor: 'approvers'
    }, {
      Header: 'Approval Status',
      accessor: 'approvalStatus'
    }, {
      Header: 'Status',
      accessor: 'userAccessRequestStatus'
    }];

    const buttonView = (
      <div className="padding-top padding-left">
        <RaisedButton
          className="table-button"
          label="Approved"
          onTouchTap={() => this.showSubmitModal(1)}
          icon={<SvgiTick />}
        />
        <RaisedButton
          className="table-button"
          label="Rejected"
          onTouchTap={() => this.showSubmitModal(2)}
          icon={<SvgiTick />}
        />
      </div>
    );

    const commentsArray = checkedList.map((item, i) => (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={6}>
          Comments for User Request {item.userAccessRecordId} <span className="redrequired">*</span>
        </Col>
        <Col xs={12} md={6}>
          <TextField
            className="textarea"
            hintText="Description Max 300 Characters"
            onChange={e => this.updateComments(e, item.userAccessRecordId)}
            maxLength="300"
            multiLine
            value={item.comments}
            rows={2}
          />
        </Col>
      </Row>
    ));

    return (
      <div className="metricDiv newUserWrap">
        <ErrorDialog
          errorText={errorText}
          showErrorModal={showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={showSubmitStatusModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {submitStatusModalText}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {commentsArray}
            {showCommentsError && <p className="danger">Please enter comments</p>}
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Submit"
              onTouchTap={this.submitRquestStatus}
              icon={<SvgiPlus />}
              primary
            />
            <RaisedButton
              className="table-button"
              label="Close"
              onTouchTap={this.closeSubmitModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        {buttonView}

        <div className="metricDiv">
          <ReactTable
            className="-striped -highlight scheduleGrid"
            data={userRequestList}
            pageSize={userRequestList.length}
            columns={columns}
            showPagination={false}
          />
        </div>
        <Snackbar
          className="notificationBox"
          open={showSnackBar}
          message={snackBarMessage}
          onRequestClose={this.resetSnackBar}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userManager: state.userManager, login: state.login };
}

export default connect(mapStateToProps)(UserRequest);
