import React from 'react';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ReactSuperSelect from 'react-super-select';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import _map from 'lodash/map';
import _parseInt from 'lodash/parseInt';
import _reduce from 'lodash/reduce';
import _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import ReactTableCustom from '../../Grid/ReactTableCustom';

import { metricTypeForUpload } from '../../../constants/UploadMetricConstants';
import {
  getAllSiteforUpload,
  updateUploadSiteData,
  updateUploadFormMetricType,
  updateUploadFormApprover,
  updateUploadFormDescription,
  updateUploadFormStartDate,
  updateUploadFormEndDate,
  createUploadedMetric,
  getAllMetricTypeforUpload,
  getUploadApprover,
  resetUploadMetricData,
  getAllApplicationHeader,
  updateApplicationHeaderData,
  getAllLevelLists,
  updateUploadLevelData,
  resetUploadSiteData,
  getGlobalUploadApproverList,
  validateSI03AIPCStabilityTests,
  getAllMetric,
  clearIsProcessSave,
  cleaValidateExcelData
} from '../../../actions/UploadManagerActions';
import './AddUploadMetric.scss';
import { SvgiCancel, SvgiDownload, SvgiTick } from '../../SVGIcons';
import { DayPickerField, TextAreaField, SelectBoxField } from '../../FormInputs/';

