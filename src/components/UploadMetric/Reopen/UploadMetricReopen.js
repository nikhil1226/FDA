import React from 'react';
import moment from 'moment';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import ReactLoading from 'react-loading';
import _map from 'lodash/map';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon';
import { Modal, Row, Col } from 'react-bootstrap';
import ErrorDialog from '../../../shared/error-dialog';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';
import CheckBoxField from '../../Fields/CheckBoxField/CheckBoxField';
import CommentBoxField from '../../Fields/CommentBoxField/CommentBoxField';
import {
  getAllReopenUploadedMetrices,
  updateStatusUploadedMetric,
  updateReopenStatus,
  resetUploadMetricData
} from '../../../actions/UploadManagerActions';
import { uploadMetricHomeColumns } from '../../../constants/UploadMetricConstants';
import { SvgiPlus, SvgiWorkflow, SvgiNotepad, SvgiTick, SvgiUpload } from '../../SVGIcons';


class UploadMetricReopen extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      showSubmitModal: false,
      showPromptModal: false,
      errorText: '',
      showErrorModal: false,
      submitTypes: [
        {
          id: 1,
          text: 'Approve',
          actionText: 'approved',
          statusCode: 1,
          message: 'Metric has been Approved'
        },
        {
          id: 2,
          text: 'Reject',
          actionText: 'rejected',
          statusCode: 5,
          message: 'Metric has been Rejected'
        },
        {
          id: 3,
          text: 'Reopen Requested',
          actionText: 'ReopenRequested',
          statusCode: 48,
          message: 'Metric has been Reopen Requested'
        }
      ],
      showSnackBar: false,
      snackBarMessage: '',
      checkedListInfo: [],
      showCommentsError: false,
      typeId: '',
      status: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(resetUploadMetricData());
    this.props.dispatch(getAllReopenUploadedMetrices());
  }

  shouldComponentUpdate(nextProps, nextState) {
    let returnStatus = false;
    if (!_isEqual(this.props, nextProps) || (typeof nextState.submitMetricModalText)) {
      returnStatus = true;
    }
    return returnStatus;
  }

  getCheckedStatus = (row) => {
    const { checkedListInfo } = this.state;
    let index = -1;
    index = _findIndex(checkedListInfo, ['uploadMetricId', row.original.uploadRequestID]);
    return (index > -1);
  }

  getComment = (row) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['uploadMetricId', row.original.uploadRequestID]);
    const comment = index > -1 ? checkedListInfo[index].comments : '';
    return comment;
  }

  updateCommentsByMetricId = (value, uploadRequestID) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['uploadMetricId', uploadRequestID]);
    checkedListInfo[index].comments = value;
    this.setState({ showCommentsError: false });
  }

  handleUploadMetricSelect = (row, isChecked) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['uploadMetricId', row.original.uploadRequestID]);
    if (index > -1) {
      _remove(checkedListInfo, { uploadMetricId: row.original.uploadRequestID });
    } else {
      const commentObj = {
        uploadMetricId: row.original.uploadRequestID,
        statusCode: row.original.statusCode,
        comments: '',
        rowValue: row
      };
      checkedListInfo.push(commentObj);
    }
    return true;
  }

  showPromptModal = typeId => {
    setTimeout(() => {
      this.setState({ showPromptModal: false });
    }, 50);
    this.showSubmitModal(2);
  }

  showSubmitPromptModal = actionTypeId => {
    if (this.state.checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else {
      const index = _findIndex(this.state.submitTypes, ['id', actionTypeId]);
      this.setState({
        submitMetricModalText: this.state.submitTypes[index].text, submitMetricActionText: this.state.submitTypes[index].actionText, status: this.state.submitTypes[index].statusCode, typeId: actionTypeId
      });
      setTimeout(() => {
        this.setState({ showPromptModal: true });
      }, 50);
    }
  }

  showReopenModal = actionTypeId => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else if (checkedListInfo.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric' });
    } else {
      const index = _findIndex(this.state.submitTypes, ['id', actionTypeId]);
      this.setState({
        submitMetricModalText: this.state.submitTypes[index].text,
        submitMetricActionText: this.state.submitTypes[index].actionText,
        status: this.state.submitTypes[index].statusCode,
        typeId: actionTypeId
      });
      setTimeout(() => {
        this.setState({ showSubmitModal: true });
      }, 50);
    }
  }

  closeSubmitModal = value => {
    this.setState({ showSubmitModal: false, successComment: '', showCommentsError: false });
  }

  closePromptModal = value => {
    this.setState({ showPromptModal: false });
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  closeSnakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '', typeId: '' });
  }

  showSubmitModal = actionTypeId => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else {
      const index = _findIndex(this.state.submitTypes, ['id', actionTypeId]);
      this.setState({
        submitMetricModalText: this.state.submitTypes[index].text, submitMetricActionText: this.state.submitTypes[index].actionText, status: this.state.submitTypes[index].statusCode, typeId: actionTypeId
      });
      setTimeout(() => {
        this.setState({ showSubmitModal: true });
      }, 50);
    }
  }

  submitMetric = () => {
    const { checkedListInfo } = this.state;
    const emptyComment = _filter(checkedListInfo, ['comments', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const data = {
        action: this.state.submitMetricActionText,
        actionCode: 'UM2',
        metrics: checkedListInfo,
        status: this.state.status
      };
      if (checkedListInfo[0].statusCode === '5' || checkedListInfo[0].statusCode === '48') {
        this.props.dispatch(updateReopenStatus(data));
      } else {
        this.props.dispatch(updateStatusUploadedMetric(data));
      }
      this.setState({ showSubmitModal: false, checkedListInfo: [] });
      const index = _findIndex(this.state.submitTypes, ['id', this.state.typeId]);
      this.setState({ showSnackBar: true, snackBarMessage: this.state.submitTypes[index].message });
      setTimeout(() => {
        this.closeSnakBar();
      }, 2000);
    }
  }

  viewUploadMetric = value => {
    this.context.router.push(`/UploadMetricReopen/View/${value}`);
  }

  render() {
    const columns = [
      {
        Header: '',
        accessor: '',
        maxWidth: 30,
        Cell: row => (
          <div>
            <CheckBoxField
              onClick={this.handleUploadMetricSelect}
              onChecked={this.getCheckedStatus(row)}
              rowValue={row}
              name={row.original.uploadRequestID}
              onDisable={false}
            />
          </div>
        )
      }, {
        Header: 'Actions',
        accessor: '',
        maxWidth: 100,
        Cell: row => (
          <div className="text-center">
            <IconButton
              tooltip="View Comments"
              className="actionButtons"
              onClick={() => this.viewUploadMetric(row.original.uploadRequestID)}
            >
              <FontIcon className="fa fa-eye" />
            </IconButton>
          </div>
        )
      }
    ];
    _map(uploadMetricHomeColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'date') {
          item.Cell = row => (
            moment(row.value).utc().format('DD-MMM-YYYY')
          );
        }
      }
      columns.push(item);
    });

    const commentsArray = this.state.checkedListInfo.map((item, i) =>
      <CommentBoxField
        rowValue={item.rowValue}
        comment={this.getComment(item.rowValue)}
        commentLabel={'Reopen Upload'}
        requestRecordId={item.uploadMetricId}
        onChange={this.updateCommentsByMetricId}
      />
    );

    const commentArraySuccessButton = (
      <RaisedButton
        className="table-button"
        label="Submit"
        onTouchTap={this.submitMetric}
        icon={<SvgiPlus />}
        primary
      />
    );
    return (
      <div className="box box-primary">
        <ErrorDialog
          errorText={this.state.errorText}
          showErrorModal={this.state.showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={this.state.showSubmitModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title aria-labelledby="contained-modal-title-sm" className="text-center">{this.state.submitMetricModalText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {commentsArray}
            {this.state.showCommentsError && <p className="danger">Please enter comments</p>}
          </Modal.Body>
          <Modal.Footer>
            {commentArraySuccessButton}
            <RaisedButton
              className="margin-right buttonStyle"
              label="Close"
              onTouchTap={this.closeSubmitModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showPromptModal}
          onHide={this.closePromptModal}
        >
          <Modal.Body className="no-padding">
            <h4 className="text-center">
              Are you sure you want to reject?
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Yes"
              onTouchTap={this.showPromptModal}
              icon={<SvgiPlus />}
              primary
            />
            <RaisedButton
              className="table-button"
              label="No"
              onTouchTap={this.closePromptModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        <div className="padding-top padding-left">
          {localStorage.getItem('role') === 'Approver' && <RaisedButton
            className="margin-right buttonStyle table-button"
            label="Approve"
            onTouchTap={() => this.showSubmitModal(1)}
            icon={<SvgiPlus />}
          />}
          {localStorage.getItem('role') === 'Approver' && <RaisedButton
            className="margin-right buttonStyle table-button"
            label="Reject"
            onTouchTap={() => this.showSubmitPromptModal(2)}
            icon={<SvgiPlus />}
          />}
          {localStorage.getItem('role') === 'Author' && <RaisedButton
            className="margin-right buttonStyle table-button"
            label="Reopen Request"
            onTouchTap={() => this.showReopenModal(3)}
            icon={<SvgiUpload />}
          />}
        </div>

        <div className="metricDiv">
          <ReactTable
            className="-striped -highlight scheduleGrid"
            data={this.props.uploadManager.uploadedMetricesList}
            columns={columns}
            pageSize={this.props.uploadManager.uploadedMetricesList.length}
            noDataText={this.props.uploadManager.uploadMetricsLoaded ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
            showPagination={false}
          />
        </div>
        <Snackbar
          className="notificationBox"
          open={this.state.showSnackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { uploadManager: state.uploadManager };
}

export default connect(mapStateToProps)(UploadMetricReopen);
