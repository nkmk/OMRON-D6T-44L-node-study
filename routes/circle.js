var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('circle', { title: 'Temperature Matrix by D3.js' });
});

module.exports = router;