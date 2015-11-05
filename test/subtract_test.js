var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js');

chai.use(chaiHttp);

describe('Subtraction', function() {
  it('should show the multiplication home page', function(done) {
    chai.request(server)
    .get('/subtract')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('subtract');
      done();
    });
  });

  it('should subtract positive whole numbers', function(done) {
    chai.request(server)
    .get('/subtract/2/5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('-3');
      done();
    });
  });

  it('should subtract two negative numbers', function(done) {
    chai.request(server)
    .get('/subtract/-4/-6')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('2');
      done();
    });
  });

  it('should subtract using zero', function(done) {
    chai.request(server)
    .get('/subtract/0/7')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('-7');
      done();
    });
  });

  it('should subtract decimal numbers', function(done) {
    chai.request(server)
    .get('/subtract/1.5/3.5')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('-2');
      done();
    });
  });

  it('should return NaN if not given numbers', function(done) {
    chai.request(server)
      .get('/subtract/number/number')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('NaN');
        done();
      });
    });
});
