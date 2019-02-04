var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');
var passport = require('passport');
var multer = require('multer');
var emailCheck = require('email-check');
var SqlString = require('sqlstring');
var flash = require('connect-flash');


var bcrypt = require('bcrypt');
const saltRounds = 10;

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/upload/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).any()

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'servicepoladb',
  user: 'root',
  password: 'Ebba@123',
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

  if (req.isAuthenticated()) {
    connection.query('SELECT * FROM main_talent', function (err, main_talents) {
      var u_id = req.user.user_id;
      console.log(u_id);
      connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [u_id]), function (err, rows) {
        var s_p_id = rows[0].s_p_id;
        connection.query(SqlString.format('SELECT * FROM service_provider WHERE s_p_id=?', [s_p_id]), function (err, row1) {
          var image = row1[0].image;
          var name = row1[0].s_name;
          res.render('home', {
            main_talents: main_talents,
            nav_image: image,
            nav_name: name
          });
        })
      })
    })
  } else {
    connection.query('SELECT * FROM main_talent', function (err, main_talents) {
      res.render('index', {
        main_talents: main_talents
      });
    })
  }

});



router.get('/sub_category:id', function (req, res, next) {
  var id = req.params.id;
  if (req.isAuthenticated()) {
    var u_id = req.user.user_id;
    console.log(u_id);
    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [u_id]), function (err, rows) {
      var s_p_id = rows[0].s_p_id;
      connection.query(SqlString.format('SELECT * FROM service_provider WHERE s_p_id=?', [s_p_id]), function (err, row1) {
        var image = row1[0].image;
        var name = row1[0].s_name;
        connection.query(SqlString.format('SELECT * FROM sub_talent WHERE m_t_id=?', [id]), function (err, sub_talents) {
          res.render('sub_category', {
            sub_talents: sub_talents,
            nav_image: image,
            nav_name: name
          });
        })
      })
    })

  } else {
    connection.query(SqlString.format('SELECT * FROM sub_talent WHERE m_t_id=?', [id]), function (err, sub_talents) {
      res.render('sub_category', {
        sub_talents: sub_talents
      });
    })
  }

});

router.get('/service_provider_list:id', function (req, res, next) {

  if (req.isAuthenticated()) {
    var id = req.params.id;
    var u_id = req.user.user_id;
    var no_user = false
    //console.log(id);
    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [u_id]), function (err, rows) {
      var s_p_id = rows[0].s_p_id;
      connection.query(SqlString.format('SELECT * FROM service_provider WHERE s_p_id=?', [s_p_id]), function (err, row1) {
        var image = row1[0].image;
        var name = row1[0].s_name;
        connection.query(SqlString.format('SELECT * FROM provider_talent INNER JOIN service_provider ON provider_talent.s_p_id = service_provider.s_p_id WHERE s_t_id = ?', [id]), function (err, row2) {
          console.log(row2);
          if (row2.length == 0) {
            no_user = true;
          }
          res.render('service_provider_list', {
            rows: row2,
            nav_image: image,
            nav_name: name,
            no_user: no_user
          });
        })
      })
    })

  } else {
    var id = req.params.id;
    connection.query(SqlString.format('SELECT * FROM provider_talent INNER JOIN service_provider ON provider_talent.s_p_id = service_provider.s_p_id WHERE s_t_id = ?', [id]), function (err, row2) {
      //console.log("bu");
      //console.log(row2);
      var no_user = false;
      if (row2.length == 0) {
        no_user = true;
      }

      res.render('service_provider_list', {
        rows: row2,
        no_user: no_user
      });
    })
  }

});

