'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Status', () => {
  it('should return 200 on http://localhost:3000/ GET', (done) => {
    chai.request('http://localhost:3000')
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html;
      done();
    });
  });

  it('should return a json and status 200 on http://localhost:3000/admin_profile/catalog GET',(done) => {
    chai.request('http://localhost:3000')
    .get('/admin_profile/catalog')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

  it('should return a error json and status 404 on http://localhost:3000/admin_profile/catalog/9 GET',(done) => {
    chai.request('http://localhost:3000')
    .get('/admin_profile/catalog/9')
    .end((err, res) => {
      res.should.have.status(404);
      res.should.be.json;
      done();
    });
  });
});
