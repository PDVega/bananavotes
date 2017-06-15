var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentUser = req.session.currentUser;
  if (currentUser) {
    models.Topic.findAll({
      where: {}
    })
    .then((topicList) => {
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
        res.render('index', { title: 'Express', topics: modifiedTopics });
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  let showError = false;
  if (req.query.error !== undefined) {
    showError = true;
  }

  // console.log('------->', req.query.error);

  res.render('login', { showError });
});

router.get('/register', function(req, res, next){
  res.render('register');
})

router.post('/login', function(req, res, next) {
  const loginForm = req.body;
  models.Beever.findOne({
    where: {
      email: loginForm.email,
      password: loginForm.password,
    },
  })
  .then((beever) => {
    // console.log(beever);
    if (beever) {
      req.session.currentUser = {
        id: beever.id,
        email: beever.email,
        name: beever.name,
      };
      res.redirect('/');
    } else {
      res.redirect('/login?error');
    }
  })
  .catch((err) => {
    console.log(err);
  });


});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  const beever = req.body;
  models.Beever.create(beever)
  .then((newBeever) => {
    res.redirect('/login');
  })
  .catch((err) => {

  })
});

router.get('/logout', function(req, res, next) {
  req.session.currentUser
  res.redirect('/login');
});


module.exports = router;
