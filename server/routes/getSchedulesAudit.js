import { Connection, Request, TYPES } from 'tedious';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _ from 'lodash';
import pool from '../helpers/db';
import * as util from '../helpers/util';

export function DateFormatChanged(DateObj) {
  const DateArray = DateObj.split('-');
  let Month = DateArray[1];
  if (DateArray[1] < 10) {
    Month = DateArray[1].replace(/^0+/, '');
  }
  const MonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${DateArray[2]}-${MonthArray[Month - 1]}-${DateArray[0]}`;
}

export function CreateAuditCommon(reqBody, res, next, AuditRecordId, OldValue, NewValue, UpdatedComment) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    let ImpactedRecordId = '';
    const Obj = JSON.parse(reqBody.userInfo);
    const CreatedBy = Obj.name;
    let WorkFlowRecordId = '';
    let Comment = '';

    if (reqBody.scheduleId) {
      ImpactedRecordId = reqBody.scheduleId;
      WorkFlowRecordId = reqBody.status;
      Comment = (UpdatedComment !== '') ? UpdatedComment : '';
    }

    if (reqBody.metricesId) {
      ImpactedRecordId = reqBody.metricesId;
      WorkFlowRecordId = reqBody.statusCode;
      Comment = (UpdatedComment !== '') ? UpdatedComment : '';
    }

    if (reqBody.uploadRequestID) {
      ImpactedRecordId = reqBody.uploadRequestID;
      WorkFlowRecordId = (reqBody.currentMetricPlan) ? reqBody.currentMetricPlan.statusCode : reqBody.statusCode;
      Comment = (UpdatedComment !== '') ? UpdatedComment : '';
    }

    if (reqBody.metricReportRecordId) {
      ImpactedRecordId = reqBody.metricReportRecordId;
      WorkFlowRecordId = reqBody.statusCode;
      Comment = (UpdatedComment !== '') ? UpdatedComment : '';
    }
    const ObjectRecordId = 1;

    const sql = `${'INSERT INTO [dbo].[T_COM_AD_AuditMasterMaintenance] ( ' +
      ' ObjectRecordId, ImpactedRecordId , AuditRecordId  , CreatedBy ,OldValue , NewValue, Comment, WorkflowRecordId ' +
      ' ) VALUES ( '}${ObjectRecordId} ` +
      `,'${ImpactedRecordId}'` +
      `,${AuditRecordId} ` +
      `,'${CreatedBy}'` +
      `,'${OldValue}'` +
      `,'${NewValue}'` +
      `,'${Comment}'` +
      `,${WorkFlowRecordId} ` +
      ')';

    const request = new Request(sql, (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
    });
    connection.execSql(request);
  });
}

export function findSheduleAuditById(req, res, next) {
  const sql = `SELECT
    ChangeRecordId AS [changeRecordId],
    [T_COM_WF_WorkFlowStatus].StatusDescription AS [status],
    [T_COM_AD_AuditObject].AuditRecordDescription AS [category],
    (([T_COM_AD_AuditMasterMaintenance].CreatedOn at time zone'Central Europe Standard Time') at time zone 'UTC')AS [Date],
    [T_COM_AD_AuditMasterMaintenance].OldValue AS [oldValue],
    [T_COM_AD_AuditMasterMaintenance].NewValue AS [newValue],
    [T_COM_AD_AuditMasterMaintenance].Comment AS [comment],
    (select FirstName +' '+ LastName from EQARP_SYS.dbo.T_SYS_UM_User where UserId = [T_COM_AD_AuditMasterMaintenance].CreatedBy) AS [CreatedBy]
  FROM [dbo].[T_COM_AD_AuditMasterMaintenance]
  INNER JOIN [dbo].[T_COM_AD_AuditObject]  ON [T_COM_AD_AuditObject].AuditRecordId = [T_COM_AD_AuditMasterMaintenance].AuditRecordId
  INNER JOIN [dbo].[T_COM_WF_WorkFlowStatus] ON [T_COM_WF_WorkFlowStatus].WorkflowRecordId =  [T_COM_AD_AuditMasterMaintenance].WorkflowRecordId
  WHERE ImpactedRecordId = @ObjectRecordId
  ORDER BY date DESC, status DESC,ChangeRecordId DESC`;

  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request(sql, (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('ObjectRecordId', TYPES.VarChar, req.params.id);

    request.on('doneInProc', (rowCount, more, rows) => {
      const SheduleAuditRows = util.tediousResultToJSON(rows);
      const result = SheduleAuditRows.filter((b) => {
        const item = b;
        item.description = item.category;
        delete item.changeRecordId;
        delete item.category;
        item.fromStatus = item.status;
        delete item.status;
        item.comments = item.comment;
        delete item.comment;
        if (item.description === 'Start Date Changed' || item.description === 'End Date Changed') {
          const oldValueArray = item.oldValue.split('T');
          const newValueArray = item.newValue.split('T');
          item.oldValue = DateFormatChanged(oldValueArray[0]);
          item.newValue = DateFormatChanged(newValueArray[0]);
        }
        const metricsArray = ['Lots Started', 'Lots Released', 'Lots Rejected', 'Number of Release and Stability Tests',
          'OOS Results', 'OOS Invalidated', 'Product Quality Complaints', 'Number of Dosage Units Distributed'];
        if (b.description === 'Metrics Included' || b.description === 'Metrics Excluded') {
          if (b.oldValue !== '') {
            const boldValueArray = b.oldValue.split(',');
            if (boldValueArray.length !== 0) {
              let boldValueString = '';
              for (let k = 0; k < boldValueArray.length; k += 1) {
                boldValueString += (k > 0) ? `, ${metricsArray[boldValueArray[k] - 1]}` : metricsArray[boldValueArray[k] - 1];
              }
              item.oldValue = boldValueString;
            }
          }

          if (b.newValue !== '') {
            const bnewValueArray = b.newValue.split(',');
            if (bnewValueArray.length !== 0) {
              let bnewValueString = '';
              for (let k = 0; k < bnewValueArray.length; k += 1) {
                bnewValueString += (k > 0) ? `,${metricsArray[bnewValueArray[k] - 1]}` : metricsArray[bnewValueArray[k] - 1];
              }
              item.newValue = bnewValueString;
            }
          }
        }

        item.date = ` ${b.date} `;
        return item;
      }, Object.create(null));
      res.json({
        dbData: result
      });
      return res.send;
    });
    connection.execSql(request);
  });
}

export function createScheduleAudit(req, res, next) {
  if (req.body.oldDescription !== req.body.description) {
    CreateAuditCommon(req.body, res, next, 1, req.body.oldDescription, req.body.description, '');
  }

  if (req.body.oldStartDate !== req.body.startDate) {
    CreateAuditCommon(req.body, res, next, 2, req.body.oldStartDate, req.body.startDate, '');
  }

  if (req.body.oldEndDate !== req.body.endDate) {
    CreateAuditCommon(req.body, res, next, 3, req.body.oldEndDate, req.body.endDate, '');
  }

  if (req.body.newProductsIncluded || req.body.newProductsExcluded) {
    const NewProductsIncluded = req.body.newProductsIncluded;
    const NewProductsExcluded = req.body.newProductsExcluded;

    if (NewProductsIncluded.length !== 0) {
      CreateAuditCommon(req.body, res, next, 6, '', NewProductsIncluded, '');
    }
    if (NewProductsExcluded.length !== 0) {
      CreateAuditCommon(req.body, res, next, 7, NewProductsExcluded, '', '');
      const ProductsComments = _.map(_.filter(req.body.products, (o) => o.excluded === true && o.comments !== ''), 'comments');
      if (ProductsComments.length !== 0) {
        CreateAuditCommon(req.body, res, next, 11, '', ProductsComments, ProductsComments);
      }
    }
  }

  if (req.body.newMetricsIncluded || req.body.newMetricsExcluded) {
    const NewMetricsIncluded = req.body.newMetricsIncluded;
    const NewMetricsExcluded = req.body.newMetricsExcluded;

    if (NewMetricsIncluded.length !== 0) {
      CreateAuditCommon(req.body, res, next, 4, '', NewMetricsIncluded, '');
    }
    if (NewMetricsExcluded.length !== 0) {
      CreateAuditCommon(req.body, res, next, 5, NewMetricsExcluded, '', '');
    }
  }

  if (req.body.newMaterialsIncluded || req.body.newMaterialsExcluded) {
    const newMaterialsIncluded = req.body.newMaterialsIncluded;
    const newMaterialsIncludedLength = newMaterialsIncluded.length;
    const newMaterialsExcluded = req.body.newMaterialsExcluded;
    const newMaterialsExcludedLength = newMaterialsExcluded.length;

    if (newMaterialsIncludedLength !== 0 || newMaterialsExcludedLength !== 0) {
      if (newMaterialsIncludedLength !== 0) {
        CreateAuditCommon(req.body, res, next, 8, '', newMaterialsIncluded, '');
      }
      if (newMaterialsExcludedLength !== 0) {
        CreateAuditCommon(req.body, res, next, 9, newMaterialsExcluded, '', '');
      }
    }
  }
}

export function createAuditAtRemoveMaterial(req, res, next) {
  const materialsComments = '';
  const capturedId = (req.recordData.materialNumber)
  ? `${req.recordId}_${req.recordData.materialNumber}`
  : req.recordId;
  CreateAuditCommon(req.recordData, res, next, 14, capturedId, '', materialsComments);
  if (materialsComments.length !== 0) {
    CreateAuditCommon(req.recordData, res, next, 15, '', materialsComments, materialsComments);
  }
}

/* export function createScopeAudit(req, res, next) {
  if (req.body.oldDescription !== req.body.description) {
    CreateAuditCommon(req.body, res, next, 1, req.body.oldDescription, req.body.description, '');
  }

  if (req.body.oldStartDate !== req.body.startDate) {
    createAuditCommon(req.body, res, next, 2, req.body.oldStartDate, req.body.startDate, '');
  }

  if (req.body.oldEndDate !== req.body.endDate) {
    createAuditCommon(req.body, res, next, 3, req.body.oldEndDate, req.body.endDate, '');
  }

  if(req.body.newProductsIncluded || req.body.newProductsExcluded) {
    let newProductsIncluded=req.body.newProductsIncluded;
    let newProductsIncludedLength=newProductsIncluded.length;
    let newProductsExcluded=req.body.newProductsExcluded;
    let newProductsExcludedLength=newProductsExcluded.length;

    if (newProductsIncludedLength !== 0 || newProductsExcludedLength !== 0) {
      if (newProductsIncludedLength !== 0) {
        createAuditCommon(req.body, res, next, 6, '', newProductsIncluded, '');
      }
      if(newProductsExcludedLength !== 0) {
        createAuditCommon(req.body, res, next, 7, newProductsExcluded, '', '');
      }
    }
  }

  if(req.body.newMetricsIncluded || req.body.newMetricsExcluded) {
    let newMetricsIncluded=req.body.newMetricsIncluded;
    let newMetricsIncludedLength=newMetricsIncluded.length;
    let newMetricsExcluded=req.body.newMetricsExcluded;
    let newMetricsExcludedLength=newMetricsExcluded.length;
    if (newMetricsIncludedLength !== 0 || newMetricsExcludedLength !== 0) {
      if(newMetricsIncludedLength !== 0) {
        createAuditCommon(req.body, res, next, 4, '', newMetricsIncluded, '');
      }
      if(newMetricsExcludedLength !== 0) {
        createAuditCommon(req.body, res, next, 5, newMetricsExcluded, '', '');
      }
    }
  }

  if(req.body.newMaterialsIncluded || req.body.newMaterialsExcluded){
    let newMaterialsIncluded=req.body.newMaterialsIncluded;
    let newMaterialsIncludedLength=newMaterialsIncluded.length;
    let newMaterialsExcluded=req.body.newMaterialsExcluded;
    let newMaterialsExcludedLength=newMaterialsExcluded.length;

    if (newMaterialsIncludedLength !== 0 || newMaterialsExcludedLength !== 0) {
      if(newMaterialsIncludedLength !== 0){
        createAuditCommon(req.body, res, next, 6, '', newMaterialsIncluded, '');
      }
      if(newMaterialsExcludedLength !== 0) {
        const materialsComments = _.map(_.filter(req.body.materialsWithIsRemoved, (o) => o.excluded === true && o.comments !== ''), 'comments');
        createAuditCommon(req.body, res, next, 7, newMaterialsExcluded, '', materialsComments);
        if(materialsComments.length !== 0){
          createAuditCommon(req.body, res, next, 11, '', materialsComments, materialsComments);
        }
      }
    }
  }
} */

/* export function createMetricMaintenanaceAudit(req, res, next) {
  _.map(req.body.KPIRecords, item => {
    let KPIRecordID='';
    if(item.active == true) {
      if(item.KPIRecordID==1) {
        KPIRecordID=19;
      }
      if(item.KPIRecordID==2) {
        KPIRecordID=20;
      }
      if(item.KPIRecordID==3) {
        KPIRecordID=17;
      }
      if(item.KPIRecordID==4) {
        KPIRecordID=31;
      }
      if(item.KPIRecordID==5) {
        KPIRecordID=22;
      }
      if(item.KPIRecordID==6) {
        KPIRecordID=24;
      }
      if(item.KPIRecordID==7) {
        KPIRecordID=26;
      }
      if(item.KPIRecordID==8) {
        KPIRecordID=28;
      }
      createAuditCommon(req.body, res, next, KPIRecordID, '', item.materialBatchRecord, item.comments);
    } else {
      if(item.KPIRecordID==1) {
        KPIRecordID=18;
      }
      if(item.KPIRecordID==2) {
        KPIRecordID=21;
      }
      if(item.KPIRecordID==3) {
        KPIRecordID=16;
      }
      if(item.KPIRecordID==4) {
        KPIRecordID=32;
      }
      if(item.KPIRecordID==5) {
        KPIRecordID=23;
      }
      if(item.KPIRecordID==6) {
        KPIRecordID=25;
      }
      if(item.KPIRecordID==7) {
        KPIRecordID=27;
      }
      if(item.KPIRecordID==8) {
        KPIRecordID=29;
      }
      createAuditCommon(req.body, res, next, KPIRecordID, item.materialBatchRecord, '', item.comments);
    }
  });
} */
