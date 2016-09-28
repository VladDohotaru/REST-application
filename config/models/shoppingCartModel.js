'use strict';

const Sequelize = require('sequelize');
const shoppingCartOptions = {
  username: {
    type:       Sequelize.STRING,
    unique:     true,
    primaryKey: true
  },
  productTitle: {
    type:      Sequelize.STRING,
    unique:    true,
    allowNull: false,
    validate:  {
      len: {
        args: [1, 150],
        msg:  'userfriendly error FTW'
      }
    }
  },
  productPrice: {
    type: Sequelize.REAL
  },
  productQuantity: {
    type:         Sequelize.INTEGER,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.TEXT
  }
};


module.exports.shoppingCartOptions = shoppingCartOptions;
