'use strict';

const Sequelize = require('sequelize');
const userOptions = {
  username: {
    type:      Sequelize.STRING,
    unique:    true,
    allowNull: false,
    validate:  {
      len: {
        args: [6, 25],
        msg:  'Minimum 6, maximum 25 charachters'
      }
    }
  },
  password: {
    unique:    true,
    allowNull: false,
    type:      Sequelize.STRING,
    validate:  {
      len: {
        args: [6,1024],
      }
    }
  }
};

module.exports.userOptions = userOptions;
