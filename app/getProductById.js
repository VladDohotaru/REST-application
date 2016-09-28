'use strict';
const Model = require('../config/models/model.js');
const promise = Model.Product;

module.exports = function findProductById (id, res) {
  promise
    .findOne({
      where: {
        productId: id
      }
    })
    .then((foundRecord) => {
      if (foundRecord) {
        res.status(200);
        res.json(foundRecord.dataValues).end();
      } else {
        res.status(404);
        res.json({operation: 'GET', status: 'fail',reason: 'can not found record with given id'});
        res.end();
      }
    })
    .catch((getError) => {
      console.log(getError);
      return getError;
    });
};
