import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Link, hashHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { getAuditFlow } from './../../actions/WorkFlowManagerActions';
import { SvgiDownload, SvgiCancel } from '../SVGIcons';

class Audit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBack: location.hash.split('?')[0] !== '#/'
    };
    this.hook = hashHistory.listenBefore(loc =>
        this.setState({
          showBack: loc.pathname !== '/'
        })
    );
  }
  componentWillUnmount() {
    this.hook();
  }
  render() {
    const columns = [
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'From Status',
        accessor: 'fromStatus'
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: row => moment(row.value).utc().format('DD-MMM-YYYY HH:mm:ss')
      },
      {
        Header: 'Old Value',
        accessor: 'oldValue'
      },
      {
        Header: 'New Value',
        accessor: 'newValue'
      },
      {
        Header: 'Person Responsible',
        accessor: 'createdBy'
      },
      {
        Header: 'Comments',
        accessor: 'comments'
      }
    ];
    const { auditListSchedule, isAuditLoading } = this.props.auditTrialManager;
    return (
      <div className="box box-primary">
        <Row className="show-grid margin-bottom text-center HeaderTitle header-size">
          <p>View Audit</p>
        </Row>
        <div className="metricDiv">
          <ReactTable
            data={auditListSchedule}
            defaultPageSize={auditListSchedule.length}
            columns={columns}
            noDataText={isAuditLoading ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No data Found!'}
            showPagination={false}
          />
        </div>
        <Row className="show-grid padding-top">
          <Col xs={12} md={12} className="text-center">
            <RaisedButton
              className="buttonStyle"
              label="Back"
              icon={<SvgiCancel />}
              onClick={() => hashHistory.goBack()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auditTrialManager: state.auditTrialManager };
}

export default connect(mapStateToProps)(Audit);
