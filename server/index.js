import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConnectionPool from 'tedious-connection-pool';
import { Connection, Request, TYPES } from 'tedious';
import NodeSSPI from 'node-sspi';
import * as sitesRouter from './routes/sites';
import * as productsRouter from './routes/products';
import * as schedulesRouter from './routes/schedules';
import * as getSchedulesRouter from './routes/getSchedules';
import * as uploadMetricRouter from './routes/uploadMetric';
import * as metricReportRouter from './routes/metricReport';
import * as metricMaintenanceRouter from './routes/metricMaintenance';
import * as reviewerRouter from './routes/reviewer';
import * as metricReportReviewRouter from './routes/metricReportReview';
import * as metricReportReopenRouter from './routes/metricReportReopen';
// @sp
import * as metricRouter from './routes/metrics';
import * as getSchedulesAuditRouter from './routes/getSchedulesAudit';
import * as getUserAuthRouter from './routes/getUserAuth';
import * as userRouter from './routes/user';
import * as mail from './helpers/mailer';

import pool from './helpers/db';

const app = express();
app.use(cors());

const router = express.Router();

// Site's Routes
router.get('/getSiteList/:role/:userId', sitesRouter.getSitesForUser);

// @sp metric's Routes
router.get('/getAllMetric', metricRouter.findAll);
router.get('/getAllMetricIncludes', metricRouter.findAll);

// User Login Auth
router.post('/users/loginAuth', getUserAuthRouter.getLoginAuth);
// User ldap Authenticate
router.get('/users/ldap/authenticate', getUserAuthRouter.authenticateUserByLDAP);

// NEW USER
router.post('/users', userRouter.create);
router.put('/users/status', userRouter.statusUpdate);
router.get('/users/requestLists/id/:userid', userRouter.getAllUserRequest);
router.get('/users/:recordId/workFlow', userRouter.getWorkFlow);
router.get('/users/getAllApplicationHeader', userRouter.getAllApplicationHeader);
router.get('/users/getAllLevelLists/applicationRecordId/:applicationRecordId/isGlobal/:isGlobal', userRouter.getAllApplicationObjLevel);
router.post('/users/novartisLoginAuth', getUserAuthRouter.checkNovartisUserLogin);
// Produtcs router
router.get('/getProducts/site/:siteid', productsRouter.findBySiteID);
router.get('/getMaterialsBySite', productsRouter.getAllMaterials);

// Schedules router
router.post('/schedules', schedulesRouter.create);
router.put('/schedules', schedulesRouter.update);
router.get('/schedules/id/:scheduleid/:type', schedulesRouter.findByID);
router.post('/schedules/status', schedulesRouter.statusUpdate);
router.get('/schedules/site/:siteid', schedulesRouter.findBySiteID);
router.get('/schedules/:scheduleid/WorkFlow', schedulesRouter.getWorkFlow);
// Scope Update
router.post('/schedules/scopeUpdate', schedulesRouter.updateScheduleScope);
router.get('/schedules/approvalStatus/:scheduleId', schedulesRouter.getSentForApprovalStatus);

router.get('/schedules/role/:role/id/:userid', getSchedulesRouter.findByRole);
router.get('/schedules/reopen/role/:role/id/:userid', getSchedulesRouter.findByReopenRole);
router.get('/schedules/materials/:scheduleid', getSchedulesRouter.getProductsMaterials);
router.get('/audit/:id', getSchedulesAuditRouter.findSheduleAuditById);
router.get('/scheduleAuditCreate', getSchedulesAuditRouter.createScheduleAudit);

// upload Metric
router.post('/uploadMetric', uploadMetricRouter.create);
router.get('/uploadMetric/role/:role/id/:userId', uploadMetricRouter.findByRole);
router.get('/uploadMetric/uploadRequestId/:uploadRequestId', uploadMetricRouter.findById);
router.post('/uploadMetric/modifyUploadMetric', uploadMetricRouter.update);
router.post('/uploadMetric/uploadMetricAction', uploadMetricRouter.updateStatus);
router.post('/uploadMetric/updateReopenStatus', uploadMetricRouter.updateReopenStatus);
router.post('/uploadMetric/modifyMetricData', uploadMetricRouter.updateMetricData);
router.post('/uploadMetric/removeMetricData', uploadMetricRouter.removeMetricData);
router.post('/uploadMetric/modifySitePlantMaintenanceData', uploadMetricRouter.updateSitePlantMaintenanceData);
router.post('/uploadMetric/removeSitePlantMaintenanceData', uploadMetricRouter.removeSitePlantMaintenanceData);
router.get('/uploadMetric/getAllMetricTypeList', uploadMetricRouter.getAllMetricTypeList);
router.get('/uploadMetric/uploadSiteApprover/siteId/:siteId/objectId/:objectId', uploadMetricRouter.getUploadSiteApprover);
router.get('/uploadMetric/uploadMetricWorkFlow', uploadMetricRouter.getUploadMetricWorkFlow);
router.get('/uploadMetric/getApplicationHeader/userId/:userId', uploadMetricRouter.getAllApplicationHeader);
router.get('/uploadMetric/getGlobalUploadApprover', uploadMetricRouter.getGlobalUploadApprover);
router.post('/uploadMetric/validation/SI03AIPCStabilityTests', uploadMetricRouter.SI03AIPCStabilityTestsValidation);

