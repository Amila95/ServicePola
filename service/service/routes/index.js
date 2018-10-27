var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var expressValidator = require('express-validator');
var passport = require('passport');


var bcrypt = require('bcrypt');
const saltRounds =10;

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'service',
  user     : 'root',
  password : '',
});

connection.connect(function(err) {
  if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
  }

  console.log('Connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/',  function(req, res, next) {
  //console.log(req.user);
  //console.log(req.isAuthenticated());
  res.render('index');
});

router.get('/sidebar', function(req, res, next) {
  res.render('sidebar');
});
//test comment by pathum
router.get('/profile',function(req,res,next){
  res.render('profile');
})

router.get('/registion',function(req,res,next){
  res.render('registion');
})

router.get('/add_telenet',function(req,res,next){
  res.render('add_telent');
})

router.get('/add_secound',function(req,res,next){
  res.render('add_secound');
})

router.get('/add_thired',function(req,res,next){
  res.render('add_thired');
})

router.get('/signin',function(req,res,next){
  res.render('signin');
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/signin'
}));

router.get('/logout',function(req,res,next){
  req.logOut();
  req.session.destroy();
  res.redirect('//signin');
})

router.post('/register',function(req,res){
  req.checkBody('name','Username field connot be empty.').notEmpty();

  const errors = req.validationErrors();
  if(errors){
    console.log('errors: ${JSON.stringify(errors)}');

  }
  else{
      var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone_no = req.body.phone_no;
  var dis = req.body.dis;
  var password = req.body.password;
  var district = req.body.district;
  var re_password = req.body.re_password;

 // console.log(district);
 bcrypt.hash(password,saltRounds, function(err,hash){
  connection.query('INSERT INTO user(user_name,email,address,tel_phone,discription,district,password) VALUES(?,?,?,?,?,?,?)',[name,email,address,phone_no,dis,district,hash],function(err,result){
    if(err) throw err;
    // connection.query('SELECT LAST_INSERT_ID() as user_id',function(err,res){
    //   if (err) throw err;
    //   const user_id = result[0];
    //   console.log(result[0]);
    //   req.login(user_id,function(err,res){
    //     res.redirect('/signin');
    //   });

    // })
    connection.query('SELECT LAST_INSERT_ID() as user_id', function (err, results, fields) {
                            if (err) throw err;
                            const user_id = results[0];
                            //console.log(results[0]);
                            req.login(user_id, function (err) {
                                
                                res.redirect('/');
                            }
                            )

                        });
    
  })
 })
  
  }


  
})
passport.serializeUser(function(user_id,done){
  done(null,user_id);
});

passport.deserializeUser(function(user_id,done){
  done(null,user_id);
});

function authenticationMiddleware(){
  return(req,res,next) =>{
    console.log(
      'req.session.passport.user:${JSON.stringify(req.session.passport)}'
    );
    if(req.isAuthenticated()) return next();
    res.redirect('/signin');
  }
}




module.exports = router;
