var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = require('expect.js');

chai.use(chaiHttp);

describe('Addition', function() {
  it('should show the addition home page', function(done) {
    chai.request(server)
    .get('/add')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('add');
      done();
    });
  });

  it('should add positive whole numbers', function(done) {
    chai.request(server)
    .get('/add/2/5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(7);
      done();
    });
  });

  it('should add two negative numbers', function(done) {
    chai.request(server)
    .get('/add/-4/-6')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(-10);
      done();
    });
  });

  it('should add using zero', function(done) {
    chai.request(server)
    .get('/add/0/7')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(7);
      done();
    });
  });

  it('should add decimal numbers', function(done) {
    chai.request(server)
    .get('/add/1.23/4.77')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(6);
      done();
    });
  });

  it('should return null if not given numbers', function(done) {
    chai.request(server)
      .get('/add/number/number')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.body.result).to.equal(null);
        done();
      });
    });
});
