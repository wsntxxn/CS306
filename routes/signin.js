var express = require('express');
var Db=require('../models/Base');
var sha1 = require('sha1')
var checkNotLogin = require('../middlewares/check').checkNotLogin

var router = express.Router();
var User=Db.User;

router.get('/',checkNotLogin, function(req, res, next) {
  res.render('signin');
});


//判断是否为用户
router.post('/',checkNotLogin,function (req, res, next) {
  console.log(req.body);
  var username=req.body.username;
  var userpwd=sha1(req.body.password);
  User.findOne({ name: username, password:userpwd},function(err,user){
  if(user){
    req.flash('success', '登录成功')
    req.session.user=user;
    return res.redirect('/');
  }
  if(!user)
  {
    req.flash('error', '用户不存在')
    return res.redirect('/signin');
  }
  }) 
})

module.exports = router;