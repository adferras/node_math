var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js')

chai.use(chaiHttp);

describe('Addition', function() {
  it('should show the addition home page', function(done) {
    chai.request(server)
    .get('/addition')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('addition');
      done();
    });
  });

  it('should add positive whole numbers', function(done) {
    chai.request(server)
    .get('/addition/2/5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('7');
      done();
    });
  });

  it('should add two negative numbers', function(done) {
    chai.request(server)
    .get('/addition/-4/-6')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('-10');
      done();
    });
  });

  it('should add using zero', function(done) {
    chai.request(server)
    .get('/addition/0/7')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('7');
      done();
    });
  });

  it('should add decimal numbers', function(done) {
    chai.request(server)
    .get('/addition/1.23/4.77')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('6');
      done();
    });
  });

  it('should return NaN if not given numbers', function(done) {
    chai.request(server)
      .get('/addition/number/number')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('NaN');
        done();
      });
    });
});
