
var express = require('express');
var router = express.Router();
var supervisor_model = require('../models/supervisor');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next){
    res.render('addSupervisor');
});

router.post('/', checkLogin, function(req, res, next){
    var supervisor = {
        name: req.body.name,
        //school: req.body.school,
        //institution: req.body.institution,
        homepage: req.body.homepage
    }
    console.log(supervisor);
    supervisor_model.add(supervisor, function(err){
        res.redirect('/SJTU/seiee');
    });
    
})

module.exports = router;
