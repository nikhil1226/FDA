import React, { PropTypes } from 'react';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import _findIndex from 'lodash/findIndex';
import _toNumber from 'lodash/toNumber';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ReactTableCustom from './ReactTableCustom';

class MetricReportGrid extends React.Component {
  handleMetricSelect = (row) => {
    this.props.onHandleMetricSelect(row);
  }

  handleMetricIdClick = (row) => {
    const { pageAction } = this.props;
    this.props.onHandleMetricIdClick(row);
  }

  editMetric = (row) => {
    this.props.onEditMetric(row);
  }

  deleteSingleMetric = (id, statusId) => {
    this.props.onDeleteSingleMetric(id, statusId);
  }

  linkSchedule = (siteId, metricesId) => {
    this.props.onlinkSchedule(siteId, metricesId);
  }

  viewComments = (row) => {
    this.props.onViewComments(row);
  }

  handleViewSchedule = (metricID) => {
    this.props.onhandleViewSchedule(metricID);
  }

  showActionColumn = () => {
    const { pageAction } = this.props;
    let res = true;
    if (localStorage.getItem('role') === 'SM' && pageAction === 'MetricFDASubmission') {
      res = true;
    }
    if ((localStorage.getItem('role') === 'GBM' || localStorage.getItem('role') === 'GBR') && pageAction === 'metricMaintenance') {
      res = false;
    }
    return res;
  }

  renderActionColumn = row => {
    let resActionCol = '';
    const { pageAction } = this.props;
    if (pageAction === 'metricHome') {
      resActionCol = (
        <div
          style={{
            textAlign: 'center'
          }}
        >
          {row.original.statusCode !== '34' && row.original.statusCode !== '35' && row.original.statusCode !== '36' &&
            <IconButton
              className="editActionButton"
              tooltip="Modify Plan Metric"
              onClick={() => this.editMetric(row.original)}
            >
              <FontIcon className="fa fa-pencil-square-o" />
            </IconButton>
          }

          {row.original.statusCode !== '34' && row.original.statusCode !== '35' && row.original.statusCode !== '36' && localStorage.getItem('role') !== 'SPR' &&
            <IconButton
              tooltip="Delete"
              className="actionButtons"
              onClick={() => this.deleteSingleMetric(row.original.metricesId, row.original.statusCode)}
            >
              <FontIcon className="fa fa-minus-circle" />
            </IconButton>
          }
        </div>
      );
    } else if (pageAction === 'metricMaintenance') {
      resActionCol = (
        <div
          style={{
            textAlign: 'center'
          }}
        >
          {((localStorage.getItem('role') === 'MPA' && row.original.statusCode !== '35') || localStorage.getItem('role') === 'SR' || localStorage.getItem('role') === 'SQAR') && <IconButton
            tooltip="Modify Report" className="actionButtons"
            onClick={() => this.editMetric(row.original)}
          >
            <FontIcon className="fa fa-pencil-square-o" />
          </IconButton>}
          {((localStorage.getItem('role') === 'MPA' && row.original.statusCode !== '35') || localStorage.getItem('role') === 'SM' || localStorage.getItem('role') === 'SR' || localStorage.getItem('role') === 'SQAR') && <IconButton
            tooltip="Link Schedule" className="actionButtons"
            onClick={() => this.linkSchedule(row.original.siteId, row.original.metricesId)}
          >
            <FontIcon className="fa fa-link" />
          </IconButton>}
        </div>
      );
    } else if (pageAction === 'metricReportReview') {
      resActionCol = (
        <div className="text-center">
          {(row.original.statusCode === '43') && localStorage.getItem('role') === 'GBR' &&
          <IconButton
            tooltip="Modify Report" className="actionButtons"
            onClick={() => this.editMetric(row.original)}
          >
            <FontIcon className="fa fa-pencil-square-o" />
          </IconButton>
          }
        </div>
      );
    } else if (pageAction === 'metricReportReopen') {
      resActionCol = (
        <div className="text-center">
          { localStorage.getItem('role') === 'GBM' && <IconButton
            tooltip="View Comments"
            className="actionButtons"
            onTouchTap={() => this.viewComments(row.original.metricesId)}
          >
            <FontIcon className="fa fa-eye" />
          </IconButton>}
        </div>
      );
    }
    return resActionCol;
  }

  render() {
    const { pageAction } = this.props;
    const columns = [
      {
        Header: '',
        accessor: '',
        maxWidth: 30,
        Cell: (row, index) => (
          <Checkbox
            key={row.original.metricesId}
            className="gridCheckbox"
            onCheck={() => this.handleMetricSelect(row.original)}
            checked={row.value.checked}
          />
        )
      },
      {
        Header: 'Actions',
        show: (this.showActionColumn()),
        accessor: '',
        maxWidth: 100,
        Cell: row => (
          this.renderActionColumn(row)
        )
      },
      {
        Header: 'Metric Report ID',
        accessor: 'metricesId',
        headerClassName: 'header-class',
        maxWidth: 170,
        width: 170,
        Cell: row => (
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => this.handleMetricIdClick(row.original)}
          >
            {row.value}
          </span>
        )
      },
      {
        Header: 'Metric Report Description',
        accessor: 'metricDescription',
        maxWidth: 120
      },
      {
        Header: 'Schedule ID (Linked to)',
        accessor: 'scheduleId',
        maxWidth: 147,
        Cell: row => (
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
        )
      },
      {
        Header: 'SITE',
        accessor: 'site',
        maxWidth: 80
      },
      {
        Header: 'Start Date (Review)',
        accessor: 'startDate',
        maxWidth: 85,
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'End Date (Review)',
        accessor: 'endDate',
        maxWidth: 85,
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'Metrics Included',
        accessor: 'metricsIncluded',
        maxWidth: 260
      },
      {
        Header: 'Author',
        accessor: 'createdBy',
        maxWidth: 105
      },
      {
        Header: 'Site Plan Reviewer',
        accessor: 'siteplancoordinator',
        maxWidth: 150
      },
      {
        Header: 'Site Reviewer',
        accessor: 'sitereviewer',
        maxWidth: 105
      },
      {
        Header: 'Site QA Reviewer',
        accessor: 'siteqareviewer',
        maxWidth: 95
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'Status',
        accessor: 'status',
        maxWidth: 100
      }
    ];
    return (
      // test
      <ReactTable
        className="-striped -highlight scheduleGrid"
        data={this.props.data}
        pageSize={this.props.data.length}
        columns={columns}
        noDataText={this.props.isLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
        showPagination={false}
      />
    );
  }
}


export default MetricReportGrid;
