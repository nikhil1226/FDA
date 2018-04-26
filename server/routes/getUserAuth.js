import { Connection, Request, TYPES } from 'tedious';
import ActiveDirectory from 'activedirectory';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _uniqBy from 'lodash/uniqBy';
import _ from 'lodash';
import pool from '../helpers/db';
import * as util from '../helpers/util';

export function getRolesAssistToUserId(req, res, next, userData) {
  const sql = `SELECT DISTINCT auth.userId
    ,grp.UserGroupId
    ,grp.UserGroupName
    ,[role].[RoleRecordId]
    ,[role].[RoleName]
    ,[appHeader].ApplicationRecordId
    ,[appHeader].[ApplicationName]
    ,CASE [role].[RoleRecordId]
    WHEN '1' THEN 1
    WHEN '2' THEN 2
    WHEN '3' THEN 3
    WHEN '4' THEN 4
    WHEN '5' THEN 5
    WHEN '6' THEN 6
    WHEN '17' THEN 7
    WHEN '7' THEN 8
    WHEN '8' THEN 9
    WHEN '20' THEN 10
    WHEN '21' THEN 11
    WHEN '18' THEN 12
    WHEN '19' THEN 13
    WHEN '9' THEN 14
    WHEN '10' THEN 15
    WHEN '11' THEN 16
    WHEN '12' THEN 17
    WHEN '13' THEN 18
    WHEN '14' THEN 19
    WHEN '15' THEN 20
    WHEN '16' THEN 21
    ELSE 22 END As SequenceId
  FROM [EQARP_SYS].[dbo].[T_SYS_UM_AuthorizationMaster] auth
  INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_UserGroup] grp ON grp.UserGroupRecordId = auth.UserGroupRecordId
  INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_RoleMaster] [role] ON [role].[RoleRecordId] = grp.RoleRecordId
  INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_ApplicationObjects] [app] ON [app].[ObjectRecordId] = grp.[ApplicationObjectId]
  INNER JOIN [EQARP_SYS].[dbo].[T_SYS_UM_ApplicationHeader] [appHeader] ON [appHeader].[ApplicationRecordId] = [app].[ApplicationRecordId]
  WHERE UserId = '${req.body.userName}'
  AND auth.IsActive =  1
  ORDER BY SequenceId`;

  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request(sql, (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
      const result = {};
      const user = {};
      let groups = [];
      const applications = [];
      const userApps = util.tediousResultToJSON(rows);

      user.userId = userData.userId;
      user.name = `${userData.firstName} ${userData.lastName}`;
      user.designation = userData.designation;
      groups = _uniqBy(userApps, 'userGroupId');
      const uniqueApplications = _uniqBy(userApps, 'applicationRecordId');

      _map(uniqueApplications, (a) => {
        const application = {};
        application.applicationId = a.applicationRecordId;
        application.applicationName = a.applicationName;
        const roles = _filter(userApps, (o) => o.applicationRecordId === a.applicationRecordId);
        const uniqeRoles = _uniqBy(roles, 'roleRecordId');
        application.Roles = _map(uniqeRoles, (o) => ({ roleId: o.roleRecordId, roleName: o.roleName })); // _pick(roles, 'roleRecordId', 'roleName');
        applications.push(application);
      });
      user.applications = applications;
      result.isAuthenticated = true;
      result.loginMessage = 'success';
      result.userInfo = user;
      result.groupId = _map(groups, (o) => o.userGroupId);
      result.groupName = _map(groups, (o) => o.userGroupName);
      res.json({
        dbData: result
      });
    });
    connection.execSql(request);
  });
}

export function getLoginAuth(req, res, next) {
  pool.acquire((err, connection) => {
    if (err) {
      return;
    }
    const request = new Request(`SELECT
      *
    FROM [EQARP_SYS].[dbo].[T_SYS_UM_User]
    WHERE UserId ='${req.body.userName}'
    AND IsValid = 1`, (error, rowCount) => {
      connection.release();
      connection.close();
    });

    request.on('doneInProc', (rowCount, more, rows) => {
      const userInfo = util.tediousResultToJSON(rows);
      if (userInfo.length === 0) {
        const resultArray = {};
        resultArray.isAuthenticated = false;
        resultArray.loginMessage = 'InValid Credentials';
        resultArray.userInfo = {};
        res.json({
          dbData: resultArray
        });
      }
      getRolesAssistToUserId(req, res, next, userInfo[0]);
    });
    connection.execSql(request);
  });
}

export function authenticateUserByLDAP(req, res, next) {
  const data = {};
  data.psName = req.connection.user;
  data.userGroups = req.connection.userGroups;
  res.json({
    dbData: [data],
    error: null
  });
}

export function checkNovartisUserLogin(req, res, next) {
    //  private string sDomain = "novartis.net:3269";
    // private string sDefaultOU = "OU=Users,DC=novartis,DC=net";
    // private string sServiceUser = @"nagarma3";
    // DirectoryEntry entry = new DirectoryEntry("LDAP://novartis.net:3269/dc=novartis,dc=net",
  console.log(req.body, 'req.body');
  const config = { url: 'LDAP://novartis.net:3269',
    baseDN: 'DC=novartis,DC=net',
    username: 'nagarma3',
    password: 'McBitss!123' };
  const ad = new ActiveDirectory(config);
  ad.authenticate(req.body.userName, req.body.password, (err, auth) => {
    console.log(err, 'res- err');
    console.log(auth, 'res- auth');
    let result = '';
    if (err) {
      result = err;
      console.log('ERROR: ', JSON.stringify(err));
    } else if (auth) {
      console.log('Authenticated!');
      result = 'Authenticated';
    } else {
      console.log('Authentication failed!');
      result = 'Authenticated failed';
    }
    res.json({
      dbData: result
    });
  });
}

