var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var authen = require('../ulinitites/authen')
var user =[{id:1 ,username:1,password:1},{id:2 ,username:2,password:2},]
/* GET home page. */
router.get('/',authen.authenlogin, function(req, res, next) {
  res.redirect('/dashboard')
});
router.get('/login', function(req, res, next) {
  res.render('login')
});
router.post('/login', function(req, res, next) {
  let{email,pswd} = req.body
  let users = user.find(us=> us.username==email && us.password == pswd)
  if(users){
    var token = jwt.sign({ user }, process.env.JWT_KEY);  
    req.session.token = token
      res.redirect('/dashboard')
  }else{
    res.redirect('/login')
  }
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if(err){

    }else{
      res.redirect('/login')
    }
  })
});
module.exports = router;
