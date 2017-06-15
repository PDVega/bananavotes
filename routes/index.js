var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next){
  res.render('register');
})

router.post('/login', function(req, res, next) {
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  res.redirect('/login');
});

router.get('/logout', function(req, res, next) {
  res.redirect('/login');
});


module.exports = router;
