import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _extend from 'lodash/extend';
import _findIndex from 'lodash/findIndex';

import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';
import * as statusConstants from '../constants/MetricReport';

/*  Private Function Start */
function buildMatrialDetailsTVP(data) {
  const rowArr = [];
  _map(data, singleRecord => {
    const rowArrData = [];
    rowArrData.push(singleRecord.materialRecordId);
    rowArrData.push(singleRecord.materialRecordId.substring(3));
    rowArrData.push(singleRecord.productNdc);
    const materialFlag = (singleRecord.excluded) ? 0 : 1;
    rowArrData.push(materialFlag);
    rowArrData.push(singleRecord.comments);
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'MaterialRecordId', type: TYPES.VarChar },
      { name: 'MaterialRecord', type: TYPES.VarChar },
      { name: 'PRODUCTNDC', type: TYPES.VarChar },
      { name: 'MaterialFlag', type: TYPES.VarChar },
      { name: 'Comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  return table;
}

export function getMaterials(req, res, next, metricPlanData, usersData, metricsData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_Materials_ByMetricID', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('merticID', TYPES.VarChar, metricPlanData[0].metricesId);   
    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        const materials = util.tediousResultToJSON(rows);
        const {
          metricsIncludedIDs, sitereviewerIDs, siteplancoordinatorIDs, siteqareviewerIDs, siteId
        } = metricPlanData[0];
        const result = metricPlanData;
        result[0].materialsList = materials;

        const metricIncArr = metricsIncludedIDs.split(',');
        const siteReviewerArr = sitereviewerIDs.split(',');
        const sitePlanReviewerArr = siteplancoordinatorIDs.split(',');
        const siteQAReviewerArr = siteqareviewerIDs.split(',');
        const newArr = _map(usersData, o => _extend({ checked: false }, o));

        result[0].metricsIncluded = _map(metricsData, o => _extend({ checked: false }, o));
        result[0].siteReviewer = _filter(newArr, (o) => o.roleName === 'Site Reviewer' && o.siteId === siteId);
        result[0].sitePlanReviewer = _filter(newArr, (o) => o.roleName === 'Site Plan Reviewer' && o.siteId === siteId);
        result[0].siteQAReviewer = _filter(newArr, (o) => o.roleName === 'Site QA Reviewer' && o.siteId === siteId);

        _map(metricIncArr, metric => {
          const index = _findIndex(result[0].metricsIncluded, o => o.metricId === metric);
          if (index > -1) {
            result[0].metricsIncluded[index].checked = true;
          }
        });

        _map(siteReviewerArr, reviewer => {
          const index = _findIndex(result[0].siteReviewer, o => o.userId === reviewer);
          if (index > -1) {
            result[0].siteReviewer[index].checked = true;
          }
        });

        _map(sitePlanReviewerArr, planReviewer => {
          const index = _findIndex(result[0].sitePlanReviewer, o => o.userId === planReviewer);
          if (index > -1) {
            result[0].sitePlanReviewer[index].checked = true;
          }
        });

        _map(siteQAReviewerArr, qaReviewer => {
          const index = _findIndex(result[0].siteQAReviewer, o => o.userId === qaReviewer);
          if (index > -1) {
            result[0].siteQAReviewer[index].checked = true;
          }
        });
        res.json({
          dbData: result
        });
      }
    });
    connection.callProcedure(request);
  });
}

function getMetrics(req, res, next, metricPlanData, usersData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GETALL_Metrics', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        getMaterials(req, res, next, metricPlanData, usersData, util.tediousResultToJSON(rows));
      }
    });

    connection.callProcedure(request);
  });
}

export function getUsers(req, res, next, metricPlanData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request('SP_GET_T_SYS_UM_User_BySiteID', (error, rowCount) => {
      subconnection.release();
      subconnection.close();
    });
    subReq.addParameter('siteId', TYPES.VarChar, metricPlanData[0].siteId);

    subReq.on('doneInProc', (subRowCount, subMore, subRows) => {
      if (typeof subRowCount !== 'undefined') {
        getMetrics(req, res, next, metricPlanData, util.tediousResultToJSON(subRows));
      }
    });
    subconnection.callProcedure(subReq);
  });
}
/*  Private Function End */

export function findByRole(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetMetricReportHeaderByRole', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('role', TYPES.VarChar, req.params.role);
    request.addParameter('userID', TYPES.VarChar, req.params.userId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0] && !responseSent) {
        responseSent = true;
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: []
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function create(req, res, next) {
  const table = buildMatrialDetailsTVP(req.body.materials);
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSaveCreateMetricReportHeader', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    const scheduleFlag = (req.body.scheduleId !== '') ? 1 : 0;
    const scheduleId = (req.body.scheduleId !== '') ? req.body.scheduleId : 0;

    request.addParameter('siteId', TYPES.VarChar, req.body.siteId);
    request.addParameter('description', TYPES.VarChar, req.body.description);
    request.addParameter('ReviewStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ReviewEndDate', TYPES.Date, req.body.endDate);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('SitePlanCoordinator', TYPES.VarChar, req.body.sitePlanReviewer.toString());
    request.addParameter('SiteReviewer', TYPES.VarChar, req.body.siteReviewer.toString());
    request.addParameter('SiteQAReviewer', TYPES.VarChar, req.body.siteQAReviewer.toString());
    request.addParameter('CreatedBy', TYPES.VarChar, req.body.createdBy);
    request.addParameter('WorkflowRecordId', TYPES.Int, req.body.status);
    request.addParameter('LinkedToScheduleFlag', TYPES.VarChar, scheduleFlag);
    request.addParameter('ScheduleRecordId', TYPES.VarChar, scheduleId);
    request.addParameter('Comment', TYPES.VarChar, req.body.comment);
    request.addParameter('metricReportMatrialDetailsTVP', TYPES.TVP, table);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: 'Data Saved Successfully'
        });
      }
    });

    request.on('doneProc', (rowCount, more, rows) => {
      if (!responseSent) {
        res.json({
          dbData: 'Data Saved Successfully'
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function update(req, res, next) {
  const table = buildMatrialDetailsTVP(req.body.materials);
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSaveUpdateMetricDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('description', TYPES.VarChar, req.body.description);
    request.addParameter('ReviewStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ReviewEndDate', TYPES.Date, req.body.endDate);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('SitePlanCoordinator', TYPES.VarChar, req.body.sitePlanReviewer.toString());
    request.addParameter('SiteReviewer', TYPES.VarChar, req.body.siteReviewer.toString());
    request.addParameter('SiteQAReviewer', TYPES.VarChar, req.body.siteQAReviewer.toString());
    request.addParameter('UpdatedBy', TYPES.VarChar, req.body.updateBy);
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricesId);
    request.addParameter('siteId', TYPES.VarChar, req.body.siteId);
    request.addParameter('metricReportMatrialDetailsTVP', TYPES.TVP, table);
    request.addParameter('statusCode', TYPES.VarChar, req.body.statusCode);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: 'Data Update Successfully'
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: 'Data Update Successfully'
        });
      }
    });

    connection.callProcedure(request);
  });
}

