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
  getAllMetricReportReviews,
  resetMetricReportReview,
  updateReportReviewSelect,
  resetReportReviewPopulateData,
  updateCommentsByMetricId,
  updateMetricReportReviewStatus,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricReportReviewActions';
import ErrorDialog from '../../../shared/error-dialog';
import './MetricReportReview.scss';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad, SvgiTick, SvgiDownload } from '../../SVGIcons';
import MetricReportGrid from '../../Grid/MetricReportGrid';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';

class MetricReportReview extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      showErrorModal: false,
      submitMetricPlanModalText: '',
      showSubmitMetricModal: false,
      errorText: '',
      submitStatus: [
        {
          id: 1,
          displayText: `Approved (${localStorage.getItem('roleName')})`,
          actionText: 'approvedSiteReview',
          message: 'Metric Report Review Update Approved',
          indicator: '1',
          toStatus: 44
        },
        {
          id: 2,
          displayText: `Rejected (${localStorage.getItem('roleName')})`,
          actionText: 'rejectedSitereview',
          message: 'Metric Report Review Update Rejected',
          indicator: '3',
          toStatus: 49
        },
        {
          id: 3,
          displayText: 'Send for modification',
          actionText: 'sentforReportModification',
          message: 'Metric Report Review Update Modification',
          indicator: '2',
          toStatus: 38
        }
      ],
      showSnackBar: false,
      showPromptModal: false,
      snackBarMessage: '',
      promptModalText: '',
      showCommentsError: false,
      showLinkedScheduleModal: false,
      statusId: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetricReportReviews());
  }

  componentDidMount() {
    this.props.dispatch(resetReportReviewPopulateData());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metricReportReview.isShowLinkedScheduleList) {
      this.setState({ showLinkedScheduleModal: true });
    }
  }

  closeErrorModal = (value) => {
    this.setState({ showErrorModal: false });
  }

  closeSubmitModal = (value) => {
    this.setState({ showSubmitMetricModal: false, showCommentsError: false, submitMetricPlanModalText: '' });
  }

  closeSneakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  viewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  handleMetricSelect = row => {
    this.props.dispatch(updateReportReviewSelect(row.metricesId, row.status));
  }

  viewWorkFlow = () => {
    const { checkedList } = this.props.metricReportReview;
    if (checkedList.length === 0) {
      this.setState({
        showErrorModal: true,
        errorText: 'No Metric Plan selected to view workflow'
      });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric Plan' });
    } else {
      this.context.router.push(`/workflow/MetricReportReview/${checkedList[0].metricPlanId}`);
    }
  }

  viewAudit = () => {
    const { checkedList } = this.props.metricReportReview;
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

  showPromptModal = () => {
    setTimeout(() => {
      this.setState({ showPromptModal: false });
    }, 50);
    this.showSubmitModal(this.state.statusId);
  }

  showSubmitPromptModal = typeId => {
    const { checkedList } = this.props.metricReportReview;
    let errorTextMsg = '';
    const expectGlobalReviewStatus = _filter(checkedList, item => item.status !== 'Sent for Global Review');
    if (checkedList.length === 0) {
      errorTextMsg = 'Please select atleast one Item';
      this.setState({ showErrorModal: true, errorText: '' });
    } else if (checkedList.length > 1) {
      errorTextMsg = 'Please select only one Metric Report Review Item';
    } else if (expectGlobalReviewStatus.length) {
      errorTextMsg = 'Status can be update only "Sent for Global Review"';
    }

    if (errorTextMsg !== '') {
      this.setState({ showErrorModal: true, errorText: errorTextMsg });
    } else if (typeId === 2) {
      setTimeout(() => {
        this.setState({
          statusId: _toNumber(typeId),
          showPromptModal: true,
          promptModalText: 'If Metric Report is Rejected, then the Metric Report cannot be reopened . Are you sure you want to proceed?'
        });
      }, 50);
    } else if (typeId === 3) {
      setTimeout(() => {
        this.setState({
          statusId: _toNumber(typeId),
          showPromptModal: true,
          promptModalText: ' If Metric Report is sent back for Modification, It would be sent back to “Report Generated “ state and would have to go through all the approvals from Site . Do you wish to proceed?'
        });
      }, 50);
    } else {
      this.showSubmitModal(typeId);
    }
  }

  closePromptModal = () => {
    this.setState({ showPromptModal: false });
  }

  showSubmitModal = (typeId) => {
    const index = _findIndex(this.state.submitStatus, ['id', typeId]);
    this.setState({
      submitMetricPlanModalText: this.state.submitStatus[index].displayText,
      statusId: _toNumber(typeId)
    });
    setTimeout(() => {
      this.setState({ showSubmitMetricModal: true });
    }, 50);
  }

  submitMetric = () => {
    const { checkedList } = this.props.metricReportReview;
    const { statusId, submitStatus } = this.state;
    const emptyComment = _filter(checkedList, ['comments', '']);
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
      this.props.dispatch(updateMetricReportReviewStatus(data));
      this.setState({
        showSubmitMetricModal: false,
        showSnackBar: true,
        snackBarMessage: _find(submitStatus, { id: statusId }).message
      });
      this.props.dispatch(resetMetricReportReview());
      this.setState({ showCommentsError: false });
      setTimeout(() => {
        this.closeSneakBar();
      }, 2000);
    }
  }

  editReport = (metric) => {
    this.context.router.push(`/MetricReportReview/Modify/${metric.metricesId}`);
  }

  updateCommentsByMetricId = (e, id) => {
    this.props.dispatch(updateCommentsByMetricId(e.target.value, id));
    this.setState({ showCommentsError: false });
  }

  viewMetricIdClick = planMetric => {
    setTimeout(() => {
      this.context.router.push(`/MetricReportReview/View/${planMetric.metricesId}`);
    }, 500);
  }

  render() {
    const buttonView = (
      <div className="padding-top padding-left">
        { localStorage.getItem('role') !== 'SM' && localStorage.getItem('role') !== 'GBM' && <RaisedButton
          className="table-button"
          label="Approved"
          onTouchTap={() => this.showSubmitPromptModal(1)}
          icon={<SvgiPlus />}
        /> }
        { localStorage.getItem('role') !== 'SM' && localStorage.getItem('role') !== 'GBM' && <RaisedButton
          className="table-button"
          label="Rejected"
          onTouchTap={() => this.showSubmitPromptModal(2)}
          icon={<SvgiPlus />}
        /> }
        { localStorage.getItem('role') !== 'SM' && localStorage.getItem('role') !== 'GBM' && <RaisedButton
          className="table-button"
          label="Send for Modification"
          onTouchTap={() => this.showSubmitPromptModal(3)}
          icon={<SvgiPlus />}
        /> }
        <RaisedButton
          className="table-button"
          label="Work Flow"
          onTouchTap={() => this.viewWorkFlow()}
          icon={<SvgiPlus />}
        />
        <RaisedButton
          className="table-button"
          label="Audit Trail"
          onTouchTap={() => this.viewAudit()}
          icon={<SvgiPlus />}
        />
      </div>
    );
    const { checkedList, metricLinkedScheduleList, metricReportReivewLists, isLoading } = this.props.metricReportReview;
    const commentsArray = checkedList.map((item, i) => (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={4}>
          Comments {item.metricPlanId}*
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
        disabled={
          _filter(checkedList, ['comment', '']).length > 0
        }
        icon={<SvgiPlus />}
        primary
      />
    );
    const {
      errorText, showErrorModal, showLinkedScheduleModal, showPromptModal,
      promptModalText, showSubmitMetricModal, submitMetricPlanModalText,
      showCommentsError, showSnackBar, snackBarMessage
    } = this.state;
    return (
      <div className="box box-primary">
        <ErrorDialog
          errorText={errorText}
          showErrorModal={showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />
        <LinkedScheduleModel
          onShowModel={showLinkedScheduleModal}
          onCloseModel={this.closeLinkedScheduleModal}
          dataInfo={metricLinkedScheduleList}
        />

        <Modal
          show={showPromptModal}
          onHide={this.closePromptModal}
        >
          <Modal.Body className="no-padding">
            <h4 className="text-center">
              {promptModalText}
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
        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={showSubmitMetricModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {submitMetricPlanModalText}
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

        {buttonView}

        <div className="metricDiv">
          <MetricReportGrid
            data={metricReportReivewLists}
            isLoading={isLoading}
            pageAction={'metricReportReview'}
            onHandleMetricSelect={this.handleMetricSelect}
            onHandleMetricIdClick={this.viewMetricIdClick}
            onEditMetric={this.editReport}
            onhandleViewSchedule={this.viewSchedule}
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
  return { metricReportReview: state.metricReportReview, login: state.login };
}

export default connect(mapStateToProps)(MetricReportReview);
