var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'D6T-44L-06' });
});

module.exports = router;