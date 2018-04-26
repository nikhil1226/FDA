import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import { Row, Col } from 'react-bootstrap';
import _filter from 'lodash/filter';

import { DayPickerField, SelectBoxField, TextAreaField } from '../FormInputs/';

const MetricReportEditGrid = props => {
  const { metricData, isLoading } = props;
  let columns = '';
  if (metricData.length) {
    const { startDate, endDate, sitePlanReviewer } = metricData[0];
    columns = [
      {
        Header: 'Metric Report Description',
        accessor: 'description',
        maxWidth: 210,
        Cell: row => (
          <div>
            {!props.isReadOnly && <TextAreaField
              onDisabled={props.onDisable}
              onHintText="Description"
              onValue={row.value}
              onChange={props.onUpdateDescriptionText}
            />}
            {props.isReadOnly && <span>{row.value}</span>}
          </div>
        )
      },
      {
        Header: 'Schedule ID',
        accessor: 'scheduleId',
        maxWidth: 103
      },
      {
        Header: 'Site',
        accessor: 'site',
        maxWidth: 103
      },
      {
        Header: 'Plant Code',
        accessor: 'plantCode',
        maxWidth: 100
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        maxWidth: 110,
        Cell: row => (
          <DayPickerField
            onDisabled={props.onDisable}
            onModifyDate={props.onModifyStartDate}
            dateValue={startDate}
            id={'startDate'}
            onShowPastDate
          />
        )
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        maxWidth: 110,
        Cell: row => (
          <DayPickerField
            onDisabled={props.onDisable}
            onModifyDate={props.onModifyEndDate}
            dateValue={endDate}
            id={'endDate'}
            onShowPastDate
          />
        )
      },
      {
        Header: 'Metrics Included',
        accessor: 'metricsIncluded',
        minWidth: 185,
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
              onDisabled={props.onMetricesDisable}
              onKeepOpenOnSelection={props.onSelectKeepDropDownOpen}
            />}
            {props.isReadOnly && <span>{row.original.metricIncludedList}</span>}
          </div>
        )
      },
      {
        Header: 'Author',
        accessor: 'authorName',
        minWidth: 100
      },
      {
        Header: 'Site Plan Reviewer',
        accessor: 'sitePlanReviewer',
        minWidth: 156,
        Cell: row => (
          <div>
            {!props.isReadOnly && <SelectBoxField
              palceHolder="Select Site Plan Reviewer"
              onDataSource={row.value}
              onOptionValueKey="userId"
              onOptionLabelKey="userName"
              onChange={props.onUpdatesPlanReviewer}
              onInitialValue={_filter(row.value, ['checked', true])}
              onDisabled={props.onDisable}
              onMultiple={(row.original.sitePlanReviewer.length > 0) ? false : !false}
              onKeepOpenOnSelection={props.onSelectKeepDropDownOpen}
            />}
            {props.isReadOnly && <span>{row.original.siteplancoordinator}</span>}
          </div>
        )
      },
      {
        Header: 'Site Reviewer',
        accessor: 'siteReviewer',
        minWidth: 150,
        Cell: row => (
          <div>
            {!props.isReadOnly && <SelectBoxField
              palceHolder="Select Reviewer"
              onDataSource={row.value}
              onOptionValueKey="userId"
              onOptionLabelKey="userName"
              onChange={props.onUpdatesSiteReviewer}
              onInitialValue={_filter(row.value, ['checked', true])}
              onMultiple={!false}
              onDisabled={props.onDisable}
              onKeepOpenOnSelection={props.onSelectKeepDropDownOpen}
            />}
            {props.isReadOnly && <span>{row.original.sitereviewer}</span>}
          </div>
        )
      },
      {
        Header: 'Site QA Reviewer',
        accessor: 'siteQAReviewer',
        minWidth: 165,
        Cell: row => (
          <div>
            {!props.isReadOnly && <SelectBoxField
              palceHolder="Select QA Reviewer"
              onDataSource={row.value}
              onOptionValueKey="userId"
              onOptionLabelKey="userName"
              onChange={props.onUpdatesSiteQAReviewer}
              onInitialValue={_filter(row.value, ['checked', true])}
              onMultiple={!false}
              onDisabled={props.onDisable}
              onKeepOpenOnSelection={props.onSelectKeepDropDownOpen}
            />}
            {props.isReadOnly && <span>{row.original.siteqareviewer}</span>}
          </div>
        )
      }
    ];
  }
  return (
    <span>
      <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
        <p>{props.pageTitle}  Metric Report Plan </p>
      </Row>
      {props.metricData.length ?
        <ReactTable
          className="-striped -highlight scheduleGrid"
          data={props.metricData}
          pageSize={props.metricData.length}
          columns={columns}
          noDataText={props.isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
          showPagination={false}
        /> :
        <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" />
      }
    </span>
  );
};

export default MetricReportEditGrid;
