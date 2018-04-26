import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import _map from 'lodash/map';
import _drop from 'lodash/drop';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isEqual';
import _lowerCase from 'lodash/lowerCase';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import ReactSuperSelect from 'react-super-select';
import Snackbar from 'material-ui/Snackbar';
import {
  getUploadMetricDetailById,
  updatecurrentModifyMetricDataList,
  filterUploadedMetricList,
  resetUploadedMetricFilter,
  modifyDescription,
  modifyStartDate,
  modifyEndDate,
  updateUploadMetric,
  updateMetricData,
  removeMetricData,
  updateSitePlantMaintenanceData,
  removeSitePlantMaintenanceData,
  resetUploadMetricData,
  getAllMetric,
  getAllMetricIncludes,
  updateMetricsinclude
} from '../../../actions/UploadManagerActions';
import FilterOption from '../../Schedule/FilterOption';
import { uploadMetricHomeColumns, metricTypeForUpload, metricTypeForUploadDb } from '../../../constants/UploadMetricConstants';
import './ModifyUploadMetric.scss';
import { SvgiDownload, SvgiCancel } from '../../SVGIcons';
import ErrorDialog from '../../../shared/error-dialog';
import ReactTableCustom from '../../Grid/ReactTableCustom';
import { DayPickerField } from '../../FormInputs/';

