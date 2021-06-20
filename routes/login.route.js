var express = require('express');
var router = express.Router();
// const loginController = require('../controllers/login.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

// router.post('/', loginController.loginUser)

module.exports = router;
