import { Connection, Request, TYPES } from 'tedious';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _extend from 'lodash/extend';
import moment from 'moment';
import pool from '../helpers/db';
import * as util from '../helpers/util';
import * as mail from '../helpers/mailer';
import * as xlsx from '../helpers/xlsxPopulate';
import * as statusConstants from '../constants/MetricReport';
import { getUsers } from './metricReport'; // @sp

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

export function saveComment(req, res, next) {
  pool.acquire((err, connection) => {
    const request = new Request('SP_MMR_ADD_MetricReportComments', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('MetricReportRecordID', TYPES.VarChar, req.body.metricReportRecordId);
    request.addParameter('Comment', TYPES.VarChar, req.body.comment);
    request.addParameter('CommentBy', TYPES.VarChar, req.body.userId);
    request.addParameter('roleName', TYPES.VarChar, req.body.roleName);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: 'Data update Successfully'
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: 'Data update Successfully'
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function findCommentByMetricId(req, res, next) {
  pool.acquire((err, connection) => {
    const request = new Request('SP_MMR_GET_MetricReportComments', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordID', TYPES.VarChar, req.params.metricId);

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

export function updateKPIRecord(req, res, next) {
  const rowArr = [];
  _map(req.body.KPIRecords, item => {
    const rowArrData = [];
    rowArrData.push(item.KPIRecordId);
    rowArrData.push(item.active);
    rowArrData.push(item.materialBatchRecord);
    rowArrData.push(item.comments);
    rowArr.push(rowArrData);
  });

  const table = {
    columns: [
      { name: 'KPIRecordID', type: TYPES.VarChar },
      { name: 'active', type: TYPES.Bit },
      { name: 'materialBatchRecord', type: TYPES.VarChar },
      { name: 'comments', type: TYPES.VarChar }
    ],
    rows: rowArr
  };
  pool.acquire((err, connection) => {
    const request = new Request('SpFQMSaveUpdateMetricReportBatchMaintenance', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('KPIRecordTVP', TYPES.TVP, table);
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricReportRecordId);
    request.addParameter('UpdateBy', TYPES.VarChar, req.body.updateBy);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: 'Data update Successfully'
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: 'Data update Successfully'
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function findPopulateBatchMaintenance(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_Batch_Maintenance_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

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

export function findPopulateTDUDData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_TDUD_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

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

export function findPopulatePQCData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_PQC_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

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

export function findPopulateIOORSData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_IOORS_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

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

export function findPopulateNTRSData(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_NTRS_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);
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

export function findPopulateScope(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

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

export function findPopulateAcceptance(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_AcceptanceRate_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);
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

function sendMail(req, res, next) {
  _map(req.body.metricPlans, metricPlansData => {
    const metricReportRecordId = metricPlansData.metricPlanId;
    const statusId = req.body.status;
    const forStatus = metricPlansData.forStatus;
    pool.acquire((err, connection) => {
      if (err) {
        return;
      }
      const request = new Request('SpFQMGetMetricUserEmailList', (error, rowCount) => {
        connection.release();
        connection.close();
      });
      request.addParameter('MetricReportRecordId', TYPES.VarChar, metricReportRecordId);
      request.addParameter('ForStatus', TYPES.VarChar, forStatus);
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
          const mailDetails = { to: toUser, cc: ccUser, statusName: userData.toStatus, recordId: metricReportRecordId, commentsbyUser: userData.comments, regards: userData.actionUserName };
          mail.sendTonodemailer(mailDetails);
        }
      });
      connection.callProcedure(request);
    });
  });
}

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
  const status = (req.body.action) ? statusConstants.status[req.body.action] : statusConstants.status.reportGenerated;
  req.body.status = status;
  pool.acquire((err, connection) => {
    const request = new Request('SP_MMR_UPDATE_MetricReportHeader_Status', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('metricReportActions', TYPES.TVP, table);
    request.addParameter('UpdateBy', TYPES.VarChar, req.body.userId);
    request.addParameter('status', TYPES.VarChar, status);
    request.addParameter('Indicator', TYPES.VarChar, req.body.indicator);

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

export function createReport(req, res, next) {
  req.body.status = (req.body.action) ? statusConstants.status[req.body.action] : statusConstants.status.reportGenerated;
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComSAVE_MetricReportGeneration', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricId);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      res.json({
        dbData: 'report created'
      });
    });
    connection.callProcedure(request);
  });
}

/* --------------------------------------------  PRIVATE FUNCTIONS FOR GENRATE EXCEL ---------------------------------*/
function excelFindPopulateTDUDData(req, res, next, excelDataToTDUD) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_TDUD_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);
    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const resExcelData = Object.assign(excelDataToTDUD, { TDUDData: util.tediousResultToJSON(rows) });
        xlsx.populateXlsxTemp(req, res, next, resExcelData);
      }
    });
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const resExcelData = Object.assign(excelDataToTDUD, { TDUDData: util.tediousResultToJSON(rows) });
        xlsx.populateXlsxTemp(req, res, next, resExcelData);
      }
    });
    connection.callProcedure(request);
  });
}

