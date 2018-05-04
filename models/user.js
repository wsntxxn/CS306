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

exports.User = mongoose.model('User', userlistScheMa);