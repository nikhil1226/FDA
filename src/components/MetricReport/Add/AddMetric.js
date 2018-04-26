import React from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  resetMetricData,
  getAllMetricSite,
  setEditMetricType,
  modifyStartDate,
  modifyEndDate,
  updateMetricsCheckBox,
  updateScheduleSiteData,
  updateMetricDescription,
  updateMetricSiteReviewer,
  updateSiteQAReviewer,
  updateMapSchedule,
  updateMetricScheduleId,
  updateMetricSitePlanReviewer,
  getScheduleBySiteId,
  getAllMetricIncludes
} from '../../../actions/MetricsManagerActions';
import './AddMetric.scss';
import { SvgiCancel, SvgiDownload } from '../../SVGIcons';
import {
  DayPickerField, SelectBoxField, ButtonField, TextAreaField, CheckboxField
} from '../../FormInputs/';

class AddMetric extends React.Component {
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
      endDateErrorText: '',
      sitePlantReviewerErrorText: '',
      sitePlantQAReviewerErrorText: '',
      siteReviewerErrorText: '',
      scheduleIdErrorText: '',
      checkboxDisabled: false
    };
  }

  componentWillMount() {
    this.props.dispatch(resetMetricData());
    this.props.dispatch(getAllMetricSite());
    this.props.dispatch(getAllMetricIncludes());
  }

  setSiteData = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateScheduleSiteData(
          value.id
        )
      );
      if (this.props.metricsManager.mapSchedule) {
        this.updateScheduleMap();
      }
      this.setState({ siteErrorText: '' });
    }
  }

  setSiteReviewer = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateMetricSiteReviewer(
            value
          )
        );
      this.setState({ siteReviewerErrorText: '' });
    }
  }

  setMetricScheduleId = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateMetricScheduleId(
            value
          )
        );
      this.setState({ scheduleIdErrorText: '' });
    }
  }

  setQAReviewer = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateSiteQAReviewer(
            value
          )
        );
      this.setState({ sitePlantQAReviewerErrorText: '' });
    }
  }

  setSitePlanReviewer = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
          updateMetricSitePlanReviewer(
            value
          )
        );
      this.setState({ sitePlantReviewerErrorText: '' });
    }
  }

  updateDescriptionText = event => {
    this.props.dispatch(
      updateMetricDescription(
        event.target.value
      )
    );
    this.setState({ descriptionErrorText: '' });
  }

  modifyStartDate = date => {
    this.props.dispatch(
        modifyStartDate(
          date
        )
      );
    this.setState({ startDataErrorText: '' });
  }

  modifyEndDate = date => {
    this.props.dispatch(
        modifyEndDate(
          date
        )
      );
    this.setState({ endDateErrorText: '' });
  }

  updateMetricsCheckBox = id => {
    this.props.dispatch(
      updateMetricsCheckBox(
        id
      )
    );
  }

  cancelMetricDraft = () => {
    this.context.router.push('MetricReport');
  }

  saveMetricDraft = () => {
    this.validateMetricForm();
  }

  validateMonth = (date) => {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const dateArr = date.split('-');
    let result = true;
    if (dateArr.length < 3) {
      result = false;
    } else if (_.filter(monthNames, o => o === _.lowerCase(dateArr[1])).length === 0) {
      result = false;
    }
    return result;
  }

  validateMetricForm = () => {
    const {
      description, siteQAReviewer, sitePlanReviewer, siteReviewer,
      startDate, endDate, scheduleId
    } = this.props.metricsManager.currentMetric[0];

    if (description === '') {
      this.setState({ descriptionErrorText: 'Description is mandatory' });
    } else {
      this.setState({ descriptionErrorText: '' });
    }
    const index = _.findIndex(this.props.metricsManager.sitesList, ['site', this.props.metricsManager.currentMetric[0].site]);
    if (index === -1) {
      this.setState({ siteErrorText: 'Site not valid' });
    } else {
      this.setState({ siteErrorText: '' });
    }
    const srIndex = _.findIndex(siteReviewer, ['checked', true]);
    if (srIndex < 0) {
      this.setState({ siteReviewerErrorText: 'Site Reviewer is Invalid' });
    } else {
      this.setState({ siteReviewerErrorText: '' });
    }
    const spqarIndex = _.findIndex(siteQAReviewer, ['checked', true]);
    if (spqarIndex < 0) {
      this.setState({ sitePlantQAReviewerErrorText: 'Site QA Reviewer is Invalid' });
    } else {
      this.setState({ sitePlantQAReviewerErrorText: '' });
    }
    const spcIndex = _.findIndex(sitePlanReviewer, ['checked', true]);
    if (spcIndex < 0) {
      this.setState({ sitePlantReviewerErrorText: 'Site Plant Reviewer is Invalid' });
    } else {
      this.setState({ sitePlantReviewerErrorText: '' });
    }
    const metricStartDate = document.getElementById('startDate').value;
    const metricEndDate = document.getElementById('endDate').value;
    const updatedStartDate = new Date(moment(startDate).format('YYYY-MM-DD'));
    const updatedEndDate = new Date(moment(endDate).format('YYYY-MM-DD'));

    if (startDate === null || startDate === '' || !this.validateMonth(metricStartDate)) {
      this.setState({ startDataErrorText: 'Start Date is Invalid' });
    } else {
      this.setState({ startDataErrorText: '' });
    }
    if (endDate === null || endDate === '' || !this.validateMonth(metricEndDate)) {
      this.setState({ endDateErrorText: 'End Date is Invalid' });
    } else if (updatedStartDate > updatedEndDate) {
      this.setState({ endDateErrorText: 'Enter End-Date must be greater than Start-Date' });
    } else {
      this.setState({ endDateErrorText: '' });
    }
    if (this.props.metricsManager.mapSchedule) {
      if (scheduleId === '') {
        this.setState({ scheduleIdErrorText: 'scheduleId is Invalid' });
      } else {
        this.setState({ scheduleIdErrorText: '' });
      }
    }
    setTimeout(() => {
      if (this.state.descriptionErrorText === '' && this.state.siteErrorText === ''
      && this.state.sitePlantReviewerErrorText === '' && this.state.sitePlantQAReviewerErrorText === ''
      && this.state.sitePlantReviewerErrorText === '' && this.state.endDateErrorText === ''
      && this.state.startDataErrorText === '' && this.state.scheduleIdErrorText === '') {
        this.props.dispatch(
          setEditMetricType(
            'create2'
          )
        );
        this.context.router.push('MetricReport/add_step2');
      }
    }, 50);
  }

  updateScheduleMap = () => {
    const { siteId } = this.props.metricsManager.currentMetric[0];
    this.props.dispatch(getScheduleBySiteId(siteId));
    this.props.dispatch(updateMapSchedule());
    this.setState({ checkboxDisabled: !this.state.checkboxDisabled });
  }

  render() {
    const {
      currentMetric, mapSchedule, sitesList, siteMetricSchedulesList,
      sitePlanReviewerList, siteReviewerList, siteQAReviwerList
    } = this.props.metricsManager;
    const { description, startDate, endDate, metricsIncluded, plantCode } = currentMetric[0];

    const {
      checkboxDisabled, siteErrorText, scheduleIdErrorText, descriptionErrorText,
      startDataErrorText, endDateErrorText, sitePlantReviewerErrorText, siteReviewerErrorText,
      sitePlantQAReviewerErrorText
    } = this.state;

    const checkboxes = (
      metricsIncluded.map(checkbox =>
        <CheckboxField
          labelName={checkbox.metricName}
          onClick={() => this.updateMetricsCheckBox(checkbox.metricId)}
          onChecked={checkbox.checked}
          onDisabled={checkboxDisabled}
        />
    ));
    const stepFirstView = (
      <Grid>
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>Create Metric Report Plan</p>
        </Row>
        <Row className="show-grid padding-top">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                Site <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="siteField">
                <SelectBoxField
                  palceHolder="Select Site"
                  onDataSource={sitesList}
                  onOptionValueKey="id"
                  onOptionLabelKey="site"
                  onChange={this.setSiteData}
                  errorText={siteErrorText}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                 Plant Code
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <p className="textBoxStyle">{plantCode}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                Link Schedule
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <CheckboxField
                  onClick={this.updateScheduleMap}
                  onChecked={mapSchedule}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
               Schedule ID
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Schedules"
                  onDataSource={siteMetricSchedulesList}
                  onOptionValueKey="scheduleId"
                  onOptionLabelKey="scheduleId"
                  onDisabled={!mapSchedule}
                  onChange={this.setMetricScheduleId}
                  errorText={scheduleIdErrorText}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Start Date <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <DayPickerField
                  onModifyDate={this.modifyStartDate}
                  dateValue={startDate}
                  id={'startDate'}
                  onShowPastDate
                />
                <p className="danger">
                  {startDataErrorText !== '' ? startDataErrorText : ''}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                End Date <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <DayPickerField
                  onModifyDate={this.modifyEndDate}
                  dateValue={endDate}
                  id={'endDate'}
                  onShowPastDate
                />
                <p className="danger">
                  {endDateErrorText !== '' ? endDateErrorText : ''}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                Description <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="discriptionField">
                <TextAreaField
                  onHintText="Description Max 100 Characters"
                  onValue={description}
                  onErrorText={descriptionErrorText}
                  onChange={this.updateDescriptionText}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Site Plan Reviewer <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Site Plan Reviewer"
                  onDataSource={sitePlanReviewerList}
                  onOptionValueKey="userId"
                  onOptionLabelKey="userName"
                  onChange={this.setSitePlanReviewer}
                  errorText={sitePlantReviewerErrorText}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Site Reviewer <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Site Reviewer"
                  onDataSource={siteReviewerList}
                  onOptionValueKey="userId"
                  onOptionLabelKey="userName"
                  onChange={this.setSiteReviewer}
                  onMultiple={!false}
                  errorText={siteReviewerErrorText}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Site QA Reviewer <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Site QA Reviewer"
                  onDataSource={siteQAReviwerList}
                  onOptionValueKey="userId"
                  onOptionLabelKey="userName"
                  onChange={this.setQAReviewer}
                  onMultiple={!false}
                  errorText={sitePlantQAReviewerErrorText}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={6} className="text-right padding-top bold">
            Metrics Included
          </Col>
          <Col xs={6} md={6} className="metricsIncludList padding-top">
            {checkboxes}
          </Col>
        </Row>
        <Row className="show-grid padding-top">
          <Col xs={12} md={6} className="text-right">
            <ButtonField
              buttonLabel="Next"
              onClick={this.saveMetricDraft}
              buttonIcon={<SvgiDownload />}
            />
          </Col>
          <Col xs={12} md={6}>
            <ButtonField
              buttonLabel="Cancel"
              onClick={this.cancelMetricDraft}
              buttonIcon={<SvgiDownload />}
            />
          </Col>
        </Row>
      </Grid>
    );
    return (
      <div className="box box-primary CreateSchdule">
        {stepFirstView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricsManager: state.metricsManager };
}

export default connect(mapStateToProps)(AddMetric);