class AddUploadMetric extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      excelData: [],
      validate: false,
      isError: true,
      isServerValidationProcess: false,
      showSnackBar: false,
      snackBarMessage: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(resetUploadMetricData());
    this.props.dispatch(getAllApplicationHeader());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadManager.isProcessSave) {
      this.setState({ validate: true });
      this.props.dispatch(clearIsProcessSave());
    }
  }

  /* eslint-disable */
  
  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.dispatch(cleaValidateExcelData());
    const { uploadTableName } = this.props.uploadManager.uploadDataForm;
    this.setState({ validate: false, excelData: [], isLoading: true, isServerValidationProcess: false, excelDataErrorText: 'Please Upload Metric data' });
    const excelHeaderColumnsObj = _filter(metricTypeForUpload, item => item.id === uploadTableName)[0];
    const headerArr = excelHeaderColumnsObj ? excelHeaderColumnsObj.header : '';
    const opts = {
      errors: {
        badfile: () => {
        },
        pending: () => {
        },
        large: (e, cb) => {
          const len = e.target.result.length;
          cb(e);
        },
        failed: (e) => {
        }
      },
      on: {
        sheet: (json, sheetnames) => {
          const jsonObject = [];
          let jsonArray = [];
          if (json) {
            jsonArray = json;
          }
          jsonArray.forEach((record, rowIndex) => {
            if (rowIndex > 0) {
              const obj = {};
              record.forEach((item, colIndex) => {
                obj[headerArr[colIndex]] = item;
              });
              jsonObject.push(obj);
            }
          });

          this.setState({ excelData: jsonObject, isLoading: false, excelDataErrorText: '' });
        }
      }
    };
    const rABS = typeof FileReader !== 'undefined' && FileReader.prototype && FileReader.prototype.readAsBinaryString;
    const f = acceptedFiles[0];
    const reader = new FileReader();

    function fixdata(data) {
      let o = '';
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; l += 1) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)));
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
      return o;
    }

    function to_json(workbook) {
      const result = {};
      workbook.SheetNames.forEach((sheetName) => {
        const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        if (roa.length > 0) result[sheetName] = roa;
      });
      return result;
    }

    function process_wb(wb, sheetidx) {
      const sheet = wb.SheetNames[sheetidx || 0];
      const json = to_json(wb)[sheet];
      opts.on.sheet(json, wb.SheetNames);
    }

    var name = f.name;
    reader.onload = function (e) {
      var data = e.target.result;
      var wb, arr;
      var readtype = { type: rABS ? 'binary' : 'base64' };
      if (!rABS) {
        arr = fixdata(data);
        data = btoa(arr);
      }
      function doit() {
        try {
          console.log('DOING IT..');
          wb = XLSX.read(data, readtype);
          console.log(wb, 'WB');
          process_wb(wb);
        } catch (e) { console.log(e); opts.errors.failed(e); }
      }
      if (e.target.result.length > 1e6) opts.errors.large(e, function (e) { console.log(e, 'EEE'); if (e) doit(); });
      else { doit(); }
    };

    if (rABS) {
      reader.readAsBinaryString(f);
    } else {
      reader.readAsArrayBuffer(f);
    }
  }
  /* eslint-enable */

  setSiteforDataUpload = value => {
    if (typeof value !== 'undefined') {
      const { applicationId, appObjectId } = this.props.uploadManager.uploadDataForm;
      this.props.dispatch(updateUploadSiteData(value.id));
      this.props.dispatch(getUploadApprover(value.id, applicationId));
      this.props.dispatch(getAllMetricTypeforUpload(applicationId, appObjectId, value.id));
      this.setState({ siteErrorText: '', approverErrorText: '' });
    }
  }

  updateMetricType = type => {
    if (typeof type !== 'undefined') {
      this.props.dispatch(
        updateUploadFormMetricType(
          type
        )
      );
      this.setState({ excelData: [], MetricTypeErrorText: '', isServerValidationProcess: false });
    }
  }

  updateApprover = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(
        updateUploadFormApprover(
          value
        )
      );
      this.setState({ approverErrorText: '' });
    }
  }

  updateDescriptionText = event => {
    this.props.dispatch(
      updateUploadFormDescription(
        event.target.value
      )
    );
    this.setState({ descriptionErrorText: '' });
  }

  updateStartDate = date => {
    this.props.dispatch(
      updateUploadFormStartDate(
        date
      )
    );
    this.setState((prevState, props) => ({ startDateErrorText: '' }));
  }
  updateEndDate = date => {
    this.props.dispatch(
      updateUploadFormEndDate(
        date
      )
    );
    this.setState((prevState, props) => ({ endDateErrorText: '' }));
  }
  closeSnakBar() {
    this.setState({ ShowSnackBar: false, SnackBarMessage: '' });
  }

  saveDraft = () => {
    const { excelData } = this.state;
    const { uploadDataForm, excelDataValidList } = this.props.uploadManager;
    const currentStartDate = new Date(moment(uploadDataForm.startDate).format('YYYY-MM-DD'));
    const currentEndDate = new Date(moment(uploadDataForm.endDate).format('YYYY-MM-DD'));

    const metricData = (uploadDataForm.uploadTableName === 'T_COM_UPL_FFT_SI03A_IPCStabilityTest')
      ? _filter(excelDataValidList, ['valid', 'Valid'])
      : excelData;
    const saveData = {};
    const metricList = _.map(_.filter(this.props.uploadManager.metricList, ['checked', true]), 'metricId');
    Object.assign(saveData,
      this.props.uploadManager.uploadDataForm, { metricData },
      this.props.uploadManager.metricList, { metricList },
      { startDate: currentStartDate, endDate: currentEndDate }
    );
    this.props.dispatch(createUploadedMetric(saveData));
    this.setState({ showSnackBar: true, snackBarMessage: 'Upload Metric Created Successfully' });
    setTimeout(() => {
      this.context.router.push('/UploadMetric');
    }, 1000);
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

  convertArrToObject = (arrData) => {
    const resultObj = _reduce(arrData, (result, value, key) => {
      const objKey = Object.keys(value)[0];
      const res = result;
      res[objKey] = value[objKey];
      return res;
    }, {});
    return resultObj;
  }

  validateUploadForm = () => {
    const errorText = [];
    const {
      applicationId, appObjectId, siteId, uploadTableName, metricType,
      approverId, description, startDate, endDate, approverName
    } = this.props.uploadManager.uploadDataForm;
    const {
      descriptionErrorText, siteErrorText, MetricTypeErrorText,
      approverErrorText, excelData, endDateErrorText, isServerValidationProcess
    } = this.state;

    const uploadStartDate = document.getElementById('startDate').value;
    const uploadEndDate = document.getElementById('endDate').value;
    const UPStartDate = new Date(moment(startDate).format('YYYY-MM-DD'));
    const UPEndDate = new Date(moment(endDate).format('YYYY-MM-DD'));

    if (startDate === null || startDate === '' || !this.validateMonth(uploadStartDate)) {
      errorText.push({ startDateErrorText: 'Start Date is Invalid' });
    }
    if (endDate === null || endDate === '' || !this.validateMonth(uploadEndDate)) {
      errorText.push({ endDateErrorText: 'End Date is Invalid' });
    } else if (UPStartDate > UPEndDate) {
      errorText.push({ endDateErrorText: 'Enter End-Date must be greater than Start-Date' });
    }
    if (applicationId === '') {
      errorText.push({ applicationErrorText: 'Application is mandatory' });
    }
    if (approverName === '') {
      errorText.push({ approverErrorText: 'Upload Approver is mandatory' });
    }
    if (appObjectId === '') {
      errorText.push({ levelErrorText: 'Level is mandatory' });
    }
    if (description === '') {
      errorText.push({ descriptionErrorText: 'Description is mandatory' });
    }

    if (appObjectId !== 'FQM_GBL' && siteId === '') {
      errorText.push({ siteErrorText: 'site is mandatory' });
    }
    if (metricType === '') {
      errorText.push({ MetricTypeErrorText: 'Metric Type for Upload is mandatory' });
    }

    if (!excelData.length) {
      errorText.push({ excelDataErrorText: 'Please Upload Metric Data' });
    }

    if (errorText.length) {
      this.setState(this.convertArrToObject(errorText));
    } else {
      if (uploadTableName === 'T_COM_UPL_FFT_SI03A_IPCStabilityTest' && !isServerValidationProcess) {
        console.log('Client side validation');
        // Client side validation
        _map(excelData, (singleRecord, index) => {
          let errMsg = '';
          let isValid = true;
          if (singleRecord.Month.length !== 6 || isNaN(singleRecord.Month)
            || _parseInt(singleRecord.Month.slice(4, 6)) > 12) {
            isValid = false;
            errMsg = 'Month should be 6 char length & last 2 digit < 12';
          }
          if (isNaN(singleRecord.NoOfTests)) {
            isValid = false;
            errMsg = `${errMsg} No of tests should be numberic`;
          }
          if (!isValid) {
            errorText.push({ rowNum: index, msg: errMsg });
          }
        });
        // server side validation
        this.props.dispatch(
          validateSI03AIPCStabilityTests({ metricData: this.state.excelData }, errorText)
        );
        this.setState({ isServerValidationProcess: true });
      }
      if (uploadTableName === 'T_COM_UPL_MD_SitePlantMaintenance') {
        this.setState({ validate: true });
      }
    }
  }

  updateApplicationHeader = value => {
    if (typeof value !== 'undefined') {
      this.props.dispatch(updateApplicationHeaderData(value.applicationRecordId));
      this.props.dispatch(getAllLevelLists(value.applicationRecordId));
      this.setState({ applicationErrorText: '' });
    }
  }

  updateLevel = value => {
    console.log(value, 'updateLevel:value');
    if (typeof value !== 'undefined') {
      this.props.dispatch(updateUploadLevelData(value.appObjectId));
      if (value.appObjectId === 'FQM_GBL') {
        this.props.dispatch(resetUploadSiteData());
        this.props.dispatch(getAllMetricTypeforUpload(value.applicationRecordId, value.appObjectId, ''));
        this.props.dispatch(getGlobalUploadApproverList(value.applicationRecordId));
        this.setState({ siteErrorText: '', approverErrorText: '' });
      } else {
        this.props.dispatch(getAllSiteforUpload(value.applicationRecordId, value.appObjectId));
      }
      this.setState({ levelErrorText: '' });
    }
  }
  render() {
    const {
      uploadDataForm, uploadSitesList, metricTypeList,
      approverList, applicationHeaderList, levelList,
      excelDataValidList
      } = this.props.uploadManager;
    const {
      siteErrorText, descriptionErrorText, MetricTypeErrorText, approverErrorText, isServerValidationProcess,
      levelErrorText, applicationErrorText, excelData, excelDataErrorText, approverNameErrorText
    } = this.state;

    const { uploadTableName, startDate, endDate, plantName, description, lintToTemplate } = uploadDataForm;
    let dropzoneRef;
    const excelHeaderColumnsObj = _filter(metricTypeForUpload, item => item.id === uploadTableName)[0];
    const columns = excelHeaderColumnsObj ? excelHeaderColumnsObj.columns : '';

    const validUploadData = _filter(excelDataValidList, ['valid', 'Valid']);
    const InvalidUploadData = _filter(excelDataValidList, ['valid', 'In Valid']);
    return (
      <div className="box box-primary">
        <Grid className="contatinerNew">
          <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
            <p>Create Upload Request</p>
          </Row>
          <Row className="show-grid padding-top">
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  Application <span className="redrequired">*</span>
                </Col>
                <Col xs={6} md={8} className="siteField">
                  <SelectBoxField
                    palceHolder="Select Application"
                    onDataSource={applicationHeaderList}
                    onOptionValueKey="applicationRecordId"
                    onOptionLabelKey="applicationName"
                    onChange={this.updateApplicationHeader}
                    errorText={applicationErrorText}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={6} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="bold">
                  <p className="padding-top">Description <span className="redrequired">*</span></p>
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
                  Level <span className="redrequired">*</span>
                </Col>
                <Col xs={6} md={8} className="siteField">
                  <SelectBoxField
                    palceHolder="Select Level"
                    onDataSource={levelList}
                    onOptionValueKey="appObjectId"
                    onOptionLabelKey="level"
                    onChange={this.updateLevel}
                    errorText={levelErrorText}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">Start date<span className="redrequired">*</span></p>
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <DayPickerField
                    onDisabled={false}
                    onModifyDate={this.updateStartDate}
                    dateValue={startDate}
                    id={'startDate'}
                  />
                  <p className="danger">{this.state.startDateErrorText !== '' ? this.state.startDateErrorText : ''}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="show-grid padding-top">
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  Site
                </Col>
                <Col xs={6} md={8} className="siteField">
                  <SelectBoxField
                    palceHolder="Select Site"
                    onDataSource={uploadSitesList}
                    onOptionValueKey="id"
                    onOptionLabelKey="site"
                    onChange={this.setSiteforDataUpload}
                    errorText={siteErrorText}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={6} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">End Date<span className="redrequired">*</span></p>
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <DayPickerField
                    onDisabled={false}
                    onModifyDate={this.updateEndDate}
                    dateValue={endDate}
                    id={'endDate'}
                  />
                  <p className="danger">{this.state.endDateErrorText !== '' ? this.state.endDateErrorText : ''}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">Metric Type for Upload <span className="redrequired">*</span></p>
                </Col>
                <Col xs={6} md={8} className="siteField padding-top">
                  <SelectBoxField
                    palceHolder="Select metricType"
                    onDataSource={metricTypeList}
                    onOptionValueKey="uploadObjectID"
                    onOptionLabelKey="uploadObjectDescription"
                    onChange={this.updateMetricType}
                    errorText={MetricTypeErrorText}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">Upload Approver<span className="redrequired">*</span></p>
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <SelectBoxField
                    palceHolder="Select Approver"
                    onDataSource={approverList}
                    onOptionValueKey="userId"
                    onOptionLabelKey="userName"
                    onChange={this.updateApprover}
                    errorText={approverErrorText}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="show-grid padding-top">
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  Plant
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <p className="textBoxStyle">{plantName}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">Download Template</p>
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <p className="textBoxStyle">
                    <a className="underline" href={`/public/template/${lintToTemplate}`}> Link to Template </a>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6} />
            <Col xs={6} md={6}>
              <Row className="show-grid">
                <Col xs={12} md={4} className="padding-top bold">
                  <p className="padding-top">Browse <span className="redrequired">*</span></p>
                </Col>
                <Col xs={6} md={8} className="padding-top">
                  <Dropzone className="dropBox" ref={(node) => { dropzoneRef = node; }} onDrop={(files) => this.onDrop(files)} style={{ width: '100%', height: '50px', borderWidth: '2px', borderColor: 'rgb(102, 102, 102)', borderStyle: 'dashed', borderRadius: '5px' }}>
                    <div style={{ padding: '12px' }}>Drop file here or click this space to add file.</div>
                  </Dropzone>
                  <p className="danger"> { excelDataErrorText !== '' ? excelDataErrorText : '' } </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        {excelData.length > 0 && excelDataValidList.length === 0 && !this.state.isServerValidationProcess && <ReactTableCustom
          className="fixed-table margin-top -striped -highlight"
          data={excelData}
          columns={columns}
          pageSize={4}
        />}
        {this.props.uploadManager.isValidationProcessLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : ''}
        <div>
          {validUploadData.length > 0 && isServerValidationProcess && <div>
            <div className="addUploadMetric">
              <Row className="padding">
                <h3><span>Valid Upload Data</span> </h3>
              </Row>
            </div>
            <div>
              <ReactTableCustom
                className="fixed-table margin-top -striped -highlight"
                data={validUploadData}
                columns={columns}
                pageSize={4}
              />
            </div>
          </div>}
          {InvalidUploadData.length > 0 && isServerValidationProcess && <div>
            <div className="addUploadMetric">
              <Row className="padding">
                <h3><span>In Valid Upload Data</span> </h3>
              </Row>
            </div>
            <div>
              <ReactTableCustom
                className="fixed-table margin-top -striped -highlight"
                data={InvalidUploadData}
                columns={columns}
                pageSize={4}
              />
            </div>
          </div>
          }
        </div>
        <Row className="show-grid padding-top">
          {(this.state.validate) &&
            <Col xs={12} md={6} className="text-right">
              <RaisedButton
                label="Save"
                className="buttonStyle"
                onClick={this.saveDraft}
                containerElement={<Link to="" />}
                icon={<SvgiDownload />}
              />
            </Col>
          }
          {(!this.state.validate) &&
            <Col xs={12} md={6} className="text-right">
              {this.state.isServerValidationProcess === false ?
                <RaisedButton
                  label="Verify Data"
                  className="buttonStyle"
                  onClick={this.validateUploadForm}
                  containerElement={<Link to="" />}
                  icon={<SvgiTick />}
                /> :
                <RaisedButton
                  label="Verifying Data"
                  className="buttonDisableStyle"
                  icon={<SvgiTick />}
                />
              }
            </Col>
          }
          <Col xs={12} md={6}>
            <RaisedButton
              label="Cancel"
              className="buttonStyle"
              containerElement={<Link to="/UploadMetric" />}
              icon={<SvgiCancel />}
            />
          </Col>
        </Row>
        <Snackbar
          className="notificationBox"
          open={this.state.showSnackBar}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { uploadManager: state.uploadManager };
}

export default connect(mapStateToProps)(AddUploadMetric);
