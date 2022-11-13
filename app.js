require('dotenv').config();
require("./database/client");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var offerRouter = require('./routes/offer');
var orderRouter = require('./routes/orderRoute.js')
var ratingRouter = require('./routes/rating.js')
var app = express();
app.use(cors({ origin: '*' , exposedHeaders:"token"}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/offers', offerRouter);
app.use('/orders', orderRouter);
app.use('/ratings', ratingRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err.stack);
  // render the error page
  res.status(err.statusCode || 500);
  res.send({
    error: err.message
  });
});


module.exports = app;
