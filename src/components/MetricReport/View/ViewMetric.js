import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactLoading from 'react-loading';
import _filter from 'lodash/filter';
import ReactTable from 'react-table';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactSuperSelect from 'react-super-select';
import RaisedButton from 'material-ui/RaisedButton';
import { resetMetricData, getViewMetricData } from '../../../actions/MetricsManagerActions';
import { SvgiPlus, SvgiCancel } from '../../SVGIcons';
import MetricReportEditGrid from '../../Grid/MetricReportEditGrid';

class ViewMetric extends React.Component {
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
      disable: true,
      isReadOnly: true,
      selectKeepDropDownOpen: true
    };
  }
  componentWillMount() {
    this.props.dispatch(getViewMetricData(this.props.params.metricId));
  }

  redirectHomePage = () => {
    const pathArr = this.props.location.pathname.split('/').filter(Boolean);
    if (pathArr[0] === 'MetricReportReopen') {
      this.context.router.push('/MetricReportReopen');
    } else if (pathArr[0] === 'MetricFDASubmission') {
      this.context.router.push('/MetricFDASubmission');
    } else if (pathArr[0] === 'MetricReportReview') {
      this.context.router.push('/MetricReportReview');
    } else {
      this.context.router.push('/MetricReport');
    }
  }

  render() {
    const materialsColumns = [
      {
        Header: 'Material Number',
        accessor: 'materialNumber'
      },
      {
        Header: 'Material Description',
        accessor: 'materialDescription'
      },
      {
        Header: 'Processing Plant',
        accessor: 'processingPlant'
      },
      {
        Header: 'Material Type',
        accessor: 'materialType'
      },
      {
        Header: 'Brand',
        accessor: 'brand'
      },
      {
        Header: 'Brand Description',
        accessor: 'brandDesc'
      },
      {
        Header: 'Product NDC',
        accessor: 'productNdc'
      }
    ];

    return (
      <div className="box box-primary CreateSchdule">
        <div className="padding modifyScheduleWrap">
          <MetricReportEditGrid
            pageTitle={'View'}
            isReadOnly={this.state.isReadOnly}
            isLoading={this.props.metricsManager.viewMetricLoaded}
            metricData={this.props.metricsManager.viewMetricReportList}
            onDisable={this.state.disable}
            onMetricesDisable={this.state.disable}
            onSelectKeepDropDownOpen={this.state.selectKeepDropDownOpen}
          />
          <div className="padding-vertical">
            <Row className="padding">
              <h3>Selected Materials</h3>
            </Row>
            <ReactTable
              id="selectedMaterialList"
              className="fixed-table -striped -highlight ListofProducts"
              data={this.props.metricsManager.selectedMaterialsList}
              columns={materialsColumns}
              noDataText={this.props.metricsManager.viewMetricLoaded ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No Materials Found!'}
              {...this.state.tableOptions}
              pageSize={this.props.metricsManager.selectedMaterialsList.length}
            />
            <Row className="padding">
              <h3>Deleted Materials</h3>
            </Row>

            <ReactTable
              id="removeMaterialList"
              className="fixed-table -striped -highlight ListofProducts"
              data={this.props.metricsManager.removedMaterialsList}
              columns={materialsColumns}
              noDataText={this.props.metricsManager.viewMetricLoaded ? <ReactLoading type="spin" color="rgb(4, 96, 169)" className="reactLoadingIcon" /> : 'No Materials Found!'}
              {...this.state.tableOptions}
              pageSize={this.props.metricsManager.removedMaterialsList.length}
            />

            <Row className="show-grid padding-top">
              <Col xs={12} md={6} className="text-right">
                <RaisedButton
                  label="Back"
                  className="buttonStyle"
                  icon={<SvgiCancel />}
                  onTouchTap={this.redirectHomePage}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { metricsManager: state.metricsManager };
}

export default connect(mapStateToProps)(ViewMetric);
