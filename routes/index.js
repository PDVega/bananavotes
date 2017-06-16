var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */

router.use(function (req, res, next) {
  // console.log('------------> Time:', Date.now());

  const secureUrls = ['/', '/topics/add'];

  // if (secureUrls.includes(req.path)) {
  if (req.path !== '/login' && req.path !== '/logout') {
    const currentUser = req.session.currentUser;
    if (currentUser) {
      res.locals.currentUser = currentUser;
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
});

router.use(function (req, res, next) {
  const secureUrls = ['/', '/topics/add'];

  res.locals.query = req.query;

  if (req.path !== '/login' && req.path !== '/logout') {
    models.Cat.findAll({
      where: {}
    })
    .then((cats) => {
      res.locals.cats = cats;
      next();
    });
  } else {
    next();
  }
});

router.use(function (req, res, next) {
  const currentUser = req.session.currentUser;

  if (req.path !== '/login' && req.path !== '/logout') {
    models.Topic.findAll({
      order: ['createdAt'],
      limit: 10,
      where: {},
      include: [{ model: models.Beever, where: { id: currentUser.id } }],
    })
    .then((topicList) => {
      const promises = [];
      for (let i = 0; i < topicList.length; i += 1) {
        const myPromise = new Promise(function (resolve, reject) {
          const topic = topicList[i];
          topic.getVotes()
          .then((votes) => {
            let banana = 0;
            let coconut = 0;
            let total = 0;

            for (let j = 0; j < votes.length; j += 1) {
              const vote = votes[j];
              if (vote.answer === 1) {
                banana += 1;
              } else if ((vote.answer === -1)) {
                coconut += 1;
              }

              total += 1;
            }

            topic.banana = banana;
            topic.coconut = coconut;
            topic.total = total;

            resolve(topic);
          });
        });

        promises.push(myPromise);
      }

      Promise.all(promises)
      .then((modifiedTopics) => {
        res.locals.myLatestTopics = modifiedTopics;
        next();
      });
    });
  } else {
    next();
  }
});

router.get('/', function(req, res, next) {
  models.Topic.findAll({
    order: ['createdAt'],
    where: {}
  })
  .then((topicList) => {
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
      res.render('index', { title: 'BananaVotes', topics: modifiedTopics });
    });
  });
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
  delete req.session.currentUser;
  res.redirect('/login');
});


module.exports = router;
