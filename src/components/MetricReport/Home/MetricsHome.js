import React, { PropTypes } from 'react';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { getAuditFlow } from '../../../actions/WorkFlowManagerActions';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiNotepad, SvgiTick } from '../../SVGIcons';
import ModelCustom from '../../../shared/CustomModel';
import {
  getAllMetrices,
  updateCommentsByMetricId,
  updateMetricSelect,
  resetMetricData,
  updateMetricStatus,
  getLinkedSchedules,
  clearLinkedSchedules,
  deleteSingleMetric,
  clearSingleDeleteMetric
} from '../../../actions/MetricsManagerActions';
import MetricReportGrid from '../../Grid/MetricReportGrid';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';
import CommentBoxField from '../../Fields/CommentBoxField/CommentBoxField';
import { TableField, ButtonField } from '../../FormInputs';
import './MetricsHome.scss';

class MetricHome extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showErrorModal: false,
      errorText: '',
      isShowConfirmModal: false,
      confirmModalText: '',
      showSubmitMetricModal: false,
      submitSchedulesModalText: '',
      showLinkedScheduleModal: false,
      showCommentsError: false,
      submitStatus: [
        {
          id: 1,
          displayText: 'Send for Approval',
          actionText: 'sentForPlanApproval',
          message: 'Metric sent for Approval'
        },
        {
          id: 2,
          displayText: 'Send for Metric Modification',
          actionText: 'sentForPlanModification',
          message: 'Metric sent for Modification'
        },
        {
          id: 3,
          displayText: 'Approve Metric',
          actionText: 'planApproved',
          message: 'Metric has been Approved'

        },
        {
          id: 4,
          displayText: 'Reject Metric',
          actionText: 'planRejected',
          message: 'Metric has been Rejected'
        },
        {
          id: 5,
          displayText: 'Metric has been Deleted',
          actionText: 'planDeleted',
          message: 'Metric has been Deleted'
        }
      ],
      statusId: 0,
      showSnackBar: false,
      snackBarMessage: '',
      typeId: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(resetMetricData());
    this.props.dispatch(getAllMetrices());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metricsManager.isShowLinkedScheduleList) {
      this.setState({ showLinkedScheduleModal: true });
    }
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  closeSubmitModal = value => {
    this.setState({ showSubmitMetricModal: false, showCommentsError: false });
  }

  closeSnakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  closeConfirmModal = () => {
    this.setState({ isShowConfirmModal: false, confirmModalText: '' });
  }

  checkIsAccessDenied(value = 0, actionId = 0) {
    const { checkedList } = this.props.metricsManager;
    const restricted = [];
    if (!checkedList.length) {
      this.setState({ showErrorModal: true, errorText: 'Please select a metric plan' });
      return false;
    }
    if (value === 1 && checkedList.length > 1) {
      this.setState({ showErrorModal: true, errorText: 'Please select only one Metric plan' });
      return false;
    }
    _filter(checkedList, o => {
      if (o.forStatus === '35' || o.forStatus === '34' || o.forStatus === '36') {
        restricted.push(o);
      }
    });
    if (restricted.length && actionId === 0) {
      if (checkedList.length > 1) {
        this.setState({ showErrorModal: true, errorText: 'Please select execept "Plan Approved" And "Plan Rejected" And "Plan Deleted" metric Report' });
      } else {
        this.setState({ showErrorModal: true, errorText: 'Access Denied' });
      }
      return false;
    }
    return true;
  }

  editMetric = planMetric => {
    this.props.dispatch(resetMetricData());
    setTimeout(() => {
      this.context.router.push(`/MetricReport/Modify/${planMetric.metricesId}`);
    }, 100);
  }

  newCreateRequest() {
    const { checkedList } = this.props.metricsManager;
    if (!checkedList.length || (checkedList.length && this.checkIsAccessDenied())) {
      this.context.router.push('/MetricReport/add');
    }
  }

  handleMetricIdClick = planMetric => {
    this.props.dispatch(resetMetricData());
    setTimeout(() => {
      this.context.router.push(`/MetricReport/view/${planMetric.metricesId}`);
    }, 500);
  }

  handleMetricSelect = row => {
    this.props.dispatch(updateMetricSelect(row.metricesId));
  }

  viewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  viewWorkFlow = () => {
    const { checkedList } = this.props.metricsManager;
    if (this.checkIsAccessDenied(1, 1)) {
      this.context.router.push(`/workflow/metricreport/${checkedList[0].metricPlanId}`);
    }
  }

  viewAudit = () => {
    const { checkedList } = this.props.metricsManager;
    if (this.checkIsAccessDenied(1, 1)) {
      this.props.dispatch(getAuditFlow(checkedList[0].metricPlanId));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  showSubmitModal = actionTypeId => {
    const { submitStatus } = this.state;
    if (this.checkIsAccessDenied()) {
      const index = _findIndex(submitStatus, ['id', actionTypeId]);
      this.setState({
        submitSchedulesModalText: submitStatus[index].displayText,
        submitMetricActionText: submitStatus[index].actionText,
        typeId: actionTypeId,
        showSubmitMetricModal: true
      });
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
      this.props.dispatch(updateMetricStatus(data));
      this.setState({ showSubmitMetricModal: false, showCommentsError: false });
      const index = _findIndex(this.state.submitStatus, ['id', this.state.typeId]);
      this.setState({ showSnackBar: true, snackBarMessage: this.state.submitStatus[index].message });
      setTimeout(() => {
        this.closeSnakBar();
      }, 2000);
    }
  }

  updateCommentsByMetricId = (value, id) => {
    this.props.dispatch(updateCommentsByMetricId(value, id));
    this.setState({ showCommentsError: false });
  }

  deleteSingleMetric = (id) => {
    this.props.dispatch(deleteSingleMetric(id));
    setTimeout(() => {
      this.setState({ isShowConfirmModal: true, confirmModalText: 'Are you sure you want to delete', typeId: 5 });
    }, 50);
  }

  handleConfirmModal = (typeId) => {
    if (this.checkIsAccessDenied()) {
      setTimeout(() => {
        const titleTxt = (typeId === 5) ? 'Are you sure you want to delete' : 'Are you sure you want to reject';
        this.setState({ isShowConfirmModal: true, confirmModalText: titleTxt, typeId });
      }, 50);
    }
  }

  submitConfirm = () => {
    const { typeId } = this.state;
    setTimeout(() => {
      this.setState({ isShowConfirmModal: false });
    }, 50);
    this.showSubmitModal(typeId);
  }

  render() {
    const {
      showErrorModal, errorText, isShowConfirmModal, confirmModalText,
      showSubmitMetricModal, submitSchedulesModalText, showCommentsError, showSnackBar,
      snackBarMessage
    } = this.state;
    const { checkedList, metricReportLists, metricsIsLoading } = this.props.metricsManager;

    const MPArole = (
      <span>
        <ButtonField
          buttonLabel={'Create Metrics'}
          onClick={() => this.newCreateRequest()}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Delete Metrics'}
          onClick={() => this.handleConfirmModal(5)}
          buttonIcon={<SvgiMinus />}
        />
        <ButtonField
          buttonLabel={'Send for Approval'}
          onClick={() => this.showSubmitModal(1)}
          buttonIcon={<SvgiTick />}
        />
      </span>
    );

    const SPRrole = (
      <span>
        <ButtonField
          buttonLabel={'Send for Modification'}
          onClick={() => this.showSubmitModal(2)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Approve'}
          onClick={() => this.showSubmitModal(3)}
          buttonIcon={<SvgiPlus />}
        />
        <ButtonField
          buttonLabel={'Reject'}
          onClick={() => this.handleConfirmModal(4)}
          buttonIcon={<SvgiPlus />}
        />
      </span>
    );

    const buttonViewByRole = (
      <div className="padding-top padding-left">
        { localStorage.getItem('role') === 'MPA' && MPArole }
        { localStorage.getItem('role') === 'SPR' && SPRrole }
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
        { checkedList.map((item, i) => (
          <CommentBoxField
            comment={item.comments}
            commentLabel={'Metrices'}
            requestRecordId={item.metricPlanId}
            onChange={this.updateCommentsByMetricId}
          />)) }
        {showCommentsError && <p className="danger">Please enter comments</p>}
      </div>
    );

    return (
      <div className="box box-primary">
        <LinkedScheduleModel
          onShowModel={this.state.showLinkedScheduleModal}
          onCloseModel={this.closeLinkedScheduleModal}
          dataInfo={this.props.metricsManager.metricLinkedScheduleList}
        />

        <ModelCustom
          showModel={showErrorModal}
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
          showModel={showSubmitMetricModal}
          title={submitSchedulesModalText}
          bodyContent={commentBoxBody}
          submitLabel={'Submit'}
          closeLabel={'Close'}
          onSubmitClick={this.submitMetricReport}
          onCloseClick={this.closeSubmitModal}
        />
        {buttonViewByRole}
        <div className="metricDiv">
          <MetricReportGrid
            data={metricReportLists}
            isLoading={metricsIsLoading}
            pageAction={'metricHome'}
            onHandleMetricSelect={this.handleMetricSelect}
            onHandleMetricIdClick={this.handleMetricIdClick}
            onEditMetric={this.editMetric}
            onDeleteSingleMetric={this.deleteSingleMetric}
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
  return {
    metrices: state.metrices,
    metricsManager: state.metricsManager
  };
}

export default connect(mapStateToProps)(MetricHome);
