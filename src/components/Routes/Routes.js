import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Audit from '../Audit/Audit';
import Workflow from '../Workflow/Workflow';

import LoginComponent from '../Login/login';
import NewUser from '../NewUser/NewUser';

import ScheduleHome from '../Schedule/Home/ScheduleHome';
import ScheduleReopen from '../Schedule/Reopen/ScheduleReopen';
import ScheduleAdd from '../Schedule/Add/AddSchedule';
import ScheduleAddStep2 from '../Schedule/Add/AddScheduleStep2';
import ScheduleModify from '../Schedule/ModifySchedule/ModifySchedule';
import ScheduleModifyScope from '../Schedule/ModifyScope/ModifyScope';
import ScheduleView from '../Schedule/View/ViewSchedule';

import UploadMetricHome from '../UploadMetric/Home/UploadMetricHome';
import UploadMetricAdd from '../UploadMetric/Add/AddUploadMetric';
import UploadMetricModify from '../UploadMetric/Modify/ModifyUploadMetric';
import UploadMetricReopen from '../UploadMetric/Reopen/UploadMetricReopen';
import ViewUploadMetric from '../UploadMetric/View/ViewUploadMetric';

import MetricReportHome from '../MetricReport/Home/MetricsHome';
import MetricReportAdd from '../MetricReport/Add/AddMetric';
import MetricReportAddStep2 from '../MetricReport/Add/AddMetricStep2';
import MetricReportModify from '../MetricReport/Modify/ModifyMetric';
import MetricReportView from '../MetricReport/View/ViewMetric';

import MetricMaintenance from '../MetricMaintenance/Home/MetricMaintenance';
import ModifyMetric from '../MetricMaintenance/Modify/ModifyMetric';
import ViewMetricMaintenance from '../MetricMaintenance/View/ViewMetricMaintenance';
import DetailViewMetricMaintenance from '../MetricMaintenance/View/DetailViewMetricMaintenance';
import MetricReportReview from '../MetricReportReview/Home/MetricReportReview';
import ModifyMetricReportReview from '../MetricReportReview/Modify/ModifyMetricReportReview';
import MetricReportReopen from '../MetricReportReopen/Home/MetricReportReopen';

import AddReviewer from '../Reviewer/Home/Home';
import MetricFDASubmission from '../MetricFDASubmission/Home/MetricFDASubmission';

import UserRequest from '../UserRequest/Home/UserRequest';
import UserRequestAdmin from '../UserRequest/Admin/UserRequestAdmin';

class Routes extends React.Component {
  loggedIn = () => {
    const isAuthenticate = localStorage.getItem('isAuthenticated');
    if (isAuthenticate && isAuthenticate !== 'false') {
      return true;
    }
    return false;
  }

