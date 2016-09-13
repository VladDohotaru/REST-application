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
      done();
    });
  });

  it('should return a json and status 200 on http://localhost:3000/catalog GET',(done) => {
    chai.request('http://localhost:3000')
    .get('/catalog')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
});
