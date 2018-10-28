var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;

var MySQLStore = require('express-mysql-session')(session);



////Authentication Packages
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');

var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
var options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'servicepoladb'
};


var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: sessionStore
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);


passport.use(new LocalStrategy(
  function (u_name, password, done) {
    console.log(u_name);
    console.log(password);
    //return done(null,'njgm');
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "servicepoladb"
    });

    con.connect(function (err) {
      if (err) throw err;


      console.log("Connected!");

      con.query('SELECT u_password,u_id FROM users WHERE u_name = ?', [u_name], function (err, results, fields) {
        if (err) {
          done(err)
        }
        //console.log("rt");
        console.log(results.lenght);
        if (results.lenght === 0) {
          //return done(null,false,{message:'Unknow User
          console.log("bnd");
          done(null, false);
        } else {
          const hash = results[0].u_password.toString();
          bcrypt.compare(password, hash, function (err, response) {
            if (response === true) {
              //req.isAuthenticated= true;
              //user_id = results[0].user_id;
              return done(null, { user_id: results[0].u_id });
              //return done(null, user);

            } else {
              return done(null, false);
            }

          })
        }


        // return done(null,'btfbj');

        //console.log("loging sucefuly");

      });

    });
  }
));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
