'use strict';

const Sequelize = require('sequelize');
const productOptions = {
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
  productDescription: {
    type: Sequelize.TEXT
  }
};


module.exports.productOptions = productOptions;
