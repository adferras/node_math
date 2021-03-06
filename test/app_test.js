var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = require('expect.js');

chai.use(chaiHttp);

function stack_trace_404() {
    chai.request(server)
    .get('/doesnotexist')
    .end(function(err, res){
      expect(res.status).to.equal(404);
      expect(res.text).to.contain('Not Found');
      if (process.env.NODE_ENV === 'production') {
        expect(res.text).to.be.blank;
      } else {
        expect(res.text).to.contain('Error');
      }
    });
}

describe('test stack trace visibility', function() {
  context('production', function() {
    it('does not display stack trace', function() {
      process.env.NODE_ENV = 'production';
      stack_trace_404();
    });
  });

  context('development', function() {
    it('displays stack trace', function() {
      process.env.NODE_ENV = 'development';
      stack_trace_404();
    });
  });
});

describe('App', function() {
  it('should show the home page', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('Math');
      done();
    });
  });

  it('should generate a 500 error', function(done) {
    chai.request(server)
    .get('/500')
    .end(function(err, res){
      expect(res.status).to.equal(500);
      done();
    });
  });
});
