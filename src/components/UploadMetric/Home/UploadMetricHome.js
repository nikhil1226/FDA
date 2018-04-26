import React from 'react';
import moment from 'moment';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import _map from 'lodash/map';
import ReactLoading from 'react-loading';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';
import CheckBoxField from '../../Fields/CheckBoxField/CheckBoxField';
import CommentBoxField from '../../Fields/CommentBoxField/CommentBoxField';
import {
  getAllUploadedMetrices,
  updateStatusUploadedMetric,
  resetUploadMetricData
} from '../../../actions/UploadManagerActions';
import { uploadMetricHomeColumns } from '../../../constants/UploadMetricConstants';
import './UploadMetricHome.scss';
import ModelCustom from '../../../shared/CustomModel';
import { SvgiPlus, SvgiWorkflow, SvgiNotepad, SvgiTick, SvgiUpload } from '../../SVGIcons';
import { ButtonField } from '../../FormInputs';

class UploadMetricHome extends React.Component {
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
      promptModalTitle: '',
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
          message: 'Upload metric has been Rejected'
        },
        {
          id: 3,
          text: 'Send for Approval',
          actionText: 'submitForApproval',
          message: 'Upload metric has been sent for Approval'
        },
        {
          id: 4,
          text: 'Send for Modification',
          actionText: 'SentForUploadModification',
          message: 'Upload metric has been sent for Modification'
        },
        {
          id: 5,
          text: 'Delete Upload',
          actionText: 'Deleted',
          message: 'Upload metric has been deleted successfully'
        }
      ],
      rowBGColor: {
        Draft: '',
        Approved: '#dff0d8',
        Rejected: '#fcf8e3',
        Deleted: '#f2dede',
        submitForApproval: '',
        SentForUploadModification: ''
      },
      checkedListInfo: [],
      showCommentsError: false,
      showSnackBar: false,
      snackBarMessage: '',
      typeId: '',
      status: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(resetUploadMetricData());
    this.props.dispatch(getAllUploadedMetrices());
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
    index = _findIndex(checkedListInfo, o => o.uploadMetricId === row.original.uploadRequestID && !o.isSingleDeleteUpload);
    return (index > -1);
  }

  getComment = (row) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['uploadMetricId', row.original.uploadRequestID]);
    const comment = index > -1 ? checkedListInfo[index].comments : '';
    return comment;
  }

  updateCommentsByMetricId = (value, uploadRequestId) => {
    const { checkedListInfo } = this.state;
    const index = _findIndex(checkedListInfo, ['uploadMetricId', uploadRequestId]);
    checkedListInfo[index].comments = value;
    this.setState({ showCommentsError: false });
  }

  handleUploadMetricSelect = (row, isChecked) => {
    const { checkedListInfo } = this.state;
    _remove(checkedListInfo, { isSingleDeleteUpload: true });
    const index = _findIndex(checkedListInfo, ['uploadMetricId', row.original.uploadRequestID]);
    if (index > -1) {
      _remove(checkedListInfo, { uploadMetricId: row.original.uploadRequestID });
    } else {
      const commentObj = {
        uploadMetricId: row.original.uploadRequestID,
        statusCode: row.original.statusCode,
        comments: '',
        rowValue: row,
        isSingleDeleteUpload: false
      };
      checkedListInfo.push(commentObj);
    }
    return true;
  }

  viewAudit = () => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select a Metric' });
    } else if (checkedListInfo.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric' });
    } else {
      this.props.dispatch(getAuditFlow(checkedListInfo[0].uploadMetricId));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  submitPromptModal = () => {
    const { typeId } = this.state;
    setTimeout(() => {
      this.setState({ showPromptModal: false, promptModalTitle: '' });
    }, 50);
    this.showSubmitModal(typeId);
  }

  showSubmitPromptModal = actionTypeId => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else if (this.checkIsAccessDenied()) {
      const index = _findIndex(this.state.submitTypes, ['id', actionTypeId]);
      this.setState({
        submitMetricModalText: this.state.submitTypes[index].text,
        submitMetricActionText: this.state.submitTypes[index].actionText,
        status: this.state.submitTypes[index].statusCode,
        typeId: actionTypeId
      });
      setTimeout(() => {
        this.setState({ showPromptModal: true, promptModalTitle: 'Are you sure you want to reject?' });
      }, 50);
    }
  }

  showSubmitModal = actionTypeId => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else if (checkedListInfo[0].statusCode === '48' && actionTypeId === 4) {
      this.setState({ showErrorModal: true, errorText: 'Access Denied' });
    } else if (this.checkIsAccessDenied()) {
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

  showSubmitWorkFlow = () => {
    const { checkedListInfo } = this.state;
    if (checkedListInfo.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select atleast one Metric' });
    } else if (checkedListInfo.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric' });
    } else {
      this.context.router.push(`/workflow/upload/${checkedListInfo[0].uploadMetricId}`);
    }
  }

  closeSubmitModal = () => {
    const { checkedListInfo } = this.state;
    const newArr = _filter(checkedListInfo, o => !o.isSingleDeleteUpload);
    this.setState({ showSubmitModal: false, successComment: '', showCommentsError: false, checkedListInfo: newArr });
  }

  closePromptModal = () => {
    const { checkedListInfo } = this.state;
    const newArr = _filter(checkedListInfo, o => !o.isSingleDeleteUpload);
    this.setState({ showPromptModal: false, promptModalTitle: '', checkedListInfo: newArr });
  }

  closeErrorModal = () => {
    this.setState({ showErrorModal: false });
  }

  closeSnakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '', typeId: '' });
  }

  checkIsAccessDenied() {
    const { checkedListInfo } = this.state;
    const restricted = [];
    _filter(checkedListInfo, o => {
      if (o.statusCode === '5' || o.statusCode === '6' || o.statusCode === '8') {
        restricted.push(o);
      }
    });
    if (restricted.length) {
      if (checkedListInfo.length > 1) {
        this.setState({ showErrorModal: true, errorText: 'Please select execept "Approved" And "Rejected" And "Deleted" metric Report' });
      } else {
        this.setState({ showErrorModal: true, errorText: 'Access Denied' });
      }
      return false;
    }
    return true;
  }

  newCreateRequest() {
    if (this.checkIsAccessDenied()) {
      this.context.router.push('/UploadMetric/add');
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
      this.props.dispatch(updateStatusUploadedMetric(data));
      this.setState({ showSubmitModal: false });
      const index = _findIndex(this.state.submitTypes, ['id', this.state.typeId]);
      this.setState({ showSnackBar: true, snackBarMessage: this.state.submitTypes[index].message });
      setTimeout(() => {
        this.closeSnakBar();
      }, 2000);
    }
  }

  deleteSingleItem = (row) => {
    const { checkedListInfo } = this.state;
    const newArr = [{
      uploadMetricId: row.original.uploadRequestID,
      statusCode: row.original.statusCode,
      comments: '',
      rowValue: row,
      isSingleDeleteUpload: true
    }];
    this.setState({
      showPromptModal: true,
      promptModalTitle: 'Are you sure you want to delete?',
      typeId: 5,
      checkedListInfo: newArr
    });
  }

  render() {
    const { uploadedMetricesList, uploadMetricsLoaded } = this.props.uploadManager;
    const {
      showErrorModal, errorText, showSubmitModal, checkedListInfo, showCommentsError, submitMetricModalText,
      showPromptModal, promptModalTitle
    } = this.state;
    const columns = [
      {
        Header: '',
        accessor: '',
        maxWidth: 30,
        Cell: row => (
          <div>{
            <CheckBoxField
              onClick={this.handleUploadMetricSelect}
              onChecked={this.getCheckedStatus(row)}
              rowValue={row}
              name={row.original.uploadRequestID}
              onDisable={false}
            />
          }
          </div>
        )
      },
      {
        Header: 'Actions',
        accessor: '',
        maxWidth: 100,
        Cell: row => (
          <div
            style={{
              textAlign: 'center'
            }}
          > {row.original.statusCode !== '5' && row.original.statusCode !== '6'
            && row.original.statusCode !== '8' &&
            <div>
              <Link to={`UploadMetric/Modify/${row.original.uploadRequestID}`}>
                <IconButton
                  className="actionButtons"
                  tooltip="Edit/View"
                >
                  <FontIcon className="fa fa-pencil-square-o" />
                </IconButton>
              </Link>
              {localStorage.getItem('role') !== 'Approver' &&
                <IconButton
                  tooltip="Delete"
                  className="actionButtons"
                  onClick={() => this.deleteSingleItem(row)}
                >
                  <FontIcon className="fa fa-minus-circle" />
                </IconButton>}
            </div>
            }
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

    const commentBoxBody = (
      <div>
        { checkedListInfo.map((item, i) =>
          <CommentBoxField
            rowValue={item.rowValue}
            comment={this.getComment(item.rowValue)}
            commentLabel={'Upload Metric'}
            requestRecordId={item.uploadMetricId}
            onChange={this.updateCommentsByMetricId}
          />) }
        {showCommentsError && <p className="danger">Please enter comments</p>}
      </div>
    );
    const authorBtn = (
      <span>
        <ButtonField
          buttonLabel="Create Upload Request"
          onClick={() => this.newCreateRequest()}
          buttonIcon={<SvgiUpload />}
        />
        <ButtonField
          buttonLabel="Send for Approval"
          onClick={() => this.showSubmitModal(3)}
          buttonIcon={<SvgiTick />}
        />
      </span>
    );

    const approverBtn = (
      <span>
        <ButtonField
          buttonLabel="Approve"
          onClick={() => this.showSubmitModal(1)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel="Reject"
          onClick={() => this.showSubmitPromptModal(2)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel="Send for Modification"
          onClick={() => this.showSubmitModal(4)}
          buttonIcon={<SvgiUpload />}
        />
      </span>
    );

    return (
      <div className="box box-primary">
        <ModelCustom
          showModel={showErrorModal}
          bodyContent={<h4 className="text-center"> {errorText} </h4>}
          closeLabel={'Close'}
          onCloseClick={this.closeErrorModal}
          bodyClassName={'no-padding'}
        />

        <ModelCustom
          showModel={showSubmitModal}
          title={submitMetricModalText}
          bodyContent={commentBoxBody}
          submitLabel={'Submit'}
          closeLabel={'Close'}
          onSubmitClick={this.submitMetric}
          onCloseClick={this.closeSubmitModal}
        />

        <ModelCustom
          showModel={showPromptModal}
          bodyContent={<h4 className="text-center"> {promptModalTitle} </h4>}
          submitLabel={'Yes'}
          closeLabel={'No'}
          onSubmitClick={this.submitPromptModal}
          onCloseClick={this.closePromptModal}
          bodyClassName={'no-padding'}
        />

        <div className="padding-top padding-left">
          { localStorage.getItem('role') === 'Author' && authorBtn }
          { localStorage.getItem('role') === 'Approver' && approverBtn }
          <ButtonField
            buttonLabel="Workflow"
            onClick={() => this.showSubmitWorkFlow()}
            buttonIcon={<SvgiWorkflow />}
          />
          <ButtonField
            buttonLabel="Audit Trail"
            onClick={() => this.viewAudit()}
            buttonIcon={<SvgiNotepad />}
          />
        </div>

        <div className="metricDiv">
          <ReactTable
            getTrProps={(state, rowInfo, column) => ({
              style: {
                background: this.state.rowBGColor[`${rowInfo.original.status}`]
              }
            })}
            className="-striped -highlight scheduleGrid"
            data={uploadedMetricesList}
            columns={columns}
            pageSize={uploadedMetricesList.length}
            noDataText={uploadMetricsLoaded ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
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

export default connect(mapStateToProps)(UploadMetricHome);
