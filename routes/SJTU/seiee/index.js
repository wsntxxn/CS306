var express = require('express');
var router = express.Router();

var supervisor_model = require('../../../models/supervisor');
var comment_model = require('../../../models/comment');
var checkLogin = require('../../../middlewares/check').checkLogin;

router.get('/', function(req, res, next){
    supervisor_model.list({
        school: 'SJTU',
        institution: 'seiee'
    }, function(err, supervisors){
        res.render('SJTU/seiee/index', { title: '电子信息与电气工程学院', supervisors: supervisors });
    });
});

router.get('/:name', function(req, res, next){
    supervisor_model.info(req.params.name, function(err, infomation){
        comment_model.list(req.params.name, function(err, comments){
            //console.log(infomation);
            res.render('SJTU/seiee/supervisor', {
                comments: comments, 
                name: infomation[0].name, 
                homepage: infomation[0].homepage,
                connection: infomation[0].connection
            });
        });
    });
    /*
    comment_List.list(req.params.name, function(err, comments){
        res.render('SJTU/CS/supervisor', {comments: comments, title: req.params.name});
    });
    */
});


router.post('/:name', checkLogin, function(req, res, next){
    console.log(req.fields);
    var comment = {
        author: req.session.user.name,
        name: req.params.name,
        academic: req.body.academic,
        industry: req.body.industry,
        money: req.body.money,
        tea_stu_relationship: req.body.tea_stu_relationship,
        allowance: req.body.allowance,
        communication: req.body.communication
    };
    
    comment_model.add(comment, function(err){
        if(!err) res.redirect('/SJTU/seiee/' + comment.name);
    });
    
});

module.exports = router;