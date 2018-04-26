import React from 'react';
import moment from 'moment';
import _toNumber from 'lodash/toNumber';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import _omit from 'lodash/omit';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Snackbar from 'material-ui/Snackbar';
import {
  getAllMetric,
  getAllSiteProducts,
  updateProductListItemCheckBox,
  updateAllProductsListItemCheckbox,
  addProductsToSlectedList,
  updateCurrentScheduleValues,
  getAllSite,
  setScheduleType,
  modifyStartDate,
  modifyEndDate,
  updateMetricsCheckBox,
  updateSchduleDescription,
  updateSelectedProductsCheckbox,
  deleteProductFromSelectedList,
  filterProducts,
  resetProductFilter,
  updateSchedule,
  updateMetricsInclude,
  getScheduleById,
  setRemoveProductComment,
  clearUpdateScheduleStatus,
  getBackSelectedProductList,
  requestLoading
} from '../../../actions/ScheduleManagerActions';
import './ModifySchedule.scss';
import ErrorDialog from '../../../shared/error-dialog';
import ScheduleEditGrid from '../../Grid/ScheduleEditGrid';
import ScheduleProductGrid from '../../Grid/ScheduleProductGrid';

class ModifySchedule extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      allSelected: false,
      descriptionErrorText: '',
      siteErrorText: '',
      sitePlanCordinatorErrorText: '',
      sitePlanReviewerErrorText: '',
      showSnackBarUpdate: false,
      showErrorModal: false,
      scheduleErrorText: '',
      filtershown: false,
      statusErrorModal: false,
      statusErrorModalMsg: '',
      updateScheduleStatus: 0,
      disable: false,
      selectKeepDropDownOpen: false
    };
  }

  componentWillMount() {
    const paramsIdArr = this.props.params.scheduleId.split('_');
    const siteId = paramsIdArr[1];
    this.props.dispatch(getAllMetric());
    this.props.dispatch(requestLoading());
    this.props.dispatch(getAllSiteProducts(siteId));
    setTimeout(() => {
      this.props.dispatch(getScheduleById(this.props.params.scheduleId, 'schedule'));
    }, 3500);
  }


  componentDidMount() {
    if (document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].scrollHeight > document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].clientHeight) {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
      document.getElementsByClassName('ListofProducts')[0].className += ' scrollbarSpace';
    } else {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isShowScheduleUpdateStatus, scheduleUpdateStatus } = nextProps.scheduleManager;
    if (document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].scrollHeight > document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].clientHeight) {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
      document.getElementsByClassName('ListofProducts')[0].className += ' scrollbarSpace';
    } else {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
    }

    if (isShowScheduleUpdateStatus) {
      if (_toNumber(scheduleUpdateStatus) === 9 || _toNumber(scheduleUpdateStatus) === 8) {
        const errMsg = _toNumber(scheduleUpdateStatus) === 9
        ? 'All products cannot be removed from the Schedule'
        : 'Products could not be removed as they are linked to Active Metric Reports. Other changes have been saved';
        this.setState({
          updateScheduleStatus: scheduleUpdateStatus,
          statusErrorModal: true,
          statusErrorModalMsg: errMsg
        });
      } else {
        this.setState({ showSnackBarUpdate: true });
        this.closeStatusErrorModal();
        setTimeout(() => {
          this.context.router.push('/Schedule');
        }, 2000);
      }
    }
  }

  setRemoveMaterialComment = (e, row) => {
    this.props.dispatch(setRemoveProductComment(e.target.value, row.productPk));
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

  updateMetricsListCheckBox = (value) => {
    this.props.dispatch(updateMetricsInclude(value));
  }

  handleProductSelectChange = (row) => {
    this.props.dispatch(
      updateProductListItemCheckBox(
        row.productPk
      )
    );
  }

  handleAllPoductsSelcteChange = () => {
    this.setState({ allSelected: !this.state.allSelected });
    this.props.dispatch(
      updateAllProductsListItemCheckbox(!this.state.allSelected)
    );
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  closeStatusErrorModal = value => {
    this.props.dispatch(clearUpdateScheduleStatus());
    if (this.state.updateScheduleStatus !== 0) {
      this.props.dispatch(getBackSelectedProductList());
    }
    this.setState({ statusErrorModal: false, updateScheduleStatus: 0 });
  }

  addProductsToSelectedList = () => {
    this.setState({ allSelected: false });
    this.props.dispatch(
      addProductsToSlectedList()
    );
  }

  deleteProduct = (row) => {
    this.props.dispatch(deleteProductFromSelectedList(row.productPk));
  }

  redirectHomePage = () => {
    this.context.router.push('/Schedule');
  }

  saveSchedule = () => {
    let currentSchedule = Object.assign({}, this.props.scheduleManager.currentSchedule[0]);
    currentSchedule.updateBy = this.props.login.userInfo.userId;
    currentSchedule.products = _map(this.props.scheduleManager.selectedProductsList, o => _pick(o, ['productId', 'subProductId', 'excluded', 'comments']));
    currentSchedule.metricsIncluded = _map(_filter(currentSchedule.metricsIncluded, ['checked', true]), 'metricId');
    currentSchedule = _omit(currentSchedule, ['bu', 'dunsNumber', 'plantCode', 'region', 'feiNumber', 'technology']);
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

  validateSchedule = (currentSchedule) => {
    const errorText = [];
    const today = moment().format('YYYY-MM-DD');
    const scheduleStartDate = document.getElementById('startDate').value;
    const scheduleEndDate = document.getElementById('endDate').value;
    const currentStartDate = new Date(moment(currentSchedule.startDate).format('YYYY-MM-DD'));
    const currentEndDate = new Date(moment(currentSchedule.endDate).format('YYYY-MM-DD'));

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
    if (currentSchedule.products.length === 0) {
      errorText.push('Please select atleast one product');
    }
    if (currentSchedule.metricsIncluded.length === 0) {
      // errorText.push('Please select atleast one Metrices');
    }
    if (currentSchedule.description === '') {
      errorText.push('Schedule Description cannot be Empty');
    }

    if (errorText.length > 0) {
      this.setState({ scheduleErrorText: errorText.join(), showErrorModal: true });
    } else {
      this.setState({ scheduleErrorText: '' });
      const updateData = Object.assign({}, currentSchedule,
        { startDate: currentStartDate, endDate: currentEndDate });
      this.props.dispatch(updateSchedule(updateData));
    }
  }

  filterProducts = (productName, brandName) => {
    this.props.dispatch(
      filterProducts(
        productName, brandName
      )
    );
  }

  clearFilter = () => {
    this.props.dispatch(resetProductFilter());
  }

  render() {
    const { selectedProductsList, filteredProductList, currentSchedule, isLoading } = this.props.scheduleManager;
    const {
      selectKeepDropDownOpen, allSelected, disable, showSnackBarUpdate,
      scheduleErrorText, showErrorModal, statusErrorModalMsg, statusErrorModal
     } = this.state;
    const stepSecondView = (
      <div className="padding modifyScheduleWrap">
        <ScheduleEditGrid
          pageTitle={'Modify Schedule'}
          scheduleData={currentSchedule}
          isLoading={isLoading}
          onDisable={false}
          onSelectKeepDropDownOpen={selectKeepDropDownOpen}
          onUpdateDescriptionText={this.updateDescriptionText}
          onModifyStartDate={this.modifyStartDate}
          onModifyEndDate={this.modifyEndDate}
          onUpdateMetricsInclude={this.updateMetricsListCheckBox}
        />

        <ScheduleProductGrid
          slectedProducts={_filter(selectedProductsList, (o) => o.excluded !== true)}
          listProducts={_filter(filteredProductList, (o) => o.isAdded === false)}
          isReadOnly={false}
          onSetRemoveMaterialComment={this.setRemoveMaterialComment}
          onDeleteProduct={this.deleteProduct}
          onStatus={currentSchedule[0].status}
          onAllPoductsSelectChange={this.handleAllPoductsSelcteChange}
          onAllChecked={allSelected}
          onDisabled={disable}
          onHandleProductSelectChange={this.handleProductSelectChange}
          onSaveSchedule={this.saveSchedule}
          onSaveScheduleLabel={'Update Schedule'}
          onAddProductsToSelectedList={this.addProductsToSelectedList}
          onRedirectHomePage={this.redirectHomePage}
          onFilterProducts={this.filterProducts}
          onClearProducts={this.clearFilter}
          onCancelBtnLabel={'Back'}
          isLoading={isLoading}
        />

        <Snackbar
          className="notificationBox"
          open={showSnackBarUpdate}
          message="Schedule Modified Successfully"
          autoHideDuration={4000}
        />
      </div>
    );

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
        {stepSecondView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { scheduleManager: state.scheduleManager, login: state.login };
}

export default connect(mapStateToProps)(ModifySchedule);
