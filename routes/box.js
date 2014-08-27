var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('box', { title: 'Box' });
  res.render('box');
});

module.exports = router;