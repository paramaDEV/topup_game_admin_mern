const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const methodOverride = require('method-override')

const dashboardRouter = require('./app/dashboard/route');
const categoryRouter = require('./app/category/route');
const gameRouter = require('./app/game/route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/adminlte',express.static(path.join(__dirname,'/node_modules/admin-lte/')))
app.use('/datatable',express.static(path.join(__dirname,'/node_modules/datatables.net/')))
app.use('/datatable-dt',express.static(path.join(__dirname,'/node_modules/datatables.net-dt/')))
app.use('/jquery',express.static(path.join(__dirname,'/node_modules/jquery/')))
app.use('/sweetalert',express.static(path.join(__dirname,'/node_modules/sweetalert2/')))
app.use('/select2',express.static(path.join(__dirname,'/node_modules/select2/')))
app.use('/app',express.static(path.join(__dirname,'/app')))



app.use('/', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/game',gameRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
