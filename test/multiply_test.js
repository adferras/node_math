var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js')

chai.use(chaiHttp);

describe('Multiplication', function() {
  it('should show the multiplication home page', function(done) {
    chai.request(server)
    .get('/multiply')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('multiply');
      done();
    });
  });

  it('should multiply positive whole numbers', function(done) {
    chai.request(server)
    .get('/multiply/2/5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('10');
      done();
    });
  });

  it('should multiply two negative numbers', function(done) {
    chai.request(server)
    .get('/multiply/-4/-6')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('24');
      done();
    });
  });

  it('should multiply using zero', function(done) {
    chai.request(server)
    .get('/multiply/0/7')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('0');
      done();
    });
  });

  it('should multiply decimal numbers', function(done) {
    chai.request(server)
    .get('/multiply/1.5/3.5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('5.25');
      done();
    });
  });

  it('should return NaN if not given numbers', function(done) {
    chai.request(server)
      .get('/multiply/number/number')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('NaN');
        done();
      });
    });
});
