var express = require('express');
var router = express.Router();
var CSRouter = require('./CS/index')

router.get('/', function(req, res, next){
    res.render('SJTU/index', { title: '上海交通大学' });
});

router.use('/CS', CSRouter);

module.exports = router;