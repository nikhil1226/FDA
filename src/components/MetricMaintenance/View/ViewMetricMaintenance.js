import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ReactLoading from 'react-loading';

import {
  resetPopulateData,
  getMetricById,
  getPopulateScopeById,
  getPopulateBatchMaintenanceById,
  getCommentByMetricID,
  searchBatchMaintenance,
  searchScope,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricMaintenanceManagerActions';
import { SvgiCancel } from '../../SVGIcons';
import {
  columns,
  scopeColumns,
  bMaintenanceColumns
} from '../../../constants/MetricMaintenanceModifyConstants';
import ReportSearch from '../../Search/ReportSearch';
import ModifyMetricBottom from '../../ModifyMetricBottom/viewMetricBottom';
import ReactTableCustom from '../../Grid/ReactTableCustom';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';

import './ViewMetricMaintenance.scss';

class ViewMetricMaintenance extends React.Component {
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
        sortable: false,
        resizable: true
      },
      disable: true,
      key: 1,
      open: false,
      showLinkedScheduleModal: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getMetricById(this.props.params.metricId));
    this.props.dispatch(getPopulateScopeById(this.props.params.metricId));
    this.props.dispatch(getPopulateBatchMaintenanceById(this.props.params.metricId));
    this.props.dispatch(getCommentByMetricID(this.props.params.metricId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metricMaintenanceManager.isShowLinkedScheduleList) {
      this.setState({ showLinkedScheduleModal: true });
    }
  }

  setOpen = (open) => {
    this.setState({ open: !open });
  }

  handleSelect = key => {
    this.setState({ key });
  }

  searchBatchMaintenance = value => {
    if (value) {
      this.props.dispatch(searchBatchMaintenance(value));
    }
  }

  searchScope = value => {
    if (value) {
      this.props.dispatch(searchScope(value));
    }
  }

  redirectHomePage = () => {
    const pathArr = this.props.location.pathname.split('/').filter(Boolean);
    if (pathArr[0] === 'MetricReportReview') {
      this.context.router.push('/MetricReportReview');
    } else {
      this.context.router.push('/MetricMaintenance');
    }
  }

  handleViewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  render() {
    const {
      currentMetric, scopeInfo, batchMaintentanceInfo, isLoading, isScopeInfoLoding,
      isBatchMaintentanceInfoLoding, commentsInfo, metricLinkedScheduleList
    } = this.props.metricMaintenanceManager;

    const metricColumns = _map(columns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'date') {
          item.Cell = row => (
            <div> {(row.value) ? moment(row.value).utc().format('DD-MMM-YYYY') : ''} </div>
          );
        }
      }
      if (item.accessor === 'scheduleId') {
        item.Cell = row => (
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => this.handleViewSchedule(row.original.metricesId)}
          >
            {row.value && 'Linked Schedule'}
          </span>
        );
      }
      return item;
    });

    const viewbTabMaintenanceColumns = _map(bMaintenanceColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'checkBox') {
          item.Cell = row => (
            <div>
              { row.value && <Checkbox
                className="gridCheckbox"
                disabled={this.state.disable}
                checked={row.original[`KPIRecordID${row.value}Active`]}
              />}
            </div>
          );
        }
      }
      return item;
    });

    const stepSecondView = (
      <div className="padding modifyScheduleWrap viewMetricWrap">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>View Metric Report (Summary)</p>
        </Row>
        <ReactTable
          className="table-schedule -striped -highlight modifyMetricTopGrid"
          data={currentMetric}
          pageSize={currentMetric.length}
          noDataText={isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
          showPagination={false}
          columns={metricColumns}
          {...this.state.tableOptions}
        />
        <div className="metricTabs">
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" className="padding np-left np-right">
            <Tab eventKey={1} title="Scope">
              <ReportSearch
                isMaterialNumber={1}
                isReportQuarter={1}
                submit={this.searchScope}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={scopeInfo}
                  nodata={isScopeInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={scopeColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={7} title="Batch Summary">
              <ReportSearch
                isMaterialNumber={1}
                isBatchNumber={1}
                submit={this.searchBatchMaintenance}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={batchMaintentanceInfo}
                  nodata={isBatchMaintentanceInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={viewbTabMaintenanceColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <ModifyMetricBottom
          open={this.state.open}
          setOpen={this.setOpen}
          loc={this.props.location}
          metricID={this.props.params.metricId}
          commentsList={commentsInfo}
          saveDraft="false"
        />
        <Row className="show-grid padding-top">
          <Col xs={12} md={12} className="text-center">
            <RaisedButton
              label="Back"
              className="table-button"
              onClick={this.redirectHomePage}
              icon={<SvgiCancel />}
            />
          </Col>
        </Row>
      </div>
    );
    return (
      <div className="box box-primary CreateSchdule">
        <LinkedScheduleModel
          onShowModel={this.state.showLinkedScheduleModal}
          onCloseModel={this.closeLinkedScheduleModal}
          dataInfo={metricLinkedScheduleList}
        />
        {stepSecondView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricMaintenanceManager: state.metricMaintenanceManager };
}

export default connect(mapStateToProps)(ViewMetricMaintenance);
