'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = function passwordCheck (plain, secure) {
  if (!bcrypt.compareSync(plain, secure)) {
    return false;
  } else {
    return true;
  }
};
