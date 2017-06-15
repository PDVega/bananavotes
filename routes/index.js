var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentUser = req.session.currentUser;
  if (currentUser) {
    res.render('index', { title: 'Express', currentUser });
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