export function findById(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_FQM_DIM_MetricReportHeader_ByID', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('merticID', TYPES.VarChar, req.params.metricId);
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        getUsers(req, res, next, util.tediousResultToJSON(rows));
      }
    });
    connection.callProcedure(request);
  });
}

function sendMail(req, res, next) {
  _map(req.body.metricPlans, metricPlansData => {
    pool.acquire((err, connection) => {
      if (err) {
        return;
      }
      const request = new Request('SpFQMGetMetricUserEmailList', (error, rowCount) => {
        connection.release();
        connection.close();
      });
      request.addParameter('MetricReportRecordId', TYPES.VarChar, metricPlansData.metricPlanId);
      request.addParameter('ForStatus', TYPES.VarChar, metricPlansData.forStatus);
      request.addParameter('ToStatus', TYPES.VarChar, req.body.status);

      request.on('doneInProc', (rowCount, more, rows) => {
        const userInfo = util.tediousResultToJSON(rows);
        if (rows[0]) {
          const ccUser = [];
          const toUser = [];
          _map(userInfo, o => {
            if (o.mailList === 'Cc') {
              ccUser.push(o.email);
            } else if (o.mailList === 'To') {
              toUser.push(o.email);
            }
          });
          const userData = userInfo[0];
          const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: metricPlansData.metricPlanId, commentsbyUser: userData.comments, regards: userData.actionUserName };
          mail.sendTonodemailer(mailDetails);
        }
      });
      connection.callProcedure(request);
    });
  });
}

// update metric  status (approved, rejected,..) Upload Metric  data
export function statusUpdate(req, res, next) {
  const rowArr = [];
  _map(req.body.metricPlans, metricPlan => {
    const rowArrData = [];
    rowArrData.push(metricPlan.metricPlanId);
    rowArrData.push(metricPlan.comments);
    rowArr.push(rowArrData);
  });
  const table = {
    columns: [
      { name: 'metricReportID', type: TYPES.VarChar },
      { name: 'comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  const status = (req.body.action) ? statusConstants.status[req.body.action] : statusConstants.status.draft;
  req.body.status = status;
  const updateBy = req.body.authorId;

  pool.acquire((err, connection) => {
    const request = new Request('SP_UPDATE_FQM_DIM_MetricReportHeader_Status', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('metricReportActions', TYPES.TVP, table);
    request.addParameter('UpdateBy', TYPES.VarChar, updateBy);
    request.addParameter('status', TYPES.VarChar, status);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      sendMail(req, res, next);
      setTimeout(() => {
        res.json({
          dbData: 'Data update in T_FQM_DIM_ScheduleHeader table Successfully'
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

export function findMaterialsBySite(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_Metric_Materials_BySite', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('siteId', TYPES.VarChar, req.params.siteId);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function findMaterialsBySchedule(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_Metric_Materials_BySchedule', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ScheduleId', TYPES.VarChar, req.params.scheduleId);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getWorkFlow(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_FQM_DIM_MetricReportHeader_WorkFlow', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('metricReportID', TYPES.VarChar, req.params.metricReportId);
    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getScheduleandNewMetricReport(req, res, next) {
  const rowArr = [];
  _map(req.body.materials, singleRecord => {
    const rowArrData = [];
    rowArrData.push(singleRecord.materialRecordId);
    rowArrData.push(singleRecord.productNdc);
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'MaterialRecordId', type: TYPES.NVarChar },
      { name: 'PRODUCTNDC', type: TYPES.NVarChar }
    ],
    rows: rowArr
  };
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMLinkScheduleandNewMetricReport', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('MetricMaterialNDCDetails', TYPES.TVP, table);
    request.addParameter('ScheduleRecordId', TYPES.NVarChar, req.body.scheduleId);
    request.addParameter('ReviewStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ReviewEndDate', TYPES.Date, req.body.endDate);
    request.addOutputParameter('ReturnStatus', TYPES.BigInt);

    let resultData = [];
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        resultData = util.tediousResultToJSON(rows);
      }
    });

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        status: value,
        dbData: resultData
      });
    });
    connection.callProcedure(request);
  });
}

export function getLinkedScheduleToMetricReport(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }

    const request = new Request('SpFQMGetScheduleLinkedToMetricReport', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('MetricReportRecordID', TYPES.VarChar, req.params.metricId);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}
