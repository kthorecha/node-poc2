var express = require('express');
var router = express.Router();
const verify = require('../config/verifyToken');

/* GET home page. */
router.get('/',verify, function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;
