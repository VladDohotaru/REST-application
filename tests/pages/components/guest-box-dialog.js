'use strict';

var Component = require('moonraker').Component;

module.exports = new Component({
  title: {
    get: function fGetDialogTitle () {
      return this.element('.form-header h4');
    }
  },
  submit: {
    get: function fGetSubmitElement () {
      return this.element('#btn btn-warning btn-lg');
    }
  },
  close: {
    get: function fGetCloseDialog () {
      return this.element('button.close');
    }
  }
});
