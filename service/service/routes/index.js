var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');
var passport = require('passport');


var bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'servicepoladb',
  user: 'root',
  password: '',
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log(req.user);
  //console.log(req.isAuthenticated());
  res.render('index');
});

router.get('/sidebar', function (req, res, next) {
  res.render('sidebar');
});
//test comment by pathum
router.get('/profile', function (req, res, next) {
  res.render('profile');
})

router.get('/registion', function (req, res, next) {
  res.render('registion');
})

router.get('/add_telenet', function (req, res, next) {
  //console.log(req.isAuthenticated());
  //console.log(user_id);
  res.render('add_telent');
})

router.get('/add_secound', function (req, res, next) {
  res.render('add_secound');
})

router.get('/add_thired', function (req, res, next) {
  res.render('add_thired');
})

router.get('/home', function (req, res, next) {
  res.render('home', { layout: 'home_layout' });
})

router.get('/signin', function (req, res, next) {
  res.render('signin');
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

router.get('/logout', function (req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/signin');
})

router.post('/register', function (req, res) {
  req.checkBody('name', 'Username field connot be empty.').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    console.log('errors: ${JSON.stringify(errors)}');

  }
  else {
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var phone_no = req.body.phone_no;
    var dis = req.body.dis;
    var password = req.body.password;
    var district = req.body.district;
    var city = req.body.city;
    var dob = req.body.dob;
    var re_password = req.body.re_password;

    // console.log(district);
    bcrypt.hash(password, saltRounds, function (err, hash) {
      connection.query('INSERT INTO service_provider(s_name,email,address,mobile,overal_description,district,dob,town) VALUES(?,?,?,?,?,?,?,?)', [name, email, address, phone_no, dis, district, dob, city ], function (err, result) {
        if (err) throw err;
        connection.query('SELECT LAST_INSERT_ID() as s_p_id', function (err, results, fields) {
          if(err) throw err;
          var s_p_id = results[0].s_p_id;
          //console.log(s_p_id);
          
          connection.query('INSERT INTO users(u_email,u_name,u_password,u_group,u_status,s_p_id) VALUES(?,?,?,?,?,?)',[email,name,hash,'1','1',s_p_id],function(err,result){
            if(err) throw err;
            connection.query('SELECT LAST_INSERT_ID() as u_id', function (err, results, fields) {
              if (err) throw err;
                const user_id = results[0].u_id;
                console.log(results[0].u_id);
                req.login(user_id, function (err) {
                 console.log(user_id);
                 res.render('add_telent',{user_id:user_id});
               }
               )
            })  
           
          })
          })
        
       

      })
    })

  }



})

router.post('/fristadd',function(req, res){
  var main = req.body.main;
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);

  connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [user_id, sub, dis], function (err, result) {
    if(err) throw err;
    res.render('add_secound',{user_id:user_id});
})

})

router.post('/secoundadd',function(req, res){
  var main = req.body.main;
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);

  connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [user_id, sub, dis], function (err, result) {
    if(err) throw err;
    res.render('add_thired',{user_id:user_id});
})

})

router.post('/thiredadd',function(req, res){
  var main = req.body.main;
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);

  connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [user_id, sub, dis], function (err, result) {
    if(err) throw err;
    res.redirect('/signin');
})



})

passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      'req.session.passport.user:${JSON.stringify(req.session.passport)}'
    );
    if (req.isAuthenticated()) return next();
    res.redirect('/signin');
  }
}




module.exports = router;
