import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';
import * as uploadStatus from '../constants/UploadStatusConstants';
import { createScheduleAudit, createAuditAtRemoveMaterial } from './getSchedulesAudit'; // @sp

/* Private funtions */
function buildIPCStabilityTestsTVP(data, uploadRequestId) {
  const rowArr = [];
  _map(data, (singleRecord, index) => {
    const dataRecordId = Math.random().toString(36).substring(7);
    const rowArrData = [];
    rowArrData.push(index);
    rowArrData.push(dataRecordId);
    rowArrData.push(singleRecord.INDEX);
    rowArrData.push(singleRecord.PlanningLocation);
    rowArrData.push(singleRecord.MaterialNumber);
    rowArrData.push(singleRecord.Month);
    rowArrData.push(singleRecord.MaterialDescription);
    rowArrData.push(singleRecord.ProcessOrder);
    rowArrData.push(singleRecord.Batch);
    rowArrData.push(singleRecord.NoOfTests);
    rowArrData.push('1');
    rowArrData.push(uploadRequestId);
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'RowNumber', type: TYPES.NVarChar },
      { name: 'UploadDataRecordId', type: TYPES.NVarChar },
      { name: 'RecordID', type: TYPES.VarChar },
      { name: 'PlanningLocation', type: TYPES.VarChar },
      { name: 'MaterialNumber', type: TYPES.VarChar },
      { name: 'Month', type: TYPES.VarChar },
      { name: 'MAT_DESC', type: TYPES.VarChar },
      { name: 'ProcessOrder', type: TYPES.VarChar },
      { name: 'Batch', type: TYPES.VarChar },
      { name: 'NoOfTests', type: TYPES.VarChar },
      { name: 'UploadFlag', type: TYPES.VarChar },
      { name: 'UploadRecordId', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  return table;
}

function insertMetricDetails(req, res, next) {
  const table = buildIPCStabilityTestsTVP(req.body.metricData, req.body.uploadRequestId);
  pool.acquire((err, connection) => {
    const request = new Request('SP_UPL_ADD_TMP_SI03A_IPCStabilityTests', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('metricData_IPCStabilityTests', TYPES.TVP, table);
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      res.json({
        dbData: 'insert done'
      });
    });
    connection.callProcedure(request);
  });
}

function findMetricDetailsByUploadRecordId(req, res, next, uploadData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('exec SP_UPL_GET_TMP_SI03A_IPCStabilityTests @uploadrequestid', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('uploadrequestid', TYPES.VarChar, req.params.uploadRequestId);
    let responseSent = false;
    const resultData = uploadData[0];
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        resultData.metricData = util.tediousResultToJSON(rows);
        res.json({
          dbData: resultData
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        resultData.metricData = [];
        res.json({
          dbData: resultData
        });
      }
    });

    connection.execSql(request);
  });
}

