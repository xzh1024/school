var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); //视觉提示  网页的logo
var logger = require('morgan'); //记录日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');  //对post请求的请求体进行解析

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var weixin = require('./routes/weixin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //打印到控制台
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   //访问静态资源

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/weixin', weixin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(80,function() {
	console.log('服务器已启动...');
});

module.exports = app;