router.get('/provider_profile:id', function (req, res, next) {
  var id = req.params.id;
  var no_post = false;
  //const user_id = req.user.user_id;

  //console.log(user_id);
  if (req.isAuthenticated()) {
    connection.query(SqlString.format('SELECT * FROM service_provider  WHERE s_p_id=?', [id]), function (err, rows) {
      const s_p_id = rows[0].s_p_id;
      user_id = req.user.user_id;
      //var nav_image = nav_image(user_id); 

      //console.log(s_p_id);
      connection.query(SqlString.format('SELECT *  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id]), function (err, row1) {
        // if(row1.length<3){
        //   add_more= true;
        // }
        connection.query('SELECT * FROM main_talent', function (err, row2) {
          connection.query(SqlString.format('SELECT * FROM post WHERE s_p_id = ? ORDER BY p_id DESC', [id]), function (err, row3) {
            console.log(row3);
            if (row3.length) {
              console.log("ndjf");

            } else {
              no_post = true;
              console.log("aaaaa");
            }
            //console.log(row4);
            connection.query(SqlString.format('SELECT * FROM users WHERE u_id=?', [user_id]), function (err, row5) {

              var s_p_id = row5[0].s_p_id;
              connection.query(SqlString.format('SELECT * FROM service_provider  WHERE s_p_id=? ', [s_p_id]), function (err, row4) {
                var nav_image = row4[0].image;
                var nav_name = row4[0].s_name;
                //console.log(row4);
                res.render('profile_viewr', {

                  details: rows,
                  talents: row1,
                  main: row2,
                  post: row3,
                  nav_image: nav_image,
                  nav_name: nav_name,
                  no_post: no_post
                });
              })
            })

          })
        })
      })

    })

  } else {
    connection.query(SqlString.format('SELECT * FROM service_provider  WHERE s_p_id=?', [id]), function (err, rows) {
      const s_p_id = rows[0].s_p_id;

      //console.log(s_p_id);
      connection.query(SqlString.format('SELECT *  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id]), function (err, row1) {
        // if(row1.length<3){
        //   add_more= true;
        // }
        connection.query('SELECT * FROM main_talent', function (err, row2) {
          connection.query(SqlString.format('SELECT * FROM post WHERE s_p_id = ? ORDER BY p_id DESC', [s_p_id]), function (err, row3) {
            if (row3.length) {
              //console.log("ndjf");

            } else {
              no_post = true;
              console.log("aaaaa");
            }
            res.render('profile_viewr', {

              details: rows,
              talents: row1,
              main: row2,
              post: row3,
              no_post: no_post

            });
          })

        })
      })


    })
  }

})
//test comment by pathum
//test comment by Amila
router.get('/profile', function (req, res, next) {
  const user_id = req.user.user_id;
  var add_more = false;
  var no_post = true;
  console.log(user_id);
  console.log(req.isAuthenticated());
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    const s_p_id = rows[0].s_p_id;
    const ima = rows[0].image;
    var nav_image = rows[0].image;
    var nav_name = rows[0].s_name;
    console.log(nav_image);
    console.log(nav_name);
    console.log(s_p_id);
    connection.query(SqlString.format('SELECT *  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id]), function (err, row1) {
      if (row1.length < 3) {
        add_more = true;
      }
      connection.query('SELECT * FROM main_talent', function (err, row2) {
        connection.query(SqlString.format('SELECT * FROM post WHERE s_p_id = ? ORDER BY p_id DESC', [s_p_id]), function (err, row3) {
          console.log(row3);
          if (row3.lenght) {
            no_post = false;
          }
          res.render('profile', {
            details: rows,
            talents: row1,
            main: row2,
            add_more: add_more,
            post: row3,
            nav_image: nav_image,
            nav_name: nav_name,
            no_post: no_post

          });
        })

      })
    })


  })

})

router.get('/registion', function (req, res, next) {
  //req.session.errors = null;
  res.render('registion');

})

router.get('/add_telenet', function (req, res, next) {
  //console.log(req.isAuthenticated());
  //console.log(user_id);
  connection.query('SELECT * FROM main_talent', function (err, rows) {
    connection.query('SELECT * FROM sub_talent', function (err, row1) {
      res.render('add_telent', {
        main: rows,
        sub: row1
      });
    })

  })


})

router.get('/add_secound', function (req, res, next) {
  res.render('add_secound');
})

