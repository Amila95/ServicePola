var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/sidebar', function(req, res, next) {
  res.render('sidebar');
});

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
  var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone_no = req.body.phone_no;
  var dis = req.body.dis;
  var password = req.body,password;
  var re_password = req.body.re_password;
  //console.log(name);

  
})

router.post('/register',function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone_no = req.body.phone_no;
  var dis = req.body.dis;
  var password = req.body,password;
  var re_password = req.body.re_password;
  //console.log(name);

  
})


module.exports = router;
