var Supervisor = require('./Base').Supervisor;

var list = function(req, callback){
    Supervisor.find(function(err, supervisors){
        if(err) callback(err);
        else callback(null, supervisors);
    });
}

var add = function(req, callback){
    new Supervisor({
        name: req.name,
        school: req.school,
        institution: req.institution,
        homepage: req.homepage
    }).save(function(err, doc){
        if(err) callback(err);
        else callback(null);
    });
}

var info = function(req, callback){
    /*
    Supervisor.where('name').equals(req).exec(function(err, infomation){
        if(err) callback(err);
        else callback(null, infomation);
    });
    */

    Supervisor.findOne({name: req}, function(err, infomation){
        if(err) callback(err);
        else callback(null, infomation);
    });
}

var addConnection = function(name, connection, callback){
    var conditions = {name: name};  
    var updates = {$set: {connection: connection}};
    Supervisor.update(conditions, updates, function (error) {
        if (error){
            console.error(error);
            callback(error);
        }
        else{
            console.log("更新成功");
            callback(null);
        }
            
    });
}

module.exports = {
    list: list,
    add: add,
    info: info,
    addConnection: addConnection
}