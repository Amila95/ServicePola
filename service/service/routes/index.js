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
  res.render('index', { layout: 'home_layout' });
});

router.get('/sidebar', function (req, res, next) {
  res.render('sidebar');
});

router.get('/sub_category', function (req, res, next) {
  res.render('subcategory', { layout: 'home_layout' });
});

router.get('/service_provider_list', function (req, res, next) {
  res.render('service_provider_list', { layout: 'home_layout' });
});
//test comment by pathum
router.get('/profile', function (req, res, next) {
  const user_id = req.user.user_id;
  console.log(user_id);
<<<<<<< HEAD
  connection.query('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?',[user_id],function(err,rows){
      const s_p_id = rows[0].s_p_id;
      console.log(s_p_id);
      connection.query('SELECT * sub_talent.s_t_name  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?',[s_p_id],function(err,row1){
        res.render('profile',{details:rows,talents:row1});
      })
      
   
  }) 
=======
  connection.query('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id], function (err, rows) {
    const s_p_id = rows[0].s_p_id;
    console.log(s_p_id);
    connection.query('SELECT * ,sub_talent.s_t_name  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id], function (err, row1) {
      res.render('profile', { details: rows, talents: row1 });
    })


  })
>>>>>>> db77d95242a0e4685ac5a8b8563f1dc6bcb10c3d




  //res.render('profile');
})

router.get('/registion', function (req, res, next) {
  res.render('registion', { success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
})

router.get('/add_telenet', function (req, res, next) {
  //console.log(req.isAuthenticated());
  //console.log(user_id);
  connection.query('SELECT * FROM main_talent',function(err,rows){
    connection.query('SELECT * FROM sub_talent',function(err,row1){
      res.render('add_telent',{main:rows,sub:row1});
    })

  })

  
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
  req.checkBody('email', 'Email field connot be empty.').notEmpty();
  req.checkBody('email', 'Enter a valid email address.').isEmail();
  req.checkBody('address', 'Address field connot be empty.').notEmpty();
  req.checkBody('phone_no', 'Mobile field connot be empty.').notEmpty();
  req.checkBody('dis', 'Discription field connot be empty.').notEmpty();
  req.checkBody('password', 'Password field connot be empty.').notEmpty();
  req.checkBody('district', 'District field connot be empty.').notEmpty();
  req.checkBody('city', 'City field connot be empty.').notEmpty();
  req.checkBody('dob', 'DOB field connot be empty.').notEmpty();
  req.checkBody('re_password', 'Re Password field connot be empty.').notEmpty();
  var namer='';
  var emailer="";
  var addresser = "";
  var phone_noer = "";
  var diser = "";
  var passworder = "";
  var districter = "";
  var cityer = "";
  var dober = "";
  var re_passworder = "";
  
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    //console.log('errors: ${JSON.stringify(errors)}');
    for(i=0;i<errors.length;i++){
      if(errors[i].param == 'name')
      {
        console.log("dbj");
        namer= errors[i].msg;
        //console.log(req.session.error);
      }
      
      if(errors[i].param == 'email')
      {
        console.log("dbj");
        emailer= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'address')
      {
        console.log("dbj");
        addresser= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'phone_no')
      {
        console.log("dbj");
        phone_noer= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'dis')
      {
        console.log("dbj");
        diser= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'password')
      {
        console.log("dbj");
        passworder= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'district')
      {
        console.log("dbj");
        districter= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'city')
      {
        console.log("dbj");
        cityer= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'dob')
      {
        console.log("dbj");
        dober= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 're_password')
      {
        console.log("dbj");
        re_passworder= errors[i].msg;
        //console.log(req.session.error);
      }
      
    }
   
    
    req.session.errors = errors;
    req.session.success = false;
    res.render('registion',{namer:namer,emailer:emailer,addresser:addresser,phone_noer:phone_noer,diser:diser,
      passworder:passworder,districter:districter,cityer:cityer,dober:dober,re_passworder:re_passworder})

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
      connection.query('INSERT INTO service_provider(s_name,email,address,mobile,overal_description,district,dob,town) VALUES(?,?,?,?,?,?,?,?)', [name, email, address, phone_no, dis, district, dob, city], function (err, result) {
        if (err) throw err;
        connection.query('SELECT LAST_INSERT_ID() as s_p_id', function (err, results, fields) {
          if (err) throw err;
          var s_p_id = results[0].s_p_id;
          //console.log(s_p_id);

          connection.query('INSERT INTO users(u_email,u_name,u_password,u_group,u_status,s_p_id) VALUES(?,?,?,?,?,?)', [email, name, hash, '1', '1', s_p_id], function (err, result) {
            if (err) throw err;
            connection.query('SELECT LAST_INSERT_ID() as u_id', function (err, results, fields) {
              if (err) throw err;
<<<<<<< HEAD
                const user_id = results[0].u_id;
                console.log(results[0].u_id);
                req.login(user_id, function (err) {
                 console.log(user_id);
                // res.render('add_telent',{user_id:user_id});

                 connection.query('SELECT * FROM main_talent',function(err,rows){
                  connection.query('SELECT * FROM sub_talent',function(err,row1){
                    res.render('add_telent',{main:rows,sub:row1,user_id:user_id});
                  })
              
                })
               }
               )
            })  
           
          })
=======
              const user_id = results[0].u_id;
              console.log(results[0].u_id);
              req.login(user_id, function (err) {
                console.log(user_id);
                res.render('add_telent', { user_id: user_id });
              }
              )
            })

>>>>>>> db77d95242a0e4685ac5a8b8563f1dc6bcb10c3d
          })
        })



      })
    })

  }



})