router.get('/add_thired:id', authenticationMiddleware(), function (req, res, next) {

  var user_id = req.user.user_id;
  console.log(user_id);
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    var s_p_id = rows[0].s_p_id;
    connection.query(SqlString.format('SELECT *  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id]), function (err, row5) {
      //console.log(row5);
      if (row5.length > 3) {
        res.redirect('/post1');
      } else {
        var image = rows[0].image;
        var name = rows[0].s_name;
        var m_t_id = req.params.id;
        connection.query(SqlString.format('SELECT * FROM main_talent WHERE m_t_id = ?', [m_t_id]), function (err, row2) {
          connection.query(SqlString.format('SELECT * FROM sub_talent WHERE m_t_id = ?', [m_t_id]), function (err, row) {
            console.log(row);
            res.render('add_thired', {
              main: row2,
              sub: row,
              nav_image: image,
              nav_name: name
            });
          })
        })
      }
    })


  })

})



router.get('/home', authenticationMiddleware(), function (req, res, next) {


  var user_id = req.user.user_id;
  console.log(user_id);
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    var image = rows[0].image;
    var name = rows[0].s_name;
    connection.query('SELECT * FROM main_talent', function (err, main_talents) {
      res.render('home', {
        main_talents: main_talents,
        details: rows,
        nav_image: image,
        nav_name: name
      });
    })
  })


})

router.get('/signin', function (req, res, next) {
  res.render('signin');
})

router.post('/login', passport.authenticate('local', {


    failureRedirect: '/signin',
    failureFlash: true,
    message: 'The email you entered is incorrect'
  }),

  function (req, res) {
    console.log(req.user.user_id);
    connection.query('SELECT * FROM users WHERE u_id = ? ', [req.user.user_id], function (err, rows) {
      console.log(rows);
      if (rows) {
        if (rows[0].u_group === 1) {
          res.redirect('/post1');
        } else {
          res.redirect('/admin');
        }
      } else {
        console.log("fhbru");
        res.redirect('/signin');
      }
    })
  }
);

router.get('/logout', function (req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
})

router.post('/register', function (req, res) {
  req.checkBody('name', 'Username field connot be empty.').notEmpty();
  req.checkBody('email', 'Email field connot be empty.').notEmpty();
  req.checkBody('email', 'Enter a valid email address.').isEmail();
  req.checkBody('address', 'Address field connot be empty.').notEmpty();
  req.checkBody('phone_no', 'Mobile field connot be empty.').notEmpty();
  req.checkBody('phone_no', 'Mobile number is not valid.').len(10);
  req.checkBody('dis', 'Discription field connot be empty.').notEmpty();
  req.checkBody('password', 'Password field connot be empty.').notEmpty();
  req.checkBody('district', 'District field connot be empty.').notEmpty();
  req.checkBody('city', 'City field connot be empty.').notEmpty();
  req.checkBody('dob', 'DOB field connot be empty.').notEmpty();
  req.checkBody('re_password', 'Re Password field connot be empty.').notEmpty();
  var namer = '';
  var emailer = "";
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
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'name') {
        console.log("dbj");
        namer = errors[i].msg;
        //console.log(req.session.error);
      }

      if (errors[i].param == 'email') {
        console.log("dbj");
        emailer = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'address') {
        console.log("dbj");
        addresser = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'phone_no') {
        console.log("dbj");
        phone_noer = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dis') {
        console.log("dbj");
        diser = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'password') {
        console.log("dbj");
        passworder = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'district') {
        console.log("dbj");
        districter = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'city') {
        console.log("dbj");
        cityer = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dob') {
        console.log("dbj");
        dober = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 're_password') {
        console.log("dbj");
        re_passworder = errors[i].msg;
        //console.log(req.session.error);
      }

    }


    req.session.errors = errors;
    req.session.success = false;
    res.render('registion', {
      namer: namer,
      emailer: emailer,
      addresser: addresser,
      phone_noer: phone_noer,
      diser: diser,
      passworder: passworder,
      districter: districter,
      cityer: cityer,
      dober: dober,
      re_passworder: re_passworder
    })

  } else {
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
    if (password == re_password) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        connection.query(SqlString.format('INSERT INTO service_provider(s_name,email,address,mobile,overal_description,district,dob,town) VALUES(?,?,?,?,?,?,?,?)', [name, email, address, phone_no, dis, district, dob, city]), function (err, result) {
          if (err) throw err;
          connection.query('SELECT LAST_INSERT_ID() as s_p_id', function (err, results, fields) {
            if (err) throw err;
            var s_p_id = results[0].s_p_id;
            //console.log(s_p_id);

            connection.query(SqlString.format('INSERT INTO users(u_email,u_name,u_password,u_group,u_status,s_p_id) VALUES(?,?,?,?,?,?)', [email, name, hash, '1', '1', s_p_id]), function (err, result) {
              if (err) throw err;
              connection.query('SELECT LAST_INSERT_ID() as u_id', function (err, results, fields) {
                if (err) throw err;
                const user_id = results[0].u_id;
                console.log(results[0].u_id);
                //req.login(user_id, function (err) {
                console.log(user_id);
                // res.render('add_telent',{user_id:user_id});

                //connection.query('SELECT * FROM main_talent',function(err,rows){
                //connection.query('SELECT * FROM sub_talent',function(err,row1){
                //res.render('add_telent',{main:rows,sub:row1,user_id:user_id});
                res.redirect('/home');
                //})

                //   })
                //})
              })

            })

          })
        })



      })

    } else {
      re_passworder = "Not Match Password and RE Enter Password";
      res.render('registion', {
        re_passworder: re_passworder
      })
    }
    // console.log(district);



  }



})


