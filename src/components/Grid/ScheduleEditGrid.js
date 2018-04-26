import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import { Row, Col } from 'react-bootstrap';
import _filter from 'lodash/filter';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { DayPickerField, SelectBoxField, TextAreaField } from '../FormInputs/';

const ScheduleEditGrid = props => {
  const { scheduleData } = props;
  const { startDate, endDate } = scheduleData[0];
  const columns = [{
    Header: 'Site',
    accessor: 'site',
    maxWidth: 103
  }, {
    Header: 'Description of Schedule',
    accessor: 'description',
    maxWidth: 210,
    Cell: row => (
      <div>
        {!props.isReadOnly && <TextAreaField
          onDisabled={props.onDisable}
          onHintText="Description"
          onClassName="DescriptionTextfeild"
          onValue={row.value}
          onChange={props.onUpdateDescriptionText}
        />}
        {props.isReadOnly && <span>{row.value}</span>}
      </div>
    )
  }, {
    Header: 'Plant Code',
    accessor: 'plantCode',
    maxWidth: 100
  }, {
    Header: 'Technology',
    accessor: 'technology',
    maxWidth: 85
  }, {
    Header: 'Region',
    accessor: 'region',
    maxWidth: 85
  }, {
    Header: 'FEI Number',
    accessor: 'feiNumber',
    maxWidth: 85
  }, {
    Header: 'DUNS Number',
    accessor: 'dunsNumber',
    maxWidth: 80
  }, {
    Header: 'Start Date',
    accessor: 'startDate',
    maxWidth: 110,
    Cell: row => (
      <DayPickerField
        onDisabled={props.onDisable}
        onModifyDate={props.onModifyStartDate}
        dateValue={startDate}
        id={'startDate'}
        onShowFutureDate
      />
    )
  }, {
    Header: 'End Date',
    accessor: 'endDate',
    maxWidth: 110,
    Cell: row => (
      <DayPickerField
        onDisabled={props.onDisable}
        onModifyDate={props.onModifyEndDate}
        dateValue={endDate}
        id={'endDate'}
        onShowFutureDate
      />
    )
  }, {
    Header: 'Metrics Included',
    accessor: 'metricsIncluded',
    minWidth: 200,
    className: 'metrcisSelected',
    Cell: row => (
      <div>
        {!props.isReadOnly && <SelectBoxField
          palceHolder="Select Metrices"
          onDataSource={row.value}
          onOptionValueKey="metricId"
          onOptionLabelKey="metricName"
          onChange={props.onUpdateMetricsInclude}
          onInitialValue={_filter(row.value, ['checked', true])}
          onMultiple={!false}
          onDisabled={props.onDisable}
          onKeepOpenOnSelection={props.onSelectKeepDropDownOpen}
        />}
        {props.isReadOnly && <span>{row.original.metricsIncludedLists}</span>}
      </div>
    )
  }];

  return (
    <span>
      <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
        <p>{props.pageTitle} </p>
      </Row>
      <ReactTable
        className="-striped -highlight scheduleGrid"
        data={scheduleData}
        pageSize={scheduleData.length}
        columns={columns}
        noDataText={props.isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
        showPagination={false}
      />
    </span>
  );
};

export default ScheduleEditGrid;
