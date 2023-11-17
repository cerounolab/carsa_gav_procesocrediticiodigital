const {Pool, Client} = require('pg');
const clientMSSQL = require('mssql');

let initPGSQL = {
    host: process.env.DBPG01_HOST,
    user: process.env.DBPG01_USER,
    password: process.env.DBPG01_PASS,
    database: process.env.DBPG01_DATA,
    port: process.env.DBPG01_PORT
};

const initMSSQL01 = {
    user: process.env.dbmssql01_user,
    password: process.env.dbmssql01_pass,
    database: process.env.dbmssql01_data,
    server: process.env.dbmssql01_host,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

module.exports = {Pool, Client, initPGSQL, clientMSSQL, initMSSQL01};

