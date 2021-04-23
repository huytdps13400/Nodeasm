var express = require('express');
var router = express.Router();
var authen = require('../ulinitites/authen')

/* GET home page. */
router.get('/',authen.authenlogin, function(req, res, next) {
  res.render('dashboard');
});



module.exports = router;
