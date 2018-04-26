import ConnectionPool from 'tedious-connection-pool';
import os from 'os';
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';

function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

const hw = encrypt('Your_password');

const poolConfig = {
  min: 2,
  max: 100,
  log: false,
  idleTimeout: 1000
};

let sqlConfig = {};
if (os.hostname() === 'MCBITSSRDS') {
  // mcbitss server
  sqlConfig = {
    server: 'mcbitssrds',
    userName: 'saravana',
    password: decrypt('178fc691377076716119b448'),
    options: {
      connectTimeout: 0,
      requestTimeout: 0,
      database: 'EQARP_DWH_OCT19',
      rowCollectionOnDone: 'true',
      port: 1533
    }
  };
} else if (os.hostname() === 'abcd') {
  // We will apply the Novertis server details here, after getting details from Anil
  sqlConfig = {
    server: 'mcbitssrds',
    userName: 'saravana',
    password: decrypt('178fc691377076716119b448'),
    options: {
      connectTimeout: 0,
      requestTimeout: 0,
      database: 'EQARP_DWH',
      rowCollectionOnDone: 'true',
      port: 1533
    }
  };
} else {
  // Muthu  Local Instancs
  sqlConfig = {
    server: 'mcbitssrds',
    userName: 'saravana',
    password: 'saravana100%',
    options: {
      connectTimeout: 0,
      requestTimeout: 0,
      database: 'EQARP_DWH_OCT19',
      rowCollectionOnDone: 'true',
      port: 1533
    }
  };
  // // sqlConfig = {
  // //   server: 'localhost',
  // //   userName: 'sa',
  // //   password: 'sqlPwd@12#',
  // //   options: {
  // //   connectTimeout: 0,
  // //   requestTimeout: 0,
  // //     database: 'EQARP_DWH',
  // //     rowCollectionOnDone: 'true'
  // //   }
  // };
  poolConfig.log = false;
}


// create the pool
const pool = new ConnectionPool(poolConfig, sqlConfig);

pool.on('error', (err) => {
  console.log('\x1b[31m%s\x1b[0m : ', 'Pool Error : ', err);
});

export default pool;
