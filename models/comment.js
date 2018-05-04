var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    author: String,
    name: String,
    academic: String,
    industry: String,
    money: String,
    tea_stu_relationship: String,
    allowance: String,
    communication: String
});

var Comments = mongoose.model('comments', schema);

var list = function(name , callback){
    
    mongoose.connect('mongodb://localhost/Computer_Network', function(err){
        if(err) console.log('连接失败');
        else {
            console.log('连接成功');
            
        Comments.where('name').equals(name).exec(function(err, comments){
            //console.log(comments);
            mongoose.disconnect();
            if(err) callback(err);
            else callback(null, comments);
        });
        } 
    });
    
}

var add = function(req , callback){
    mongoose.connect('mongodb://localhost/Computer_Network', function(err){
    if(err) {
        console.log('连接失败');
        callback(new Error("数据库连接错误"));
    }
    else {
        console.log('连接成功');

        new Comments({
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
            mongoose.disconnect();
            callback(null);
        });
    } 
});
}

var comments_export = {
    list: list,
    add: add
};

module.exports = comments_export;