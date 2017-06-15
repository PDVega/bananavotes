const chai = require('chai');
const should = chai.should();
const models = require('../models');

describe('Vote', function(){
  describe('Vote a topic', function(){
    before(function (done) {
      models.Vote.destroy({
        where: {},
      })
      .then(() => {
        models.Beever.destroy({
          where: {},
        }).then(() => {
          models.Topic.destroy({
            where: {},
          }).then(() => {
            done();
          });
        });
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should vote a topic without error', function(done) {
      models.Topic.create({
        title: 'Test title',
        description: 'Test description',
      })
      .then((topic) => {
        models.Beever.create({
          name: 'test',
          email: 'test@gmail.com',
          password: '1234',
        })
        .then((beever) => {
          models.Vote.create({
            answer: 1,
            description: 'Vote description',
          })
          .then((vote) => {
            vote.setBeever(beever)
            .then(() => {
              topic.addVote(vote)
              .then(() => {
                done();
              });
            });
          });
        });
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