router.post('/registerfornt', function (req, res) {
  req.checkBody('name', 'Username field connot be empty.').notEmpty();
  req.checkBody('email', 'Email field connot be empty.').notEmpty();
  req.checkBody('email', 'Enter a valid email address.').isEmail();
  req.checkBody('phone_no', 'Mobile field connot be empty.').notEmpty();
  req.checkBody('phone_no', 'Mobile number is not valid.').len(10);
  req.checkBody('password', 'Password field connot be empty.').notEmpty();
  req.checkBody('re_password', 'Re Password field connot be empty.').notEmpty();
  var namer = '';
  var emailer = "";
  var phone_noer = "";
  var passworder = "";
  var re_passworder = "";



  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'name') {
        namer = errors[i].msg;
      }

      if (errors[i].param == 'email') {
        emailer = errors[i].msg;
      }
      if (errors[i].param == 'phone_no') {
        console.log("dbj");
        phone_noer = errors[i].msg;
      }
      if (errors[i].param == 'password') {
        console.log("dbj");
        passworder = errors[i].msg;
      }
      if (errors[i].param == 're_password') {
        re_passworder = errors[i].msg;
      }

    }


    req.session.errors = errors;
    req.session.success = false;
    res.render('index', {
      namer: namer,
      emailer: emailer,
      phone_noer: phone_noer,
      passworder: passworder,
      re_passworder: re_passworder
    })

  } else {
    var name = req.body.name;
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    var dis = req.body.dis;
    var password = req.body.password;
    var re_password = req.body.re_password;
    console.log(email);
    connection.query(SqlString.format('SELECT * FROM service_provider WHERE email = ?', [email]), function (err, rows) {

      console.log(rows);
      if (rows.length > 0) {
        connection.query('SELECT * FROM main_talent', function (err, main_talents) {
          emailer = "Email is alreay exit";
          res.render('index', {
            emailer: emailer,
            main_talents: main_talents
          })
        })


      } else {




        if (password == re_password) {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            connection.query(SqlString.format('INSERT INTO service_provider(s_name,email,mobile,overal_description) VALUES(?,?,?,?)', [name, email, phone_no, dis]), function (err, result) {

              if (err) throw err;
              connection.query('SELECT LAST_INSERT_ID() as s_p_id', function (err, results, fields) {
                if (err) throw err;
                var s_p_id = results[0].s_p_id;
                //console.log(s_p_id);

                connection.query(SqlString.format('INSERT INTO users(u_email,u_name,u_password,u_group,u_status,s_p_id) VALUES(?,?,?,?,?,?)', [email, name, hash, '1', '1', s_p_id]), function (err, result) {
                  if (err) throw err;
                  connection.query(SqlString.format('INSERT INTO notification(content,content_type) VALUES(?,?)', [email, 5]), function (err, result1) {
                    if (err) throw err;
                    connection.query('SELECT LAST_INSERT_ID() as u_id', function (err, results, fields) {
                      if (err) throw err;
                      const user_id = results[0].u_id;
                      res.render('reg_signin');

                    })
                  })

                })

              })
            })



          })

        } else {
          re_passworder = "Not Match Password and RE Enter Password";
          res.render('index', {
            re_passworder: re_passworder
          })
        }
        // console.log(district);
      }
    })

  }




})



