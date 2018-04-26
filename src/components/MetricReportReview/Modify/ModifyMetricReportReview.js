import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import ReactLoading from 'react-loading';

import {
  getMetricReportReviewById,
  getReportReviewPopulateScopeById,
  getReportReviewPopulateAcceptanceById,
  getReportReviewPopulateNTRSById,
  getReportReviewPopulateIOORSById,
  getReportReviewPopulatePQCById,
  getReportReviewPopulateTDUDById,
  getReportReviewPopulateBatchMaintenanceById,
  getReportReviewPopulateReportById,
  getReportReviewCommentByMetricId,
  saveReportReviewComment,
  searchScope,
  searchLotsAcceptanceRate,
  searchIoorsInfo,
  searchProductQuality,
  searchBatchMaintenance,
  serachDosageUnit,
  searchNtrsInfo,
  clearSearchValue,
  getLinkedSchedules,
  clearLinkedSchedules
} from '../../../actions/MetricReportReviewActions';

import './ModifyMetricReportReview.scss';
import {
  SvgiPlus, SvgiWorkflow, SvgiMinus, SvgiUpload, SvgiNotepad,
  SvgiTick, SvgiDownload, SvgiCancel
} from '../../SVGIcons';
import {
  columns, scopeColumns, larColumns, ntrsColumns, ioorsDataColumns, pqcColumns,
  ndudColumns, nrsTestModalColumns1, nrsTestModalColumns2
} from '../../../constants/MetricMaintenanceModifyConstants';
import ReportSearch from '../../Search/ReportSearch';
import BatchMaintenance from '../../BatchMaintenance/BatchMaintenance';
import ModifyMetricBottom from '../../ModifyMetricBottom/modifyMetricBottom';
import LinkedScheduleModel from '../../LinkedScheduleModel/linkedScheduleModel';


