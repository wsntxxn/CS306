var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Computer_Network');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("数据库成功连接");
});

var Schema = mongoose.Schema;
var userlistScheMa = new Schema({
    name     : {type : String},
    password : {type : String},
    // gender: { type: 'string', enum: ['m', 'f'], default: 'm' },

});

var supervisorScheMa = new Schema({
    name: String,
    school: String,
    institution: String,
    homepage: String,
    connection: Object
});

var commentScheMa = new Schema({
    author: String,
    name: String,
    academic: String,
    industry: String,
    money: String,
    tea_stu_relationship: String,
    allowance: String,
    communication: String
});

exports.User = mongoose.model('User', userlistScheMa);
exports.Supervisor = mongoose.model('supervisors', supervisorScheMa);
exports.Comment = mongoose.model('comments', commentScheMa);