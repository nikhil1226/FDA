import { Connection, Request, TYPES } from 'tedious';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _extend from 'lodash/extend';

import pool from '../helpers/db';
import * as util from '../helpers/util';

export function findByReopenRole(req, res, next) {
  if (!req.params.role === 'spr' && !req.params.role === 'spc'
      && !req.params.role === 'gpc' && !req.params.role === 'gbm') {
    res.json({
      error: { message: 'only 4 roles are allowed at this point' }
    });
  }
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_ReopenSchedule_ByRole', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('role', TYPES.VarChar, req.params.role);
    request.addParameter('userID', TYPES.VarChar, req.params.userid);

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

export function findByRole(req, res, next) {
  if (!req.params.role === 'spr' && !req.params.role === 'spc'
      && !req.params.role === 'gpc' && !req.params.role === 'gbm') {
    res.json({
      error: { message: 'only 4 roles are allowed at this point' }
    });
  }
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Schedule_ByRole', (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.addParameter('role', TYPES.VarChar, req.params.role);
    request.addParameter('userID', TYPES.VarChar, req.params.userid);

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

export function getMaterials(req, res, next, schedulesData, metricsData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Material_scheduleRecordId', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('scheduleRecordId', TYPES.VarChar, schedulesData[0].scheduleId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      const newSchedulesData = Object.assign({}, schedulesData[0],
        { materials: util.tediousResultToJSON(rows), metrics: metricsData });
      const result = [];
      result.push(newSchedulesData);
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: result
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      const newSchedulesData = Object.assign({}, schedulesData[0],
      { materials: [], metrics: metricsData });
      const result = [];
      result.push(newSchedulesData);
      if (!responseSent) {
        res.json({
          dbData: result
        });
      }
    });

    connection.callProcedure(request);
  });
}

export function getProducts(req, res, next, schedulesData, metricsData) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_Product_scheduleRecordId', (error, rowCount) => {
      connection.release(); connection.close();
    });
    request.addParameter('scheduleRecordId', TYPES.VarChar, schedulesData[0].scheduleId);

    let responseSent = false;
    request.on('doneInProc', (rowCount, more, rows) => {
      const newSchedulesData = Object.assign({}, schedulesData[0],
        { productList: util.tediousResultToJSON(rows),
          metrics: metricsData
        });
      const result = [];
      result.push(newSchedulesData);
      if (rows[0]) {
        responseSent = true;
        res.json({
          dbData: result
        });
      }
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      if (!responseSent) {
        const newSchedulesData = Object.assign({}, schedulesData[0],
          { productList: util.tediousResultToJSON(rows),
            metrics: metricsData
          });
        const result = [];
        result.push(newSchedulesData);
        res.json({
          dbData: result
        });
      }
    });
    connection.callProcedure(request);
  });
}

export function getProductsMaterials(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request('SP_SCH_GET_ProductsMaterial_scheduleRecordId', (error, rowCount) => {
      connection.release();
      connection.close();
    });
    request.addParameter('scheduleRecordId', TYPES.VarChar, req.params.scheduleid);

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

