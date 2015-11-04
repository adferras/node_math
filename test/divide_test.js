var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js')

chai.use(chaiHttp);

describe('Division', function() {
  it('should show the division home page', function(done) {
    chai.request(server)
    .get('/divide')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('divide');
      done();
    });
  });

  it('should divide positive whole numbers', function(done) {
    chai.request(server)
    .get('/divide/20/5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('4');
      done();
    });
  });

  it('should divide two negative numbers', function(done) {
    chai.request(server)
    .get('/divide/-40/-5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('8');
      done();
    });
  });

  it('should divide using zero', function(done) {
    chai.request(server)
    .get('/divide/0/7')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('0');
      done();
    });
  });

  it('should divide by zero', function(done) {
    chai.request(server)
    .get('/divide/10/0')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('Infinity');
      done();
    });
  });

  it('should divide decimal numbers', function(done) {
    chai.request(server)
    .get('/divide/5.5/0.5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('11');
      done();
    });
  });

  it('should return NaN if not given numbers', function(done) {
    chai.request(server)
      .get('/divide/number/number')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('NaN');
        done();
      });
    });
});
