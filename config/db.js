'use strict';
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
