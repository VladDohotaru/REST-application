'use strict';
const userMeta = require('./user.js');
const productMeta = require('./product.js');
const connection = require('../db.js').connection;

let User = connection.define('users', userMeta.userOptions);
let Product = connection.define('articles', productMeta.productOptions);


module.exports.User = User;
module.exports.Product = Product;
