import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import pool from '../helpers/db';
import * as mail from '../helpers/mailer';
import * as util from '../helpers/util';

function sendMail(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetMetricUserEmailList', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricPlanId);
    request.addParameter('ForStatus', TYPES.VarChar, req.body.forStatus);
    request.addParameter('ToStatus', TYPES.VarChar, req.body.toStatus);

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
        const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: req.body.metricPlanId, commentsbyUser: userData.comments, regards: userData.actionUserName };
        mail.sendTonodemailer(mailDetails);
      }
    });
    connection.callProcedure(request);
  });
}

export function updateStatus(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComSaveMetricReportReopenChanges', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricPlanId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.actionUser);
    request.addParameter('EntryIndicator ', TYPES.VarChar, req.body.entryIndicator);
    request.addParameter('Comments', TYPES.VarChar, req.body.comment);
    request.addOutputParameter('ReturnStatus', TYPES.BigInt);

    request.on('returnValue', (parameterName, value, metadata) => {
      if (value === '0') {
        sendMail(req, res, next);
      }
      setTimeout(() => {
        res.json({
          dbData: 'Reopen request sent for approval'
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

export function getLatestReopenComment(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetLatestReopenComment', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ImpactedRecordId', TYPES.VarChar, req.params.impactedRecordId);
    request.addOutputParameter('UserName', TYPES.VarChar);
    request.addOutputParameter('LatestComment', TYPES.VarChar);
    request.addOutputParameter('CommentDate', TYPES.Date);

    let cnt = 0;
    const resultData = {};
    request.on('returnValue', (parameterName, value, metadata) => {
      cnt += 1;
      resultData[parameterName] = value;
      if (cnt === 3) {
        res.json({
          dbData: [resultData]
        });
      }
    });
    connection.callProcedure(request);
  });
}
