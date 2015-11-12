var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('add');
});

// addition
router.get('/:first/:second', function(req, res) {
  var first = req.params.first;
  var second = req.params.second;
  var result = Number(first) + Number(second);
  console.log('first: ' + first + ', second: ' + second);
  var to_json = ('result : ' + result);
  console.log(to_json);
  res.send(JSON.stringify(to_json));
  res.end();
});

module.exports = router;
