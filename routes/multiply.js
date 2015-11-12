var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('multiply');
});

// addition
router.get('/:first/:second', function(req, res) {
  var first = req.params.first;
  var second = req.params.second;
  var result = Number(first) * Number(second);
  console.log('first: ' + first + ', second: ' + second);
  var json_data = {};
  json_data.result = result;
  console.log(json_data);
  res.send(json_data);
  res.end();
});

module.exports = router;
