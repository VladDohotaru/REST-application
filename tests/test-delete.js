'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Status', () => {
  it('should return 406 and a fail json on http://localhost:3000/admin_profile/catalog/9 DELETE(inexistent id)', (done) => {
    chai.request('http://localhost:3000')
    .delete('/admin_profile/catalog/9')
    .end((err, res) => {
      res.should.have.status(406);
      res.should.be.a.json;
      res.should.have.property('status');
      res.body.status.should.equal('fail');
      done();
    });
  });
  it('should return 200 on http://localhost:3000/admin_profile/catalog/333 DELETE', (done) => {
    chai.request('http://localhost:3000')
    .delete('/admin_profile/catalog/334')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.a.json;
      res.should.have.property('status');
      res.body.status.should.equal('success');
      done();
    });
  });
});
