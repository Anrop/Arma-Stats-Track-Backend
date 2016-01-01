var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');

var app = require('../setup').app;
var Mission = mongoose.model('Mission');

describe('missions', function () {
  beforeEach(function (done) {
    Mission.remove(done);
  });

  describe('empty', function () {
    it('should return empty missions', function (done) {
      request(app)
        .get('/api/missions')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.missions.should.be.empty();
          done();
        });
    });
  });

  describe('prefilled', function () {
    beforeEach(function (done) {
      Mission.create({
        name: 'Test Mission',
        host: '127.0.0.1',
      }, done);
    });

    it('should return missions', function (done) {
      request(app)
        .get('/api/missions')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.missions.length.should.eql(1);

          var mission = res.body.missions[0];
          mission.name.should.eql('Test Mission');
          mission.host.should.eql('127.0.0.1');

          done();
        });
    });
  });
});
