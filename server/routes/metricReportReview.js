import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';

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
    const request = new Request('SpFQMSAVE_MMRUpdateGlobalReviewer', (error, rowCount) => {
      connection.release(); connection.close();
    });

    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricPlanId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.actionUser);
    request.addParameter('EntryIndicator ', TYPES.VarChar, req.body.entryIndicator);
    request.addParameter('Comments', TYPES.VarChar, req.body.comment);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      sendMail(req, res, next);
      setTimeout(() => {
        res.json({
          dbData: 'Status update Successfully'
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

