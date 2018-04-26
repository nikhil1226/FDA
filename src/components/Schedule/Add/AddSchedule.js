import React from 'react';
import moment from 'moment';
import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  getAllSite,
  modifyStartDate,
  modifyEndDate,
  updateMetricsCheckBox,
  updateScheduleSiteData,
  updateSchduleDescription,
  updatePlanCoordinator,
  updatePlanReviewer,
  getAllMetricIncludes
} from '../../../actions/ScheduleManagerActions';

import {
  DayPickerField, SelectBoxField, ButtonField,
  TextAreaField, CheckboxField
} from '../../FormInputs/';

import { SvgiDownload, SvgiCancel } from '../../SVGIcons';
import './AddSchedule.scss';

class AddSchedule extends React.Component {
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
      startDateErrorText: '',
      endDateErrorText: '',
      sitePlanCoordinatorErrorText: '',
      sitePlanReviewerErrorText: '',
      checkboxDisabled: false
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllSite());
    this.props.dispatch(getAllMetricIncludes());
  }

  setSiteData = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateScheduleSiteData(
          value.id
        )
        );
      this.setState({ siteErrorText: '' });
    }
  }

  setPlanCoordinator = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updatePlanCoordinator(
          value.userId
        )
        );
      this.setState({ sitePlanCoordinatorErrorText: '' });
    }
  }

  setPlanReviewer = (value) => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updatePlanReviewer(
          value.userId
        )
      );
      this.setState({ sitePlanReviewerErrorText: '' });
    }
  }

  updateDescriptionText = (event) => {
    this.props.dispatch(
      updateSchduleDescription(
        event.target.value
      )
    );
    this.setState({ descriptionErrorText: '' });
  }

  modifyStartDate = (date) => {
    this.props.dispatch(
      modifyStartDate(
        date
      )
    );
    this.setState({ startDateErrorText: '' });
  }

  modifyEndDate = (date) => {
    this.props.dispatch(
      modifyEndDate(
        date
      )
    );
    this.setState({ endDateErrorText: '' });
  }

  updateMetricsCheckBox = (id) => {
    this.props.dispatch(
      updateMetricsCheckBox(
        id
      )
    );
  }

  cancelScheduleDraft = () => {
    this.context.router.push('Schedule');
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

  saveScheduleDraft = () => {
    this.validateScheduleForm();
  }

  validateScheduleForm = () => {
    const { currentSchedule, sitesList } = this.props.scheduleManager;
    const { startDate, endDate, sitePlanCoordinator, sitePlanReviewer, description, site } = currentSchedule[0];
    const today = moment().format('YYYY-MM-DD');
    const scheduleStartDate = document.getElementById('startDate').value;
    const scheduleEndDate = document.getElementById('endDate').value;
    const updateStartDate = new Date(moment(startDate).format('YYYY-MM-DD'));
    const updateEndDate = new Date(moment(endDate).format('YYYY-MM-DD'));

    if (description === '') {
      this.setState({ descriptionErrorText: 'Description is mandatory' });
    } else {
      this.setState({ descriptionErrorText: '' });
    }
    const index = _findIndex(sitesList, ['site', site]);
    if (index === -1) {
      this.setState({ siteErrorText: 'Site not valid' });
    } else {
      this.setState({ siteErrorText: '' });
    }
    if (startDate === null || startDate === '' || !this.validateMonth(scheduleStartDate)) {
      this.setState({ startDateErrorText: 'Start Date is Invalid' });
    } else if (moment(updateStartDate).isBefore(today)) {
      this.setState({ startDateErrorText: 'Enter New Date' });
    } else {
      this.setState({ startDateErrorText: '' });
    }
    if (endDate === null || endDate === '' || !this.validateMonth(scheduleEndDate)) {
      this.setState({ endDateErrorText: 'End Date is Invalid' });
    } else if (moment(updateEndDate).isBefore(today)) {
      this.setState({ endDateErrorText: 'Enter New Date' });
    } else if (updateStartDate > updateEndDate) {
      this.setState({ endDateErrorText: 'Enter End-Date must be greater than Start-Date' });
    } else {
      this.setState({ endDateErrorText: '' });
    }
    if (sitePlanCoordinator === '') {
      this.setState({ sitePlanCoordinatorErrorText: 'Site Plant Coordinator is Invalid' });
    } else {
      this.setState({ sitePlanCoordinatorErrorText: '' });
    }
    if (sitePlanReviewer === '') {
      this.setState({ sitePlanReviewerErrorText: 'Site Plant Reviewer is Invalid' });
    } else {
      this.setState({ sitePlanReviewerErrorText: '' });
    }
    setTimeout(() => {
      if (this.state.descriptionErrorText === '' && this.state.siteErrorText === ''
        && this.state.sitePlanCoordinatorErrorText === '' && this.state.sitePlanReviewerErrorText === ''
        && this.state.endDateErrorText === '' && this.state.startDateErrorText === '') {
        this.context.router.push('/Schedule/Add_step2');
      }
    }, 50);
  }

  render() {
    const {
      sitePlantCoordinatorList, sitePlantReviewerList,
      sitesList, currentSchedule
    } = this.props.scheduleManager;

    const {
      description, startDate, endDate, dunsNumber, feiNumber, region,
      plantCode, technology, metricsIncluded
    } = currentSchedule[0];

    const {
      startDateErrorText, endDateErrorText, sitePlanCoordinatorErrorText,
      sitePlanReviewerErrorText, siteErrorText, descriptionErrorText, checkboxDisabled
    } = this.state;

    const checkboxes = (
      metricsIncluded.map(checkbox =>
        <CheckboxField
          labelName={checkbox.metricName}
          onClick={() => this.updateMetricsCheckBox(checkbox.metricId)}
          onChecked={checkbox.checked}
          onDisabled={checkboxDisabled}
        />
      )
    );

    const StepfirstView = (
      <Grid>
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>Create Schedule</p>
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
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                Duns Number
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <p className="textBoxStyle">{dunsNumber}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                FEI Number
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <p className="textBoxStyle">{feiNumber}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top bold">
                Region
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <p className="textBoxStyle">{region}</p>
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
                Technology
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <p className="textBoxStyle">{technology}</p>
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
              <Col xs={6} md={8} className="padding-top" >
                <DayPickerField
                  onModifyDate={this.modifyStartDate}
                  dateValue={startDate}
                  id={'startDate'}
                  onShowFutureDate
                />
                <p className="danger">
                  {startDateErrorText !== '' ? startDateErrorText : ''}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                End Date <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top" >
                <DayPickerField
                  onModifyDate={this.modifyEndDate}
                  dateValue={endDate}
                  id={'endDate'}
                  onShowFutureDate
                />
                <p className="danger">
                  {endDateErrorText !== '' ? endDateErrorText : ''}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Site Plan Coordinator <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Plan Coordinator"
                  onDataSource={sitePlantCoordinatorList}
                  onOptionValueKey="userId"
                  onOptionLabelKey="userName"
                  onChange={this.setPlanCoordinator}
                  errorText={sitePlanCoordinatorErrorText}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={6}>
            <Row className="show-grid">
              <Col xs={12} md={4} className="padding-top margin-top bold">
                Site Plan Reviewer <span className="redrequired">*</span>
              </Col>
              <Col xs={6} md={8} className="padding-top">
                <SelectBoxField
                  palceHolder="Select Plan Reviewer"
                  onDataSource={sitePlantReviewerList}
                  onOptionValueKey="userId"
                  onOptionLabelKey="userName"
                  onChange={this.setPlanReviewer}
                  errorText={sitePlanReviewerErrorText}
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
              onClick={this.saveScheduleDraft}
              buttonIcon={<SvgiDownload />}
            />
          </Col>
          <Col xs={12} md={6}>
            <ButtonField
              buttonLabel="Cancel"
              onClick={this.cancelScheduleDraft}
              buttonIcon={<SvgiDownload />}
            />
          </Col>
        </Row>
      </Grid>
    );
    return (
      <div className="box box-primary CreateSchdule">
        {StepfirstView}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { scheduleManager: state.scheduleManager };
}

export default connect(mapStateToProps)(AddSchedule);
