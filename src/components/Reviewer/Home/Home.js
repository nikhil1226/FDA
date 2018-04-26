import React from 'react';
import moment from 'moment';
import _filter from 'lodash/filter';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _toNumber from 'lodash/toNumber';
import _replace from 'lodash/replace';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import ReactSuperSelect from 'react-super-select';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ErrorDialog from '../../../shared/error-dialog';
import {
  getAllMetricesReviewer,
  getAddRemoveGlobalReviewer,
  getAddRemoveSitePlanReviewer,
  getAddRemoveSiteQAReviewer,
  getAddRemoveSiteReviewer,
  clearShowPopupMsg,
  updateRoleModification,
  searchMetricReport
} from '../../../actions/ReviewerActions';
import './Home.scss';
import { SvgiTick, SvgiPlus } from '../../SVGIcons';
import ReviewerSearch from '../../Search/ReviewerSearch';
import { statusMesssage } from '../../../constants/reviewerStatusMessage';

class AddReviewer extends React.Component {
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
      submitStatus: [{
        id: 1,
        text: 'Site Plan Reviewer',
        statusString: 'sitePlanReviewerStatus',
        prcessString: 'Sent for Plan Approval',
        roleRecordId: '3'
      }, {
        id: 2,
        text: 'Site Reviewer',
        statusString: 'siteReviewerStatus',
        prcessString: 'For Site Approval',
        roleRecordId: '5'
      }, {
        id: 3,
        text: 'Site QA Reviewer',
        statusString: 'siteQAReviewerStatus',
        prcessString: 'For Site Approval',
        roleRecordId: '6'
      }, {
        id: 4,
        text: 'Global Reviewer',
        statusString: 'globalReviewerStatus',
        roleRecordId: '17'
      }],
      planReviewerList: [],
      siteReviewerList: [],
      siteQAReviewerList: [],
      globalReviewerList: [],
      processDataInfo: {},
      processType: 0,
      entryIndicator: 0,
      key: 1,
      showErrorModal: false,
      showModal: false,
      comments: '',
      showCommentsError: false,
      checkedList: { metricRecordId: '' }
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllMetricesReviewer());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviewers.isShowPopupMsg) {
      const { submitStatus, processType, processDataInfo } = this.state;
      const processObj = _find(submitStatus, ['id', processType]);
      const statusId = _toNumber(nextProps.reviewers[processObj.statusString]);
      if (statusId === 11) {
        const msg = _find(statusMesssage, ['id', statusId]).message;
        let successMsg = '';
        successMsg = _replace(msg, 'removeRoleString', processObj.text);
        successMsg = _replace(successMsg, 'removePrcessString', processObj.prcessString);
        this.setState({
          entryIndicator: statusId,
          showSuccessModal: true,
          successMessage: successMsg
        });
      } else if (statusId === 10 && processType === 1) {
        this.setState({
          entryIndicator: statusId,
          showSuccessModal: true,
          successMessage: 'There can be only one Site Plan Reviewer per Metric Report ID, if you want to proceed, the selected User would be added as the SitePlanReviewer. Do you wish to proceed?'
        });
      } else {
        const errMsg = _find(statusMesssage, ['id', statusId]).message;
        let errorMsg = '';
        errorMsg = _replace(errMsg, 'removeRoleString', processObj.text);
        errorMsg = _replace(errorMsg, 'removeUserId', processDataInfo.userId);
        this.setState({
          entryIndicator: statusId,
          showErrorModal: true,
          reviewerErrorText: errorMsg
        });
      }
    }
  }

  handleSelect = key => {
    this.setState({ key });
  }

  showSubmitModal = (typeId, metricId, userId, indicator) => {
    const roleId = _find(this.state.submitStatus, ['id', typeId]).roleRecordId;
    const text = _find(this.state.submitStatus, ['id', typeId]).text;
    this.setState({
      showModal: true,
      processType: typeId,
      processDataInfo: {
        metricId,
        userId,
        indicator,
        roleRecordId: roleId,
        role: text,
        actionUser: this.props.login.userInfo.userId
      }
    });
  }

  updateComments = (event) => {
    const DataInfo = this.state.processDataInfo;
    DataInfo.comments = event.target.value;
    this.setState({ comments: event.target.value, processDataInfo: DataInfo });
  }

  updateProcess = () => {
    const { processType, processDataInfo, comments } = this.state;
    if (comments !== '') {
      if (processType === 1) {
        this.props.dispatch(getAddRemoveSitePlanReviewer(processDataInfo));
      } else if (processType === 2) {
        this.props.dispatch(getAddRemoveSiteReviewer(processDataInfo));
      } else if (processType === 3) {
        this.props.dispatch(getAddRemoveSiteQAReviewer(processDataInfo));
      } else if (processType === 4) {
        this.props.dispatch(getAddRemoveGlobalReviewer(processDataInfo));
      }
      this.setState({ showModal: false, comments: '', checkedList: { metricRecordId: '' }, showCommentsError: false });
    } else {
      this.setState({ showCommentsError: true });
    }
  }

  closeErrorModal = () => {
    this.props.dispatch(clearShowPopupMsg());
    this.setState({ showErrorModal: false });
  }

  closeModal = () => {
    this.setState({ showModal: false, comments: '', showCommentsError: false });
  }

  closeSuccessModal = () => {
    this.setState({ showSuccessModal: false });
  }

  submitProcess = () => {
    const { processDataInfo, entryIndicator } = this.state;
    const dataInfo = processDataInfo;
    dataInfo.entryIndicator = entryIndicator;
    this.props.dispatch(updateRoleModification(dataInfo));
    this.props.dispatch(clearShowPopupMsg());
    this.setState({ showSuccessModal: false, entryIndicator: 0 });
  }

  searchMetricReport = value => {
    this.props.dispatch(searchMetricReport(value));
  }

  updatesCoordinator = (value, metricId) => {
    if (typeof value !== 'undefined') {
      const planCoOrdinatorListArr = this.state.planReviewerList;
      const index = _findIndex(planCoOrdinatorListArr, ['metricReportId', metricId]);
      if (index > -1) {
        planCoOrdinatorListArr[index].userId = value.userId;
      } else {
        planCoOrdinatorListArr.push({ metricReportId: metricId, userId: value.userId });
      }
      this.setState({ planReviewerList: planCoOrdinatorListArr });
    } else {
      this.setState({ planReviewerList: [] });
    }
  }

  updatesReviewer = (value, metricId) => {
    if (typeof value !== 'undefined') {
      const siteReviewerListArr = this.state.siteReviewerList;
      const index = _findIndex(siteReviewerListArr, ['metricReportId', metricId]);
      if (index > -1) {
        siteReviewerListArr[index].userId = value.userId;
      } else {
        siteReviewerListArr.push({ metricReportId: metricId, userId: value.userId });
      }
      this.setState({ siteReviewerList: siteReviewerListArr });
    } else {
      this.setState({ siteReviewerList: [] });
    }
  }

  updatesQAReviewer = (value, metricId) => {
    if (typeof value !== 'undefined') {
      const siteQAReviewerListArr = this.state.siteQAReviewerList;
      const index = _findIndex(siteQAReviewerListArr, ['metricReportId', metricId]);
      if (index > -1) {
        siteQAReviewerListArr[index].userId = value.userId;
      } else {
        siteQAReviewerListArr.push({ metricReportId: metricId, userId: value.userId });
      }
      this.setState({ siteQAReviewerList: siteQAReviewerListArr });
    } else {
      this.setState({ siteQAReviewerList: [] });
    }
  }

  updateGlobalReviewer = (value, metricId) => {
    if (typeof value !== 'undefined') {
      const globalReviewerListArr = this.state.globalReviewerList;
      const index = _findIndex(globalReviewerListArr, ['metricReportId', metricId]);
      if (index > -1) {
        globalReviewerListArr[index].userId = value.userId;
      } else {
        globalReviewerListArr.push({ metricReportId: metricId, userId: value.userId });
      }
      this.setState({ globalReviewerList: globalReviewerListArr });
    } else {
      this.setState({ globalReviewerList: [] });
    }
  }

  updateCheckBox = (metricId) => {
    this.setState({ checkedList: { metricRecordId: metricId } });
  }

  render() {
    const { siteQAReviewerList, siteReviewerList, planReviewerList, globalReviewerList, checkedList } = this.state;
    const metricColumns = [
      {
        Header: 'Metric Report Id',
        accessor: 'metricesId',
        headerClassName: 'header-class',
        maxWidth: 210,
        width: 210,
        Cell: row => (
          <div>
            {localStorage.getItem('role') === 'GBM' && <Checkbox
              label={row.original.metricesId}
              onCheck={() => this.updateCheckBox(row.original.metricesId)}
              checked={checkedList.metricRecordId === row.original.metricesId}
              disabled={false}
            />}
            {localStorage.getItem('role') !== 'GBM' && <span> {row.original.metricesId} </span>}
          </div>
        )
      },
      {
        Header: 'Metric Report Description',
        accessor: 'metricDescription',
        maxWidth: 90
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        maxWidth: 85,
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        maxWidth: 85,
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'Author',
        accessor: 'createdBy',
        maxWidth: 150
      },
      {
        Header: 'Site Plan Reviewer',
        accessor: 'sitePlanReviewer',
        minWidth: 155,
        Cell: row => (
          <div className="SitePlanReview globalReviewverDropdown">
            {row.original.siteplancoordinator !== null && row.original.siteplancoordinator !== '' && _map(row.original.siteplancoordinator.split(','), (coOrinator, index) =>
              <div>
                <Col lg={10} md={10} className="no-padding">
                  <span>{coOrinator}</span>
                </Col>
                <br className="clear" />
              </div>
            )}
            { localStorage.getItem('role') === 'SM' && <div>
              <Col lg={10} md={10} className="no-padding">
                <ReactSuperSelect
                  placeholder="Select Site Plan Reviewer"
                  dataSource={row.value}
                  optionValueKey="userId"
                  optionLabelKey="userName"
                  clearable={false}
                  keepOpenOnSelection={this.state.selectKeepDropDownOpen}
                  disabled={this.state.disable}
                  clearSelectedValueOnDataSourceChange={!false}
                  onChange={(e) => this.updatesCoordinator(e, row.original.metricesId)}
                />
              </Col>
              <Col lg={2} md={2} className="no-padding">
                <IconButton
                  tooltip="Add Plan Reviewer"
                  className="actionButtons"
                  disabled={(typeof _find(planReviewerList, ['metricReportId', row.original.metricesId]) === 'undefined')}
                  onClick={() => this.showSubmitModal(1, row.original.metricesId, _find(planReviewerList, ['metricReportId', row.original.metricesId]).userId, 1)}
                >
                  <FontIcon className="fa fa-plus-circle" />
                </IconButton>
              </Col><br className="clear" />
            </div> }
          </div>
        )
      },
      {
        Header: 'Site Reviewer',
        accessor: 'siteReviewer',
        minWidth: 170,
        Cell: row => (
          <div className="SiteReview globalReviewverDropdown">
            {row.original.sitereviewer !== null && row.original.sitereviewer !== '' && _map(row.original.sitereviewer.split(','), (reviewer, index) =>
              <div>
                <Col lg={10} md={10} className="no-padding">
                  <span>{reviewer}</span>
                </Col>
                <Col lg={2} md={2} className="no-padding">
                  { localStorage.getItem('role') === 'SM' && <IconButton
                    className="actionButtons"
                    tooltip="Delete Site Reviewer"
                    onTouchTap={() => this.showSubmitModal(2, row.original.metricesId, row.original.sitereviewerids.split(',')[index], 2)}
                  >
                    <FontIcon className="fa fa-minus-circle" />
                  </IconButton> }
                </Col>
                <br className="clear" />
              </div>
            )}
            { localStorage.getItem('role') === 'SM' &&
              <div>
                <Col lg={10} md={10} className="no-padding">
                  <ReactSuperSelect
                    placeholder="Select Site Reviewer"
                    dataSource={row.value}
                    optionValueKey="userId"
                    optionLabelKey="userName"
                    clearable={false}
                    keepOpenOnSelection={this.state.selectKeepDropDownOpen}
                    disabled={this.state.disable}
                    clearSelectedValueOnDataSourceChange={!false}
                    onChange={(e) => this.updatesReviewer(e, row.original.metricesId)}
                  />
                </Col>
                <Col lg={2} md={2} className="no-padding">
                  <IconButton
                    tooltip="Add Site Reviewer"
                    className="actionButtons"
                    disabled={(typeof _find(siteReviewerList, ['metricReportId', row.original.metricesId]) === 'undefined')}
                    onClick={() => this.showSubmitModal(2, row.original.metricesId, _find(siteReviewerList, ['metricReportId', row.original.metricesId]).userId, 1)}
                  >
                    <FontIcon className="fa fa-plus-circle" />
                  </IconButton>
                </Col>
                <br className="clear" />
              </div>
            }
          </div>
        )
      },
      {
        Header: 'Site QA Reviewer',
        accessor: 'siteQAReviewer',
        minWidth: 170,
        Cell: row => (
          <div className="SiteQAReview globalReviewverDropdown">
            {row.original.siteqareviewer !== null && row.original.siteqareviewer !== '' && _map(row.original.siteqareviewer.split(','), (QAReviewer, index) =>
              <div>
                <Col lg={10} md={10} className="no-padding">
                  <span>{QAReviewer}</span>
                </Col>
                <Col lg={2} md={2} className="no-padding">
                  { localStorage.getItem('role') === 'SM' && <IconButton
                    className="actionButtons"
                    tooltip="Delete QA Reviewer"
                    onTouchTap={() => this.showSubmitModal(3, row.original.metricesId, row.original.siteqareviewerids.split(',')[index], 2)}
                  >
                    <FontIcon className="fa fa-minus-circle" />
                  </IconButton> }
                </Col><br className="clear" />
              </div>
            )}
            { localStorage.getItem('role') === 'SM' && <div>
              <Col lg={10} md={10} className="no-padding">
                <ReactSuperSelect
                  placeholder="Select QA Reviewer"
                  dataSource={row.value}
                  optionValueKey="userId"
                  optionLabelKey="userName"
                  clearable={false}
                  keepOpenOnSelection={this.state.selectKeepDropDownOpen}
                  disabled={this.state.disable}
                  clearSelectedValueOnDataSourceChange={!false}
                  onChange={(e) => this.updatesQAReviewer(e, row.original.metricesId)}
                />
              </Col>
              <Col lg={2} md={2} className="no-padding">
                <IconButton
                  tooltip="Add QA Reviewer"
                  className="actionButtons"
                  disabled={(typeof _find(siteQAReviewerList, ['metricReportId', row.original.metricesId]) === 'undefined')}
                  onClick={() => this.showSubmitModal(3, row.original.metricesId, _find(siteQAReviewerList, ['metricReportId', row.original.metricesId]).userId, 1)}
                >
                  <FontIcon className="fa fa-plus-circle" />
                </IconButton>
              </Col><br className="clear" />
            </div> }
          </div>
        )
      },
      {
        Header: 'Global Reviewer',
        accessor: 'globalReviewer',
        minWidth: 170,
        Cell: row => (
          <div className="SitePlanReview globalReviewverDropdown">
            {row.original.globalreviewerids.length > 0 && _map(row.original.globalreviewer.split(','), (GBReviewer, index) =>
              <div>
                <Col lg={10} md={10} className="no-padding">
                  <span>{GBReviewer}</span>
                </Col>
                <Col lg={2} md={2} className="no-padding">
                  { localStorage.getItem('role') === 'GBM' && checkedList.metricRecordId === row.original.metricesId && <IconButton
                    className="actionButtons"
                    tooltip="Delete QA Reviewer"
                    onTouchTap={() => this.showSubmitModal(4, row.original.metricesId, row.original.globalreviewerids.split(',')[index], 2)}
                  >
                    <FontIcon className="fa fa-minus-circle" />
                  </IconButton> }
                </Col><br className="clear" />
              </div>
            )}
            { localStorage.getItem('role') === 'GBM' && checkedList.metricRecordId === row.original.metricesId && <div>
              <Col lg={10} md={10} className="no-padding">
                <ReactSuperSelect
                  placeholder="Select global Reviewer"
                  dataSource={row.value}
                  optionValueKey="userId"
                  optionLabelKey="userName"
                  clearable={false}
                  keepOpenOnSelection={this.state.selectKeepDropDownOpen}
                  disabled={this.state.disable}
                  clearSelectedValueOnDataSourceChange={!false}
                  onChange={(e) => this.updateGlobalReviewer(e, row.original.metricesId)}
                />
              </Col>
              <Col lg={2} md={2} className="no-padding">
                <IconButton
                  tooltip="Add Global Reviewer"
                  className="actionButtons"
                  disabled={(typeof _find(globalReviewerList, ['metricReportId', row.original.metricesId]) === 'undefined')}
                  onClick={() => this.showSubmitModal(4, row.original.metricesId, _find(globalReviewerList, ['metricReportId', row.original.metricesId]).userId, 1)}
                >
                  <FontIcon className="fa fa-plus-circle" />
                </IconButton>
              </Col><br className="clear" />
            </div> }
          </div>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        maxWidth: 100
      }
    ];

    const scheduleColumns = [
      {
        Header: 'Schedule ID',
        accessor: 'scheduleId',
        headerClassName: 'header-class',
        maxWidth: 180,
        width: 180
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'Author',
        accessor: 'createdBy',
        minWidth: 123
      },
      {
        Header: 'Site Plan Coordinator',
        accessor: 'sitePlanCoordinator',
        minWidth: 123
      },
      {
        Header: 'Site Plan Approver',
        accessor: 'sitePlanReviewer',
        minWidth: 123
      },
      {
        Header: 'Status',
        accessor: 'statusName'
      }
    ];

    const commentsArray = (
      <Col className="modal-body">
        <Row className="show-grid">
          <Col className="text-right" xs={12} md={6}>
            Comments*
          </Col>
          <Col xs={12} md={6}>
            <TextField
              className="textarea"
              hintText="Description Max 300 Characters"
              onChange={e => this.updateComments(e)}
              maxLength="300"
              value={this.state.comments}
              rows={2}
            />
          </Col>
        </Row>
      </Col>
    );

    return (
      <div className="box box-primary CreateSchdule">
        <ErrorDialog
          errorText={this.state.reviewerErrorText}
          showErrorModal={this.state.showErrorModal}
          onHide={this.closeErrorModal}
          onClick={this.closeErrorModal}
        />
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Body className="no-padding">
            <h4 className="text-center">
              Do you want to proceed with change made ?
            </h4>
            {commentsArray}
            {this.state.showCommentsError && <p className="danger">Please enter comments</p>}
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Submit"
              onTouchTap={this.updateProcess}
              icon={<SvgiPlus />}
              primary
            />
            <RaisedButton
              className="table-button"
              label="Close"
              onTouchTap={this.closeModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showSuccessModal}
          onHide={this.closeSuccessModal}
        >
          <Modal.Body className="no-padding">
            <h4 className="text-center">
              {this.state.successMessage}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <RaisedButton
              className="table-button"
              label="Submit"
              onTouchTap={this.submitProcess}
              icon={<SvgiPlus />}
              primary
            />
            <RaisedButton
              className="table-button"
              label="Close"
              onTouchTap={this.closeSuccessModal}
              icon={<SvgiPlus />}
            />
          </Modal.Footer>
        </Modal>

        <div className="padding modifyScheduleWrap">
          <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
            <p>ADD REVIEWER</p>
          </Row>
          <div className="metricTabs">
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" className="padding">
              <Tab eventKey={1} title="Metric Report">
                { this.state.key === 1 && <div>
                  <ReviewerSearch
                    submit={this.searchMetricReport}
                  />
                  <ReactTable
                    className="table-schedule -striped -highlight modifyTopGrid scrollbarSpace"
                    data={this.props.reviewers.metricesReviewerList}
                    pageSize={this.props.reviewers.metricesReviewerList.length}
                    showPagination={false}
                    columns={metricColumns}
                    {...this.state.tableOptions}
                  />
                </div> }
              </Tab>
              <Tab eventKey={2} title="Schedule">
                { this.state.key === 2 && <div>
                  <ReviewerSearch
                    submit={this.searchSubmit}
                  />
                  <ReactTable
                    className="table-schedule -striped -highlight modifyTopGrid scrollbarSpace"
                    data={this.props.reviewers.scheduleReviewerList}
                    pageSize={this.props.reviewers.scheduleReviewerList.length}
                    showPagination={false}
                    columns={scheduleColumns}
                    {...this.state.tableOptions}
                  />
                </div>}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reviewers: state.reviewers, login: state.login };
}

export default connect(mapStateToProps)(AddReviewer);
