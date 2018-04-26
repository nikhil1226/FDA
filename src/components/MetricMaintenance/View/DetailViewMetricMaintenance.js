import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import ReactLoading from 'react-loading';
import ReactTableCustom from '../../Grid/ReactTableCustom';

import {
  resetPopulateData,
  getMetricById,
  getPopulateScopeById,
  getPopulateAcceptanceById,
  getPopulateNTRSById,
  getPopulateIOORSById,
  getPopulatePQCById,
  getPopulateTDUDById,
  getPopulateBatchMaintenanceById,
  getCommentByMetricID,
  searchScope,
  searchLotsAcceptanceRate,
  searchNtrsInfo,
  searchIoorsInfo,
  searchProductQuality,
  searchBatchMaintenance,
  serachDosageUnit,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricMaintenanceManagerActions';

import './ViewMetricMaintenance.scss';
import { SvgiTick, SvgiCancel } from '../../SVGIcons';
import {
  columns, scopeColumns, larColumns, ntrsColumns, ioorsDataColumns, pqcColumns,
  ndudColumns, bMaintenanceColumns, nrsTestModalColumns1, nrsTestModalColumns2
} from '../../../constants/MetricMaintenanceModifyConstants';
import ReportSearch from '../../Search/ReportSearch';
import ModifyMetricBottom from '../../ModifyMetricBottom/viewMetricBottom';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';

class DetailViewMetricMaintenance extends React.Component {
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
      testsArray: [],
      open: false,
      showLinkedScheduleModal: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getMetricById(this.props.params.metricId));
    this.props.dispatch(getPopulateScopeById(this.props.params.metricId));
    this.props.dispatch(getPopulateAcceptanceById(this.props.params.metricId));
    this.props.dispatch(getPopulateNTRSById(this.props.params.metricId));
    this.props.dispatch(getPopulateIOORSById(this.props.params.metricId));
    this.props.dispatch(getPopulatePQCById(this.props.params.metricId));
    this.props.dispatch(getPopulateTDUDById(this.props.params.metricId));
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
  closeSubmitModal = (value) => {
    this.setState({ showModal: false, successComment: '' });
  };

  handleSelect = key => {
    this.setState({ key });
  }
  searchScope = value => {
    if (value) {
      this.props.dispatch(searchScope(value));
    }
  }

  searchLotsAcceptance = value => {
    if (value) {
      this.props.dispatch(searchLotsAcceptanceRate(value));
    }
  }
  searchNtrsInfo = value => {
    if (value) {
      this.props.dispatch(searchNtrsInfo(value));
    }
  }
  searchIoorsInfo = value => {
    if (value) {
      this.props.dispatch(searchIoorsInfo(value));
    }
  }

  searchProductQuality = value => {
    if (value) {
      this.props.dispatch(searchProductQuality(value));
    }
  }
  searchBatchMaintenance = value => {
    if (value) {
      this.props.dispatch(searchBatchMaintenance(value));
    }
  }
  serachDosageUnit = value => {
    if (value) {
      this.props.dispatch(serachDosageUnit(value));
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
      currentMetric, scopeInfo, acceptanceInfo, NTRSInfo, IOORSInfo, PQCInfo, TDUDInfo, batchMaintentanceInfo,
      isLoading, commentsInfo, isScopeInfoLoding, isAcceptanceInfoLoding, isNTRSInfoLoding, isIOORSInfoLoding,
      isPQCInfoLoding, isTDUDInfoLoding, isBatchMaintentanceInfoLoding, metricLinkedScheduleList
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

    const detailLarTabColumns = [];
    _map(larColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'date') {
          item.Cell = row => (
            <div> {(row.value) ? moment(row.value).utc().format('DD-MMM-YYYY') : ''} </div>
          );
        }

        if (item.Cell === 'tickIcon') {
          item.Cell = row => (
            <div
              className="TickGrid"
            >
              { row.value === 'checked' && <SvgiTick /> }
            </div>
          );
        }
      }
      if (item.accessor !== 'qAStatus' && item.accessor !== 'localAnalysisDate' &&
          item.accessor !== 'usageDecisionCode' && item.accessor !== 'usageDecisionDate') {
        detailLarTabColumns.push(item);
      } else if ((item.accessor === 'qAStatus' || item.accessor === 'localAnalysisDate') &&
          acceptanceInfo.length && acceptanceInfo[0].divsion === 'PH') {
        detailLarTabColumns.push(item);
      } else if ((item.accessor === 'usageDecisionCode' || item.accessor === 'usageDecisionDate') &&
          acceptanceInfo.length && acceptanceInfo[0].divsion === 'SZ') {
        detailLarTabColumns.push(item);
      }
    });

    const detailNtrsTabColumns = _map(ntrsColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'onClick') {
          item.Cell = row => (
            <div onClick={() => this.setState({ showModal: !this.state.showModal })}>
              {row.value}
            </div>
          );
        }
      }
      return item;
    });

    const detailIOORSTabColumns = [];
    _map(ioorsDataColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'tickIcon') {
          item.Cell = row => (
            <div
              className="TickGrid"
            >
              { row.value === 'checked' && <SvgiTick /> }
            </div>
          );
        }
      }
      if (item.accessor !== 'recordSubType') {
        detailIOORSTabColumns.push(item);
      } else if (item.accessor === 'recordSubType' && IOORSInfo.length && IOORSInfo[0].divsion === 'PH') {
        detailIOORSTabColumns.push(item);
      }
    });

    const deatailBTabMaintenanceColumns = _map(bMaintenanceColumns, col => {
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

    const detailPQCTabColumns = [];
    _map(pqcColumns, col => {
      if (col.accessor !== 'entity' && col.accessor !== 'divisionArea' && col.accessor !== 'recordSubType') {
        detailPQCTabColumns.push(col);
      } else if ((col.accessor === 'entity' || col.accessor === 'recordSubType') &&
          PQCInfo.length && PQCInfo[0].divsion === 'PH') {
        detailPQCTabColumns.push(col);
      } else if (col.accessor === 'divisionArea' && PQCInfo.length && PQCInfo[0].divsion === 'SZ') {
        detailPQCTabColumns.push(col);
      }
    });

    const detailTDUDTabColumns = _map(ndudColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'date') {
          item.Cell = row => (
            <div>{(row.value) ? moment(row.value).utc().format('DD-MMM-YYYY') : ''}</div>
          );
        }
      }
      return item;
    });

    const stepSecondView = (
      <div className="padding modifyScheduleWrap">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>View Metric Report (Detail)</p>
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
            <Tab eventKey={2} title="Lots Acceptance Rate">
              <ReportSearch
                isMaterialNumber={1}
                isBatchNumber={1}
                submit={this.searchLotsAcceptance}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={acceptanceInfo}
                  nodata={isAcceptanceInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={detailLarTabColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={3} title="Number of tests for lot release &amp; stability">
              <ReportSearch
                isMaterialNumber={1}
                isBatchNumber={1}
                submit={this.searchNtrsInfo}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={NTRSInfo}
                  pageSize={4}
                  nodata={isNTRSInfoLoding}
                  showPagination={false}
                  columns={detailNtrsTabColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={4} title="IOORS Data #OOS (Results / Invalidated)">
              <ReportSearch
                isMaterialNumber={1}
                isBatchNumber={1}
                submit={this.searchIoorsInfo}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={IOORSInfo}
                  nodata={isIOORSInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={detailIOORSTabColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={5} title="Product Quality Complaints">
              <ReportSearch
                isMaterialNumber={1}
                isBatchNumber={1}
                submit={this.searchProductQuality}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={PQCInfo}
                  nodata={isPQCInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={detailPQCTabColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={6} title="Total Number of Dosage Units &amp; Total Dosage Units Distributed">
              <ReportSearch
                isMaterialNumber={1}
                submit={this.serachDosageUnit}
              />
              <div>
                <ReactTableCustom
                  className="table-schedule -striped -highlight"
                  data={TDUDInfo}
                  nodata={isTDUDInfoLoding}
                  pageSize={4}
                  showPagination={false}
                  columns={detailTDUDTabColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
            <Tab eventKey={7} title="Batch Maintenance">
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
                  columns={deatailBTabMaintenanceColumns}
                  {...this.state.tableOptions}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        <ModifyMetricBottom
          loc={this.props.location}
          open={this.state.open}
          setOpen={this.setOpen}
          commentsList={commentsInfo}
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

        <Modal
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
          show={this.state.showModal}
          onHide={this.closeSubmitModal}
        >
          <Modal.Header>
            <Modal.Title
              aria-labelledby="contained-modal-title-sm"
              className="text-center"
            >
              <h1>NUMBER OF RELEASE AND STABILITY TEST</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="margin-bottom">
              <ReactTableCustom
                className="table-schedule -striped -highlight"
                data={this.state.testsArray}
                pageSize={4}
                showPagination={false}
                columns={nrsTestModalColumns1}
                {...this.state.tableOptions}
              />
            </div>
            <div className="margin-bottom">
              <ReactTableCustom
                className="table-schedule -striped -highlight"
                data={this.state.testsArray}
                pageSize={4}
                showPagination={false}
                columns={nrsTestModalColumns2}
                {...this.state.tableOptions}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Back"
              onTouchTap={this.closeSubmitModal}
              icon={<SvgiCancel />}
            />
          </Modal.Footer>
        </Modal>
        {stepSecondView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricMaintenanceManager: state.metricMaintenanceManager };
}

export default connect(mapStateToProps)(DetailViewMetricMaintenance);
