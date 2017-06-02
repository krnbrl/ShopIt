var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

/* User URL's */

router.route('/')
	.get(userCtrl.getUsers)
	.post(userCtrl.setUser);

module.exports = router;
