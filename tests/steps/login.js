'use strict';

var session = require('moonraker').session;
var loginPage = require('../pages/login');

exports.define = function loginSteps (steps) {
  /** Given steps **/
  steps.given('I visit the home page', function visitHomepageStep () {
    loginPage.visit();
  });

  /** When steps **/
  steps.when('I enter the credentials $username and $password', function enterCredentials (username, password) {
    loginPage.fieldUsername.sendKeys(username);
    loginPage.fieldPassword.sendKeys(password);
    loginPage.dialogBox.submit.click();
  });

  /** Then steps **/

  steps.then('I get redirected to \'$page\'', function fGetRedirectedTo (page) {
    session.currentUrl(function fGetCurrentUrl (title) {
      title.href.should.equal(page);
    });
  });
};
