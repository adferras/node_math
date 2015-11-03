var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

module.exports = router;
