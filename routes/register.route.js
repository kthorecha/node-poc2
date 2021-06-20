var express = require('express');
var router = express.Router();
// const userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

// router.post('/', userController.create)

module.exports = router;
