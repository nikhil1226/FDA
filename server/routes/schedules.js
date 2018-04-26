import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _extend from 'lodash/extend';
import _toNumber from 'lodash/toNumber';

import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';
import { getMaterials, getProducts } from './getSchedules';

/* Private funtions Start */
function buildScheduleScopeDetailsTVP(req) {
  const rowArr = [];
  _map(req.body.materials, singleRecord => {
    const rowArrData = [];
    rowArrData.push(req.body.scheduleId);
    rowArrData.push(req.body.siteId);
    rowArrData.push(singleRecord.materialRecordId);
    rowArrData.push(singleRecord.productNdc);
    const isValid = (singleRecord.excluded) ? 'NO' : 'YES';
    rowArrData.push(isValid);
    rowArrData.push(singleRecord.comments);
    rowArr.push(rowArrData);
  });
  const table = {
    columns: [
      { name: 'ScheduleRecordId', type: TYPES.VarChar },
      { name: 'SiteRecordId', type: TYPES.VarChar },
      { name: 'MaterialRecordId', type: TYPES.VarChar },
      { name: 'ProductNdcFda', type: TYPES.VarChar },
      { name: 'IsValid', type: TYPES.VarChar },
      { name: 'Comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  return table;
}

function buildScheduleProductDetailsTVP(data, scheduleId) {
  const rowArr = [];
  _map(data, singleRecord => {
    const rowArrData = [];
    rowArrData.push(scheduleId);
    rowArrData.push(singleRecord.productId);
    const isValid = (singleRecord.excluded) ? 'NO' : 'YES';
    rowArrData.push(isValid);
    rowArrData.push(singleRecord.comments);
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'ScheduleRecordId', type: TYPES.VarChar },
      { name: 'ProductNdcFda', type: TYPES.VarChar },
      { name: 'IsValid', type: TYPES.VarChar },
      { name: 'Comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  return table;
}

function getMetricInc(req, res, next, scheduleData) {
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
        const metricArr = scheduleData[0].metricsIncludedIds.split(',');
        const metricsData = [];
        _map(metricArr, metric => {
          metricsData.push(_filter(util.tediousResultToJSON(rows), (o) => o.metricId === metric)[0]);
        });

        if (req.params.type === 'schedule') {
          getProducts(req, res, next, scheduleData, _map(metricsData, o => _extend({ checked: true }, o)));
        } else {
          getMaterials(req, res, next, scheduleData, _map(metricsData, o => _extend({ checked: true }, o)));
        }
      }
    });
    connection.callProcedure(request);
  });
}
/* Private funtions Start */

export function findByID(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Product_ByScheduleId', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ScheduleId', TYPES.NVarChar, req.params.scheduleid);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        getMetricInc(req, res, next, util.tediousResultToJSON(rows));
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        getMetricInc(req, res, next, []);
      }
    });
    connection.callProcedure(request);
  });
}

export function create(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const scheduleProductsData = [];
    _map(req.body.products, singleProduct => {
      let valid = 'YES';
      if (typeof singleProduct.excluded !== 'undefined') {
        valid = (singleProduct.excluded) ? 'NO' : 'YES';
      }
      if (valid === 'YES') {
        const RowArrData = [singleProduct.productId, valid];
        scheduleProductsData.push(RowArrData);
      }
    });

    const scheduleProductDetailsTVP = {
      columns: [
        { name: 'ProductNDC', type: TYPES.VarChar },
        { name: 'IsValid', type: TYPES.VarChar }
      ],
      rows: scheduleProductsData
    };

    const request = new Request('SP_ADD_Schedule', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('SiteRecordId', TYPES.NVarChar, req.body.siteId);
    request.addParameter('SiteName', TYPES.NVarChar, req.body.site);
    request.addParameter('ScheduleDescription', TYPES.VarChar, req.body.description);
    request.addParameter('ScheduleStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ScheduleEndDate', TYPES.Date, req.body.endDate);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('SitePlanCoordinator', TYPES.VarChar, req.body.sitePlanCoordinator);
    request.addParameter('SitePlanReviewer', TYPES.VarChar, req.body.sitePlanReviewer);
    request.addParameter('CreatedBy', TYPES.VarChar, req.body.createdBy);
    request.addParameter('StatusId', TYPES.NVarChar, req.body.status);
    request.addParameter('ScheduleProductDetailsTVP', TYPES.TVP, scheduleProductDetailsTVP);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        res.json({ status: 'success' });
      }
    });

    connection.callProcedure(request);
  });
}

