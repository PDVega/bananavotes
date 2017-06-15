var express = require('express');
var router = express.Router();
const models = require ('../models');

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('add_topic', { title: 'Add Topic' });
});

router.get('/vote/:topicId', function(req, res, next) {
  const give = req.query.give;
  const topicId = req.params.topicId;
  let answer = 1;
  if (give === 'coconut') {
    answer = -1;
  }
  res.render('vote_topic', { title: 'Vote', answer, topicId });
});

router.post('/vote', function(req, res, next) {
  // console.log(req.body);
  const topicVoteForm = req.body;
  const currentUser = req.session.currentUser;
  models.Topic.findOne({
    where: { id: topicVoteForm.topicId },
  })
  .then((topic) => {
    models.Beever.findOne({
      where: { id: currentUser.id }
    })
    .then((beever) => {
      models.Vote.create({
        answer: topicVoteForm.answer,
        description: topicVoteForm.description,
      })
      .then((vote) => {
        vote.setBeever(beever)
        .then(() => {
          topic.addVote(vote)
          .then(() => {
            res.redirect('/');
          });
        });
      });
    });
  });
});

router.get('/mytopics', function(req, res, next) {
  res.render('mytopics', { title: 'Topics' });
});

router.get('/topic_detail', function(req, res, next) {
  res.render('topic_detail', { title: 'Topics' });
});

module.exports = router;
