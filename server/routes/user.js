import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';

/*  Private Funtion Start */
function sendMail(req, res, next) {
  const statusId = req.body.approvalStatus === '1' ? 4 : 5;
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComUMGetUserAccessEmailList', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('UserAccessRecordId', TYPES.VarChar, req.body.userAccessRecordId);
    request.addParameter('ForStatus', TYPES.VarChar, req.body.workflowRecordId);
    request.addParameter('ToStatus', TYPES.VarChar, statusId);

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
        const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: req.body.userAccessRecordId, commentsbyUser: userData.comments, regards: userData.actionUserName };
        mail.sendTonodemailer(mailDetails);
      }
    });
    connection.callProcedure(request);
  });
}
/*  Private Funtion End */

export function create(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComUMSAVESaveUserAccessRequest', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('UserId', TYPES.VarChar, req.body.userId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.approverId);
    request.addParameter('RoleRecordId', TYPES.VarChar, req.body.roleRecordId);
    request.addParameter('Site', TYPES.VarChar, req.body.siteId);
    request.addParameter('ApproverList', TYPES.VarChar, req.body.approverId);
    request.addParameter('Description', TYPES.VarChar, req.body.description);
    request.addOutputParameter('ReturnInd', TYPES.BigInt);
    request.addOutputParameter('UserAccessrecordID', TYPES.NVarChar);

    const resultData = [];
    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const insertedID = rows[0][0].value;
        resultData.push({ userId: insertedID, msg: 'New User Request Accepted' });
        res.json({
          dbData: resultData
        });
      }
    });
    request.on('doneProc', (rowCount, more, rows) => {
      if (!responseSent) {
        res.json({
          dbData: [{ userId: 0, msg: 'New User Request Accepted' }]
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function statusUpdate(req, res, next) {
  const rowArr = [];
  const rowArrData = [];
  rowArrData.push(req.body.userAccessRecordId);
  rowArrData.push(req.body.userId);
  rowArrData.push(req.body.userGroupRecordId);
  rowArrData.push(req.body.siteRecordId);
  rowArrData.push(req.body.approvalStatus);
  rowArrData.push(req.body.comments);
  rowArr.push(rowArrData);
  const table = {
    columns: [
      { name: 'UserAccessRecordId', type: TYPES.VarChar },
      { name: 'UserId', type: TYPES.VarChar },
      { name: 'UserGroupRecordId', type: TYPES.VarChar },
      { name: 'SiteRecordId', type: TYPES.VarChar },
      { name: 'ApprovalStatus', type: TYPES.VarChar },
      { name: 'comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  pool.acquire((err, connection) => {
    const request = new Request('SpComUMSaveApprovalRejectionUserAccess', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('UserAccessRecordId', TYPES.VarChar, req.body.userAccessRecordId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.actionUser);
    request.addParameter('UserAccessApprovalDetails', TYPES.TVP, table);
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      sendMail(req, res, next);
      setTimeout(() => {
        res.json({
          dbData: 'Data update Successfully'
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

export function getAllApplicationHeader(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_USR_GET_ALLApplicationHeader ', (error, rowCount) => {
      connection.release();
      connection.close();
    });

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
          dbData: []
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getAllApplicationObjLevel(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComUMGetApplicationObjectDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('ApplicationRecordId', TYPES.VarChar, req.params.applicationRecordId);
    request.addParameter('IsGlobal', TYPES.VarChar, req.params.isGlobal);

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
          dbData: []
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getAllUserRequest(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComUMGetUserRequestDetailsByUserId', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('UserId', TYPES.VarChar, req.params.userid);

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

export function getWorkFlow(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComUMGetUserAccessWorkflowDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('ImpactedRecordId', TYPES.VarChar, req.params.recordId);
    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });

    request.on('doneProc', (rowCount, more, rows) => {
      if (!responseSent) {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}
