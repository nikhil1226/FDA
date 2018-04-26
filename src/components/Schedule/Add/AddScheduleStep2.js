import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import _omit from 'lodash/omit';
import _pick from 'lodash/pick';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Snackbar from 'material-ui/Snackbar';
import {
  getAllSiteProducts,
  updateProductListItemCheckBox,
  updateAllProductsListItemCheckbox,
  addProductsToSlectedList,
  modifyStartDate,
  modifyEndDate,
  updateSchduleDescription,
  deleteProductFromSelectedList,
  filterProducts,
  resetProductFilter,
  submitSchedule,
  updateMetricsListCheckBox
} from '../../../actions/ScheduleManagerActions';
import ErrorDialog from '../../../shared/error-dialog';
import ScheduleEditGrid from '../../Grid/ScheduleEditGrid';
import ScheduleProductGrid from '../../Grid/ScheduleProductGrid';
import './AddScheduleStep2.scss';

class AddScheduleStep2 extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      allSelected: false,
      showSnackBar: false,
      disable: false,
      showErrorModal: false,
      scheduleErrorText: ''
    };
  }

  componentWillMount() {
    const { siteId } = this.props.scheduleManager.currentSchedule[0];
    this.props.dispatch(getAllSiteProducts(siteId));
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
    if (document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].scrollHeight > document.getElementsByClassName('ListofProducts')[0].getElementsByClassName('rt-tbody')[0].clientHeight) {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
      document.getElementsByClassName('ListofProducts')[0].className += ' scrollbarSpace';
    } else {
      document.getElementsByClassName('ListofProducts')[0].classList.remove('scrollbarSpace');
    }
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

  handleAllProductsSelectChange = () => {
    this.setState({ allSelected: !this.state.allSelected });
    this.props.dispatch(
      updateAllProductsListItemCheckbox(!this.state.allSelected)
    );
  }

  updateMetricsListCheckBox = (id) => {
    this.props.dispatch(
      updateMetricsListCheckBox(
        id
      )
    );
  }

  handleProductSelectChange = (row) => {
    this.props.dispatch(
      updateProductListItemCheckBox(
        row.productPk
      )
    );
  }

  addProductsToSelectedList = () => {
    this.setState({ allSelected: false });
    this.props.dispatch(
      addProductsToSlectedList()
    );
  }

  redirectHomePage = () => {
    this.context.router.push('/Schedule');
  }

  deleteProduct = (row) => {
    this.props.dispatch(deleteProductFromSelectedList(row.productPk));
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

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
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

  saveSchedule = () => {
    let currentSchedule = Object.assign({}, this.props.scheduleManager.currentSchedule[0]);
    currentSchedule.createdBy = this.props.login.userInfo.userId;
    currentSchedule.products = _map(this.props.scheduleManager.selectedProductsList, o => _pick(o, ['productId', 'subProductId', 'excluded', 'comments']));
    currentSchedule.metricsIncluded = _map(_filter(currentSchedule.metricsIncluded, ['checked', true]), 'metricId');
    currentSchedule = _omit(currentSchedule, ['bu', 'dunsNumber', 'plantCode', 'region', 'feiNumber', 'technology']);
    this.validateSchedule(currentSchedule);
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
    } else if (moment(currentStartDate).isBefore(today)) {
      errorText.push('Enter New Date');
    }
    if (!this.validateMonth(scheduleEndDate)) {
      errorText.push('End Date is Invalid');
    } else if (moment(currentEndDate).isBefore(today)) {
      errorText.push('Enter New Date');
    } else if (currentStartDate > currentEndDate) {
      errorText.push('Enter End-Date must be greater than Start-Date');
    }
    if (currentSchedule.products.length === 0) {
      errorText.push('Please select atleast one product');
    }
    if (currentSchedule.metricsIncluded.length === 0) {
      errorText.push('Please select atleast one Metrices');
    }
    if (currentSchedule.description === '') {
      errorText.push('Schedule Description cannot be Empty');
    }

    if (errorText.length > 0) {
      this.setState({ scheduleErrorText: errorText.join(), showErrorModal: true });
    } else {
      this.setState({ scheduleErrorText: '', showErrorModal: false });
      const saveData = Object.assign({}, currentSchedule,
        { startDate: currentStartDate, endDate: currentEndDate });
      this.props.dispatch(submitSchedule(saveData));
      this.setState({
        showSnackBar: true
      });
      setTimeout(() => {
        this.context.router.push('/Schedule');
      }, 2000);
    }
  }

  render() {
    const { selectedProductsList, filteredProductList, currentSchedule, isLoading } = this.props.scheduleManager;
    const StepSecondView = (
      <div className="padding modifyScheduleWrap">
        <ScheduleEditGrid
          pageTitle={'Create Schedule'}
          scheduleData={this.props.scheduleManager.currentSchedule}
          isLoading={this.props.scheduleManager.isLoading}
          onUpdateDescriptionText={this.updateDescriptionText}
          onModifyStartDate={this.modifyStartDate}
          onModifyEndDate={this.modifyEndDate}
          onUpdateMetricsInclude={this.updateMetricsListCheckBox}
        />

        <div className="padding-vertical">
          <ScheduleProductGrid
            slectedProducts={_filter(selectedProductsList, (o) => o.excluded !== true)}
            listProducts={_filter(filteredProductList, (o) => o.isAdded === false)}
            isReadOnly={false}
            onDeleteProduct={this.deleteProduct}
            onStatus={currentSchedule[0].status}
            onAllPoductsSelectChange={this.handleAllProductsSelectChange}
            onAllChecked={this.state.allSelected}
            onDisabled={this.state.disable}
            onHandleProductSelectChange={this.handleProductSelectChange}
            onSaveSchedule={this.saveSchedule}
            onSaveScheduleLabel={'Save Schedule'}
            onAddProductsToSelectedList={this.addProductsToSelectedList}
            onRedirectHomePage={this.redirectHomePage}
            onFilterProducts={this.filterProducts}
            onClearProducts={this.clearFilter}
            onCancelBtnLabel={'Cancel'}
          />

          <Snackbar
            className="notificationBox"
            open={this.state.showSnackBar}
            message="Schedule added successfully"
            autoHideDuration={4000}
          />
        </div>
      </div>
    );
    return (
      <div className="box box-primary CreateSchdule">
        <ErrorDialog
          errorText={this.state.scheduleErrorText}
          showErrorModal={this.state.showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />
        {StepSecondView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { scheduleManager: state.scheduleManager, login: state.login };
}

export default connect(mapStateToProps)(AddScheduleStep2);
