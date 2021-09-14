var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utils = require('./lib/utils');

var app = express();

require("./lib/connectMongoose")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de mi API
app.use('/api/anuncios', require('./routes/api/anuncios'));

app.locals.title = 'Nodepop';

// Otras rutas de la web

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/tags', require('./routes/tags'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  res.status(err.status || 500);

  if (utils.isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
