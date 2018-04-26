import { Connection, Request, TYPES } from 'tedious';
import _filter from 'lodash/filter';
import _map from 'lodash/map';

import pool from '../helpers/db';
import * as util from '../helpers/util';

/* Private funtions Start */
function getmetrics(req, res, next, sitesData, usersData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_GETALL_Metrics', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
      const metrics = util.tediousResultToJSON(rows);
      const result = [];

      _map(sitesData, site => {
        const item = site;
        item.sitePlanReviewer = _filter(usersData, (o) => o.roleName === 'Site Plan Reviewer' && o.siteId === site.id);
        item.siteReviewer = _filter(usersData, (o) => o.roleName === 'Site Reviewer' && o.siteId === site.id);
        item.siteCoordinator = _filter(usersData, (o) => o.roleName === 'Site Plan Coordinator' && o.siteId === site.id);
        item.siteQAReviewer = _filter(usersData, (o) => o.roleName === 'Site QA Reviewer' && o.siteId === site.id);
        item.metrics = metrics;
        result.push(item);
      });

      res.json({
        dbData: result
      });
    });
    connection.callProcedure(request);
  });
}

function getUsers(req, res, next, sitesData) {
  pool.acquire((err, subconnection) => {
    const subReq = new Request('SP_GET_ALL_Users', (error, rowCount) => {
      if (err) {
        return;
      }
      subconnection.release();
      subconnection.close();
    });

    let responseSent = false;
    subReq.on('doneInProc', (subRowCount, subMore, subRows) => {
      if (subRows[0]) {
        responseSent = true;
        getmetrics(req, res, next, sitesData, util.tediousResultToJSON(subRows));
      }
    });

    subReq.on('doneProc', (subRowCount, subMore, subRows) => {
      if (!responseSent) {
        getmetrics(req, res, next, sitesData, util.tediousResultToJSON(subRows));
      }
    });

    subconnection.callProcedure(subReq);
  });
}
/*  Private Function End */

export function getSitesForUser(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpFQMGetSitesForUser', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('UserId', TYPES.VarChar, req.params.userId);
    request.addParameter('Role', TYPES.VarChar, req.params.role);
    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      if (rows[0]) {
        responseSent = true;
        getUsers(req, res, next, util.tediousResultToJSON(rows));
      }
    });

    request.on('doneProc', (rowCount, more, rows) => {
      if (!responseSent) {
        getUsers(req, res, next, util.tediousResultToJSON(rows));
      }
    });

    connection.callProcedure(request);
  });
}


export function findByApplicationId(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SpComGET_GetAllSiteByAppObjectID', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('objectId', TYPES.VarChar, req.params.objectId);
    request.addParameter('appObjectId', TYPES.VarChar, req.params.appObjectId);
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
