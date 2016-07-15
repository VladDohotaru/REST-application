'use strict';
const mysql = require('mysql');
let connection = mysql.createConnection({
  host:     'localhost',
  user:     'vldo',
  password: 'qwer',
  database: 'myOnlineStore',
  charset:  'UTF8_GENERAL_CI',
});
connection.connect( (err) => {
  if (err) {
    console.log('error connecting ' + err.stack);
    return;
  }
  console.log('Connected to the DB as id ' + connection.threadId);
});

module.exports = connection;
