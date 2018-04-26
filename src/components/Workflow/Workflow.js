import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import _isEqual from 'lodash/isEqual';

import { SvgiPlus, SvgiCancel } from '../SVGIcons';
import {
  getUploadMetricWorkFlow,
  getScheduleWorkFlow,
  getMetricPlanWorkFlow,
  getUserRequestWorkFlow
} from '../../actions/WorkFlowManagerActions';

class Workflow extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      workflowList: []
    };
  }

  componentWillMount() {
    const { type, requestId } = this.props.params;
    if (type === 'upload') {
      this.props.dispatch(getUploadMetricWorkFlow(requestId));
    } else if (type === 'metricreport' || type === 'MetricMaintenance' || type === 'MetricReportReview'
      || type === 'MetricReportReopen' || type === 'MetricFDASubmission') {
      this.props.dispatch(getMetricPlanWorkFlow(requestId));
    } else if (type === 'Schedule') {
      this.props.dispatch(getScheduleWorkFlow(requestId));
    } else if (type === 'UserRequest') {
      this.props.dispatch(getUserRequestWorkFlow(requestId));
    }
  }

  goBack = () => {
    const { type, requestId } = this.props.params;
    if (type === 'upload') {
      this.context.router.push('/UploadMetric');
    } else if (type === 'Schedule') {
      this.context.router.push('/Schedule');
    } else if (type === 'metricreport') {
      this.context.router.push('/MetricReport');
    } else if (type === 'MetricMaintenance') {
      this.context.router.push('/MetricMaintenance');
    } else if (type === 'MetricReportReview') {
      this.context.router.push('/MetricReportReview');
    } else if (type === 'MetricReportReopen') {
      this.context.router.push('/MetricReportReopen');
    } else if (type === 'MetricFDASubmission') {
      this.context.router.push('/MetricFDASubmission');
    } else if (type === 'UserRequest') {
      this.context.router.push('/UserRequest');
    }
  }

  render() {
    const { workflowList, isWorkFlowLoading } = this.props.workFlowManager;
    const columns = [
      {
        Header: 'Created By',
        accessor: 'createdBy'
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY')
      },
      {
        Header: 'From (Status)',
        accessor: 'fromStatus'
      },
      {
        Header: 'Action Taken',
        accessor: 'action'
      },
      {
        Header: 'Comment',
        accessor: 'comment'
      }
    ];

    return (
      <div className="box box-primary">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>View Workflow</p>
        </Row>
        <ReactTable
          data={workflowList}
          pageSize={workflowList.length}
          columns={columns}
          noDataText={isWorkFlowLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
          showPagination={false}
        />
        <Row className="show-grid padding-top">
          <Col xs={12} md={6} className="text-right">
            <RaisedButton
              label="Back"
              className="buttonStyle"
              icon={<SvgiCancel />}
              onTouchTap={this.goBack}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { workFlowManager: state.workFlowManager };
}

export default connect(mapStateToProps)(Workflow);
