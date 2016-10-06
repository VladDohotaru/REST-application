'use strict';
/* test status code returned by server with mocha */
const request = require('request');
const assert = require('assert');
const baseUrl = 'http://localhost:3000/';

describe('Online Store Server', () => {
  describe('GET /', () => {
    it('returns status code 200 or 304', (done) => {
      request.get(baseUrl, (error, response) => {
        assert.equal(200 || 304, response.statusCode);
        done();
      });
    });
  });
});
