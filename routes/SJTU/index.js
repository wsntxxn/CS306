var express = require('express');
var router = express.Router();
var seieeRouter = require('./seiee/index')

router.get('/', function(req, res, next){
    res.render('SJTU/index', { title: '上海交通大学' });
});

router.use('/seiee', seieeRouter);

module.exports = router;