'use strict';

var dialogBox = require('../pages/components/guest-box-dialog');

exports.define = function fGuestBoxDialogSteps (steps) {
  /** When steps **/
  steps.when('I press submit', function fClickSubmit () {
    dialogBox.submit.click();
  });

  steps.when('I press cancel', function fClickClose () {
    dialogBox.close.click();
  });


};
