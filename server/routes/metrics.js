import { Connection, Request, TYPES } from 'tedious';
import _filter from 'lodash/filter';
import _map from 'lodash/map';

import pool from '../helpers/db';
import * as util from '../helpers/util';


export function findAll(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GETALL_Metrics', (error, rowCount) => {
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

function getmetrics(req, res, next, sitesData, usersData, scheduleData, productData) {
  pool.acquire((err, subconnection) => {
    if (err) {
      return;
    }
    const subReq = new Request(`SELECT [T_FQM_DIM_ScheduleHeaderMetrics].KPIRecordId as metricId
      ,[T_FQM_DIM_ScheduleHeaderMetrics].ScheduleRecordId as siteId
      ,[T_COM_KPIMaster].KPIName as metricName 
    FROM [dbo].[T_FQM_DIM_ScheduleHeaderMetrics]
    INNER JOIN [dbo].[T_FQM_DIM_ScheduleHeader]  ON [T_FQM_DIM_ScheduleHeader].ScheduleRecordId = [T_FQM_DIM_ScheduleHeaderMetrics].ScheduleRecordId
    INNER JOIN [dbo].[T_COM_KPIMaster]  ON [T_COM_KPIMaster].KPIRecordId = [T_FQM_DIM_ScheduleHeaderMetrics].KPIRecordId
    WHERE [T_FQM_DIM_ScheduleHeaderMetrics].ScheduleRecordId = '2017-07-30T21:18:35.231Z'`, (error, rowCount) => {
      subconnection.release(); subconnection.close();
    });

    subReq.on('doneInProc', (rowCount, more, rows) => {
      const metrics = util.tediousResultToJSON(rows);
      const result = [];
      _map(sitesData, site => {
        const item = site;
        item.siteAddress = '';
        item.schedules = scheduleData;
        const schedulesArray = [];
        for (let i = 0, max = scheduleData.length; i <= max; i += 1) {
          if (scheduleData[i]) {
            schedulesArray.push(scheduleData[i].scheduleRecordId);
          }
        }
        item.schedules = schedulesArray;
        item.siteReviewer = usersData;
        item.siteCoordinator = usersData;
        item.siteQAReviewer = usersData;
        item.metrics = metrics;
        result.push(item);
      });

      res.json({
        dbData: result
      });
    });

    subconnection.execSql(subReq);
  });
}

/* Private funtions */
function getProducts(req, res, next, sitesData, userData, scheduleData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request(`select MaterialRecordId
      ,ProductNdcFda,ProcessingPlant,ProductTypeName,ProprietaryName
      ,ActiveNumeratorStrength,ActiveIngredUnit, ApplicationNumber 
    FROM T_FQM_FFT_ScheduleScopeDefinition 
    WHERE ScheduleRecordId='2017-08-01T15:29:46.542Z'`, (error, rowCount) => {
      subconnection.release(); subconnection.close();
    });
    subReq.on('doneInProc', (subRowCount, subMore, subRows) => {
      getmetrics(req, res, next, sitesData, userData, scheduleData, util.tediousResultToJSON(subRows));
    });
    subconnection.execSql(subReq);
  });
}

/* Private funtions */
function getShedule(req, res, next, sitesData, userData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request(`select ScheduleRecordId from [dbo].[T_FQM_DIM_ScheduleHeader] where SiteRecordId=${'AT12'} AND StatusId=25`, (error, rowCount) => {
      subconnection.release(); subconnection.close();
    });
    subReq.on('doneInProc', (subRowCount, subMore, subRows) => {
      getProducts(req, res, next, sitesData, userData, util.tediousResultToJSON(subRows));
    });
    subconnection.execSql(subReq);
  });
}

function getUsers(req, res, next, sitesData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request(`SELECT auth.UserID AS [user_id]
      ,auth.UserGroupId AS [groupId]
      ,usrGroup.RoleName [role_name]
      ,sites.SiteRecordId AS [site_id]
      ,sites.Entity AS [site]
      , usr.FirstName AS [user_name]
    FROM [EQARP_SYS].[dbo].[T_SYS_UM_UserGroup] usrGroup
    INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_AuthorizationMaster] auth ON auth.UserGroupId = usrGroup.UserGroupId
    INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_User] usr ON auth.UserID = usr.UserId
    LEFT OUTER JOIN [dbo].[T_COM_LKP_SitePlantMaintenance] sites ON sites.SiteRecordId = usrGroup.ObjectValue`, (error, rowCount) => {
      subconnection.release();
      subconnection.close();
    });

    subReq.on('doneInProc', (subRowCount, subMore, subRows) => {
      getShedule(req, res, next, sitesData, util.tediousResultToJSON(subRows));
    });
    subconnection.execSql(subReq);
  });
}
