var express = require('express');
var router = express.Router();
const db = require ('../models');

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('add_topic', { title: 'Add Topic' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote_topic', { title: 'Vote' });
});

router.get('/mytopics', function(req, res, next) {
  res.render('mytopics', { title: 'Topics' });
});

router.get('/topic_detail', function(req, res, next) {
  res.render('topic_detail', { title: 'Topics' });
});

module.exports = router;
