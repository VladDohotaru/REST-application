'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Status', () => {
  it('should return 200 on http://localhost:3000/admin_profile/catalog/ PUT', (done) => {
    chai.request('http://localhost:3000')
    .put('/admin_profile/catalog/')
    .send({ 'productId': 333,'productTitle': 'tttrrr','productPrice': 100, 'productDescription': 'addedNOW'})
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  it('should return 404 on http://localhost:3000/user_profile/catalog/9 PUT', (done) => {
    chai.request('http://localhost:3000')
    .put('/user_profile/catalog/')
    .send({ 'productId': 333,'productTitle': 'tttrrr','productPrice': 100, 'productDescription': 'addedNOW'})
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
