const {Pool, Client} = require('pg');

let initPGSQL = {
    host: process.env.DBPG01_HOST,
    user: process.env.DBPG01_USER,
    password: process.env.DBPG01_PASS,
    database: process.env.DBPG01_DATA,
    port: process.env.DBPG01_PORT
};

module.exports = {Pool, Client, initPGSQL};