router.post('/fristadd', function (req, res) {
  req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  var mainer = '';
  var suber = "";
  var diser = "";

  var errors = req.validationErrors();

  if (errors) {
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'main') {
        console.log("dbj");
        mainer = errors[i].msg;
        //console.log(req.session.error);
      }

      if (errors[i].param == 'sub') {
        console.log("dbj");
        suber = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dis') {
        console.log("dbj");
        diser = errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    res.render('add_telent', {
      mainer: mainer,
      suber: suber,
      diser: diser
    })

  } else {
    var main = req.body.main;

    var sub = req.body.sub;
    var dis = req.body.dis;
    var user_id = req.body.user;
    console.log(req.isAuthenticated());
    console.log(user_id);
    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
      var s_p_id = row2[0].s_p_id;
      console.log(s_p_id);
      connection.query(SqlString.format('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis]), function (err, result) {
        if (err) throw err;
        res.render('add_secound', {
          user_id: user_id
        });
      })
    })

  }


})


router.post('/secoundadd', function (req, res) {
  req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  var mainer = "";
  var suber = "";
  var diser = "";

  var errors = req.validationErrors();

  if (errors) {
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'main') {
        console.log("dbj");
        mainer = errors[i].msg;
        //console.log(req.session.error);
      }

      if (errors[i].param == 'sub') {
        console.log("dbj");
        suber = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dis') {
        console.log("dbj");
        diser = errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    res.render('add_secound', {
      mainer: mainer,
      suber: suber,
      diser: diser
    })

  } else {
    //
    var main = req.body.main;
    var sub = req.body.sub;
    var dis = req.body.dis;
    var user_id = req.body.user;
    console.log(req.isAuthenticated());
    console.log(user_id);
    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
      console.log(row2);
      var s_p_id = row2[0].s_p_id;
      connection.query(SqlString.format('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis]), function (err, result) {
        if (err) throw err;
        res.render('add_thired', {
          user_id: user_id
        });
      })

    })



    // })

    // router.post('/thiredadd', function (req, res) {
    // =======
  }

})

router.post('/thiredadd', authenticationMiddleware(), function (req, res) {
  //req.checkBody('main', 'main field connot be empty.').notEmpty();
  req.checkBody('sub', 'sub field connot be empty.').notEmpty();
  req.checkBody('dis', 'dis field connot be empty.').notEmpty();

  //var mainer='';
  var suber = "";
  var diser = "";

  var errors = req.validationErrors();

  if (errors) {
    for (i = 0; i < errors.length; i++) {
      // if(errors[i].param == 'main')
      // {
      //   console.log("dbj");
      //   mainer= errors[i].msg;
      //   //console.log(req.session.error);
      // }

      if (errors[i].param == 'sub') {
        console.log("dbj");
        suber = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dis') {
        console.log("dbj");
        diser = errors[i].msg;
        //console.log(req.session.error);
      }
    }
    var sub = req.body.sub;
    req.session.errors = errors;
    req.session.success = false;
    var main = req.body.main;
    console.log(main);
    // res.render('add_thired', {

    //   suber: suber,
    //   diser: diser
    // })
    res.redirect('/add_thired' + sub)

  } else {

    //var main = req.body.main;
    var sub = req.body.sub;
    var dis = req.body.dis;
    const user_id = req.user.user_id;
    console.log(req.isAuthenticated());
    console.log(user_id);

    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
      var s_p_id = row2[0].s_p_id;
      connection.query(SqlString.format('INSERT INTO provider_talent(s_p_id,s_t_id,own_description) VALUES(?,?,?)', [s_p_id, sub, dis]), function (err, result) {
        if (err) throw err;
        res.redirect('/post1');
      })
    })

  }



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
    res.redirect('/');
  }

}

router.post('/textdata', function (req, res) {
  var m_t_id = req.body.branch;

  console.log(m_t_id);
  connection.query('SELECT * FROM sub_talent WHERE m_t_id = ?', [m_t_id], function (err, rows) {
    console.log(rows);
    res.send(rows);
  })

})

