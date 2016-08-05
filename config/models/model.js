'use strict';
const userMeta = require('./user.js');
const productMeta = require('./product.js');
const connection = require('../db.js').connection;

let User = connection.define('users', userMeta.userOptions);
let Product = connection.define('articles', productMeta.productOptions, {freezeTableName: true});
let fbAuth = connection.define('fbauth', userMeta.fbOptions, {freezeTableName: true});


module.exports.User = User;
module.exports.fbAuth = fbAuth;
module.exports.Product = Product;
