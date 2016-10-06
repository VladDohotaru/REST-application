'use strict';
<<<<<<< HEAD
const Sequelize = require('sequelize');
let connection = new Sequelize('myOnlineStore', 'vldo', 'qwer', {
  host:    'localhost',
  dialect: 'mysql',
   // use pooling in order to reduce db connection overload and to increase speed
  pool:    {
    max:  5,
    min:  0,
    idle: 1000
  },
});

module.exports.connection = connection;
=======
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
>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8