router.get('/maincatagerious', authenticationMiddleware(), function (req, res) {

  var user_id = req.user.user_id;
  console.log(user_id);
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    var image = rows[0].image;
    var name = rows[0].s_name;
    connection.query('SELECT * FROM main_talent', function (err, rows) {
      res.render('main_catagerious', {
        main: rows,
        nav_image: image,
        nav_name: name
      })
    })
  })


})

router.post('/addpost', authenticationMiddleware(), function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log('erro');
      res.redirect('/post1');

    }
    if (req.files[0] == undefined) {
      var subject = req.body.subject;
      var message = req.body.message;
      //const logo = '../upload/'+req.files[0].filename;
      const user_id = req.user.user_id;
      console.log(req.isAuthenticated());
      console.log(user_id);
      connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
        console.log(row2);
        var s_p_id = row2[0].s_p_id;
        connection.query(SqlString.format('INSERT INTO post (title,description,s_p_id,publish_date) VALUES(?,?,?,NOW())', [subject, message, s_p_id]), function (err, rows) {
          if (err) throw err;
          res.redirect('/post1');
        })
      })
    } else {

      var subject = req.body.subject;
      var message = req.body.message;
      const logo = '../upload/' + req.files[0].filename;
      const user_id = req.user.user_id;
      console.log(req.isAuthenticated());
      console.log(user_id);
      connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
        console.log(row2);
        var s_p_id = row2[0].s_p_id;
        connection.query(SqlString.format('INSERT INTO post (title,description,s_p_id,image_path,publish_date) VALUES(?,?,?,?,NOW())', [subject, message, s_p_id, logo]), function (err, rows) {
          if (err) throw err;
          res.redirect('/post1');
        })
      })
    }
  })
})

router.get('/update_details', authenticationMiddleware(), function (req, res) {
  const user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
    var s_p_id = row2[0].s_p_id;
    connection.query(SqlString.format('SELECT * FROM service_provider WHERE s_p_id = ?', [s_p_id]), function (err, rows) {
      nav_image = rows[0].image;
      nav_name = rows[0].s_name;
      res.render('update_profile', {
        details: rows,
        nav_image: nav_image,
        nav_name: nav_name
      });
    })
  })

})

router.post('/update_profile', authenticationMiddleware(), function (req, res) {
  req.checkBody('name', 'Username field connot be empty.').notEmpty();
  // req.checkBody('email', 'Email field connot be empty.').notEmpty();
  // req.checkBody('email', 'Enter a valid email address.').isEmail();

  req.checkBody('phone_no', 'Mobile field connot be empty.').notEmpty();
  req.checkBody('phone_no', 'Mobile number is not valid.').len(10);
  req.checkBody('dis', 'Discription field connot be empty.').notEmpty();
  var namer = '';
  var emailer = "";
  //var addresser = "";
  var phone_noer = "";
  var diser = "";
  //var passworder = "";
  //var districter = "";
  //var cityer = "";
  //var dober = "";
  //var re_passworder = "";

  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    //console.log('errors: ${JSON.stringify(errors)}');
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'name') {
        console.log("dbj");
        namer = errors[i].msg;
        //console.log(req.session.error);
      }

      // if(errors[i].param == 'email')
      // {
      //   console.log("dbj");
      //   emailer= errors[i].msg;
      //   //console.log(req.session.error);
      // }

      if (errors[i].param == 'phone_no') {
        console.log("dbj");
        phone_noer = errors[i].msg;
        //console.log(req.session.error);
      }
      if (errors[i].param == 'dis') {
        console.log("dbj");
        diser = errors[i].msg;
        //console.log(req.session.error);
      }


    }
    const user_id = req.user.user_id;
    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
      var s_p_id = row2[0].s_p_id;
      connection.query(SqlString.format('SELECT * FROM service_provider WHERE s_p_id = ?', [s_p_id]), function (err, rows) {




        req.session.errors = errors;
        req.session.success = false;

        res.render('update_profile', {
          details: rows,
          namer: namer,
          phone_noer: phone_noer,
          diser: diser
        })
      })
    })
  } else {

    const user_id = req.user.user_id;
    var name = req.body.name;
    var email = req.body.email;
    // var address = req.body.address;
    var phone_no = req.body.phone_no;
    var dis = req.body.dis;

    var district = req.body.district;
    var city = req.body.city;


    connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
      var s_p_id = row2[0].s_p_id;
      connection.query(SqlString.format('UPDATE service_provider SET s_name = ?,overal_description = ?,mobile = ? WHERE s_p_id = ?', [name, dis, phone_no, s_p_id]), function (err, rows) {
        res.redirect('/post1');
      })
    })
  }
})

