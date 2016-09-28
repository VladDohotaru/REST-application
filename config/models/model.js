'use strict';
const userMeta = require('./user.js');
const productMeta = require('./product.js');
const shoppingCartMeta = require('./shoppingCartModel.js');
const connection = require('../db.js').connection;

let User = connection.define('users', userMeta.userOptions);
let Product = connection.define('articles', productMeta.productOptions, {freezeTableName: true});
let ShoppingCart = connection.define('shoppingCarts', shoppingCartMeta.shoppingCartOptions);

module.exports.User = User;
module.exports.Product = Product;
module.exports.ShoppingCart = ShoppingCart;
