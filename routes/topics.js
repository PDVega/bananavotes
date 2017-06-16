var express = require('express');
var router = express.Router();
const models = require ('../models');

/* GET home page. */
router.post('/add', function(req, res, next) {

  const currentUser = req.session.currentUser;

  let title_topic = req.body.title;
  let desc_topic = req.body.description;
  models.Topic.create({
    title: title_topic,
    description: desc_topic
  })
  .then((topic) => {
    models.Beever.findOne({
      where: { id: currentUser.id }
    })
    .then((beever) => {
      beever.addTopics(topic)
      .then(() => {
        res.redirect('/');
      });
    });
  });
})

router.get('/add', function(req, res, next){
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
  const currentUser = req.session.currentUser;

  if (currentUser) {
    models.Topic.findAll({
      where: {},
      include: [{ model: models.Beever, where: { id: currentUser.id } }],
    })
    .then((topicList) => {
      console.log('-----------------> ', topicList);
      res.locals.currentUser = currentUser;

      const promises = [];
      for (let i = 0; i < topicList.length; i += 1) {
        const myPromise = new Promise(function (resolve, reject) {
          const topic = topicList[i];
          topic.getVotes()
          .then((votes) => {
            let banana = 0;
            let coconut = 0;

            for (let j = 0; j < votes.length; j += 1) {
              const vote = votes[j];
              if (vote.answer === 1) {
                banana += 1;
              } else if ((vote.answer === -1)) {
                coconut += 1;
              }
            }

            topic.banana = banana;
            topic.coconut = coconut;

            resolve(topic);
          });
        });

        promises.push(myPromise);
      }

      Promise.all(promises)
      .then((modifiedTopics) => {
        res.render('mytopics', { title: 'My Topics', topics: modifiedTopics });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/topic_detail/:topicId', function(req, res, next) {
  const topicId = req.params.topicId;
  models.Topic.findOne({
    where: { id: topicId }
  })
  .then((topic) => {
    topic.getVotes()
    .then((votes) => {
      const promises = [];
      for (let i = 0; i < votes.length; i += 1) {
        const vote = votes[i];
        const myPromise = new Promise(function (resolve, reject) {
          vote.getBeever()
          .then((beever) => {
            vote.beeverName = beever.name;
            resolve(vote);
          });
        });

        promises.push(myPromise);
      }

      Promise.all(promises)
      .then((modiviedVotes) => {
        res.render('topic_detail', { title: 'Topic Details', topic, votes: modiviedVotes });
      });
    });
  });
});

module.exports = router;
