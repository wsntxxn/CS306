var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2');
});

router.get('/collegelist', function(req, res, next){
    res.render('collegelist');
});
module.exports = router;