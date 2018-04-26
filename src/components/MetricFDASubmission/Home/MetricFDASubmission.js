import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _ from 'lodash';
import _filter from 'lodash/filter';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Collapse, { Panel } from 'rc-collapse';
import Checkbox from 'material-ui/Checkbox';
import { Modal, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';

import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiNotepad, SvgiTick } from '../../SVGIcons';
import ErrorDialog from '../../../shared/error-dialog';
import {
  getAllFDASubmissionMetrices,
  resetMetricData,
  updateCommentsByMetricId,
  updateMetricSelect
} from '../../../actions/MetricsManagerActions';
import MetricReportGrid from '../../Grid/MetricReportGrid';

class MetricFDASubmission extends React.Component {
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
      showCommentsError: false,
      showSubmitFDAModal: false,
      showErrorModal: false,
      showErrorModalText: '',
      submitStatus: [
        {
          id: 1,
          displayText: 'Submit FDA Acknowledgement',
          actionText: 'Submit FDA Acknowledgement'
        }
      ]
    };
  }

  componentWillMount() {
    this.props.dispatch(resetMetricData());
    this.props.dispatch(getAllFDASubmissionMetrices());
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false, showErrorModalText: '' });
  }

  closeSubmitModal = value => {
    this.setState({ showSubmitFDAModal: false });
  }

  handleMetricIdClick = planMetric => {
    this.props.dispatch(resetMetricData());
    setTimeout(() => {
      this.context.router.push(`/MetricFDASubmission/view/${planMetric.metricesId}`);
    }, 500);
  }

  handleMetricSelect = row => {
    this.props.dispatch(updateMetricSelect(row.metricesId));
  }

  viewAudit = () => {
    const { checkedList } = this.props.metricsManager;
    if (checkedList.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select a Metric plan' });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric plan' });
    } else {
      this.props.dispatch(getAuditFlow(checkedList[0].MetricPlanID));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  showSubmitModal = typeId => {
    const { checkedList } = this.props.metricsManager;
    const { submitStatus } = this.state;
    if (checkedList.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select a Metric plan' });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric plan' });
    } else {
      const index = _.findIndex(submitStatus, ['id', typeId]);
      this.setState({
        submitFDAModalText: submitStatus[index].displayText,
        submitMetricActionText: submitStatus[index].actionText
      });
      this.setState({ statusId: _.toNumber(typeId) });
      setTimeout(() => {
        this.setState({ showSubmitFDAModal: true });
      }, 50);
    }
  }

  /* DownLoadXML = () => {
    console.log('DownLoadXML');
  } */

  showSubmitWorkFlow = () => {
    const { checkedList } = this.props.metricsManager;
    if (checkedList.length === 0) {
      this.setState({ showErrorModal: true, errorText: 'Please select a Metric plan' });
    } else if (checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric plan' });
    } else {
      this.context.router.push(`/workflow/MetricFDASubmission/${checkedList[0].MetricPlanID}`);
    }
  }

  submitMetricReport = () => {
    const { checkedList } = this.props.metricsManager;
    const emptyComment = _filter(checkedList, ['comments', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const data = {
        action: this.state.submitMetricActionText,
        actionCode: 'UM2',
        metricPlans: this.props.metricsManager.checkedList
      };
      this.props.dispatch(resetMetricData());
      this.setState({ showSubmitFDAModal: false, showCommentsError: false });
    }
  }

  updateCommentsByMetricId = (e, id) => {
    this.props.dispatch(updateCommentsByMetricId(e.target.value, id));
    this.setState({ showCommentsError: false });
  }

  render() {
    const { metricReportLists, metricsIsLoading } = this.props.metricsManager;
    const { errorText, showErrorModal, showSubmitFDAModal, submitFDAModalText, showCommentsError } = this.state;

    const buttonView = (
      <div className="padding-top padding-left">
        {localStorage.getItem('role') === 'SM' && <RaisedButton
          className="table-button"
          label="Submit FDA Acknowledgement"
          onTouchTap={() => this.showSubmitModal(1)}
          icon={<SvgiTick />}
        />}
        {/* localStorage.getItem('role') === 'SM' && <RaisedButton
          className="table-button"
          label="Download XML"
          onTouchTap={() => this.DownLoadXML()}
          icon={<SvgiTick />}
        /> */}
        <RaisedButton
          className="table-button"
          label="Workflow"
          onTouchTap={() => this.showSubmitWorkFlow()}
          icon={<SvgiWorkflow />}
        />
        <RaisedButton
          className="table-button"
          label="Audit Trail"
          onTouchTap={() => this.viewAudit()}
          icon={<SvgiNotepad />}
        />
      </div>
    );

    const commentsArray = this.props.metricsManager.checkedList.map((item, i) => (
      <Row className="show-grid">
        <Col className="text-right" xs={12} md={6}>
          Comments for Metrices {item.MetricPlanID} <span className="redrequired">*</span>
        </Col>
        <Col xs={12} md={6}>
          <TextField
            className="textarea"
            hintText="Description Max 300 Characters"
            onChange={e => this.updateCommentsByMetricId(e, item.MetricPlanID)}
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
        onTouchTap={this.submitMetricReport}
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
          show={showSubmitFDAModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {submitFDAModalText}
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
            data={metricReportLists}
            isLoading={metricsIsLoading}
            pageAction={'MetricFDASubmission'}
            onHandleMetricSelect={this.handleMetricSelect}
            onHandleMetricIdClick={this.handleMetricIdClick}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metricsManager: state.metricsManager
  };
}

export default connect(mapStateToProps)(MetricFDASubmission);
