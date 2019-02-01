var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var cors = require('cors');
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash');

////Authentication Packages
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');
var helmet = require('helmet');

var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'home_layout',
    layoutDir: __dirname + '/views/layouts/'
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//sql injection preventing
app.use(helmet());
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
//app.use(express.csrf());

//app.use(cookieParser('secret'));
//app.use(session({cookie: { maxAge: 60000 }}));
//app.use(sqlinjection);

var options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'servicepoladb'
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: sessionStore

    /*,
  cookie:{httpOnly:true,secure:true}*/ // added by watti
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

passport.use(
  new LocalStrategy(function(email, password, done) {
    console.log(email);
    console.log(password);
    //return done(null,'njgm');

    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'servicepoladb'
    });

    con.connect(function(err) {
      if (err) throw err;

      console.log('Connected!');

      con.query(
        'SELECT u_password,u_id FROM users WHERE u_email = ?',
        [email],
        function(err, result, fields) {
          if (err) {
            done(err);
          }
          //console.log("rt");
          // console.log(result);
          // console.log(result.length);
          if (result.length > 0) {
            //return done(null,false,{message:'Unknow User
            console.log('bf');
            const hash = result[0].u_password.toString();
            bcrypt.compare(password, hash, function(err, response) {
              if (response === true) {
                //req.isAuthenticated= true;
                //user_id = results[0].user_id;
                return done(null, {
                  user_id: result[0].u_id
                });
                //return done(null, user);
              } else {
                return done(null, false);
              }
            });
          } else {
            console.log('bndssss');
            done(null, false);
          }

          // return done(null,'btfbj');

          //console.log("loging sucefuly");
        }
      );
    });
  })
);

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
