var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', userController.getAll);
router.post('/create', userController.create);

module.exports = router;
