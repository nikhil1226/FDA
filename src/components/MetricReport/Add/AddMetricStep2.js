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
import { Modal, Row, Col } from 'react-bootstrap';
import Snackbar from 'material-ui/Snackbar';

import RaisedButton from 'material-ui/RaisedButton';
import {
  getAllMaterialsBySite,
  updateMaterialListItemCheckBox,
  addMaterialsToSelectedList,
  updateAllMaterialListItemCheckbox,
  getAllSite,
  setScheduleType,
  updateMetricsInclude,
  updateSelectedProductsCheckbox,
  filterMaterials,
  resetMaterialFilter,
  submitMetricPlan,
  updateMetricDescription,
  modifyStartDate,
  modifyEndDate,
  deleteMaterialFromSelectedList,
  updateMetricSitePlanReviewer,
  updateSiteQAReviewer,
  updateMetricSiteReviewer,
  getAllMaterialsBySchedule,
  updateMetricPlan,
  getLinkScheduleNewMetricReport,
  clearNewLinkSchedulesMsgPopUp
} from '../../../actions/MetricsManagerActions';
import { SvgiPlus, SvgiCancel } from '../../SVGIcons';
import ScopeDefined from '../../ScopeDefined/scopeDefined';
import ErrorDialog from '../../../shared/error-dialog';
import MetricReportEditGrid from '../../Grid/MetricReportEditGrid';

import './AddMetricStep2.scss';