// <<<<<<< HEAD
// router.post('/fristadd', function (req, res) {
//   var main = req.body.main;
// =======
router.post('/fristadd',function(req, res){
  req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  var mainer='';
  var suber="";
  var diser = "";
  
  var errors = req.validationErrors();

  if(errors){
    for(i=0;i<errors.length;i++){
      if(errors[i].param == 'main')
      {
        console.log("dbj");
        mainer= errors[i].msg;
        //console.log(req.session.error);
      }
      
      if(errors[i].param == 'sub')
      {
        console.log("dbj");
        suber= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'dis')
      {
        console.log("dbj");
        diser= errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    res.render('add_telent',{mainer:mainer,suber:suber,diser:diser})

  }
  else{
    var main = req.body.main;
//>>>>>>> master
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);
  connection.query('SELECT * FROM users WHERE u_id = ?', [user_id], function (err, row2) {
    var s_p_id = row2[0].s_p_id;
    console.log(s_p_id);
    connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis], function (err, result) {
      if (err) throw err;
      res.render('add_secound', { user_id: user_id });
    })
  })

  }
  

})

// <<<<<<< HEAD
// router.post('/secoundadd', function (req, res) {
// =======
router.post('/secoundadd',function(req, res){
  req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  var mainer="";
  var suber="";
  var diser = "";
  
  var errors = req.validationErrors();

  if(errors){
    for(i=0;i<errors.length;i++){
      if(errors[i].param == 'main')
      {
        console.log("dbj");
        mainer= errors[i].msg;
        //console.log(req.session.error);
      }
      
      if(errors[i].param == 'sub')
      {
        console.log("dbj");
        suber= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'dis')
      {
        console.log("dbj");
        diser= errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    res.render('add_secound',{mainer:mainer,suber:suber,diser:diser})

  }
  else{
//
  var main = req.body.main;
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);
  connection.query('SELECT * FROM users WHERE u_id = ?', [user_id], function (err, row2) {
    console.log(row2);
    var s_p_id = row2[0].s_p_id;
    connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis], function (err, result) {
      if (err) throw err;
      res.render('add_thired', { user_id: user_id });
    })

  })
// <<<<<<< HEAD


// })

// router.post('/thiredadd', function (req, res) {
// =======
}

})

router.post('/thiredadd',function(req, res){
  req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  var mainer='';
  var suber="";
  var diser = "";
  
  var errors = req.validationErrors();

  if(errors){
    for(i=0;i<errors.length;i++){
      if(errors[i].param == 'main')
      {
        console.log("dbj");
        mainer= errors[i].msg;
        //console.log(req.session.error);
      }
      
      if(errors[i].param == 'sub')
      {
        console.log("dbj");
        suber= errors[i].msg;
        //console.log(req.session.error);
      }
      if(errors[i].param == 'dis')
      {
        console.log("dbj");
        diser= errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    res.render('add_thired',{mainer:mainer,suber:suber,diser:diser})

  }
  else{
// >>>>>>> master
  var main = req.body.main;
  var sub = req.body.sub;
  var dis = req.body.dis;
  var user_id = req.body.user;
  console.log(req.isAuthenticated());
  console.log(user_id);

  connection.query('SELECT * FROM users WHERE u_id = ?', [user_id], function (err, row2) {
    var s_p_id = row2[0].s_p_id;
    connection.query('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis], function (err, result) {
      if (err) throw err;
      res.redirect('/signin');
    })
  })
// <<<<<<< HEAD

// =======
//})
  }
//>>>>>>> master


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

router.post('/textdata',function(req,res){
  var m_t_id = req.body.branch;

  console.log(m_t_id);
  connection.query('SELECT * FROM sub_talent WHERE m_t_id = ?',[m_t_id], function(err,rows){
    console.log(rows);
    res.send(rows);
  })

})




module.exports = router;
