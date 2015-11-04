var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js');
var nock = require('nock');
var assert = chai.assert;

chai.use(chaiHttp);

function stack_trace_404(env) {
  process.env.NODE_ENV = env;
  it('should 404 if navigating to a page that does not exist', function(done) {
    chai.request(server)
    .get('/doesnotexist')
    .end(function(err, res){
      expect(res.status).to.equal(404);
      expect(res.text).to.contain('Not Found');
      if (process.env.NODE_ENV === 'production') {
        expect(res.text).to.not.contain('Error');
      } else {
        expect(res.text).to.contain('Error');
      }
      done();
    });
  });
};

describe('test stack trace visibility in each environment', function() {
  context('production', function() {
    stack_trace_404('production');
  });

  context('development', function() {
    stack_trace_404('development');
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

  xit('should generate a 500 error', function(done) {
  });
});