// MetricReport
router.post('/metricReport', metricReportRouter.create);
router.get('/metricReport/role/:role/id/:userId', metricReportRouter.findByRole);
router.get('/metricReport/metricId/:metricId', metricReportRouter.findById);
router.post('/metricReport/status', metricReportRouter.statusUpdate);
router.get('/metricReport/:metricReportId/WorkFlow', metricReportRouter.getWorkFlow);
router.get('/metricReport/materials/site/:siteId', metricReportRouter.findMaterialsBySite);
router.get('/metricReport/materials/schedule/:scheduleId', metricReportRouter.findMaterialsBySchedule);
router.put('/metricReport', metricReportRouter.update);
router.post('/metricReport/linkScheduleNewMetricReport', metricReportRouter.getScheduleandNewMetricReport);
router.get('/metricReport/linkSchedules/metricId/:metricId', metricReportRouter.getLinkedScheduleToMetricReport);

// Populate Excel Report
router.get('/populateExcelReport/metricId/:metricId/userId/:userId/randId/:randId', metricMaintenanceRouter.populateExcelReport);

// Metric Maintenance
router.post('/metricMaintenance/createReport', metricMaintenanceRouter.createReport);
router.get('/metricMaintenance/metricId/:metricId', metricMaintenanceRouter.findById);
router.get('/metricMaintenance/populateScope/:metricId', metricMaintenanceRouter.findPopulateScope);
router.get('/metricMaintenance/populateAcceptance/:metricId', metricMaintenanceRouter.findPopulateAcceptance);
router.get('/metricMaintenance/populateNTRSData/:metricId', metricMaintenanceRouter.findPopulateNTRSData);
router.get('/metricMaintenance/populateIOORSData/:metricId', metricMaintenanceRouter.findPopulateIOORSData);
router.get('/metricMaintenance/populatePQCData/:metricId', metricMaintenanceRouter.findPopulatePQCData);
router.get('/metricMaintenance/populateTDUDData/:metricId', metricMaintenanceRouter.findPopulateTDUDData);
router.get('/metricMaintenance/populateBatchMaintenance/:metricId', metricMaintenanceRouter.findPopulateBatchMaintenance);
router.put('/metricMaintenance/updateKPIRecord', metricMaintenanceRouter.updateKPIRecord);
router.post('/metricMaintenance/saveComment', metricMaintenanceRouter.saveComment);
router.get('/metricMaintenance/comment/:metricId', metricMaintenanceRouter.findCommentByMetricId);
router.put('/metricMaintenance/status', metricMaintenanceRouter.statusUpdate);
router.post('/metricMaintenance/linkSchedule', metricMaintenanceRouter.getLinkSchedule);
router.put('/metricMaintenance/updateScheduleLink', metricMaintenanceRouter.updateScheduleLink);

// reviewer
router.get('/reviewer/metricReport/role/:role/id/:userId', reviewerRouter.getMetricesReviewer);
router.post('/reviewer/addRemoveGlobalReviewer', reviewerRouter.getAddRemoveGlobalReviewer);
router.post('/reviewer/addRemoveSitePlanReviewer', reviewerRouter.getAddRemoveSitePlanReviewer);
router.post('/reviewer/addRemoveSiteQAReviewer', reviewerRouter.getAddRemoveSiteQAReviewer);
router.post('/reviewer/addRemoveSiteReviewer', reviewerRouter.getAddRemoveSiteReviewer);
router.put('/reviewer/updateRoleModification', reviewerRouter.updateRoleModification);

// Metric Report Review
router.post('/metricReportReview/status', metricReportReviewRouter.updateStatus);

router.post('/metricReportReopen/status', metricReportReopenRouter.updateStatus);
router.get('/metricReportReopen/latestComments/id/:impactedRecordId', metricReportReopenRouter.getLatestReopenComment);


// Stored Procedures
// Site's Routes
router.get('/GetSiteListByApplicationId/objectId/:objectId/appObjectId/:appObjectId', sitesRouter.findByApplicationId);

// Send Email Test
router.get('/SentMail', mail.sendTestmail);


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

const nodeSSPIObj = new NodeSSPI({
  retrieveGroups: true
});

/* eslint-disable */
app.use((req, res, next) => {
  if (req.url === '/rest/User/ldap/authenticate') {
    nodeSSPIObj.authenticate(req, res, function (err) {
      if (err) console.log(err, 'err');
      console.log(res.finished, 'res.finished');
      res.finished || next();
    });
  } else {
    next();
  }
});

app.use('/rest', router);

app.listen(process.env.PORT || 3008);
