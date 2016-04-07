var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
//var reg = require('./routes/reg');
//var login = require('./routes/login');
//var logout = require('./routes/logout');
var report = require('./routes/report');
var cors = require('cors');

//var Redis = require('./config/db/redis');
var cron = require('./config/cron/cron')();


var app = express();
var io = require('socket.io').listen(app.listen(10000));
//app.listen(8000);

// view engine setuindex.htmlp
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req,res,next){
  req.io = io;
  next();
});
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser('Kevin'));
app.use(session({
  secret:'kevin',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//验证是否登录过期
//app.use(function(req,res,next){
//  if(!req.session.username){
//    console.log(req.url,'watching u');
//    if(req.url == "/login"||req.url == '/reg'){
//      next();
//      return;
//    }
//    res.redirect('/login.html');
//  }else if(req.session.username){
//    next();
//  }
//});


//uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);

//app.get('/',function(req,res){
//  var token = uptoken.token();
//  console.log(token,'tttttttttttttttttttttttoken!!!');
//  res.header("Cache-Control", "max-age=0, private, must-revalidate");
//  res.header("Pragma", "no-cache");
//  res.header("Expires", 0);
//  if (token) {
//    res.json({
//      uptoken: token
//    });
//  }
//});

app.use('/report',report);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
