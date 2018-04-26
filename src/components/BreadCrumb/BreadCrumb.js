import React from 'react';
import { connect } from 'react-redux';

class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  render() {
    const pathArr = this.props.location.pathname.split('/').filter(Boolean);
    const breadCrumbCont = (
      <div
        className={this.props.location.pathname === '/'
          ? 'HomeNavBar'
          : 'sub-navbar'}
      >
        <ul className="breadcrumbs">
          <li>
            <a href="/#/home" className="breadcrumbs-item">EQARP HUB</a>
          </li>
          {pathArr[0] !== 'UploadMetric' && pathArr[1] !== 'upload' && <li>
            <a href="/#/home" className="breadcrumbs-item">FDA Quality Metrics</a>
          </li>}
          {(pathArr[0] === 'UploadMetric' || pathArr[1] === 'upload') && <li>
            <a href="/#/home" className="breadcrumbs-item">Upload FDA Metrics</a>
          </li>}

          { /* Upload Metric */ }
          {pathArr.length > 1 && pathArr[0] === 'UploadMetric' && pathArr[1] === 'add' && <li>
            <span href="/#/UploadMetric/add" className="breadcrumbs-item active">Create</span>
          </li>}
          { pathArr.length > 1 && pathArr[0] === 'UploadMetric' && pathArr[1] === 'Modify' && <li>
            <span href="/#/UploadMetric/Modify" className="breadcrumbs-item active">Modify</span>
          </li>}
          {pathArr[0] === 'workflow' && pathArr[1] === 'upload' && <li>
            <span href="/#/workflow/upload/" className="breadcrumbs-item active">Workflow</span>
          </li>}

          { /* Schedule */ }
          {(pathArr[0] === 'Schedule' || (pathArr[0] === 'workflow' && pathArr[1] === 'Schedule')) && <li>
            <a href="/#/Schedule" className="breadcrumbs-item">Schedule</a>
          </li>}
          {((pathArr[0] === 'Schedule' && pathArr[1] === 'Add') || pathArr[1] === 'Add_step2') && <li>
            <span href="/#/Schedule/Add" className="breadcrumbs-item active">Create</span>
          </li>}
          {pathArr[2] !== 'Scope' && pathArr[0] === 'Schedule' && pathArr[1] === 'Modify' && <li>
            <span href="/#/Schedule/Modify" className="breadcrumbs-item active">Modify Schedule </span>
          </li>}
          {pathArr[0] === 'Schedule' && pathArr[1] === 'Modify' && pathArr[2] === 'Scope' && <li>
            <span href="/#/Schedule/Modify/Scope" className="breadcrumbs-item active">Modify Scope </span>
          </li>}
          { pathArr[0] === 'Schedule' && pathArr[1] === 'View' && localStorage.getItem('role') === 'GPC' && <li>
            <span href="/#/Schedule/View" className="breadcrumbs-item active">View Schedule </span>
          </li>}
          {pathArr[0] === 'Schedule' && pathArr[1] === 'View' && localStorage.getItem('role') === 'SPC' && <li>
            <span href="/#/Schedule/View" className="breadcrumbs-item active">View Scope </span>
          </li>}
          {pathArr[0] === 'Schedule' && pathArr[1] === 'View' && localStorage.getItem('role') === 'SPR' && <li>
            <span href="/#/Schedule/View" className="breadcrumbs-item active">View Scope </span>
          </li>}

          {pathArr[0] === 'workflow' && pathArr[1] === 'Schedule' && <li>
            <span href="/#/workflow/Schedule" className="breadcrumbs-item active">Workflow </span>
          </li>}

          { /* Metric Report */ }
          {(pathArr[0] === 'MetricReport' || pathArr[1] === 'metricreport') && <li>
            <a href="/#/MetricReport" className="breadcrumbs-item">Metric Plan Report</a>
          </li>}
          {pathArr[0] === 'MetricReport' && pathArr[1] === 'Modify' && <li>
            <span href="/#/MetricReport/Modify" className="breadcrumbs-item active">Modify Plan</span>
          </li>}
          {pathArr[0] === 'MetricReport' && pathArr[1] === 'view' && <li>
            <span href="/#/MetricReport/view" className="breadcrumbs-item active">View Metric</span>
          </li>}
          {pathArr[0] === 'MetricReport' && (pathArr[1] === 'add' || pathArr[1] === 'add_step2') && <li>
            <span href="/#/MetricReport/add" className="breadcrumbs-item active">Create</span>
          </li>}
          {pathArr[0] === 'workflow' && pathArr[1] === 'metricreport' && <li>
            <span href="/#/workflow/metricreport" className="breadcrumbs-item active">Workflow</span>
          </li>}

          { /* Metric Report Maintenance */ }
          {(pathArr[0] === 'MetricMaintenance' || (pathArr[0] === 'workflow' && pathArr[1] === 'MetricMaintenance')) && <li>
            <a href="/#/MetricMaintenance" className="breadcrumbs-item">Metric Report Maintenance</a>
          </li>}
          {pathArr[0] === 'MetricMaintenance' && pathArr[1] === 'Modify' && <li>
            <span href="/#/" className="breadcrumbs-item active">Modify Report Metric</span>
          </li>}
          {pathArr[0] === 'MetricMaintenance' && pathArr[1] === 'View' && <li>
            <span href="/#/" className="breadcrumbs-item active">View Report Metric</span>
          </li>}
          {pathArr[0] === 'MetricMaintenance' && pathArr[1] === 'DetailView' && <li>
            <span href="/#/" className="breadcrumbs-item active">Detail View Report Metric</span>
          </li>}
          {pathArr[0] === 'workflow' && pathArr[1] === 'MetricMaintenance' && <li>
            <span href="/#/" className="breadcrumbs-item active">Workflow</span>
          </li>}

          { /* Metric Report ReOpen */ }
          {(pathArr[0] === 'MetricReportReopen' || (pathArr[0] === 'workflow' && pathArr[1] === 'MetricReportReopen')) && <li>
            <a href="/#/MetricReportReopen" className="breadcrumbs-item">Metric Report ReOpen</a>
          </li>}

          { /* User Access Request Mgt */ }
          {(pathArr[0] === 'UserRequest' || (pathArr[0] === 'workflow' && pathArr[1] === 'UserRequest')) && <li>
            <a href="/#/UserRequest" className="breadcrumbs-item">User Access Request </a>
          </li>}
        </ul>
      </div>
    );
    return (
      <div>
        { breadCrumbCont }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { globals: state.global };
}

export default connect(mapStateToProps)(BreadCrumb);