class ModifyUploadMetric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      isMaterialListLoding: false,
      recordId: '',
      material: '',
      filtershown: false,
      showErrorModal: false,
      showSnackBar: false,
      successText: '',
      selectKeepDropDownOpen: true,
      isUpdate: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetric());
    this.props.dispatch(resetUploadMetricData());
    this.props.dispatch(getUploadMetricDetailById(this.props.params.metricId));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  filterUploadedMetric = (recordId, material) => {
    this.props.dispatch(
      filterUploadedMetricList(
        recordId, material
      )
    );
  }

  clearFilter = () => {
    this.props.dispatch(resetUploadedMetricFilter());
  }

  changeFilterName = () => {
    this.setState({ filtershown: !this.state.filtershown });
  }

  updateDescriptionText = event => {
    this.props.dispatch(modifyDescription(event.target.value));
    this.setState({ isUpdate: true });
  }

  updateStartDate = date => {
    this.props.dispatch(modifyStartDate(date));
    this.setState({ isUpdate: true });
  }

  updateEndDate = date => {
    this.props.dispatch(modifyEndDate(date));
    this.setState({ isUpdate: true });
  }

  updateMetricsCheckBox = (value) => {
    this.props.dispatch(updateMetricsinclude(value));
    this.setState({ isUpdate: true });
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

  updateUploadMetricData = () => {
    const { currentModifyMetric } = this.props.uploadManager;
    const { startDate, endDate } = currentModifyMetric[0];
    const { userId } = this.props.login.userInfo;
    const errorText = [];
    const currentMetricPlan = Object.assign({},
      this.props.uploadManager.currentModifyMetric[0], { updateBy: userId });
    const updatedStartDate = new Date(moment(startDate).format('YYYY-MM-DD'));
    const updatedEndDate = new Date(moment(endDate).format('YYYY-MM-DD'));
    const uploadStartDate = document.getElementById('startDate').value;
    const uploadEndDate = document.getElementById('endDate').value;

    if (startDate === null || startDate === '' || !this.validateMonth(uploadStartDate)) {
      errorText.push('Start Date is Invalid');
    }
    if (endDate === null || endDate === '' || !this.validateMonth(uploadEndDate)) {
      errorText.push('End Date is Invalid');
    } else if (updatedStartDate > updatedEndDate) {
      errorText.push('Enter End-Date must be greater than Start-Date');
    }

    if (errorText.length > 0) {
      this.setState({ showErrorModal: true, uploadMetricErrorText: errorText.join() });
    } else {
      this.props.dispatch(updateUploadMetric(currentMetricPlan));
      this.setState({
        uploadMetricErrorText: '',
        showErrorModal: false,
        showSnackBar: true,
        isUpdate: false,
        successText: 'Upload Metric Modified Successfully'
      });
      setTimeout(() => {
        this.setState({ showSnackBar: false, successText: '' });
      }, 4000);
    }
  }

  updateMetricDataListItem = data => {
    const { uploadTableName } = this.props.uploadManager.currentModifyMetric[0];
    if (uploadTableName === 'T_COM_UPL_MD_SitePlantMaintenance') {
      this.props.dispatch(updateSitePlantMaintenanceData(data));
    } else {
      this.props.dispatch(updateMetricData(data));
    }
    this.setState({ showSnackBar: true, successText: 'Upload Metric Data Modified Successfully' });
    setTimeout(() => {
      this.setState({ showSnackBar: false, successText: '' });
    }, 4000);
  }

  deleteSingleMetricData = data => {
    const { uploadManager, login, params } = this.props;
    const { uploadTableName } = uploadManager.currentModifyMetric[0];
    const dataRecordId = (data.recordId) ? data.recordId : data.dataRecordId;
    const requiredData = { recordId: dataRecordId, metricId: params.metricId, updateBy: login.userInfo.userId };
    if (uploadTableName === 'T_COM_UPL_MD_SitePlantMaintenance') {
      this.props.dispatch(removeSitePlantMaintenanceData(requiredData));
    } else {
      this.props.dispatch(removeMetricData(requiredData));
    }
    this.setState({ showSnackBar: true, successText: 'Upload Metric Data Removed Successfully' });
    setTimeout(() => {
      this.setState({ showSnackBar: false, successText: '' });
    }, 4000);
  }

  closeErrorModal = value => {
    this.setState({ showErrorModal: false });
  }

  closeSnakBar() {
    this.setState({ ShowSnackBar: false, SnackBarMessage: '' });
  }

  renderEditable = cellInfo =>
    <TextField
      className="DescriptionTextfeild"
      style={{ height: '30px' }}
      value={cellInfo.value}
      onChange={(e) => {
        const data = this.props.uploadManager.filteredUploadedMetricList;
        const propertyName = cellInfo.column.id;
        data[cellInfo.index][propertyName] = e.target.value;
        this.props.dispatch(updatecurrentModifyMetricDataList(data, cellInfo.original.dataRecordId));
      }}
    />

  render() {
    const { isLoading, currentModifyMetric } = this.props.uploadManager;
    const { uploadTableName, startDate, endDate } = currentModifyMetric[0];
    const columns = [
      {
        Header: 'Actions',
        accessor: '',
        width: 110,
        Cell: row => (
          <div>
            <IconButton
              tooltip="Update"
              onClick={() => this.updateUploadMetricData()}
              disabled={!this.state.isUpdate}
            >
              <FontIcon className="fa fa-check" />
            </IconButton>
          </div>
        )
      }
    ];
    const editableColumn = [
      {
        Header: 'Start Date',
        accessor: 'startDate',
        maxWidth: 110,
        Cell: row => (
          <DayPickerField
            onDisabled={false}
            onModifyDate={this.updateStartDate}
            dateValue={startDate}
            id={'startDate'}
          />
        )
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        maxWidth: 110,
        Cell: row => (
          <DayPickerField
            onDisabled={false}
            onModifyDate={this.updateEndDate}
            dateValue={endDate}
            id={'endDate'}
          />
        )
      },
      {
        Header: 'Upload Description',
        accessor: 'uploadDescription',
        maxWidth: 210,
        Cell: row => (
          <TextField
            className="DescriptionTextfeild"
            hintText="Description"
            value={row.value}
            onChange={this.updateDescriptionText}
            multiLine
            rows={2}
          />
        )
      },
      {
        Header: 'Metrics Included',
        accessor: 'metricsIncluded',
        minWidth: 200,
        className: 'metrcisIncluded',
        Cell: row => (
          <div>
            <ReactSuperSelect
              placeholder="Select Metrices"
              dataSource={row.value}
              optionValueKey="metricId"
              optionLabelKey="metricName"
              clearable={false}
              className="selectedMetrics"
              initialValue={_filter(row.value, ['checked', true])}
              multiple
              keepOpenOnSelection={this.state.selectKeepDropDownOpen}
              onChange={this.updateMetricsCheckBox}
            />
          </div>
        )
      }
    ];
    _map(uploadMetricHomeColumns, column => {
      let item = column;
      if (item.Cell && item.Cell === 'date') {
        item.Cell = row => (
          moment(row.value).utc().format('DD-MM-YYYY')
        );
      } else if (column.isEditColumn) {
        item = _filter(editableColumn, o => o.Header === column.Header)[0];
      }
      columns.push(item);
    });

    const excelHeaderColumnsObj = _filter(metricTypeForUploadDb, item => item.id === uploadTableName)[0];
    const metricDataColumns = [
      {
        Header: 'Actions',
        accessor: '',
        width: 110,
        Cell: row => (
          <div>
            <IconButton
              tooltip="Update"
              disabled={!row.original.isUpdate}
              onClick={() => this.updateMetricDataListItem(row.original)}
            >
              <FontIcon className="fa fa-check" />
            </IconButton>
            <IconButton
              tooltip="Delete"
              onClick={() => this.deleteSingleMetricData(row.original)}
            >
              <FontIcon className="fa fa-minus-circle" />
            </IconButton>
          </div>
        )
      }
    ];
    if (excelHeaderColumnsObj && excelHeaderColumnsObj.columns) {
      _map(excelHeaderColumnsObj.columns, colItem => {
        const columnItem = colItem;
        if (columnItem.isEditColumn) {
          columnItem.Cell = this.renderEditable;
        }
        metricDataColumns.push(columnItem);
      });
    }
    return (
      <div className="box box-primary">
        <ErrorDialog
          errorText={this.state.uploadMetricErrorText}
          showErrorModal={this.state.showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />

        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>Modify Upload Data</p>
        </Row>
        <ReactTable
          className="fixed-table -striped -highlight scrollbarSpace"
          columns={columns}
          data={this.props.uploadManager.currentModifyMetric}
          defaultPageSize={1}
          noDataText="No data Found!"
          showPagination={false}
        />
        <div className="padding-vertical">
          <Row className="padding">
            <Col xs={12} md={4} className="np-left">
              <h3>Preview</h3>
            </Col>
            <Col xs={12} md={8} className="text-right filter-placement">
              <a
                className="alerthideShowToggle margin-right"
                data-toggle="collapse"
                data-target="#intro"
                onClick={this.changeFilterName}
              >
                <i
                  className={
                    this.state.filtershown === true
                      ? 'fa fa-minus-square-o'
                      : 'fa fa-plus-square-o'
                  }
                  aria-hidden="true"
                />
                {' '}
                {this.state.filtershown === true ? 'Hide' : 'Show'} Filter Options
              </a>
            </Col>
          </Row>
          <FilterOption
            TextBoxName={'Search By Record ID'}
            filter={this.filterUploadedMetric}
            clear={this.clearFilter}
          />
          <ReactTableCustom
            className="fixed-table -striped -highlight"
            data={this.props.uploadManager.filteredUploadedMetricList}
            columns={metricDataColumns}
            nodata={isLoading}
            pageSize={4}
          />
        </div>
        <Row className="show-grid padding-top">
          <Col xs={12} md={12} className="text-center">
            <RaisedButton
              label="Back"
              className="table-button"
              containerElement={<Link to="/UploadMetric" />}
              icon={<SvgiCancel />}
            />
          </Col>
        </Row>
        <Snackbar
          className="notificationBox"
          open={this.state.showSnackBar}
          message={this.state.successText}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { uploadManager: state.uploadManager, login: state.login };
}

export default connect(mapStateToProps)(ModifyUploadMetric);
