var Comment = require('./Base').Comment;

var list = function(name , callback){
    Comment.where('name').equals(name).exec(function(err, comments){
        if(err) callback(err);
        else callback(null, comments);
    });
    
}

var add = function(req , callback){
    new Comment({
        author: req.author,
        name: req.name,
        academic: req.academic,
        industry: req.industry,
        money: req.money,
        allowance: req.allowance,
        tea_stu_relationship: req.tea_stu_relationship,
        communication: req.communication
    }).save(function(err, doc){
        //console.log(doc);
        if(err) callback(err);
        else callback(null);
    });
}

module.exports = {
    list: list,
    add: add
};