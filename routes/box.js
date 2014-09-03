var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('box', { title: 'Temperature Matrix by jQuery' });
});

module.exports = router;