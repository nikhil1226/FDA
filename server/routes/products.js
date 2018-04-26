import { Connection, Request, TYPES } from 'tedious';

import pool from '../helpers/db';
import * as util from '../helpers/util';

export function getAllMaterials(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request(` SELECT * FROM (
      SELECT DISTINCT  MPFD.MaterialRecordId AS materialRecordId
      ,MPFD.SiteRecordID AS siteRecorId 
      ,( MPFD.MaterialNumber +'-'+ SSD.ScheduleRecordId  +'-'+  MPFD.PRODUCTNDC ) AS [materialPk]
      ,ROW_NUMBER() OVER(PARTITION BY MPFD.MaterialNumber,SSD.ScheduleRecordId,MPFD.PRODUCTNDC ORDER BY MPFD.PRODUCTNDC) AS [rowNum]
      ,MPFD.MaterialNumber AS materialNumber
      ,SSD.ScheduleRecordId AS scheduleId
      ,MPFD.ProcessingPlant AS processingPlant
      ,MPFD.MaterialType AS materialType
      ,MPFD.Brand AS brand
      ,MPFD.BrandDesc AS brandDesc
      ,MPFD.PRODUCTNDC AS productNdc
      ,MPFD.MaterialDescription AS materialDescription
      ,scope.ScheduleRecordId
      FROM [dbo].[V_INT_FQM_MaterialPortfolioDetails]  AS MPFD
      INNER JOIN [dbo].[T_FQM_FFT_ScheduleDetail] SSD ON MPFD.productNDC = SSD.ProductNdcFda 
        AND SSD.IsValid = 'YES'
      LEFT OUTER JOIN [T_FQM_FFT_ScheduleScopeDefinition] scope ON scope.ScheduleRecordId = SSD.ScheduleRecordId
        and scope.MaterialRecordId = MPFD.MaterialNumber
        and scope.ProductNdcFda = MPFD.PRODUCTNDC and scope.SiteRecordId = MPFD.SiteRecordID
      WHERE scope.ScheduleRecordId IS NULL)
    T WHERE rowNum = 1`, (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
      res.json({
        dbData: util.tediousResultToJSON(rows)
      });
    });

    connection.execSql(request);
  });
}

export function findBySiteID(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Product_BySiteID', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('siteID', TYPES.VarChar, req.params.siteid);

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