router.post('/suggestions', function (req, res, next) {

  req.checkBody('idea', 'Idea field field connot be empty.').notEmpty();
  //req.checkBody('sug_email', 'Email field connot be empty.').notEmpty();

  var idea = '';

  var errors = req.validationErrors();

  if (errors) {
    for (i = 0; i < errors.length; i++) {
      if (errors[i].param == 'idea') {
        console.log("dbj");
        idea_er = errors[i].msg;
        //console.log(req.session.error);
      }
    }
    req.session.errors = errors;
    req.session.success = false;
    //console.log("error in req body");
    res.redirect('/');

  } else {

    var idea = req.body.idea;
    console.log(idea);
    connection.query(SqlString.format('INSERT INTO notification(content,content_type) VALUES(?,1)', [idea]), function (err, result) {
      if (err) throw err;
      res.redirect('/');
    });

  }

});

router.post('/add_profile_image', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log('erro');
      res.redirect('/post1');

    }
    if (req.files[0] == undefined) {
      console.log("fnv");
    } else {
      const user_id = req.user.user_id;
      console.log(user_id);
      console.log("fnv1");
      connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, row2) {
        var s_p_id = row2[0].s_p_id;
        const logo = '../upload/' + req.files[0].filename;
        connection.query(SqlString.format('UPDATE service_provider SET image =? WHERE s_p_id = ?', [logo, s_p_id]), function (err, rows) {
          res.redirect('/post1');
        })
      })
    }
  })
})
router.get('/search', (req, res) => {
  console.log('in serch method');
  var serch_text = req.param('search');
  console.log(serch_text);
  connection.query(SqlString.format('SELECT * FROM sub_talent INNER JOIN provider_talent ON sub_talent.s_t_id = provider_talent.s_t_id ' +
      'INNER JOIN service_provider ON provider_talent.s_p_id= service_provider.s_p_id WHERE sub_talent.s_t_name LIKE "%' + serch_text + '%"'),
    function (err, searched_s_p_list) {
      console.log(searched_s_p_list);
      res.render('service_provider_list', {
        rows: searched_s_p_list
      });

    });
})

router.get('/post:id', authenticationMiddleware(), function (req, res) {
  var page_no = req.params.id;
  console.log(page_no);
  var offset = (page_no - 1) * 10;



  const user_id = req.user.user_id;
  var add_more = false;
  var defult = false;
  var no_post = false;
  console.log(user_id);
  console.log(req.isAuthenticated());
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    const s_p_id = rows[0].s_p_id;
    var nav_image = rows[0].image;
    var nav_name = rows[0].s_name;


    console.log(s_p_id);
    connection.query(SqlString.format('SELECT *  FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id = sub_talent.s_t_id WHERE s_p_id=?', [s_p_id]), function (err, row1) {
      if (row1.length < 3) {
        add_more = true;
      }
      connection.query('SELECT * FROM main_talent', function (err, row2) {
        connection.query(SqlString.format('SELECT * FROM post WHERE s_p_id = ? ORDER BY p_id DESC ', [s_p_id]), function (err, row3) {
          console.log(row3);
          if (row3.length) {
            console.log("ndjf");

          } else {
            no_post = true;
            console.log("aaaaa");
          }
          res.render('profile', {
            details: rows,
            talents: row1,
            main: row2,
            add_more: add_more,
            post: row3,
            no_post: no_post,
            defult: defult,
            nav_image: nav_image,
            nav_name: nav_name
          });
        })

      })
    })


  })



});