function insertSitePlantMaintenance(req, res, next) {
  const rowArr = [];
  _map(req.body.metricData, singleRecord => {
    const siteRecord = Math.random().toString(36).substring(7);
    const rowArrData = [];
    rowArrData.push(siteRecord);
    rowArrData.push(singleRecord.plant);
    rowArrData.push(singleRecord.nQCID);
    rowArrData.push(singleRecord.country);
    rowArrData.push(singleRecord.entity);
    rowArrData.push(singleRecord.region);
    rowArrData.push(singleRecord.technology);
    rowArrData.push(singleRecord.responsibleSite1);
    if (singleRecord.responsibleSite2 && singleRecord.responsibleSite2.length > 5) {
      rowArrData.push(singleRecord.responsibleSite2.substring(0, 5));
    } else {
      rowArrData.push(singleRecord.responsibleSite2);
    }
    rowArrData.push(singleRecord.fEI);
    rowArrData.push(singleRecord.dUNS);
    rowArrData.push(singleRecord.fDArelevant);
    rowArrData.push(singleRecord.nQCOnly);
    rowArrData.push(singleRecord.hRID);
    rowArrData.push(singleRecord.hRID2);
    rowArrData.push(singleRecord.bPCID2);
    rowArrData.push(singleRecord.packager1);
    rowArrData.push(singleRecord.packager2);
    rowArrData.push(singleRecord.bPCID);
    rowArrData.push(singleRecord.alconFlag);
    rowArrData.push(req.body.uploadRequestId);
    rowArrData.push('1');
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'SiteRecordId', type: TYPES.NVarChar },
      { name: 'Plant', type: TYPES.NVarChar },
      { name: 'NQCId', type: TYPES.NVarChar },
      { name: 'Country', type: TYPES.VarChar },
      { name: 'Entity', type: TYPES.VarChar },
      { name: 'Region', type: TYPES.VarChar },
      { name: 'Technology', type: TYPES.VarChar },
      { name: 'ResponsibleSite1', type: TYPES.VarChar },
      { name: 'ResponsibleSite2', type: TYPES.VarChar },
      { name: 'FEI', type: TYPES.VarChar },
      { name: 'DUNS', type: TYPES.VarChar },
      { name: 'FDA', type: TYPES.VarChar },
      { name: 'NQC_FLAG', type: TYPES.VarChar },
      { name: 'HR_ID', type: TYPES.VarChar },
      { name: 'HR_ID2', type: TYPES.VarChar },
      { name: 'BPC_ID2', type: TYPES.VarChar },
      { name: 'PACKAGER1', type: TYPES.VarChar },
      { name: 'PACKAGER2', type: TYPES.VarChar },
      { name: 'BPC_ID', type: TYPES.VarChar },
      { name: 'ALCON_FLAG', type: TYPES.VarChar },
      { name: 'UploadRecordId', type: TYPES.VarChar },
      { name: 'ActiveFlag', type: TYPES.VarChar }
    ],
    rows: rowArr
  };

  pool.acquire((err, connection) => {
    const request = new Request('SP_UPL_ADD_TMP_SitePlantMaintenance', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('metricData_SitePlantMaintenance', TYPES.TVP, table);
    connection.callProcedure(request);
  });
}

function findSitePlantMaintenanceByUploadRecordId(req, res, next, uploadData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_TMP_SitePlantMaintenance', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('uploadrequestid', TYPES.VarChar, req.params.uploadRequestId);

    let responseSent = false;
    const resultData = uploadData[0];
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        resultData.metricData = util.tediousResultToJSON(rows);

        res.json({
          dbData: resultData
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        resultData.metricData = [];
        res.json({
          dbData: resultData
        });
      }
    });

    connection.callProcedure(request);
  });
}

export function addMetricDataFromTempToCom(req, res, next, uploadMetricActions) {
  let addSucess = 0;
  pool.acquire((err, connection) => {
    const request = new Request('SP_UPL_MOVE_MetricData_From_TMP', (error, rowCount) => {
      addSucess = rowCount;
      connection.release();
      connection.close();
    });
    request.addParameter('uploadMetricActions', TYPES.TVP, uploadMetricActions);

    connection.callProcedure(request);
  });
}

export function create(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }

    const request = new Request('SP_UPL_ADD_UploadHeader', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('SiteRecordId', TYPES.VarChar, req.body.siteId);
    request.addParameter('description', TYPES.VarChar, req.body.description);
    request.addParameter('startDate', TYPES.Date, req.body.startDate);
    request.addParameter('endDate', TYPES.Date, req.body.endDate);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricList.toString());
    request.addParameter('approverId', TYPES.VarChar, req.body.approverId);
    request.addParameter('CreatedBy', TYPES.VarChar, req.body.createdBy);
    request.addParameter('status', TYPES.Int, 1);
    request.addParameter('UploadTemplateRecordId', TYPES.VarChar, req.body.metricId);
    request.addParameter('Comment', TYPES.VarChar, '');
    request.addParameter('applicationRecordID', TYPES.VarChar, req.body.applicationId);
    request.addParameter('category', TYPES.VarChar, req.body.category);
    request.addOutputParameter('UploadRecordId', TYPES.BigInt);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        const insertedId = rows[0][0].value;
        const mdData = {
          body: { createdBy: req.body.createdBy, siteId: req.body.siteId, uploadRequestId: insertedId, status: 1, metricData: req.body.metricData },
          response: { dbData: 'Data added in T_FQM_UploadHeader table Successfully' }
        };
        if (req.body.metricId === 'EQARP-GBL-UP-00002') {
          insertSitePlantMaintenance(mdData, res, next);
        } else {
          insertMetricDetails(mdData, res, next);
        }
      }
    });
    connection.callProcedure(request);
  });
}

