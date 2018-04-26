import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import ReactSuperSelect from 'react-super-select';
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
  getAllMetrices,
  resetMetricReportMaintance,
  emptyCreatedReport,
  updateReportSelect,
  generateMaintenanceReport,
  resetPopulateData,
  generateExcelReport,
  emptyCreatedExcelReport,
  updateCommentsByMetricId,
  updateMetricSiteReviewerStatus,
  getScheduleBySite,
  clearShowSchedulePopUp,
  getLinkScheduleandMetricReportDetails,
  clearSuccessMsgPopUp,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricMaintenanceManagerActions';
import { updateMetricStatus } from '../../../actions/MetricsManagerActions';
import ErrorDialog from '../../../shared/error-dialog';
import './MetricMaintenance.scss';
import { SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad, SvgiTick, SvgiDownload } from '../../SVGIcons';
import { StatusMesssage } from '../../../constants/linkScheduleStatusMessage';
import MetricReportGrid from '../../Grid/MetricReportGrid';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';

class MetricMaintenance extends React.Component {
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
          displayText: 'Send for Global Review',
          actionText: 'sentForGlobalReview',
          message: 'Metric Report sent for Global Review'
        },
        {
          id: 2,
          displayText: 'Send for Site Approval',
          actionText: 'sentForSiteApproval',
          message: 'Metric Report send for Site Approval'
        },
        {
          id: 3,
          displayText: 'Link Schedule',
          actionText: 'LinkSchedule',
          message: 'Metric Report Update Link Schedule'
        },
        {
          id: 4,
          displayText: `Approved (${localStorage.getItem('roleName')})`,
          actionText: 'approvedSiteReview',
          message: 'Metric Report Update Approved'
        },
        {
          id: 5,
          displayText: `Rejected (${localStorage.getItem('roleName')})`,
          actionText: 'rejectedSitereview',
          message: 'Metric Report Update Rejected'
        },
        {
          id: 6,
          displayText: 'Send back for modification',
          actionText: 'sentBackforReportModification',
          message: 'Metric Report Update Modification'
        }
      ],
      showScheduleModal: false,
      scheduleInfo: {},
      showSnackBar: false,
      snackBarMessage: '',
      showScheduleProductModal: false,
      showScheduleProductModalMessage: '',
      showLinkedScheduleModal: false,
      statusId: 0,
      showCommentsError: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetrices());
    this.props.dispatch(clearShowSchedulePopUp());
  }

  componentDidMount() {
    this.props.dispatch(resetMetricReportMaintance());
    this.props.dispatch(resetPopulateData());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metricMaintenanceManager.isCreatedReport === true) {
      this.setState({
        showErrorModal: true,
        errorText: 'Report Created'
      });
    }
    if (nextProps.metricMaintenanceManager.isExcelReportPopulated === true) {
      this.setState({
        showErrorModal: true,
        errorText: 'Report Created'
      });
      this.props.dispatch(emptyCreatedExcelReport());
    }

    if (nextProps.metricMaintenanceManager.isShowScheduleSuccessMsg) {
      this.setState({
        showErrorModal: true,
        errorText: 'Schedule Linked to the Metric Report  Successfully'
      });
      this.props.dispatch(clearSuccessMsgPopUp());
    }

    if (nextProps.metricMaintenanceManager.isShowSchedulePopUp) {
      this.setState({ showScheduleModal: true });
    }

    if (nextProps.metricMaintenanceManager.isShowPopupMsg) {
      const errorMsg = _find(StatusMesssage, ['id', _toNumber(nextProps.metricMaintenanceManager.linkScheduleStatus)]).message;
      if (nextProps.metricMaintenanceManager.linkScheduleStatus === '97') {
        this.setState({
          showScheduleProductModal: true,
          showScheduleProductModalMessage: errorMsg
        });
      } else {
        this.setState({
          showErrorModal: true,
          errorText: errorMsg
        });
      }
      this.props.dispatch(clearShowSchedulePopUp());
    }

    if (nextProps.metricMaintenanceManager.isShowLinkedScheduleList) {
      this.setState({ showLinkedScheduleModal: true });
    }
  }


  closeErrorModal = (value) => {
    this.setState({ showErrorModal: false });
    if (this.props.metricMaintenanceManager.isCreatedReport === true) {
      this.props.dispatch(emptyCreatedReport());
      this.props.dispatch(resetPopulateData());
      this.props.dispatch(clearShowSchedulePopUp());
    }
  }

  closeSubmitModal = (value) => {
    this.setState({ showSubmitMetricModal: false, showCommentsError: false, submitMetricPlanModalText: '' });
  }

  closeScheduleProductModal = () => {
    this.setState({ showScheduleProductModal: false });
  }

  closeSneakBar() {
    this.setState({ showSnackBar: false, snackBarMessage: '' });
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  handleMetricSelect = row => {
    this.props.dispatch(updateReportSelect(row.metricesId));
  }
  checkIsAccessDenied(value = 0, actionId = 0) {
    const { checkedList } = this.props.metricMaintenanceManager;
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
      if (o.forStatus === '35') {
        restricted.push(o);
      }
    });
    if (restricted.length && actionId === 0) {
      if (checkedList.length > 1) {
        this.setState({ showErrorModal: true, errorText: 'Please select execept "Plan Deleted" metric Report' });
      } else {
        this.setState({ showErrorModal: true, errorText: 'Access Denied' });
      }
      return false;
    }
    return true;
  }

  viewWorkFlow = () => {
    const { checkedList } = this.props.metricMaintenanceManager;
    if (this.checkIsAccessDenied(1, 1)) {
      this.context.router.push(`/workflow/MetricMaintenance/${checkedList[0].metricPlanId}`);
    }
  }

  viewAudit = () => {
    const { checkedList } = this.props.metricMaintenanceManager;
    if (this.checkIsAccessDenied(1, 1)) {
      this.props.dispatch(getAuditFlow(checkedList[0].metricPlanId));
      setTimeout(() => {
        this.context.router.push('/audit');
      }, 500);
    }
  }

  generateReport = () => {
    const { checkedList } = this.props.metricMaintenanceManager;
    if (this.checkIsAccessDenied(1)) {
      this.props.dispatch(generateMaintenanceReport(checkedList[0].metricPlanId));
      const data = {
        action: 'reportGenerated',
        status: '38',
        metricPlans: [{ metricPlanId: checkedList[0].metricPlanId, comments: 'reportGenerted', forStatus: checkedList[0].forStatus }]
      };
      this.props.dispatch(updateMetricStatus(data));
      this.props.dispatch(updateReportSelect(checkedList[0].metricPlanId));
    }
  }

  downloadReport = () => {
    const { checkedList } = this.props.metricMaintenanceManager;
    if (this.checkIsAccessDenied(1)) {
      this.setState({
        showErrorModal: true,
        errorText: 'Processing'
      });
      this.props.dispatch(generateExcelReport(checkedList[0].metricPlanId));
      this.props.dispatch(updateReportSelect(checkedList[0].metricPlanId));
    }
  }
  /* eslint-disable */
  showSubmitModal = (typeId) => {
    const { checkedList } = this.props.metricMaintenanceManager;
    let errorTextMsg = '';
    if (this.checkIsAccessDenied()){
      if (typeId === 4 || typeId === 5 || typeId === 6 ) {
        const unApprovalFlagArr = _filter(checkedList, ['approvalFlag', 0]);
        if(unApprovalFlagArr.length) {
          errorTextMsg = 'Access denied';
        }
      } else if (typeId === 2) {
        const expectReportGenArr = _filter(checkedList, ['status', 'Plan Approved']);
        const expectlinkedToScheduleArr = _filter(checkedList, ['linkedToSchedule', 0]);
        errorTextMsg = (expectReportGenArr.length && expectlinkedToScheduleArr.length)
          ? 'Please select only Report Generated with linked to Schedule metric Report'
          : (expectReportGenArr.length && !expectlinkedToScheduleArr.length)
            ? 'Please select only Report Generated metric Report'
            : (!expectReportGenArr.length && expectlinkedToScheduleArr.length)
              ? 'Please select only linked to Schedule metric Report'
              : '';
      }
      if (errorTextMsg === '') {
        const index = _findIndex(this.state.submitStatus, ['id', typeId]);
        this.setState({
          submitMetricPlanModalText: this.state.submitStatus[index].displayText,
          statusId: _toNumber(typeId)
        });
        setTimeout(() => {
          this.setState({ showSubmitMetricModal: true, showCommentsError: false });
        }, 50);
      } else {
        this.setState({
          showErrorModal: true,
          errorText: errorTextMsg
        });
      }
    }
  }

  submitMetric = () => {
    const { checkedList } = this.props.metricMaintenanceManager;
    const { statusId, submitStatus } = this.state;
    const emptyComment = _filter(checkedList, ['comments', '']);
    if (emptyComment.length) {
      this.setState({ showCommentsError: true });
    } else {
      const data = {
        action: _find(submitStatus, { id: statusId }).actionText,
        userId: this.props.login.userInfo.userId,
        indicator: (statusId === 4) ? 1 : 0,
        metricPlans: checkedList
      };
      this.props.dispatch(updateMetricSiteReviewerStatus(data));

      this.setState({
        showSubmitMetricModal: false,
        showSnackBar: true,
        snackBarMessage: _find(submitStatus, { id: statusId }).message
      });
      this.props.dispatch(resetMetricReportMaintance());
      setTimeout(() => {
        this.closeSneakBar();
      }, 2000);
    }
  }

  editReport = (metric) => {
    this.context.router.push(`/MetricMaintenance/Modify/${metric.metricesId}`);
  }

  viewMetricIdClick = (metric) => {
    this.context.router.push(`/MetricMaintenance/View/${metric.metricesId}`);
  }

  linkSchedule = (siteId, metricId) => {
    const dataInfo = this.state.scheduleInfo;
    dataInfo.metricesId = metricId;
    this.setState({ scheduleInfo: dataInfo });
    this.props.dispatch(getScheduleBySite(siteId));
  }

  submitLinkSchedule = () => {
    this.setState({ showScheduleModal: false });
    this.props.dispatch(getLinkScheduleandMetricReportDetails(this.state.scheduleInfo));
    this.props.dispatch(clearShowSchedulePopUp());
  }

  closeScheduleModal = (value) => {
    this.setState({ showScheduleModal: false });
    this.props.dispatch(clearShowSchedulePopUp());
  }

  updatesLinkSchedule = (value) => {
    if (typeof value !== 'undefined') {
      const dataInfo = this.state.scheduleInfo;
      dataInfo.scheduleId = value.scheduleId;
      this.setState({ scheduleInfo: dataInfo });
    }
  }

  viewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  updateCommentsByMetricId = (e, id) => {
    this.props.dispatch(updateCommentsByMetricId(e.target.value, id));
    this.setState({ showCommentsError: false });
  }
  render() {
    /* eslint-disable */
    const SQARBtnView = (
      (localStorage.getItem('role') === 'SQAR' || localStorage.getItem('role') === 'SR') && <span>
        <RaisedButton
          className="table-button"
          label="Approved"
          onTouchTap={() => this.showSubmitModal(4)}
          icon={<SvgiTick />}
        />
        <RaisedButton
          className="table-button"
          label="Rejected"
          onTouchTap={() => this.showSubmitModal(5)}
          icon={<SvgiTick />}
        />
        <RaisedButton
          className="table-button"
          label="Send for Modification"
          onTouchTap={() => this.showSubmitModal(6)}
          icon={<SvgiTick />}
        />
      </span>
    );

    const authorBtnView = (
      localStorage.getItem('role') === 'MPA' && <span>
        <RaisedButton
          className="table-button"
          label="Generate Report"
          onTouchTap={this.generateReport}
          icon={<SvgiPlus />}
        />
        <RaisedButton
          className="table-button"
          label="Send for Site Approval"
          onTouchTap={() => this.showSubmitModal(2)}
          icon={<SvgiTick />}
        />
      </span>
    );

    const buttonView = (
      <div className="padding-top padding-left">
        {authorBtnView}
        {SQARBtnView}
        <RaisedButton
          className="table-button"
          label="Work Flow"
          onTouchTap={() => this.viewWorkFlow(22)}
          icon={<SvgiPlus />}
        />
        <RaisedButton
          className="table-button"
          label="Audit Trail"
          onTouchTap={() => this.viewAudit(21)}
          icon={<SvgiPlus />}
        />
        <RaisedButton
          className="table-button"
          label="Download Report"
          onTouchTap={this.downloadReport}
          icon={<SvgiDownload />}
        />
      </div>
    );
    const commentsArray = this.props.metricMaintenanceManager.checkedList.map((item, i) => (
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

    const linkScheduleProductcolumns = [
      {
        Header: 'Material',
        accessor: 'material'
      },
      {
        Header: 'PRODUCTNDC',
        accessor: 'pRODUCTNDC'
      },
      {
        Header: 'ReviewStartDate',
        accessor: 'reviewStartDate'
      },
      {
        Header: 'ReviewEndDate',
        accessor: 'reviewEndDate'
      },
      {
        Header: 'MetricReportRecordId',
        accessor: 'metricReportRecordId'
      }
    ];

    const linkScheduleProductListArray = ( 
      <ReactTable
        className="-striped -highlight scheduleGrid"
        data={this.props.metricMaintenanceManager.linkScheduleProductList}
        columns={linkScheduleProductcolumns}
        noDataText={'No data Found!'}
        pageSize={this.props.metricMaintenanceManager.linkScheduleProductList.length}
        showPagination={false}
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
          dataInfo={this.props.metricMaintenanceManager.metricLinkedScheduleList}
        />

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={this.state.showScheduleProductModal}
          onHide={this.closeScheduleProductModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              {this.state.showScheduleProductModalMessage}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>            
            {this.props.metricMaintenanceManager.linkScheduleProductList.length && linkScheduleProductListArray}
          </Modal.Body>
          <Modal.Footer>            
            <RaisedButton
              className="table-button"
              label="Close"
              onTouchTap={this.closeScheduleProductModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

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
              {this.state.submitMetricPlanModalText}
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

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={this.state.showScheduleModal}
          onHide={this.closeScheduleModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              Schedules
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactSuperSelect
              placeholder="Select Schedule"
              dataSource={this.props.metricMaintenanceManager.popUpScheduleList}
              optionValueKey="scheduleId"
              optionLabelKey="scheduleId"
              clearable={false}
              disabled={false}
              clearSelectedValueOnDataSourceChange={!false}
              onChange={this.updatesLinkSchedule}
            />
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Link"
              onTouchTap={this.submitLinkSchedule}
              icon={<SvgiPlus />}
              primary
            />
            <RaisedButton
              className="table-button"
              label="Cancel"
              onTouchTap={this.closeScheduleModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        {buttonView}

        <div className="metricDiv">
          <MetricReportGrid
            data={this.props.metricMaintenanceManager.metricMaintanceLists}
            isLoading={this.props.metricMaintenanceManager.MetricsMaintenanceisLoading}
            pageAction={'metricMaintenance'}
            onHandleMetricSelect={this.handleMetricSelect}
            onHandleMetricIdClick={this.viewMetricIdClick}
            onEditMetric={this.editReport}
            onlinkSchedule={this.linkSchedule}
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
  return { metricMaintenanceManager: state.metricMaintenanceManager, login: state.login };
}

export default connect(mapStateToProps)(MetricMaintenance);
