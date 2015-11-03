var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('expect.js');
var nock = require('nock');

chai.use(chaiHttp);

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

  it('should 404 if navigating to a page that does not exist', function(done) {
    chai.request(server)
    .get('/doesnotexist')
    .end(function(err, res){
      expect(res.status).to.equal(404);
      expect(res.text).to.contain('Not Found');
      done();
    });
  });
});
