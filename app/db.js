const mysql = require('mysql')
const metadata = require('./metadata');

var connectionConfig = metadata.getConnectionConfig();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: connectionConfig.dbHost,
    user: connectionConfig.dbUser,
    password: connectionConfig.dbPassword,
    database: connectionConfig.dbName
});

module.exports = pool;