var express = require('express');
var db = require('../models/user');
var sha1 = require('sha1')
var checkNotLogin = require('../middlewares/check').checkNotLogin;


var router = express.Router();
var User=db.User;

router.get('/', checkNotLogin,function(req, res, next) {
  res.render('signup');
});

router.post('/', checkNotLogin, function(req, res,next) {
  var username=req.body.username;
  var userpwd=req.body.password;
  var pwdrepeat=req.body.password2;

  if (username == "" || userpwd == "" || pwdrepeat == "") {
      // req.flash('error', "输入框不能为空！");
      return res.redirect('/signup');
  }
  //两次输入密码如果不一致，提示信息
  if (pwdrepeat!== userpwd) {
      // req.flash("error", '两次输入密码不一致！');
      return res.redirect('/signup');
  }
  //用新注册用户信息对象实例化User对象，用于存储新注册用户和判断注册用户是否存在
  var newUser = new User({
      name: username,
      password:sha1(userpwd),
  });

  User.findOne({ name: username},function(err,user) {
  if(!user){
      // req.flash('success', '注册成功')
      // res.send('happy')
      newUser.save();
      req.session.user=newUser;
      return res.redirect('/');
  }
  if(user) 
  {
      // req.flash('error', '用户名已被占用')
      return res.redirect('/signup');
  }   
  })
})

module.exports=router;