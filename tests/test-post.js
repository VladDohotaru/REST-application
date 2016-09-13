'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Status', () => {
  it('should add a record on /admin_profile/catalog POST', (done) => {
    chai.request('http://localhost:3000')
    .post('/admin_profile/catalog')
    .send({ 'productId': 333,'productTitle': 'tttrrr','productPrice': 100, 'productDescription': 'addedNOW'})
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
  it('should NOT overwrite a record on /admin_profile/catalog/some_id POST', (done) => {
    chai.request('http://localhost:3000')
    .post('/catalog/9')
    .send({ 'productId': 333,'productTitle': 'tttrrr','productPrice': 100, 'productDescription': 'addedNOW'})
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