export function findByRole(req, res, next) {
  if (!req.params.role === 'auth' && !req.params.role === 'appr'
    && !req.params.role === 'reOpen_auth' && !req.params.role === 'reOpen_appr') {
    res.json({
      error: { message: 'only 2 roles are allowed at this point' }
    });
  }
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadHeader_ByRole', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('role', TYPES.VarChar, req.params.role);
    request.addParameter('userID', TYPES.VarChar, req.params.userId);

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

export function findById(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadHeader_ByID', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('UploadRecordId', TYPES.VarChar, req.params.uploadRequestId);

    request.on('doneInProc', (rowCount, more, rows) => {
      if (typeof rowCount !== 'undefined') {
        const uploadData = util.tediousResultToJSON(rows);
        if (uploadData[0].uploadTableName === 'T_COM_UPL_MD_SitePlantMaintenance') {
          findSitePlantMaintenanceByUploadRecordId(req, res, next, uploadData);
        } else {
          findMetricDetailsByUploadRecordId(req, res, next, uploadData);
        }
      }
    });
    connection.callProcedure(request);
  });
}

export function update(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_UPDATE_UploadHeader', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('UploadRecordId', TYPES.VarChar, req.body.uploadRequestID);
    request.addParameter('description', TYPES.VarChar, req.body.uploadDescription);
    request.addParameter('startDate', TYPES.Date, req.body.startDate);
    request.addParameter('endDate', TYPES.Date, req.body.endDate);
    request.addParameter('KPIRecordId', TYPES.VarChar, req.body.metricsIncluded.toString());
    request.addParameter('updateBy', TYPES.VarChar, req.body.updateBy);

    request.on('doneProc', (rowCount, more, rows) => {
      res.json({
        dbData: 'Data update in T_FQM_UploadHeader table Successfully'
      });
    });
    connection.callProcedure(request);
  });
}

function sendMail(req, res, next) {
  _map(req.body.metrics, metricData => {
    pool.acquire((err, connection) => {
      if (err) {
        return;
      }
      const request = new Request('SpFQMGetUploadUserEmailList', (error, rowCount) => {
        connection.release();
        connection.close();
      });
      request.addParameter('UploadRecordId', TYPES.VarChar, metricData.uploadMetricId);
      request.addParameter('ForStatus', TYPES.VarChar, metricData.statusCode);
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
          const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: metricData.uploadMetricId, commentsbyUser: userData.comments, regards: userData.actionUserName };
          mail.sendTonodemailer(mailDetails);
        }
      });
      connection.callProcedure(request);
    });
  });
}

