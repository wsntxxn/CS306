var express = require('express');
var Db=require('../models/user');
var checkLogin = require('../middlewares/check').checkLogin

var router = express.Router();
var User=Db.User;

router.get("/",checkLogin,function(req,res) {  
  req.session.user = null;
  req.flash('success', '退出成功');  
  res.redirect('/');  
});

module.exports=router;