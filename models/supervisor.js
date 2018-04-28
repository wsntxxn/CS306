var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String
});

var Supervisor = mongoose.model('supervisors', schema);

var list = function(req, callback){
    
    mongoose.connect('mongodb://localhost/Computer_Network', function(err){
        if(err) {
            console.log('连接失败');
            callback(err);
        }
        else {
            console.log('连接成功');
            
            Supervisor.find(function(err, supervisors){
                console.log(supervisors);
                mongoose.disconnect();
                if(err) callback(err);
                else callback(null, supervisors);
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

        new Supervisor({
            name: req
        }).save(function(err, doc){
            console.log(doc);
            mongoose.disconnect();
            callback(null);
        });
    } 
    });
}

var supervisors_export = {
    list: list,
    add: add
};

module.exports = supervisors_export;