class AddMetricStep2 extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      allSelected: false,
      isMaterialListLoding: false,
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
      addMetricPlanErrorText: '',
      showSnackBar: false,
      disable: false,
      metricesDisable: false,
      selectKeepDropDownOpen: true
    };
  }

  componentWillMount() {
    const { mapSchedule, currentMetric } = this.props.metricsManager;
    const { siteId, scheduleId } = currentMetric[0];
    if (mapSchedule) {
      this.props.dispatch(getAllMaterialsBySchedule(scheduleId));
      this.setState({ metricesDisable: true });
    } else {
      this.props.dispatch(getAllMaterialsBySite(siteId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps.metricsManager, this.props.metricsManager) && !this.state.isMaterialListLoding) {
      const { mapSchedule, currentMetric } = nextProps.metricsManager;
      const { siteId, scheduleId } = currentMetric[0];
      if (mapSchedule) {
        this.props.dispatch(getAllMaterialsBySchedule(scheduleId));
        this.setState({ metricesDisable: true, isMaterialListLoding: true });
      } else if (siteId) {
        this.props.dispatch(getAllMaterialsBySite(siteId));
        this.setState({ isMaterialListLoding: true });
      }
    }
    if (nextProps.metricsManager.isShowNewLinkSchedulePopupMsg) {
      this.showUpdateMsg(nextProps.metricsManager.newLinkScheduleStatus);
    }
  }

  showUpdateMsg = (statusId) => {
    if (statusId === '97') {
      this.setState({
        showScheduleProductModal: true,
        showScheduleProductModalMessage: 'Materials that are selected from the list, already have Metric report ID’s linked to them for the same review period. Metric cannot be created and linked to this schedule. No changes saved'
      });
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

  closeScheduleProductModal = () => {
    this.props.dispatch(clearNewLinkSchedulesMsgPopUp());
    this.setState({ showScheduleProductModal: false });
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

  saveMetric = () => {
    let currentMetricPlan = Object.assign({}, this.props.metricsManager.currentMetric[0]);
    currentMetricPlan.materials = _map(_filter(this.props.metricsManager.selectedMaterialsList, ['checked', true]), o => _pick(o, ['materialRecordId', 'materialNumber', 'productNdc', 'excluded', 'comments']));
    currentMetricPlan.metricsIncluded = _map(_filter(currentMetricPlan.metricsIncluded, ['checked', true]), 'metricId');
    currentMetricPlan.siteReviewer = _map(_filter(currentMetricPlan.siteReviewer, ['checked', true]), 'userId');
    currentMetricPlan.siteQAReviewer = _map(_filter(currentMetricPlan.siteQAReviewer, ['checked', true]), 'userId');
    currentMetricPlan.sitePlanReviewer = _map(_filter(currentMetricPlan.sitePlanReviewer, ['checked', true]), 'userId');
    currentMetricPlan = _omit(currentMetricPlan, ['bu', 'dunsNumber', 'plantCode', 'region', 'site', 'feiNumber', 'technology']);
    this.validationAddMetricStep2(currentMetricPlan);
    if (currentMetricPlan.statusCode === '32') {
      currentMetricPlan.materials = _filter(currentMetricPlan.materials, ['excluded', false]);
    }
  }

  validationAddMetricStep2 = (currentMetricPlan) => {
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
    if (currentMetricPlan.metricsIncluded.length === 0) {
      errorText.push('Please select atleast one Metrices');
    }
    if (currentMetricPlan.description === '') {
      errorText.push('Schedule Description cannot be Empty');
    }
    if (currentMetricPlan.siteReviewer.length === 0) {
      errorText.push('Please select atleast one Site Reviwer');
    }
    if (currentMetricPlan.sitePlanReviewer.length === 0) {
      errorText.push('Please select atleast one Site Plan Reviwer');
    }
    if (currentMetricPlan.siteQAReviewer.length === 0) {
      errorText.push('Please select atleast one Site QA Reviwer');
    }
    if (errorText.length === 0) {
      const saveData = Object.assign({}, currentMetricPlan,
        { startDate: updatedStartDate, endDate: updatedEndDate });
      if (this.props.metricsManager.mapSchedule) {
        this.props.dispatch(getLinkScheduleNewMetricReport(saveData));
      } else {
        this.props.dispatch(submitMetricPlan(saveData));
        this.setState({ addMetricPlanErrorText: '', showSnackBar: true });
        setTimeout(() => {
          this.context.router.push('/MetricReport');
        }, 2000);
      }
    } else {
      this.setState({ showErrorModal: true, addMetricPlanErrorText: errorText.join() });
    }
  }

  deleteMaterial = row => {
    this.props.dispatch(deleteMaterialFromSelectedList(row.materialPk));
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
    this.props.dispatch(
      updateMetricSitePlanReviewer(
        value
      )
    );
  }

  updatesMetricReviewer = (value) => {
    this.props.dispatch(
        updateMetricSiteReviewer(
          value
        )
      );
  }
  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  updatesMetricQAReviewer = (value) => {
    this.props.dispatch(
      updateSiteQAReviewer(
        value
      )
    );
  }

  render() {
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
        data={this.props.metricsManager.newLinkScheduleProductList}
        columns={linkScheduleProductcolumns}
        noDataText={'No data Found!'}
        pageSize={this.props.metricsManager.newLinkScheduleProductList.length}
        showPagination={false}
      />
    );

    return (
      <div className="box box-primary CreateSchdule">
        <div className="padding modifyScheduleWrap">
          <ErrorDialog
            errorText={this.state.addMetricPlanErrorText}
            showErrorModal={this.state.showErrorModal}
            onHide={this.closeErrorModal}
            onClick={this.closeErrorModal}
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
              {this.props.metricsManager.newLinkScheduleProductList.length && linkScheduleProductListArray}
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

          <MetricReportEditGrid
            pageTitle={'Create'}
            metricData={this.props.metricsManager.currentMetric}
            isLoading={this.props.metricsManager.modifyMertricIsloaded}
            onDisable={this.state.disable}
            onMetricesDisable={this.state.metricesDisable}
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
            saveScope={this.saveMetric}
            isLoading={this.props.metricsManager.modifyMertricIsloaded}
            val={this.state.allSelected}
            handleAllMaterialsSelcteChange={this.handleAllMaterialsSelcteChange}
            selectedMaterialsList={_filter(this.props.metricsManager.selectedMaterialsList, ['excluded', false])}
            filteredMaterialsList={_filter(this.props.metricsManager.filteredMaterialsList, ['isSelected', false])}
            addMaterialsToSelectedList={this.addMaterialsToSelectedList}
            handleMaterialSelectChange={this.handleMaterialSelectChange}
            deleteMaterial={this.deleteMaterial}
            filterMaterials={this.filterMaterials}
            clearFilter={this.clearFilter}
            linkTo="/MetricReport"
          />
        </div>
        <Snackbar
          open={this.state.showSnackBar}
          className="notificationBox"
          message={'Metric Created Successfully'}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricsManager: state.metricsManager };
}

export default connect(mapStateToProps)(AddMetricStep2);
