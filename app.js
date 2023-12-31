var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var indexRouter = require('./routes/index');
var urlRouter = require('./routes/urlRouter');
var cors = require('cors');

const mongoose = require('mongoose');
const mongoUrl = config.mongoUrl;
const choices = require('./routes/pagal');
const connect = async() => await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

connect().then(async (db) => {
  console.log('Connected Correctly to server.')
  const MongoDb = require('./models/url');
  try{
    const documents = await MongoDb.find({}).exec();
    
    documents.forEach(document => {
      choices.ins(document['shortCode']);
      console.log(document['shortCode']);
    });
  } 
  catch (error) {
    console.error('Error:', error);
  }
}, (err) => {
  console.log(err);
});

console.log("bhut dheere ya tez");
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/url', urlRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');
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

module.exports = app;