function sendMail(req, res, next) {
  _map(req.body.schedules, scheduleData => {
    pool.acquire((err, connection) => {
      if (err) {
        return;
      }
      const request = new Request('SpFQMGetScheduleUserEmailList', (error, rowCount) => {
        connection.release();
        connection.close();
      });
      request.addParameter('ScheduleRecordId', TYPES.VarChar, scheduleData.scheduleId);
      request.addParameter('ForStatus', TYPES.VarChar, scheduleData.statusCode);
      request.addParameter('ToStatus', TYPES.VarChar, req.body.statusId);

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
          const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: scheduleData.scheduleId, commentsbyUser: userData.comments, regards: userData.actionUserName };
          mail.sendTonodemailer(mailDetails);
        }
      });
      connection.callProcedure(request);
    });
  });
}

export function statusUpdate(req, res, next) {
  const rowArr = [];
  _map(req.body.schedules, schedule => {
    const rowArrData = [];
    rowArrData.push(schedule.scheduleId);
    rowArrData.push(schedule.comments);
    rowArr.push(rowArrData);
  });
  const Table = {
    columns: [
      { name: 'scheduleId', type: TYPES.VarChar },
      { name: 'comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };

  pool.acquire((err, connection) => {
    const request = new Request('SP_UPDATE_T_FQM_DIM_ScheduleHeader_Status', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('ScheduleActions', TYPES.TVP, Table);
    request.addParameter('UpdateBy', TYPES.VarChar, req.body.userId);
    request.addParameter('Status', TYPES.VarChar, req.body.statusId);

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

export function update(req, res, next) {
  const table = buildScheduleProductDetailsTVP(req.body.products, req.body.scheduleId);
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSaveUpdateScheduleDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('ScheduleRecordId', TYPES.NVarChar, req.body.scheduleId);
    request.addParameter('ScheduleDescription', TYPES.VarChar, req.body.description);
    request.addParameter('ScheduleStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ScheduleEndDate', TYPES.Date, req.body.endDate);
    request.addParameter('UpdateBy', TYPES.VarChar, req.body.updateBy);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('ScheduleDetailTVP', TYPES.TVP, table);
    request.addParameter('siteId', TYPES.VarChar, req.body.siteId);
    request.addParameter('statusCode', TYPES.VarChar, req.body.status);
    request.addOutputParameter('ReturnInd', TYPES.BigInt);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        status: value
      });
    });

    connection.callProcedure(request);
  });
}

export function findBySiteID(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Schedule_BySiteID', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('SiteRecordId', TYPES.NVarChar, req.params.siteid);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function updateScheduleScope(req, res, next) {
  const table = buildScheduleScopeDetailsTVP(req);
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSaveUpdateScopeDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ScheduleRecordId', TYPES.NVarChar, req.body.scheduleId);
    request.addParameter('ScheduleDescription', TYPES.VarChar, req.body.description);
    request.addParameter('ScheduleStartDate', TYPES.Date, req.body.startDate);
    request.addParameter('ScheduleEndDate', TYPES.Date, req.body.endDate);
    request.addParameter('UpdateBy', TYPES.VarChar, req.body.updateBy);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('ScheduleScopeDetailsTVP', TYPES.TVP, table);
    request.addOutputParameter('ReturnInd', TYPES.BigInt);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        status: value
      });
    });

    connection.callProcedure(request);
  });
}

export function getWorkFlow(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GET_FQM_DIM_schedule_WorkFlow', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('scheduleID', TYPES.VarChar, req.params.scheduleid);

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

export function getSentForApprovalStatus(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetScheduleNDCVerification', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ScheduleRecordId', TYPES.VarChar, req.params.scheduleId);
    request.addOutputParameter('ReturnInd', TYPES.BigInt);

    let resultArrData = [];
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        resultArrData = util.tediousResultToJSON(rows);
      }
    });

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        dbData: resultArrData,
        status: value
      });
    });
    connection.callProcedure(request);
  });
}
