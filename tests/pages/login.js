'use strict';

var Page = require('moonraker').Page;

var guestBoxDialog = require('./components/guest-box-dialog');

module.exports = new Page({
  url: {
    value: 'http://localhost:3000/login'
  },
  fieldUsername: {
    get: function fGetUsernameField () {
      return this.element('#email');
    }
  },
  fieldPassword: {
    get: function fGetPasswordField () {
      return this.element('#password');
    }
  }
});
