var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index2');
var SJTURouter = require('./routes/SJTU/index');
var addCommentRouter = require('./routes/addComment');
var addSupervisor = require('./routes/addSupervisor');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var pkg = require('./package');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session(
  {
  secret: 'Computer_Network',
  resave :true,
  saveUninitialized: true,
  cookie:{maxAge:1000*60*60*24*20},
  store: new MongoStore({  
      url: 'mongodb://localhost/Computer_Network'//链接数据库地址
    })
  }));

app.use('/', indexRouter);
app.use('/SJTU', SJTURouter);
app.use('/addComments', addCommentRouter);
app.use('/addSupervisor', addSupervisor);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  req.flash('error', err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

app.use(function(req, res, next){  
  console.log("app.usr local");  
  res.locals.user = req.session.user; 
  var error = req.flash('error').toString();  
  res.locals.error = error;  
   
  var success = req.flash('success').toString();  
  res.locals.success = success;  
  next();  
});

module.exports = app;
