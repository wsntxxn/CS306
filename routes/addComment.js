var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.query.name;
  res.render('addComment',{name: name});
});


module.exports = router;