function excelFindPopulatePQCData(req, res, next, excelDataToPQC) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_PQC_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);
    let responseSent = false;

    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const excelDataToTDUD = Object.assign(excelDataToPQC, { PQCData: util.tediousResultToJSON(rows) });
        excelFindPopulateTDUDData(req, res, next, excelDataToTDUD);
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const excelDataToTDUD = Object.assign(excelDataToPQC, { PQCData: util.tediousResultToJSON(rows) });
        excelFindPopulateTDUDData(req, res, next, excelDataToTDUD);
      }
    });
    connection.callProcedure(request);
  });
}

function excelFindPopulateIOORSData(req, res, next, excelDataToIOORS) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_IOORS_Data_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);
    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const excelDataToPQC = Object.assign(excelDataToIOORS, { IOORSData: util.tediousResultToJSON(rows) });
        excelFindPopulatePQCData(req, res, next, excelDataToPQC);
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const excelDataToPQC = Object.assign(excelDataToIOORS, { IOORSData: util.tediousResultToJSON(rows) });
        excelFindPopulatePQCData(req, res, next, excelDataToPQC);
      }
    });
    connection.callProcedure(request);
  });
}

function excelFindPopulateNTRSData(req, res, next, excelDataToNTRS) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_NTRS_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const excelDataToIOORS = Object.assign(excelDataToNTRS, { NTRSData: util.tediousResultToJSON(rows) });
        excelFindPopulateIOORSData(req, res, next, excelDataToIOORS);
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const excelDataToIOORS = Object.assign(excelDataToNTRS, { NTRSData: util.tediousResultToJSON(rows) });
        excelFindPopulateIOORSData(req, res, next, excelDataToIOORS);
      }
    });
    connection.callProcedure(request);
  });
}

function excelFindPopulateAcceptance(req, res, next, excelData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_AcceptanceRate_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const excelDataToNTRS = Object.assign(excelData, { acceptanceData: util.tediousResultToJSON(rows) });
        excelFindPopulateNTRSData(req, res, next, excelDataToNTRS);
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const excelDataToNTRS = Object.assign(excelData, { acceptanceData: util.tediousResultToJSON(rows) });
        excelFindPopulateNTRSData(req, res, next, excelDataToNTRS);
      }
    });
    connection.callProcedure(request);
  });
}

function excelFindScopeById(req, res, next, header) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_MMR_GET_Populate_MetricReport', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.params.metricId);

    let responseSent = false;
    const result = {};
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        const scope = util.tediousResultToJSON(rows);
        const excelData = { headerData: header, scopeData: scope };
        excelFindPopulateAcceptance(req, res, next, excelData);
      }
    });
    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const scope = util.tediousResultToJSON(rows);
        const excelData = { headerData: header, scopeData: scope };
        excelFindPopulateAcceptance(req, res, next, excelData);
      }
    });
    connection.callProcedure(request);
  });
}

export function populateExcelReport(req, res, next) {
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
        const result = util.tediousResultToJSON(rows);
        const header = {
          site: result[0].site,
          metricReport: result[0].metricesId,
          desc: result[0].metricDescription,
          sDate: moment(result[0].startDate).utc().format('DD-MMM-YYYY'),
          eDate: moment(result[0].endDate).utc().format('DD-MMM-YYYY'),
          author: result[0].createdBy,
          SPC: result[0].siteplancoordinator,
          SQAR: result[0].siteqareviewer,
          SR: result[0].sitereviewer,
          randId: req.params.randId
        };
        excelFindScopeById(req, res, next, header);
      }
    });
    connection.callProcedure(request);
  });
}

export function getLinkSchedule(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMLinkScheduleandMetricReportDetails', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricesId);
    request.addParameter('ScheduleRecordId ', TYPES.VarChar, req.body.scheduleId);
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

export function updateScheduleLink(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMSAVE_MMRUpdateScheduleLinking', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('MetricReportRecordId', TYPES.VarChar, req.body.metricesId);
    request.addParameter('ScheduleRecordId ', TYPES.VarChar, req.body.scheduleId);
    request.addParameter('ActionUser', TYPES.VarChar, req.body.actionUser);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: 'Schedule Linked to the Metric Report  Successfully'
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        res.json({
          dbData: 'Schedule Linked to the Metric Report  Successfully'
        });
      }
    });
    connection.callProcedure(request);
  });
}
