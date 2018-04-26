import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import _toNumber from 'lodash/toNumber';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Collapse, { Panel } from 'rc-collapse';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import ErrorDialog from '../../../shared/error-dialog';
import {
  getAllMetric,
  getScheduleById,
  getMatrialsByProduct,
  updateMaterialListItemCheckBox,
  updateScopeAllMaterialListItemCheckbox,
  addMaterialsToSelectedList,
  updateMetricsInclude,
  updateSelectedProductsCheckbox,
  filterMaterials,
  resetMaterialFilter,
  submitScheduleScope,
  updateSchduleDescription,
  modifyStartDate,
  modifyEndDate,
  deleteMaterialFromSelectedList,
  setRemoveMaterialComment,
  clearUpdateScheduleScopeStatus,
  getBackSelectedMaterialList,
  requestLoading
} from '../../../actions/ScheduleManagerActions';
import './ModifyScope.scss';
import FilterOption from '../FilterOption';
import { SvgiPlus, SvgiCancel } from '../../SVGIcons';
import ScheduleEditGrid from '../../Grid/ScheduleEditGrid';

class ModifyScope extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      descriptionErrorText: '',
      siteErrorText: '',
      sitePlanCordinatorErrorText: '',
      sitePlanReviewerErrorText: '',
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
      showSnackBar: false,
      filtershown: false,
      disable: false,
      showCommentColumn: true,
      selectKeepDropDownOpen: true,
      statusErrorModal: false,
      statusErrorModalMsg: '',
      updateScopeStatus: 0,
      scopeUpdateStatusMsg: [{
        statusId: '7',
        messageTxt: 'Cannot Delete all materials associated with a Product NDC, Products could not be Removed. Other Changes were saved'
      }, {
        statusId: '8',
        messageTxt: 'Selected Materials could not be removed as they are linked to Active Metric Reports. Other changes have been saved'
      }, {
        statusId: '9',
        messageTxt: 'All materials linked to selected Product NDC’s cannot be removed from the Schedule, Atleast one Material Number must be linked to Selected Product NDC'
      }]
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetric());
    this.props.dispatch(requestLoading());
    this.props.dispatch(getMatrialsByProduct(this.props.params.scheduleId));
    setTimeout(() => {
      this.props.dispatch(getScheduleById(this.props.params.scheduleId, 'scope'));
    }, 3500);
    if (localStorage.getItem('role') === 'SPC' && this.props.scheduleManager.currentSchedule[0].status !== '24') {
      this.setState({
        disable: true,
        showCommentColumn: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isShowScheduleScopeUpdateStatus, scheduleScopeUpdateStatus } = nextProps.scheduleManager;
    if (!_.isEqual(nextProps.scheduleManager, this.props.scheduleManager) && !this.state.isLoading) {
      const { currentSchedule } = nextProps.scheduleManager;
      if (localStorage.getItem('role') === 'SPC' && currentSchedule[0].status !== '24') {
        this.setState({
          disable: true,
          showCommentColumn: false
        });
      }
    }

    if (nextProps.scheduleManager.isShowScheduleScopeUpdateStatus) {
      if (scheduleScopeUpdateStatus === '9' || scheduleScopeUpdateStatus === '8' || scheduleScopeUpdateStatus === '7') {
        const errMsg = _find(this.state.scopeUpdateStatusMsg, { statusId: scheduleScopeUpdateStatus }).messageTxt;
        this.setState({
          updateScopeStatus: scheduleScopeUpdateStatus,
          statusErrorModal: true,
          statusErrorModalMsg: errMsg
        });
      } else {
        this.setState({ showSnackBar: true });
        this.closeStatusErrorModal();
        setTimeout(() => {
          this.context.router.push('/Schedule');
        }, 2000);
      }
    }
  }

  setRemoveMaterialComment = (e, row) => {
    this.props.dispatch(setRemoveMaterialComment(e.target.value, row.materialPk));
  }

  handleMaterialSelectChange = (row) => {
    this.props.dispatch(
      updateMaterialListItemCheckBox(
        row.materialPk
      )
    );
  }

  handleAllMaterialsSelcteChange = () => {
    this.setState({ AllSelected: !this.state.AllSelected });
    this.props.dispatch(
      updateScopeAllMaterialListItemCheckbox(!this.state.AllSelected)
    );
  }

  exculedProductFromList = (row) => {
    this.props.dispatch(
      updateSelectedProductsCheckbox(
        row.materialPk
      )
    );
  }

  addMaterialsToSelectedList = () => {
    this.setState({ AllSelected: false });
    this.props.dispatch(
      addMaterialsToSelectedList()
    );
  }

  closeStatusErrorModal = value => {
    this.props.dispatch(clearUpdateScheduleScopeStatus());
    if (this.state.updateScopeStatus !== 0) {
      this.props.dispatch(getBackSelectedMaterialList());
    }
    this.setState({ statusErrorModal: false });
  }

  redirectHomePage = () => {
    this.context.router.push('/');
  }

  saveScope = () => {
    let currentSchedule = Object.assign({}, this.props.scheduleManager.currentSchedule[0]);
    currentSchedule.updateBy = this.props.login.userInfo.userId;
    currentSchedule.metricsIncluded = _.map(_.filter(currentSchedule.metricsIncluded, ['checked', true]), 'metricId');
    currentSchedule.materials = _.map(this.props.scheduleManager.selectedMaterialsList, o => _.pick(o, ['productNdc', 'materialRecordId', 'excluded', 'comments']));
    currentSchedule = _.omit(currentSchedule, ['bu', 'dunsNumber', 'plantCode', 'region', 'site', 'feiNumber', 'technology']);
    this.validateSchedule(currentSchedule);
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

  validateSchedule(currentSchedule) {
    const errorText = [];
    const today = moment().format('YYYY-MM-DD');
    const scheduleStartDate = document.getElementById('startDate').value;
    const scheduleEndDate = document.getElementById('endDate').value;
    const currentStartDate = new Date(moment(currentSchedule.startDate).format('YYYY-MM-DD'));
    const currentEndDate = new Date(moment(currentSchedule.endDate).format('YYYY-MM-DD'));
    if (localStorage.getItem('role') !== 'SPC') {
      if (!this.validateMonth(scheduleStartDate)) {
        errorText.push('Start Date is Invalid');
      } else if (moment(scheduleStartDate).isBefore(today)) {
        errorText.push('Enter New Date');
      }
      if (!this.validateMonth(scheduleEndDate)) {
        errorText.push('End Date is Invalid');
      } else if (moment(scheduleEndDate).isBefore(today)) {
        errorText.push('Enter New Date');
      } else if (currentStartDate > currentEndDate) {
        errorText.push('Enter End-Date must be greater than Start-Date');
      }
      if (currentSchedule.metricsIncluded.length === 0) {
        // errorText.push('Please select atleast one Metrices');
      }
      if (currentSchedule.description === '') {
        errorText.push('Schedule Description cannot be Empty');
      }
    }

    if (currentSchedule.materials.length === 0) {
      errorText.push('Please select atleast one material');
    }

    if (errorText.length > 0) {
      this.setState({ scheduleErrorText: errorText.join(), showErrorModal: true });
    } else {
      this.setState({ scheduleErrorText: '' });
      this.props.dispatch(submitScheduleScope(currentSchedule));
    }
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  defaultFilterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined ? row[id].department === filter.value : true;
  };

  filterMaterials = (materialDescription, brandName) => {
    this.props.dispatch(
      filterMaterials(
        materialDescription, brandName
      )
    );
  }

  clearFilter = () => {
    this.props.dispatch(resetMaterialFilter());
  }

  changeFilterName = () => {
    this.setState({ filtershown: !this.state.filtershown });
  }

  updateDescriptionText = (event) => {
    this.props.dispatch(
      updateSchduleDescription(
        event.target.value
      )
    );
  }

  modifyStartDate = (date) => {
    this.props.dispatch(
      modifyStartDate(
        date
      )
    );
  }

  modifyEndDate = (date) => {
    this.props.dispatch(
      modifyEndDate(
        date
      )
    );
  }

  deleteMaterial = (row) => {
    this.props.dispatch(deleteMaterialFromSelectedList(row.materialPk));
  }

  updateMetricsCheckBox = (value) => {
    this.props.dispatch(updateMetricsInclude(value));
  }

  render() {
    const materialsTable = [
      {
        Header: <Checkbox onClick={this.handleAllMaterialsSelcteChange} checked={this.state.AllSelected} />,
        accessor: 'checked',
        hideFilter: true,
        filterable: false,
        maxWidth: 50,
        Cell: row => (
          <span className="gridCheckbox">
            <Checkbox checked={row.value} onCheck={() => this.handleMaterialSelectChange(row.original)} />
          </span>
        )
      },
      {
        Header: 'Material Number',
        accessor: 'materialNumber',
        minWidth: 150
      },
      {
        Header: 'Material Description',
        accessor: 'materialDescription',
        minWidth: 230
      },
      {
        Header: 'Processing Plant',
        accessor: 'processingPlant',
        minWidth: 150
      },
      {
        Header: 'Material Type',
        accessor: 'materialType',
        minWidth: 150
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        minWidth: 150
      },
      {
        Header: 'Brand Description',
        accessor: 'brandDesc',
        minWidth: 150
      },
      {
        Header: 'Product NDC',
        accessor: 'productNdc',
        minWidth: 120
      }
    ];
    const selectedMaterialsTable = [
      {
        Header: 'Remove',
        accessor: '',
        minWidth: 78,
        Cell: row => (
          <div>
            <IconButton
              className="removeButton"
              disabled={((localStorage.getItem('role') === 'SPR' && row.original.comments === '') || (localStorage.getItem('role') === 'SPC' && row.original.comments === ''))}
              onClick={() => this.deleteMaterial(row.original)}
            >
              <FontIcon className="fa fa-minus-circle" />
            </IconButton>
          </div>
        )
      },
      {
        Header: 'Comment',
        accessor: 'comments',
        minWidth: 185,
        show: ((localStorage.getItem('role') === 'SPR') || (localStorage.getItem('role') === 'SPC')),
        Cell: row => (
          <TextField
            className="DescriptionTextfeild"
            hintText="Remove reason mandatory"
            value={row.value}
            onChange={(e) => this.setRemoveMaterialComment(e, row.original)}
            multiLine
            rows={2}
          />
        )
      },
      {
        Header: 'Material Number',
        accessor: 'materialNumber',
        minWidth: 187
      },
      {
        Header: 'Material Description',
        accessor: 'materialDescription',
        minWidth: 190
      },
      {
        Header: 'Processing Plant',
        accessor: 'processingPlant',
        minWidth: 190
      },
      {
        Header: 'Material Type',
        accessor: 'materialType',
        minWidth: 177
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        minWidth: 178
      },
      {
        Header: 'Brand Description',
        accessor: 'brandDesc',
        minWidth: 185
      },
      {
        Header: 'Product NDC',
        accessor: 'productNdc',
        minWidth: 100
      }
    ];
    const saveBtnLabel = (localStorage.getItem('role') === 'SPC') ? 'Save Scope' : 'Update Scope';
    const {
      scheduleErrorText, showErrorModal, statusErrorModalMsg, statusErrorModal,
      selectKeepDropDownOpen, tableOptions, filtershown, showSnackBar
    } = this.state;
    const {
      currentSchedule, isLoading, selectedMaterialsList, filteredMaterialsList, isMaterialLoading
    } = this.props.scheduleManager;
    return (
      <div className="box box-primary CreateSchdule">
        <ErrorDialog
          errorText={scheduleErrorText}
          showErrorModal={showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />

        <ErrorDialog
          errorText={statusErrorModalMsg}
          showErrorModal={statusErrorModal}
          onHide={this.closeStatusErrorModal}
          onClick={this.closeStatusErrorModal}
        />

        <div className="padding modifyScheduleWrap">
          <ScheduleEditGrid
            pageTitle={'Modify Schedule Scope'}
            scheduleData={currentSchedule}
            isLoading={isLoading}
            onDisable={this.state.disable}
            onSelectKeepDropDownOpen={this.state.selectKeepDropDownOpen}
            onUpdateDescriptionText={this.updateDescriptionText}
            onModifyStartDate={this.modifyStartDate}
            onModifyEndDate={this.modifyEndDate}
            onUpdateMetricsInclude={this.updateMetricsCheckBox}
          />

          <div className="padding-vertical">
            <Row className="padding">
              <h3><span>Scope Defined</span>
                <div className="titleButtons text-right">
                  <RaisedButton
                    label={saveBtnLabel}
                    className="buttonStyle"
                    onTouchTap={this.saveScope}
                    containerElement={<Link to="" />}
                    icon={<SvgiPlus />}
                  />
                  <RaisedButton
                    label="Cancel"
                    className="buttonStyle"
                    containerElement={<Link to="/Schedule" />}
                    icon={<SvgiCancel />}
                  />
                </div>
                <br className="clear" />
              </h3>
            </Row>
            <ReactTable
              className="fixed-table -striped -highlight scrollbarSpace"
              data={_.filter(selectedMaterialsList, ['excluded', false])}
              pageSize={_.filter(selectedMaterialsList, ['excluded', false]).length}
              showPagination={false}
              columns={selectedMaterialsTable}
              {...tableOptions}
              noDataText={isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
            />
          </div>
          <div className="padding-vertical">
            <Row className="padding">
              <Col xs={12} md={12} className="no-padding">
                <h3><span>List of Materials</span>
                  <div className="titleButtons text-right">
                    <RaisedButton
                      label="Add Materials"
                      className="buttonStyle"
                      onTouchTap={this.addMaterialsToSelectedList}
                      icon={<SvgiPlus />}
                    />
                  </div>
                  <br className="clear" />
                </h3>
              </Col>
              <Col xs={12} md={12} className="text-right margin-top">
                <a
                  className="alerthideShowToggle margin-right"
                  data-toggle="collapse"
                  data-target="#intro"
                  onClick={this.changeFilterName}
                >
                  <i
                    className={
                      filtershown === true
                        ? 'fa fa-minus-square-o'
                        : 'fa fa-plus-square-o'
                    }
                    aria-hidden="true"
                  />
                  {' '}
                  {filtershown === true ? 'Hide' : 'Show'} Filter Options
                </a>
              </Col>
            </Row>
            <FilterOption
              TextBoxName={'Search By Material Description'}
              filter={this.filterMaterials}
              clear={this.clearFilter}
            />
            <ReactTable
              getTrProps={(state, rowInfo, column) => ({
                style: {
                  background: rowInfo.original.isDeleted ? '#f2dede' : ''
                }
              })}
              className="fixed-table -striped -highlight scrollbarSpace"
              data={_.filter(filteredMaterialsList, { isAdded: false })}
              columns={materialsTable}
              defaultPageSize={2}
              noDataText={isMaterialLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
              {...this.state.tableOptions}
              pageSize={_.filter(filteredMaterialsList, { isAdded: false }).length}
            />
            <Snackbar
              className="notificationBox"
              open={showSnackBar}
              message="Scope Modified Successfully"
              autoHideDuration={4000}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { scheduleManager: state.scheduleManager, login: state.login };
}

export default connect(mapStateToProps)(ModifyScope);