  requireAuth = (nextState, replace) => {
    if (!this.loggedIn()) {
      replace({ pathname: '/' });
    }
    if (this.loggedIn() && localStorage.getItem('setupTime')) {
      const now = new Date().getTime();
      const setupTime = parseInt(localStorage.getItem('setupTime'), 10) + parseInt(20 * 60 * 1000, 10);
      if (now > setupTime) {
        localStorage.clear();
        replace({ pathname: '/' });
      } else {
        localStorage.setItem('setupTime', now);
      }
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={LoginComponent} />
          <Route path="login" name="login" component={LoginComponent} />
          <Route path="NewUser" name="NewUser" component={NewUser} />
          <Route path="home" name="Home" component={Home} onEnter={this.requireAuth} />
          <Route path="audit" name="audit" component={Audit} onEnter={this.requireAuth} />
          <Route path="workflow(/:type/:requestId)" name="workflow" component={Workflow} onEnter={this.requireAuth} />

          <Route path="Schedule" >
            <IndexRoute component={ScheduleHome} onEnter={this.requireAuth} />
            <Route path="Home" name="schedulehome" component={ScheduleHome} onEnter={this.requireAuth} />
            <Route path="Add" name="ScheduleAdd" component={ScheduleAdd} onEnter={this.requireAuth} />
            <Route path="Add_step2" name="ScheduleAddStep2" component={ScheduleAddStep2} onEnter={this.requireAuth} />
            <Route path="Modify/:scheduleId" name="ScheduleModify" component={ScheduleModify} onEnter={this.requireAuth} />
            <Route path="Modify/Scope/:scheduleId" name="ScheduleModifyScope" component={ScheduleModifyScope} onEnter={this.requireAuth} />
            <Route path="View/:scheduleId" name="scheduleview" component={ScheduleView} onEnter={this.requireAuth} />
          </Route>

          <Route path="ScheduleReopen" >
            <IndexRoute component={ScheduleReopen} onEnter={this.requireAuth} />
            <Route path="home" component={ScheduleReopen} onEnter={this.requireAuth} />
            <Route path="View/:scheduleId" name="scheduleview" component={ScheduleView} onEnter={this.requireAuth} />
          </Route>

          <Route path="UploadMetric" >
            <IndexRoute component={UploadMetricHome} onEnter={this.requireAuth} />
            <Route path="Home" name="uploadmetrichome" component={UploadMetricHome} onEnter={this.requireAuth} />
            <Route path="Add" name="uploadmetricadd" component={UploadMetricAdd} onEnter={this.requireAuth} />
            <Route path="Modify/:metricId" name="uploadmetricmodify" component={UploadMetricModify} onEnter={this.requireAuth} />
          </Route>

          <Route path="UploadMetricReopen" >
            <IndexRoute component={UploadMetricReopen} onEnter={this.requireAuth} />
            <Route path="View/:metricId" name="UploadMetricView" component={ViewUploadMetric} onEnter={this.requireAuth} />
          </Route>

          <Route path="MetricReport" >
            <IndexRoute component={MetricReportHome} onEnter={this.requireAuth} />
            <Route path="home" component={MetricReportHome} onEnter={this.requireAuth} />
            <Route path="add" component={MetricReportAdd} onEnter={this.requireAuth} />
            <Route path="add_step2" component={MetricReportAddStep2} onEnter={this.requireAuth} />
            <Route path="Modify/:metricId" component={MetricReportModify} onEnter={this.requireAuth} />
            <Route path="view/:metricId" component={MetricReportView} onEnter={this.requireAuth} />
          </Route>

          <Route path="MetricMaintenance" >
            <IndexRoute component={MetricMaintenance} onEnter={this.requireAuth} />
            <Route path="home" component={MetricMaintenance} onEnter={this.requireAuth} />
            <Route path="Modify/:metricId" component={ModifyMetric} onEnter={this.requireAuth} />
            <Route path="View/:metricId" component={ViewMetricMaintenance} onEnter={this.requireAuth} />
            <Route path="DetailView/:metricId" component={DetailViewMetricMaintenance} onEnter={this.requireAuth} />
          </Route>

          <Route path="MetricReportReview" >
            <IndexRoute component={MetricReportReview} onEnter={this.requireAuth} />
            <Route path="home" component={MetricReportReview} onEnter={this.requireAuth} />
            <Route path="Modify/:metricId" component={ModifyMetricReportReview} onEnter={this.requireAuth} />
            <Route path="View/:metricId" component={ViewMetricMaintenance} onEnter={this.requireAuth} />
            <Route path="DetailView/:metricId" component={DetailViewMetricMaintenance} onEnter={this.requireAuth} />
          </Route>

          <Route path="MetricReportReopen" >
            <IndexRoute component={MetricReportReopen} onEnter={this.requireAuth} />
            <Route path="home" component={MetricReportReopen} onEnter={this.requireAuth} />
            <Route path="view/:metricId" component={MetricReportView} onEnter={this.requireAuth} />
          </Route>

          <Route path="Reviewer" >
            <IndexRoute component={AddReviewer} onEnter={this.requireAuth} />
            <Route path="home" component={AddReviewer} onEnter={this.requireAuth} />
          </Route>

          <Route path="MetricFDASubmission" >
            <IndexRoute component={MetricFDASubmission} onEnter={this.requireAuth} />
            <Route path="home" component={MetricFDASubmission} onEnter={this.requireAuth} />
            <Route path="view/:metricId" component={MetricReportView} onEnter={this.requireAuth} />
          </Route>

          <Route path="UserRequest" >
            <IndexRoute component={UserRequest} onEnter={this.requireAuth} />
            <Route path="home" component={UserRequest} onEnter={this.requireAuth} />
            <Route path="Admin" component={UserRequestAdmin} onEnter={this.requireAuth} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default Routes;
