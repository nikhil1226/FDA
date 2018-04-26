import { combineReducers } from 'redux';

import schedules from './SchedulesReducer';
import scheduleManager from './SchedulesManagerReducer';
import global from './GlobalReducer';
import uploadManager from './UploadManagerReducer';
import metricsManager from './MetricsManagerReducer';
import workFlowManager from './WorkFlowManagerReducer';
import login from './LoginReducer';
import auditTrialManager from './AuditTrialManagerReducer';
import metricMaintenanceManager from './MetricMaintenanceManagerReducer';
import reviewers from './ReviewerReducer';
import metricReportReview from './MetricReportReviewReducer';
import metricReportReopen from './MetricReportReopenReducer';
import userManager from './UserManagerReducer';

export default combineReducers({
  schedules,
  scheduleManager,
  global,
  uploadManager,
  metricsManager,
  workFlowManager,
  login,
  auditTrialManager,
  reviewers,
  metricMaintenanceManager,
  metricReportReview,
  metricReportReopen,
  userManager
});
