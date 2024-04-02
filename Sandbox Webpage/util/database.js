const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'sandbox webpage',
    password: 'R1xTE))/WT@d1UzQ'
});

module.exports = pool.promise();