class ModifyMetricReportReview extends React.Component {
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
      showSnackBar: false,
      snackBarMessage: '',
      key: 1,
      testsArray: [],
      open: false,
      showLinkedScheduleModal: false
    };
  }

  componentWillMount() {
    const { metricId } = this.props.params;
    this.props.dispatch(getMetricReportReviewById(metricId));
    this.props.dispatch(getReportReviewPopulateScopeById(metricId));
    this.props.dispatch(getReportReviewPopulateAcceptanceById(metricId));
    this.props.dispatch(getReportReviewPopulateNTRSById(metricId));
    this.props.dispatch(getReportReviewPopulateIOORSById(metricId));
    this.props.dispatch(getReportReviewPopulatePQCById(metricId));
    this.props.dispatch(getReportReviewPopulateTDUDById(metricId));
    this.props.dispatch(getReportReviewPopulateBatchMaintenanceById(metricId));
    this.props.dispatch(getReportReviewCommentByMetricId(metricId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.metricReportReview.isShowLinkedScheduleList) {
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

  saveComment = value => {
    const data = {
      metricReportRecordId: this.props.params.metricId,
      comment: value.comment,
      userId: this.props.login.userInfo.userId,
      roleName: localStorage.getItem('roleName')
    };
    this.props.dispatch(saveReportReviewComment(data));
  }

  handleViewSchedule = metricesId => {
    this.props.dispatch(getLinkedSchedules(metricesId));
  }

  closeLinkedScheduleModal = () => {
    this.setState({ showLinkedScheduleModal: false });
    this.props.dispatch(clearLinkedSchedules());
  }

  renderLodingIcon = (loding) => {
    const result = loding
      ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" />
      : 'No data found!';
    return result;
  };

  render() {
    const {
      currentMetricReportReivew, scopeInfo, acceptanceInfo, NTRSInfo, IOORSInfo, PQCInfo, TDUDInfo,
      batchMaintentanceInfo, isLoading, metricReportCommentsInfo, isScopeInfoLoding, isAcceptanceInfoLoding,
      isNTRSInfoLoding, isIOORSInfoLoding, isPQCInfoLoding, isTDUDInfoLoding, isBatchMaintentanceInfoLoding,
      metricLinkedScheduleList
    } = this.props.metricReportReview;
    const metricColumns = _map(columns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'date') {
          item.Cell = row => (
            <div>{(row.value) ? moment(row.value).utc().format('DD-MMM-YYYY') : ''}</div>
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

    const larTabColumns = [];
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
        larTabColumns.push(item);
      } else if ((item.accessor === 'qAStatus' || item.accessor === 'localAnalysisDate') &&
          acceptanceInfo.length && acceptanceInfo[0].divsion === 'PH') {
        larTabColumns.push(item);
      } else if ((item.accessor === 'usageDecisionCode' || item.accessor === 'usageDecisionDate') &&
          acceptanceInfo.length && acceptanceInfo[0].divsion === 'SZ') {
        larTabColumns.push(item);
      }
    });

    const pqcTabColumns = [];
    _map(pqcColumns, col => {
      if (col.accessor !== 'entity' && col.accessor !== 'divisionArea' && col.accessor !== 'recordSubType') {
        pqcTabColumns.push(col);
      } else if ((col.accessor === 'entity' || col.accessor === 'recordSubType') &&
          PQCInfo.length && PQCInfo[0].divsion === 'PH') {
        pqcTabColumns.push(col);
      } else if (col.accessor === 'divisionArea' && PQCInfo.length && PQCInfo[0].divsion === 'SZ') {
        pqcTabColumns.push(col);
      }
    });

    const tdudTabColumns = _map(ndudColumns, col => {
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

    const ntrsTabColumns = _map(ntrsColumns, col => {
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

    const ioorsTabColumns = [];
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
        ioorsTabColumns.push(item);
      } else if (item.accessor === 'recordSubType' && IOORSInfo.length && IOORSInfo[0].divsion === 'PH') {
        ioorsTabColumns.push(item);
      }
    });

    const stepSecondView = (
      <div className="padding modifyScheduleWrap">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>Modify Metric Report 123</p>
        </Row>
        <ReactTable
          className="table-schedule -striped -highlight modifyMetricTopGrid"
          data={currentMetricReportReivew}
          pageSize={currentMetricReportReivew.length}
          noDataText={this.renderLodingIcon(isLoading)}
          showPagination={false}
          columns={metricColumns}
          {...this.state.tableOptions}
        />
        <div className="metricTabs">
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" className="padding">
            <Tab eventKey={1} title="Scope">
              { this.state.key === 1 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  isReportQuarter={1}
                  submit={this.searchScope}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={scopeInfo}
                    noDataText={this.renderLodingIcon(isScopeInfoLoding)}
                    pageSize={scopeInfo.length}
                    showPagination={false}
                    columns={scopeColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div> }
            </Tab>
            <Tab eventKey={2} title="Lots Acceptance Rate">
              { this.state.key === 2 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  isBatchNumber={1}
                  submit={this.searchLotsAcceptance}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={acceptanceInfo}
                    noDataText={this.renderLodingIcon(isAcceptanceInfoLoding)}
                    pageSize={acceptanceInfo.length}
                    showPagination={false}
                    columns={larTabColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div>}
            </Tab>
            <Tab eventKey={3} title="Number of Tests for Lot Release &amp; Stability">
              { this.state.key === 3 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  isBatchNumber={1}
                  submit={this.searchNtrsInfo}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={NTRSInfo}
                    pageSize={NTRSInfo.length}
                    noDataText={this.renderLodingIcon(isNTRSInfoLoding)}
                    showPagination={false}
                    columns={ntrsTabColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div> }
            </Tab>
            <Tab eventKey={4} title="IOOSR Data (Results or Invalidated)">
              { this.state.key === 4 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  isBatchNumber={1}
                  submit={this.searchIoorsInfo}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={IOORSInfo}
                    noDataText={this.renderLodingIcon(isIOORSInfoLoding)}
                    pageSize={IOORSInfo.length}
                    showPagination={false}
                    columns={ioorsTabColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div> }
            </Tab>
            <Tab eventKey={5} title="Product Quality Complaints">
              { this.state.key === 5 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  isBatchNumber={1}
                  submit={this.searchProductQuality}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={PQCInfo}
                    noDataText={this.renderLodingIcon(isPQCInfoLoding)}
                    pageSize={PQCInfo.length}
                    showPagination={false}
                    columns={pqcTabColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div> }
            </Tab>
            <Tab eventKey={6} title="Total Number of Dosage Units &amp; Total Dosage Units Distributed">
              { this.state.key === 6 && <div>
                <ReportSearch
                  isMaterialNumber={1}
                  submit={this.serachDosageUnit}
                />
                <div>
                  <ReactTable
                    className="table-schedule -striped -highlight"
                    data={TDUDInfo}
                    noDataText={this.renderLodingIcon(isTDUDInfoLoding)}
                    pageSize={TDUDInfo.length}
                    showPagination={false}
                    columns={tdudTabColumns}
                    {...this.state.tableOptions}
                  />
                </div>
              </div> }
            </Tab>
            <Tab eventKey={7} title="Batch Maintenance">
              { this.state.key === 7 && <div>
                <BatchMaintenance
                  dataInfo={batchMaintentanceInfo}
                  isBatchLoading={isBatchMaintentanceInfoLoding}
                  searchBM={this.searchBatchMaintenance}
                  isSaveChanges={false}
                />
              </div> }
            </Tab>
          </Tabs>
        </div>
        { localStorage.getItem('role') === 'GBR' && <ModifyMetricBottom
          open={this.state.open}
          setOpen={this.setOpen}
          onSaveComment={this.saveComment}
          saveDraft={!false}
          commentsList={metricReportCommentsInfo}
        /> }
        <Row className="show-grid padding-top">
          <Col xs={12} md={12} className="text-center">
            <RaisedButton
              label="Back"
              className="table-button"
              containerElement={<Link to="/MetricReportReview" />}
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
              <ReactTable
                className="table-schedule -striped -highlight"
                data={this.state.testsArray}
                pageSize={this.state.testsArray.length}
                showPagination={false}
                columns={nrsTestModalColumns1}
                {...this.state.tableOptions}
              />
            </div>
            <div className="margin-bottom">
              <ReactTable
                className="table-schedule -striped -highlight"
                data={this.state.testsArray}
                pageSize={this.state.testsArray.length}
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
        <Grid className="margin">
          <Row className="show-grid">
            <Col xs={12} md={6} className="text-right">
              <Snackbar
                className="notificationBox"
                open={this.state.showSnackBar}
                message="Metric Report Modified Successfully"
                autoHideDuration={4000}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricReportReview: state.metricReportReview, login: state.login };
}

export default connect(mapStateToProps)(ModifyMetricReportReview);
