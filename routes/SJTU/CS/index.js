var express = require('express');
var router = express.Router();

var supervisor_model = require('../../../models/supervisor');
var comment_model = require('../../../models/comment');

router.get('/', function(req, res, next){
    supervisor_model.list({
        school: 'SJTU',
        institution: 'CS'
    }, function(err, supervisors){
        res.render('SJTU/CS/index', { title: '计算机科学与技术', supervisors: supervisors });
    });
});

router.get('/:name', function(req, res, next){
    comment_model.list(req.params.name, function(err, comments){
        res.render('SJTU/CS/supervisor', {comments: comments, title: req.params.name});
    });
    /*
    comment_List.list(req.params.name, function(err, comments){
        res.render('SJTU/CS/supervisor', {comments: comments, title: req.params.name});
    });
    */
});


router.post('/:name', function(req, res, next){
    var comment = {
        name: req.params.name,
        money: req.body.money,
        academic: req.body.academic
    };
    console.log(comment);
    comment_Add.add(comment, function(err){
        if(!err) res.redirect('/SJTU/CS/' + comment.name);
    });
    
});

module.exports = router;