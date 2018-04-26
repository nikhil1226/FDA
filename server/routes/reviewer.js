import { Connection, Request, TYPES } from 'tedious';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _extend from 'lodash/extend';

import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';

function getUsers(req, res, next, metricPlanData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request('SP_GET_ALL_Users', (error, rowCount) => {
      subconnection.release();
      subconnection.close();
    });

    let responseSent = false;
    const result = [];
    subReq.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        const usersData = util.tediousResultToJSON(rows);
        _map(metricPlanData, metric => {
          const item = metric;
          const tempGBRArr = (item.globalreviewer !== null && item.globalreviewer !== '')
            ? item.globalreviewer.split(',') : [];
          const tempSPRArr = (item.siteplancoordinator !== null && item.siteplancoordinator !== '')
            ? item.siteplancoordinator.split(',') : [];
          const tempSRArr = (item.sitereviewer !== null && item.sitereviewer !== '')
            ? item.sitereviewer.split(',') : [];
          const tempQARArr = (item.siteqareviewer !== null && item.siteqareviewer !== '')
            ? item.siteqareviewer.split(',') : [];
          item.sitePlanReviewer = [];
          item.siteReviewer = [];
          item.siteQAReviewer = [];
          item.globalReviewer = [];

          _map(_filter(usersData, (o) => o.roleName === 'Site Plan Reviewer' && o.siteId === item.siteId), itemSPR => {
            const indexSPR = _findIndex(tempSPRArr, d => d === itemSPR.userName);
            if (indexSPR === -1) {
              item.sitePlanReviewer.push(itemSPR);
            }
          });

          _map(_filter(usersData, (o) => o.roleName === 'Site Reviewer' && o.siteId === item.siteId), (itemSR) => {
            const indexSR = _findIndex(tempSRArr, d => d === itemSR.userName);
            if (indexSR === -1) {
              item.siteReviewer.push(itemSR);
            }
          });

          _map(_filter(usersData, (o) => o.roleName === 'Site QA Reviewer' && o.siteId === item.siteId), (itemQAR) => {
            const QARIndex = _findIndex(tempQARArr, d => d === itemQAR.userName);
            if (QARIndex === -1) {
              item.siteQAReviewer.push(itemQAR);
            }
          });

          _map(_filter(usersData, (o) => o.roleName === 'Global Reviewer' && o.siteId === item.siteId), (itemGR) => {
            const GRIndex = _findIndex(tempGBRArr, d => d === itemGR.userName);
            if (GRIndex === -1) {
              item.globalReviewer.push(itemGR);
            }
          });

          result.push(item);
        });
        res.json({
          dbData: result
        });
        responseSent = true;
      }
    });

    subReq.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        _map(metricPlanData, metric => {
          const item = metric;
          item.siteReviewer = [];
          item.sitePlanReviewer = [];
          item.siteQAReviewer = [];
          item.globalReviewer = [];
          result.push(item);
        });
        res.json({
          dbData: result
        });
      }
    });

    subconnection.callProcedure(subReq);
  });
}

export function getMetricesReviewer(req, res, next) {
  if (req.params.role !== 'gbm' && req.params.role !== 'sm') {
    res.json({
      error: { message: 'only two roles are allowed at this point' }
    });
  }

  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetMetricReportHeaderByRole', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('role', TYPES.VarChar, req.params.role);
    request.addParameter('UserID', TYPES.VarChar, req.params.userId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        getUsers(req, res, next, util.tediousResultToJSON(rows));
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        getUsers(req, res, next, util.tediousResultToJSON(rows));
      }
    });
    connection.callProcedure(request);
  });
}

export function getAddRemoveGlobalReviewer(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetAddRemoveGlobalReviewer', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('UserIds', TYPES.VarChar, req.body.userId);
    request.addParameter('EntryIndicator', TYPES.VarChar, req.body.indicator);
    request.addOutputParameter('ReturnStatus', TYPES.NVarChar);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        dbData: value
      });
    });
    connection.callProcedure(request);
  });
}

export function getAddRemoveSitePlanReviewer(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetAddRemoveSitePlanReviewer', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('UserIds', TYPES.VarChar, req.body.userId);
    request.addParameter('EntryIndicator', TYPES.VarChar, req.body.indicator);
    request.addOutputParameter('ReturnStatus', TYPES.NVarChar);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        dbData: value
      });
    });
    connection.callProcedure(request);
  });
}

export function getAddRemoveSiteQAReviewer(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetAddRemoveSiteQAReviewer', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('UserIds', TYPES.VarChar, req.body.userId);
    request.addParameter('EntryIndicator', TYPES.VarChar, req.body.indicator);
    request.addOutputParameter('ReturnStatus', TYPES.NVarChar);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        dbData: value
      });
    });
    connection.callProcedure(request);
  });
}

export function getAddRemoveSiteReviewer(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetAddRemoveSiteReviewer', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('UserIds', TYPES.VarChar, req.body.userId);
    request.addParameter('EntryIndicator', TYPES.VarChar, req.body.indicator);
    request.addOutputParameter('ReturnStatus', TYPES.NVarChar);

    request.on('returnValue', (parameterName, value, metadata) => {
      res.json({
        dbData: value
      });
    });
    connection.callProcedure(request);
  });
}
function sendMail(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetGlobalUsersEmailDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('actionUserId', TYPES.VarChar, req.body.actionUser);
    request.addParameter('selectedUserId', TYPES.VarChar, req.body.userId);

    request.on('doneInProc', (rowCount, more, rows) => {
      const userInfo = util.tediousResultToJSON(rows);
      if (rows[0]) {
        const userData = userInfo[0];
        const status = req.body.indicator === 1 ? 'Added' : 'Removed';
        const mailDetails = { to: userData.selectedUserEmail, cc: userData.actionUserEmail, statusName: status, role: req.body.role, recordId: req.body.metricId, commentsbyUser: req.body.comments, actionUser: userData.actionUser, roleUser: userData.selectedUser, isGlobalRole: 1 };
        mail.sendTonodemailer(mailDetails);
      }
    });
    connection.callProcedure(request);
  });
}

export function updateRoleModification(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSAVE_MMRUpdateRoleModification', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('UserIds', TYPES.VarChar, req.body.userId);
    request.addParameter('EntryIndicator', TYPES.VarChar, req.body.entryIndicator);
    request.addParameter('RoleRecordId', TYPES.VarChar, req.body.roleRecordId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.actionUser);
    request.addParameter('Comments', TYPES.VarChar, req.body.comments);

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
        sendMail(req, res, next);
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}
