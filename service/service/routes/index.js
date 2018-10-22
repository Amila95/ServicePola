var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var expressValidator = require('express-validator');


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
router.get('/', function(req, res, next) {
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

router.post('/register',function(req,res){
  req.checkBody('name','Username field connot be empty.').notEmpty();

  const errors = req.validationErrors();
  if(errors){
    console.log('errors: ${JSON.stringify(errors)}');

  }

//   var name = req.body.name;
//   var email = req.body.email;
//   var address = req.body.address;
//   var phone_no = req.body.phone_no;
//   var dis = req.body.dis;
//   var password = req.body.password;
//   var district = req.body.district;
//   var re_password = req.body.re_password;

//  // console.log(district);
//   connection.query('INSERT INTO user(user_name,email,address,tel_phone,discription,district,password) VALUES(?,?,?,?,?,?,?)',[name,email,address,phone_no,dis,district,password],function(err,result){
//     if(err) throw err;
//     res.render('add_telent');
//   })
  
})




module.exports = router;
