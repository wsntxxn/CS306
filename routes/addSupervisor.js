
var express = require('express');
var router = express.Router();
var supervisor_model = require('../models/supervisor');

router.get('/', function(req, res, next){

    res.render('addSupervisor',{
        school: req.query.school, 
        institution: req.query.institution
    });
});

router.post('/', function(req, res, next){
    console.log(req.body.name);
    supervisor_model.add(req.body.name, function(err){
        res.redirect('/SJTU/CS');
    });
    
})

module.exports = router;
