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
import { Link } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Modal, Row, Col } from 'react-bootstrap';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';

import {
  getAllMetricReportReopens,
  updateReportReopenSelect,
  updateMetricReopenComments,
  resetMetricReportReopen,
  updateMetricReportReopenStatus,
  getLatestReopenComment,
  clearMetricReopenLatestComments,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricsReportReopenActions';

import ErrorDialog from '../../../shared/error-dialog';
import './MetricReportReopen.scss';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiTick } from '../../SVGIcons';
import MetricReportGrid from '../../Grid/MetricReportGrid';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';

class MetricReportReopen extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      submitStatus: [
        {
          id: 1,
          displayText: 'Request Reopen',
          actionText: 'requestReopen',
          message: 'Reopen request sent for approval',
          indicator: '1',
          toStatus: 47
        },
        {
          id: 2,
          displayText: 'Approved',
          actionText: 'approvedSiteReview',
          message: 'Reopen request approved',
          indicator: '3'
        },
        {
          id: 3,
          displayText: 'Rejected',
          actionText: 'rejectedSitereview',
          message: 'Reopen request Rejected',
          indicator: '2'
        }
      ],
      showErrorModal: false,
      errorText: '',
      showSnackBar: false,
      snackBarMessage: '',
      statusId: 0,
      showLinkedScheduleModal: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetricReportReopens());
  }

  componentWillReceiveProps(nextProps) {
    const { isLatestComment, latestCommentsInfo, isShowLinkedScheduleList } = nextProps.metricReportReopen;
    if (isLatestComment) {
      const { LatestComment, UserName, CommentDate } = latestCommentsInfo[0];
      const commentStr = `Comments Posted By ${UserName} (${moment(CommentDate).format('DD-MMM-YYYY')}): ${LatestComment}`;
      this.setState({
        showErrorModal: true,
        errorText: commentStr
      });
      this.props.dispatch(clearMetricReopenLatestComments());
    }
    if (isShowLinkedScheduleList) {
      this.setState({ showLinkedScheduleModal: true });
    }
  }

  closeErrorModal = (value) => {
    this.setState({ showErrorModal: false });
  }

  closeSubmitModal = (value) => {
    this.setState({ showSubmitMetricModal: false, SubmitMetricPlanModalText: '' });
  }

  closeSneakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  handleMetricSelect = row => {
    this.props.dispatch(updateReportReopenSelect(row.metricesId));
  }

  viewWorkFlow = () => {
    const { checkedList } = this.props.metricReportReopen;
    if (checkedList.length === 0) {
      this.setState({
        showErrorModal: true,
        errorText: 'No Metric Plan selected to view workflow'
      });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric Plan' });
    } else {
      this.context.router.push(`/workflow/MetricReportReopen/${checkedList[0].metricPlanId}`);
    }
  }

  viewAudit = () => {
    const { checkedList } = this.props.metricReportReopen;
    if (checkedList.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select a Metric plan' });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric plan' });
    } else {
      this.props.dispatch(getAuditFlow(checkedList[0].metricPlanId));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  showSubmitPromptModal = typeId => {
    const { checkedList } = this.props.metricReportReopen;
    let errorTextMsg = '';
    if (checkedList.length === 0) {
      errorTextMsg = 'Please select atleast one  Metric Report Reopen Item';
      this.setState({ showErrorModal: true, errorText: '' });
    } else if (checkedList.length > 1) {
      errorTextMsg = 'Please select only one Metric Report Reopen Item';
    }

    if (errorTextMsg !== '') {
      this.setState({ showErrorModal: true, errorText: errorTextMsg });
    } else {
      this.showSubmitModal(typeId);
    }
  }

  showSubmitModal = (typeId) => {
    const index = _findIndex(this.state.submitStatus, ['id', typeId]);
    this.setState({
      SubmitMetricPlanModalText: this.state.submitStatus[index].displayText,
      statusId: _toNumber(typeId)
    });
    setTimeout(() => {
      this.setState({ showSubmitMetricModal: true, showCommentsError: false });
    }, 50);
  }

  submitMetric = () => {
    const { checkedList } = this.props.metricReportReopen;
    const { statusId, submitStatus } = this.state;
    const emptyComment = _filter(this.props.metricReportReopen.checkedList, ['comments', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const data = {
        metricPlanId: checkedList[0].metricPlanId,
        actionUser: this.props.login.userInfo.userId,
        entryIndicator: _find(submitStatus, { id: statusId }).indicator,
        comment: checkedList[0].comments,
        forStatus: checkedList[0].forStatus,
        toStatus: _find(submitStatus, { id: statusId }).toStatus
      };
      this.props.dispatch(updateMetricReportReopenStatus(data));
      this.setState({
        showSubmitMetricModal: false,
        showSnackBar: true,
        snackBarMessage: _find(submitStatus, { id: statusId }).message
      });
      this.props.dispatch(resetMetricReportReopen());
      setTimeout(() => {
        this.closeSneakBar();
      }, 2000);
    }
  }

  viewComments = (metricesId) => {
    this.props.dispatch(getLatestReopenComment(metricesId));
  }

  editReport = (metric) => {
    this.context.router.push(`/MetricReportReview/Modify/${metric.metricesId}`);
  }

  viewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  updateCommentsByMetricId = (e, id) => {
    console.log('updateCommentsByMetricId', id);
    this.props.dispatch(updateMetricReopenComments(e.target.value, id));
    this.setState({ showCommentsError: false });
  }

  handleMetricIdClick = planMetric => {
    setTimeout(() => {
      this.context.router.push(`/MetricReportReopen/view/${planMetric.metricesId}`);
    }, 500);
  }

  render() {
    const buttonView = (
      <div className="padding-top padding-left">
        {localStorage.getItem('role') !== 'GBM' && <RaisedButton
          className="table-button"
          label="Request Reopen"
          onTouchTap={() => this.showSubmitPromptModal(1)}
          icon={<SvgiPlus />}
        />}
        {localStorage.getItem('role') === 'GBM' && <RaisedButton
          className="table-button"
          label="Approved"
          onTouchTap={() => this.showSubmitPromptModal(2)}
          icon={<SvgiPlus />}
        />}
        {localStorage.getItem('role') === 'GBM' && <RaisedButton
          className="table-button"
          label="Rejected"
          onTouchTap={() => this.showSubmitPromptModal(3)}
          icon={<SvgiPlus />}
        />}
        {(localStorage.getItem('role') !== 'MPA' && localStorage.getItem('role') !== 'GBM') && <RaisedButton
          className="table-button"
          label="Work Flow"
          onTouchTap={() => this.viewWorkFlow()}
          icon={<SvgiPlus />}
        />}
        {(localStorage.getItem('role') !== 'MPA' && localStorage.getItem('role') !== 'GBM') && <RaisedButton
          className="table-button"
          label="Audit Trail"
          onTouchTap={() => this.viewAudit()}
          icon={<SvgiPlus />}
        />}
      </div>
    );
    const commentsArray = this.props.metricReportReopen.checkedList.map((item, i) => (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={4}>
          Comments {item.metricPlanId}* (Mandatory)
        </Col>
        <Col xs={12} md={6}>
          <TextField
            className="textarea"
            hintText="Description Max 300 Characters"
            onChange={e => this.updateCommentsByMetricId(e, item.metricPlanId)}
            maxLength="300"
            multiLine
            value={item.comments}
            rows={2}
          />
        </Col>
      </Row>
    ));

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

        <LinkedScheduleModel
          onShowModel={this.state.showLinkedScheduleModal}
          onCloseModel={this.closeLinkedScheduleModal}
          dataInfo={this.props.metricReportReopen.metricLinkedScheduleList}
        />

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={this.state.showSubmitMetricModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {this.state.SubmitMetricPlanModalText}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {commentsArray}
            {this.state.showCommentsError && <p className="danger">Please enter comments</p>}
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

        {buttonView}

        <div className="metricDiv">
          <MetricReportGrid
            data={this.props.metricReportReopen.metricReportReopenLists}
            isLoading={this.props.metricReportReopen.isLoading}
            pageAction={'metricReportReopen'}
            onHandleMetricSelect={this.handleMetricSelect}
            onHandleMetricIdClick={this.handleMetricIdClick}
            onViewComments={this.viewComments}
            onhandleViewSchedule={this.viewSchedule}
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
  return { metricReportReopen: state.metricReportReopen, login: state.login };
}

export default connect(mapStateToProps)(MetricReportReopen);
