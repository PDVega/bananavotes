const chai = require('chai');
const should = chai.should();
const models = require('../models');

describe('Topic', function(){
  describe('Create', function(){
    before(function (done) {
      models.Topic.destroy({
        where: {},
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should create topic without error', function(done) {
      models.Topic.create({
        title: 'Test title',
        description: 'Test description',
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