export function updateReopenStatus(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpCOMSAVE_UPLUploadReopenChanges', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    const entryCode = req.body.action;
    let entryIndicator = 0;
    if (entryCode === 'ReopenRequested') {
      entryIndicator = 1;
    } else if (entryCode === 'approved') {
      entryIndicator = 3;
    } else if (entryCode === 'rejected') {
      entryIndicator = 2;
    }
    request.addParameter('UploadRecordId', TYPES.VarChar, req.body.metrics[0].uploadMetricId);
    request.addParameter('EntryIndicator', TYPES.Int, entryIndicator);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.authorId);
    request.addParameter('Comments', TYPES.VarChar, req.body.metrics[0].comments);
    request.addOutputParameter('ReturnStatus', TYPES.NVarChar);

    request.on('returnValue', (parameterName, value, metadata) => {
      sendMail(req, res, next);
      setTimeout(() => {
        res.json({
          dbData: value
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

export function updateStatus(req, res, next) {
  const rowArr = [];
  _map(req.body.metrics, metric => {
    const rowArrData = [];
    rowArrData.push(metric.uploadMetricId);
    rowArrData.push(metric.comments);
    rowArr.push(rowArrData);
  });
  const table = {
    columns: [
      { name: 'UploadMetricID', type: TYPES.VarChar },
      { name: 'comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };

  const status = (req.body.action) ? uploadStatus.status[req.body.action] : 1;
  req.body.status = status;
  const UpdateBy = req.body.authorId;

  pool.acquire((err, connection) => {
    const request = new Request('SP_UPL_UPDATE_Status_UploadHeader', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('uploadMetricActions', TYPES.TVP, table);
    request.addParameter('UpdateBy', TYPES.VarChar, UpdateBy);
    request.addParameter('status', TYPES.VarChar, status);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (req.body.action === 'approved') {
        addMetricDataFromTempToCom(req, res, next, table);
      }
      sendMail(req, res, next);
      setTimeout(() => {
        res.json({
          dbData: 'Data update in T_FQM_DIM_UploadHeader table Successfully'
        });
      }, 5000);
    });
    connection.callProcedure(request);
  });
}

export function updateMetricData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_UPDATE_TMP_SI03A_IPCStabilityTests', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('recordId', TYPES.VarChar, req.body.dataRecordId);
    request.addParameter('planningLocation', TYPES.VarChar, req.body.planningLocation);
    request.addParameter('materialNumber', TYPES.VarChar, req.body.materialNumber);

    request.on('doneProc', (rowCount, more, rows) => {
      if (rowCount) {
        res.json({
          dbData: 'update the data Successfully'
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function removeMetricData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_DELETE_TMP_SI03A_IPCStabilityTests', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('recordId', TYPES.VarChar, req.body.recordId);
    request.addParameter('updateBy', TYPES.VarChar, req.body.updateBy);

    request.on('doneProc', (rowCount, more, rows) => {
      res.json({
        dbData: 'delete the data Successfully'
      });
    });
    connection.callProcedure(request);
  });
}

export function updateSitePlantMaintenanceData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_UPDATE_TMP_SitePlantMaintenance', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('recordId', TYPES.VarChar, req.body.recordId);
    request.addParameter('country', TYPES.VarChar, req.body.country);
    request.addParameter('region', TYPES.VarChar, req.body.region);
    request.addParameter('entity', TYPES.VarChar, req.body.entity);
    request.addParameter('technology', TYPES.VarChar, req.body.technology);

    request.on('doneProc', (rowCount, more, rows) => {
      res.json({
        dbData: 'update the data Successfully'
      });
    });
    connection.callProcedure(request);
  });
}

export function removeSitePlantMaintenanceData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_DELETE_TMP_SitePlantMaintenance', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('recordId', TYPES.VarChar, req.body.recordId);
    request.on('doneProc', (rowCount, more, rows) => {
      res.json({
        dbData: 'delete the data Successfully'
      });
    });
    connection.callProcedure(request);
  });
}

export function getAllMetricTypeList(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadObjectMaster', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        res.json({
          dbData: util.tediousResultToJSON(rows)
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getUploadSiteApprover(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadApprover_BySite', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('SiteRecordId', TYPES.VarChar, req.params.siteId);
    request.addParameter('AppObjectId', TYPES.VarChar, req.params.objectId);

    request.on('doneInProc', (rowCount, more, rows) => {
      let resultData = [];
      if (typeof rowCount !== 'undefined') {
        if (rowCount === 0) {
          resultData.push({ userId: 0, userName: '' });
        } else {
          resultData = util.tediousResultToJSON(rows);
        }
        res.json({
          dbData: resultData
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getGlobalUploadApprover(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadApprover_ByGlobal', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('appObjectName', TYPES.VarChar, req.query.appObjectName);

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

export function getUploadMetricWorkFlow(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_UploadApprover_WorkFlow', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('requestId', TYPES.VarChar, req.query.requestId);

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

export function getAllApplicationHeader(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_UPL_GET_ApplicationHeader', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('UserID', TYPES.VarChar, req.params.userId);

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

export function SI03AIPCStabilityTestsValidation(req, res, next) {
  const table = buildIPCStabilityTestsTVP(req.body.metricData, req.body.uploadRequestID);
  pool.acquire((err, connection) => {
    const request = new Request('SP_UPL_VALIDATION_SI03A_IPCStabilityTests', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('metricData_IPCStabilityTestsTVP', TYPES.TVP, table);

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
