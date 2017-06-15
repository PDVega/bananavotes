var express = require('express');
var router = express.Router();
const models = require ('../models');

/* GET home page. */
router.post('/add', function(req, res, next) {
  let title_topic = req.body.title;
  let desc_topic = req.body.description;
  models.Topic.findOne({where:{}})
  .then(topic => {
    models.Topic.create({
      title: title_topic,
      description: desc_topic
    })
    .then(() => {
      res.redirect('/topics/add')
    })
  })
})
  
router.get('/add', function(req, res, next){
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
