'use strict';

const Sequelize = require('sequelize');

const fbOptions = {
  fbId: {
    type:       Sequelize.STRING,
    unique:     true,
    primaryKey: true
  },
  fbToken: {
    type:   Sequelize.STRING,
    unique: true,
  },
  fbName: {
    type:   Sequelize.STRING,
    unique: true,
  },
  fbEmail: {
    type:   Sequelize.STRING,
    unique: true,
  }};
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
  },
  group: {
    allowNull:    true,
    type:         Sequelize.STRING,
    defaultValue: 'user'
  }
};

module.exports.fbOptions = fbOptions;
module.exports.userOptions = userOptions;
