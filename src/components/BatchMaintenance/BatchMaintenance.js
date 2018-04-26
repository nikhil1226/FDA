import React from 'react';
import ReactTable from 'react-table';

import ReactLoading from 'react-loading';
import RaisedButton from 'material-ui/RaisedButton';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';
import _isEqual from 'lodash/isEqual';
import { Grid, Row, Col, Button, Tabs, Tab, Collapse, Well, Modal } from 'react-bootstrap';
import Snackbar from 'material-ui/Snackbar';
import ReportSearch from '../Search/ReportSearch';
import CheckBoxField from '../Fields/CheckBoxField/CheckBoxField';
import TextBoxField from '../Fields/TextBoxField/TextBoxField';
import { SvgiTick } from '../SVGIcons';
import { bMaintenanceColumns } from '../../constants/MetricMaintenanceModifyConstants';

class BatchMaintenance extends React.Component {

  static currentInstance = null;
  static setCurrentInstance(instance) {
    BatchMaintenance.currentInstance = instance;
  }
  constructor(props) {
    super(props);
    this.state = {
      tableOptions: {
        loading: false,
        showPagination: true,
        showPageSizeOptions: false,
        showPageJump: true,
        showPaginationBottom: false,
        defaultPageSize: 5,
        collapseOnSortingChange: false,
        collapseOnPageChange: false,
        collapseOnDataChange: false,
        freezeWhenExpanded: false,
        filterable: false,
        sortable: false,
        resizable: true
      },
      changesBatchInfo: [],
      changesCommentInfo: [],
      isSaveClicked: false,
      rows: [],
      page: 0,
      totalPages: 0,
      showSnackBar: false,
      mounted: false,
      disable: false
    };
    BatchMaintenance.setCurrentInstance(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: 0 });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let returnStatus = false;
    if (!_isEqual(this.props, nextProps) || nextState.isSaveClicked || !_isEqual(this.state, nextState)) {
      returnStatus = true;
      this.setState({ isSaveClicked: false });
    }
    return returnStatus;
  }

  componentWillUnmount() {
    BatchMaintenance.setCurrentInstance(null);
  }

  getCheckBoxState = (row) => {
    const context = BatchMaintenance.currentInstance;
    const KPIRecord = row.value;
    const newchangesBatchInfo = context.state.changesBatchInfo;
    const index = _findIndex(newchangesBatchInfo, { materialBatchRecord: row.original.materialBatchRecord, KPIRecordId: KPIRecord });
    const originalState = row.original[`KPIRecordID${row.value}Active`];
    const checkboxState = index > -1 ? newchangesBatchInfo[index].active : originalState;
    return checkboxState;
  }

  getComment = (row) => {
    const context = BatchMaintenance.currentInstance;
    const materialBatchRecord = row.original.materialBatchRecord;
    const newCommentInfo = context.state.changesCommentInfo;
    const index = _findIndex(newCommentInfo, { materialBatchRecord });
    const isReadOnly = context.getEditableStatus(row);
    const comment = (index > -1 && !isReadOnly) ? newCommentInfo[index].comments : '';
    return comment;
  }
  getEditableStatus = (row) => {
    const context = BatchMaintenance.currentInstance;
    let index = -1;
    const KPIRecord = row.value;
    const newchangesBatchInfo = context.state.changesBatchInfo;
    index = _findIndex(newchangesBatchInfo, { materialBatchRecord: row.original.materialBatchRecord });
    return !(index > -1);
  }

  getDisableStatus = () => {
    const context = BatchMaintenance.currentInstance;
    let canDisable = false;
    canDisable = (typeof this.props.isSaveChanges !== 'undefined' && !this.props.isSaveChanges);
    return canDisable;
  }

  canSaveData = () => {
    let canSave = true;
    if (this.state.changesBatchInfo.length > 0 && this.state.changesCommentInfo.length === 0) {
      return false;
    }
    this.state.changesBatchInfo.forEach((record) => {
      const materialBatchRecord = record.materialBatchRecord;
      const index = _findIndex(this.state.changesCommentInfo, { materialBatchRecord: record.materialBatchRecord });
      if (canSave && (index < 0 || this.state.changesCommentInfo[index].comments === '')) {
        canSave = false;
      }
    });
    return canSave;
  }

  resetSnackBar = () => {
    this.setState({ showSnackBar: false });
  }

  updateComment = (value, materialBatchRecord) => {
    const context = BatchMaintenance.currentInstance;
    const newCommentInfo = context.state.changesCommentInfo;
    const index = _findIndex(newCommentInfo, { materialBatchRecord });
    if (index > -1) {
      newCommentInfo[index].comments = value;
    } else {
      newCommentInfo.push({ materialBatchRecord, comments: value });
    }
    const newchangesBatchInfo = _map(context.state.changesBatchInfo, o => {
      const item = o;
      if (item.materialBatchRecord === materialBatchRecord) {
        item.comments = value;
      }
      return item;
    });
    context.setState({ changesCommentInfo: newCommentInfo, changesBatchInfo: newchangesBatchInfo });
  }

  handleCheckBox = (row, isActive) => {
    const context = BatchMaintenance.currentInstance;
    const KPIRecord = row.value;
    const newchangesBatchInfo = Object.assign([], context.state.changesBatchInfo);
    const index = _findIndex(newchangesBatchInfo, { materialBatchRecord: row.original.materialBatchRecord, KPIRecordId: KPIRecord });
    if (index > -1) {
      _remove(newchangesBatchInfo, { materialBatchRecord: row.original.materialBatchRecord, KPIRecordId: KPIRecord });
    } else {
      const commentIndex = _findIndex(context.state.changesCommentInfo, { materialBatchRecord: row.original.materialBatchRecord });
      const rowComments = (commentIndex > -1) ? context.state.changesCommentInfo[commentIndex].comments : '';
      const commentObj = {
        KPIRecordId: KPIRecord,
        materialBatchRecord: row.original.materialBatchRecord,
        active: !isActive,
        comments: rowComments
      };
      newchangesBatchInfo.push(commentObj);
    }
    context.setState({ changesBatchInfo: newchangesBatchInfo });
  }

  saveChanges = () => {
    const canSave = this.canSaveData();
    if (canSave) {
      if (this.state.changesBatchInfo.length > 0) {
        const changesBatchInfoArr = Object.assign([], this.state.changesBatchInfo);
        this.setState({ isSaveClicked: true, changesBatchInfo: [], changesCommentInfo: [] });
        this.props.onSaveChanges(changesBatchInfoArr);
      }
    } else {
      this.setState({ showSnackBar: !canSave });
    }
  };

  incrementPage = () => {
    let newPage = this.state.page + 1;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }
  decrementPage = () => {
    const newPage = this.state.page <= 0 ? 0 : this.state.page - 1;
    this.setState(prevState => ({
      page: newPage
    }));
  }
  firstPage = () => {
    let newPage = 0;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }
  lastPage = () => {
    let newPage = this.state.totalPages;
    newPage = newPage >= this.state.totalPages ? this.state.totalPages - 1 : newPage;
    this.setState(prevState => ({
      page: newPage
    }));
  }

  handleWheel = (event) => {
    event.preventDefault();
    if (event.nativeEvent.deltaY < 0) {
      this.decrementPage();
    } else {
      this.incrementPage();
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.incrementPage();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.decrementPage();
    }
  }

  render() {
    const context = BatchMaintenance.currentInstance;
    context.state.totalPages = Math.ceil(context.props.dataInfo.length / context.state.tableOptions.defaultPageSize);
    const BatchColumns = [];
    _map(bMaintenanceColumns, col => {
      const item = col;
      if (item.Cell) {
        if (item.Cell === 'textField' && !context.getDisableStatus()) {
          item.Cell = row => (
            <TextBoxField
              rowValue={row}
              ref={(c) => { context[`childTextBox${row.index}`] = c; }}
              comment={context.getComment(row)}
              onChange={context.updateComment}
              isReadOnly={context.getEditableStatus(row)}
            />
          );
        }
        if (item.Cell === 'checkBox') {
          item.Cell = row => (
            <div className="TickGrid">
              { typeof row.value !== 'undefined' && <CheckBoxField
                onClick={context.handleCheckBox}
                onChecked={context.getCheckBoxState(row)}
                onDisable={context.getDisableStatus()}
                rowValue={row}
                name={`KPIRecordID${row.value}_${context.state.page}_${row.index}`}
              />}

            </div>
          );
        }
      }
      if (!context.getDisableStatus() || item.accessor !== 'comments') {
        BatchColumns.push(item);
      }
    });

    return (
      <div>
        <ReportSearch
          isMaterialNumber={1}
          isBatchNumber={1}
          submit={this.props.searchBM}
        />
        <div className="text-right">
          <input type="image" src="../public/dist/img/icons/font-awesome_fast-backward_8_8.png" title="Top Page" onClick={context.firstPage} />
          <input type="image" src="../public/dist/img/icons/font-awesome_step-backward_8_8.png" title="Previous Page" onClick={context.decrementPage} />
        </div>
        <div className="row">
          <div className="col col-xs-12">
            <div id="tableCustomDiv" onWheel={this.handleWheel} onKeyDown={this.handleKeyPress} tabIndex="0" >
              <ReactTable
                className="table-schedule -striped -highlight"
                data={context.props.dataInfo}
                page={context.state.page}
                noDataText={context.props.isBatchLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
                columns={BatchColumns}
                {...context.state.tableOptions}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-xs-11">
            <div className="text-left">
              <p> <br /> {context.props.dataInfo.length} Records (Showing page {context.state.totalPages === 0 ? 0 : context.state.page + 1} of {context.state.totalPages}). <br /> </p>
            </div>
          </div>
          <div className="col col-xs-1">
            <div className="text-right">
              <input type="image" src="../public/dist/img/icons/font-awesome_fast-forward_8_8.png" title="Last Page" onClick={context.lastPage} />
              <input type="image" src="../public/dist/img/icons/font-awesome_step-forward_8_8.png" title="Next Page" onClick={context.incrementPage} />
            </div>
          </div>
        </div>
        <div className="text-right margin-top">
          <br />
          { !context.getDisableStatus() && <RaisedButton
            className="table-button"
            label="Save Changes"
            onTouchTap={this.saveChanges}
            icon={<SvgiTick />}
          /> }
        </div>
        <Grid className="margin">
          <Row className="show-grid">
            <Col xs={12} md={6} className="text-right">
              <Snackbar
                className="notificationBox"
                bodyStyle={{ backgroundColor: 'red', color: 'white' }}
                open={this.state.showSnackBar}
                message="Metric Reports Can Not Be Saved. Please Enter Required Comments"
                onRequestClose={this.resetSnackBar}
                autoHideDuration={3000}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BatchMaintenance;
