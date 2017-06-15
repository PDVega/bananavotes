var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  // const topics=[];
  // topics.push({title:'jim', description:'test'}, {title:'john', description:'test 2'})
  models.Topic.findAll({
    where:{}
  })
  .then((topicList) => {
    console.log(topicList);
    res.render('index', { title: 'List Topic', topics:topicList });
  })
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
