var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var app = express();

////
// DATABASE
////
var db = monk('localhost:27017/kanban');

////
// interceptor / filter
////
app.use(function(req,res,next) {
    req.db = db;
    next();
});

////
// SETUP
////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

////
// USE
////
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////
// WEB ROUTES
////
var routes = require('./routes/web/board');
app.use('/kanban/web/board', routes);

////
// REST ROUTES
////
routes = require('./routes/rest/boards');
app.use('/kanban/boards', routes);
routes = require('./routes/rest/users');
app.use('/kanban/users', routes);

////
// CATCHALL ROUTES
////
routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

////
// ERROR handlers
////

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	// http://stackoverflow.com/questions/5276892/expressjs-how-to-output-pretty-html
	app.locals.pretty = true;
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
