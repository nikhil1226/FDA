import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _lowerCase from 'lodash/lowerCase';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {
  getAllMaterialsBySite,
  updateAllMaterialListItemCheckbox,
  updateMaterialListItemCheckBox,
  addMaterialsToSelectedList,
  updateMetricsInclude,
  filterMaterials,
  resetMaterialFilter,
  updateMetricDescription,
  modifyStartDate,
  modifyEndDate,
  deleteMaterialFromSelectedList,
  updateMetricSitePlanReviewer,
  updateSiteQAReviewer,
  updateMetricSiteReviewer,
  getAllMaterialsBySchedule,
  updateMetricPlan,
  getMetricById,
  getAllMetricSite,
  resetMetricData,
  getLinkScheduleNewMetricReport,
  clearNewLinkSchedulesMsgPopUp
} from '../../../actions/MetricsManagerActions';
import { SvgiPlus, SvgiCancel } from '../../SVGIcons';
import ScopeDefined from '../../ScopeDefined/scopeDefined';
import ErrorDialog from '../../../shared/error-dialog';
import MetricReportEditGrid from '../../Grid/MetricReportEditGrid';
import './ModifyMetric.scss';

class ModifyMetric extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      allSelected: false,
      isMaterialListLoading: false,
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
        sortable: false,
        resizable: true
      },
      showErrorModal: false,
      metricPlanErrorText: '',
      showSnackBar: false,
      showSnackBarUpdate: false,
      disable: false,
      metricesDisable: false,
      selectKeepDropDownOpen: true,
      showStatusErrorModal: false,
      statusErrorText: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(resetMetricData());
    this.props.dispatch(getMetricById(this.props.params.metricId));
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps.metricsManager, this.props.metricsManager) && !this.state.isMaterialListLoading) {
      const { mapSchedule, currentMetric } = nextProps.metricsManager;
      const { siteId, scheduleId, description, startDate, endDate, metricsIncluded } = currentMetric[0];
      if (mapSchedule) {
        this.props.dispatch(getAllMaterialsBySchedule(scheduleId));
        this.setState({ metricesDisable: !this.state.metricesDisable, isMaterialListLoading: true });
      } else if (siteId) {
        this.props.dispatch(getAllMaterialsBySite(siteId));
        this.setState({ isMaterialListLoading: true });
      }
    }
    if (nextProps.metricsManager.isShowNewLinkSchedulePopupMsg) {
      this.showUpdateMsg(nextProps.metricsManager.newLinkScheduleStatus);
      this.props.dispatch(clearNewLinkSchedulesMsgPopUp());
    }
  }

  showUpdateMsg = (statusId) => {
    if (statusId === '97') {
      this.setState({
        showStatusErrorModal: true,
        statusErrorText: 'Materials that are selected from the list, already have Metric report ID’s linked to them for the same review period. Metric cannot be created and linked to this schedule. No changes saved' });
    } else {
      this.setState({ metricPlanErrorText: '', showSnackBar: true });
      setTimeout(() => {
        this.context.router.push('/MetricReport');
      }, 2000);
    }
  }

  handleMaterialSelectChange = row => {
    this.props.dispatch(
      updateMaterialListItemCheckBox(
        row.materialPk
      )
    );
  }

  handleAllMaterialsSelcteChange = () => {
    this.setState({ allSelected: !this.state.allSelected });
    this.props.dispatch(
      updateAllMaterialListItemCheckbox(!this.state.allSelected)
    );
  }

  addMaterialsToSelectedList = () => {
    this.setState({ allSelected: false });
    this.props.dispatch(
      addMaterialsToSelectedList()
    );
  }

  deleteMaterial = row => {
    this.props.dispatch(deleteMaterialFromSelectedList(row.materialPk));
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  closeStatusModal = () => {
    this.props.dispatch(clearNewLinkSchedulesMsgPopUp());
    this.setState({ showStatusErrorModal: false, statusErrorText: '' });
    this.context.router.push('/MetricReport');
  }

  saveScope = () => {
    let currentMetricPlan = Object.assign({}, this.props.metricsManager.currentMetric[0]);
    currentMetricPlan.updateBy = this.props.login.userInfo.userId;
    currentMetricPlan.materials = _map(this.props.metricsManager.selectedMaterialsList, o => _pick(o, ['materialRecordId', 'materialNumber', 'productNdc', 'excluded', 'comments']));
    currentMetricPlan.metricsIncluded = _map(_filter(currentMetricPlan.metricsIncluded, ['checked', true]), 'metricId');
    currentMetricPlan.siteReviewer = _map(_filter(currentMetricPlan.siteReviewer, ['checked', true]), 'userId');
    currentMetricPlan.siteQAReviewer = _map(_filter(currentMetricPlan.siteQAReviewer, ['checked', true]), 'userId');
    currentMetricPlan.sitePlanReviewer = _map(_filter(currentMetricPlan.sitePlanReviewer, ['checked', true]), 'userId');
    currentMetricPlan = _omit(currentMetricPlan, ['bu', 'dunsNumber', 'plantCode', 'region', 'site', 'feiNumber', 'technology']);
    this.validateMetric(currentMetricPlan);
  }

  validateMonth = (date) => {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const dateArr = date.split('-');
    let result = true;
    if (dateArr.length < 3) {
      result = false;
    } else if (_filter(monthNames, o => o === _lowerCase(dateArr[1])).length === 0) {
      result = false;
    }
    return result;
  }

  validateMetric = (currentMetricPlan) => {
    const errorText = [];
    const metricStartDate = document.getElementById('startDate').value;
    const metricEndDate = document.getElementById('endDate').value;
    const updatedStartDate = new Date(moment(currentMetricPlan.startDate).format('YYYY-MM-DD'));
    const updatedEndDate = new Date(moment(currentMetricPlan.endDate).format('YYYY-MM-DD'));
    if (!this.validateMonth(metricStartDate)) {
      errorText.push('Start Date is Invalid');
    }
    if (!this.validateMonth(metricEndDate)) {
      errorText.push('End Date is Invalid');
    } else if (updatedStartDate > updatedEndDate) {
      errorText.push('Enter End-Date must be greater than Start-Date');
    }
    if (currentMetricPlan.materials.length === 0) {
      errorText.push('Please select atleast one material');
    }
    if (currentMetricPlan.description === '') {
      errorText.push('Schedule Description cannot be Empty');
    }
    if (errorText.length > 0) {
      this.setState({ showErrorModal: true, metricPlanErrorText: errorText.join() });
    } else {
      const updateData = Object.assign({}, currentMetricPlan,
        { startDate: updatedStartDate, endDate: updatedEndDate });
      this.props.dispatch(updateMetricPlan(updateData));
      this.setState({ metricPlanErrorText: '', showSnackBar: true });
      setTimeout(() => {
        this.context.router.push('/MetricReport');
      }, 2000);
    }
  }

  updateDescriptionText = event => {
    this.props.dispatch(
      updateMetricDescription(
        event.target.value
      )
    );
  }

  modifyStartDate = date => {
    this.props.dispatch(
      modifyStartDate(
        date
      )
    );
  }

  modifyEndDate = date => {
    this.props.dispatch(
      modifyEndDate(
        date
      )
    );
  }

  updateMetricsCheckBox = (value) => {
    this.props.dispatch(updateMetricsInclude(value));
  }

  updatesMetricCoordinator = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateMetricSitePlanReviewer(
          value
        )
      );
    }
  }

  updatesMetricReviewer = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateMetricSiteReviewer(
          value
        )
      );
    }
  }

  updatesMetricQAReviewer = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateSiteQAReviewer(
          value
        )
      );
    }
  }

  render() {
    const {
      currentMetric, modifyMertricIsloaded, selectedMaterialsList, filteredMaterialsList
    } = this.props.metricsManager;
    return (
      <div className="box box-primary CreateSchdule">
        <div className="padding modifyScheduleWrap">
          <ErrorDialog
            errorText={this.state.metricPlanErrorText}
            showErrorModal={this.state.showErrorModal}
            onHide={this.closeErrorModal}
            onClick={this.closeErrorModal}
          />
          <ErrorDialog
            errorText={this.state.statusErrorText}
            showErrorModal={this.state.showStatusErrorModal}
            onHide={this.closeStatusModal}
            onClick={this.closeStatusModal}
          />

          <MetricReportEditGrid
            pageTitle={'Modify'}
            metricData={currentMetric}
            isLoading={modifyMertricIsloaded}
            onMetricesDisable={this.state.metricesDisable}
            onDisable={this.state.disable}
            onSelectKeepDropDownOpen={this.state.selectKeepDropDownOpen}
            onUpdateDescriptionText={this.updateDescriptionText}
            onModifyStartDate={this.modifyStartDate}
            onModifyEndDate={this.modifyEndDate}
            onUpdateMetricsInclude={this.updateMetricsCheckBox}
            onUpdatesPlanReviewer={this.updatesMetricCoordinator}
            onUpdatesSiteReviewer={this.updatesMetricReviewer}
            onUpdatesSiteQAReviewer={this.updatesMetricQAReviewer}
          />

          <ScopeDefined
            saveScope={this.saveScope}
            val={this.state.allSelected}
            isLoading={modifyMertricIsloaded}
            handleAllMaterialsSelcteChange={this.handleAllMaterialsSelcteChange}
            selectedMaterialsList={_filter(selectedMaterialsList, ['excluded', false])}
            filteredMaterialsList={_filter(filteredMaterialsList, ['isSelected', false])}
            addMaterialsToSelectedList={this.addMaterialsToSelectedList}
            handleMaterialSelectChange={this.handleMaterialSelectChange}
            deleteMaterial={this.deleteMaterial}
            filterMaterials={this.filterMaterials}
            clearFilter={this.clearFilter}
            linkTo="/MetricReport"
            onStatus={currentMetric[0].statusCode}
            selectedMaterialsListLoading={modifyMertricIsloaded}
          />
          <div className="text-center">
            <RaisedButton
              className="table-button"
              label="Back"
              containerElement={<Link to="/MetricReport/home" />}
              icon={<SvgiCancel />}
            />
          </div>
          <Snackbar
            open={this.state.showSnackBar}
            className="notificationBox"
            message={'Metric Modified Successfully'}
            autoHideDuration={4000}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricsManager: state.metricsManager, login: state.login };
}

export default connect(mapStateToProps)(ModifyMetric);