router.get('/change_password', authenticationMiddleware(), function (req, res) {
  const user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    const s_p_id = rows[0].s_p_id;
    var nav_image = rows[0].image;
    var nav_name = rows[0].s_name;
    res.render('update_password_view', {
      users: rows,
      nav_image: nav_image,
      nav_name: nav_name
    })
  })
})

router.post('/change_password_post', authenticationMiddleware(), function (req, res) {
  const user_id = req.user.user_id;
  var old_password = req.body.password;
  var new_password = req.body.new_password;
  var re_new_password = req.body.re_new_password;
  var re_new_passworder;
  var old_passworder;
  // console.log(old_password);
  // console.log(new_password);
  // console.log(re_new_password);
  connection.query(SqlString.format('SELECT u_password FROM users WHERE u_id = ?', [user_id]), function (err, rows) {
    if (err) {
      done(err)
    }
    const hash = rows[0].u_password.toString();
    bcrypt.compare(old_password, hash, function (err, response) {
      if (response === true) {
        if (new_password == re_new_password) {
          bcrypt.hash(new_password, saltRounds, function (err, hash) {
            connection.query(SqlString.format('UPDATE Users SET u_password = ? WHERE u_id = ?', [hash, user_id]), function (err, rows) {
              res.redirect('/post1');
            })
          })
        } else {
          connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
            console.log("fvn");
            re_new_passworder = "Not Match Password and RE Enter Password";
            var nav_image = rows[0].image;
            var nav_name = rows[0].s_name;
            res.render('update_password_view', {
              users: rows,
              re_new_passworder: re_new_passworder,
              nav_image: nav_image,
              nav_name: nav_name
            })
          })
        }
      } else {
        console.log("hhbhbhj");
        connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
          old_passworder = "Old Password is worng";
          var nav_image = rows[0].image;
          var nav_name = rows[0].s_name;
          res.render('update_password_view', {
            users: rows,
            old_passworder: old_passworder,
            nav_image: nav_image,
            nav_name: nav_name
          })
        })
      }
    })

  })
})

router.get('/update_telant:id', authenticationMiddleware(), function (req, res) {
  sub_talent_id = req.params.id;
  user_id = req.user.user_id;
  console.log(sub_talent_id);
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    var s_p_id = rows[0].s_p_id;
    connection.query(SqlString.format('SELECT provider_talent.own_description,sub_talent.s_t_name,sub_talent.s_t_id FROM provider_talent INNER JOIN sub_talent ON provider_talent.s_t_id=sub_talent.s_t_id WHERE s_p_id = ? AND sub_talent.s_t_id =?', [s_p_id, sub_talent_id]), function (err, row) {

      var nav_image = rows[0].image;
      var nav_name = rows[0].s_name;
      console.log(row);
      res.render('update_telent', {
        s_p_id: s_p_id,
        telent: row,
        nav_image: nav_image,
        nav_name: nav_name
      })
    })
  })

})

router.post('/update_sub_telant', authenticationMiddleware(), function (req, res) {
  const user_id = req.user.user_id;
  //console.log(user_id);
  var s_t_id = req.body.sub;
  //console.log(s_t_id);
  var discrition = req.body.dis;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id = ?', [user_id]), function (err, rows) {
    var s_p_id = rows[0].s_p_id;
    connection.query(SqlString.format('UPDATE provider_talent SET own_description = ? WHERE s_p_id = ? AND s_t_id = ?', [discrition, s_p_id, s_t_id]), function (err, rows) {
      res.redirect('/post1');


    })
  })


  //console.log(discrition);
})

router.get('/edit_post:id', function (req, res) {
  //console.log("vgmvk");
  var post_id = req.params.id;
  const user_id = req.user.user_id;
  console.log(post_id);
  connection.query(SqlString.format('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id = users.s_p_id WHERE users.u_id=?', [user_id]), function (err, rows) {
    var nav_image = rows[0].image;
    var nav_name = rows[0].s_name;
    connection.query(SqlString.format('SELECT * FROM post WHERE p_id = ?', [post_id]), function (err, row) {
      res.render('edit_post', {
        nav_image: nav_image,
        nav_name: nav_name,
        post: row
      })
    })
  })

})
///comitteda by finalay
module.exports = router;