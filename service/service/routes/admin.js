var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');
var SqlString = require('sqlstring');


var connection = mysql.createConnection({
  host: 'localhost',
  database: 'servicepoladb',
  user: 'root',
  password: 'Ebba@123',
});


/* GET users listing. */
router.get('/', authenticationMiddleware(), function (req, res, next) {


  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {
      connection.query('SELECT * FROM service_provider INNER JOIN users ON service_provider.s_p_id=users.s_p_id WHERE users.u_status=1 AND users.u_group=1', function (err, allusers) {
        connection.query('SELECT * FROM main_talent', function (err, main_talents) {
          connection.query('SELECT * FROM sub_talent', function (err, sub_talent) {
            connection.query('SELECT * FROM notification WHERE content_type=1 ORDER BY status,n_id DESC', function (err, site_suggesions) {
              connection.query('SELECT u_name,u_email,u_id FROM users WHERE u_status=0', function (err, deleted_users) {
                connection.query('SELECT * FROM notification WHERE content_type=2 AND status=0', function (err, new_notifications_count) {
                  connection.query('SELECT * FROM notification WHERE content_type=1 AND status=0', function (err, new_suggessions_count) {
                    connection.query('SELECT * FROM notification WHERE content_type=2 ORDER BY status,n_id DESC', function (err, all_notifications) {
                      //console.log(main_talents); content type 1 is site suggestions
                      new_notifications_count = new_notifications_count.length;
                      new_suggessions_count = new_suggessions_count.length;
                      res.render('admin/admin_home', {
                        allusers: allusers,
                        sub_talent: sub_talent,
                        all_notifications: all_notifications,
                        deleted_users: deleted_users,
                        new_suggessions_count: new_suggessions_count,
                        new_notifications_count: new_notifications_count,
                        site_suggesions: site_suggesions,
                        main_talents: main_talents,
                        layout: 'admin_layout'
                      });
                    })
                  })
                })
              })
            })
          })
        })
      })

    } else {
      res.redirect('/');
    }
  })



});

router.post('/sub_talent_add', authenticationMiddleware(), function (req, res) {


  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {

      req.checkBody('maintalentid', 'main talent selecting field connot be empty.').notEmpty();
      req.checkBody('stdescription', 'sub tdescription field connot be empty.').notEmpty();
      req.checkBody('stalent', 'subtalent field connot be empty.').notEmpty();

      var maintalentid = '';
      var stdescription = "";
      var stalent = '';

      var errors = req.validationErrors();

      if (errors) {
        for (i = 0; i < errors.length; i++) {
          if (errors[i].param == 'maintalentid') {
            console.log("dbj");
            mainer = errors[i].msg;
            //console.log(req.session.error);
          }

          if (errors[i].param == 'stdescription') {
            console.log("dbj");
            suber = errors[i].msg;
            //console.log(req.session.error);
          }
          if (errors[i].param == 'stalent') {
            console.log("dbj");
            suber = errors[i].msg;
            //console.log(req.session.error);
          }
        }
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/admin');

      } else {
        var maintalentid = req.body.maintalentid;
        var stalent = req.body.stalent;
        var stdescription = req.body.stdescription;
        connection.query(SqlString.format('INSERT INTO sub_talent(s_t_name,s_t_description,m_t_id) VALUES(?,?,?)', [stalent, stdescription, maintalentid]), function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })

      }
    } else {
      res.redirect('/');
    }
  })


})

router.post('/main_talent_add', authenticationMiddleware(), function (req, res) {



  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {
      req.checkBody('mtname', 'main talent selecting field connot be empty.').notEmpty();
      req.checkBody('mtdescription', 'sub tdescription field connot be empty.').notEmpty();

      var mtname = '';
      var mtdescription = '';

      var errors = req.validationErrors();

      if (errors) {
        for (i = 0; i < errors.length; i++) {
          if (errors[i].param == 'mtname') {
            console.log("dbj");
            mainer = errors[i].msg;
            //console.log(req.session.error);
          }

          if (errors[i].param == 'mtdescription') {
            console.log("dbj");
            suber = errors[i].msg;
            //console.log(req.session.error);
          }
        }
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/admin');

      } else {
        var mtname = req.body.mtname;
        var mtdescription = req.body.mtdescription;
        connection.query(SqlString.format('INSERT INTO main_talent(m_t_name,m_t_description) VALUES(?,?)', [mtname, mtdescription]), function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })

      }
    } else {
      res.redirect('/');
    }
  })

})


router.get('/all_user/more/:id', authenticationMiddleware(), function (req, res, next) {


  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {
      var id = req.params.id;
      res.send('id is ' + id);
    } else {
      res.redirect('/');
    }
  })

});

router.get('/notifications/viewed/:id', authenticationMiddleware(), function (req, res, next) {


  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {
      var id = req.params.id;
      connection.query(SqlString.format('UPDATE notification SET status = 1 WHERE n_id = ?', [id]), function (err, rows) {
        res.redirect('/admin');
      })
    } else {
      res.redirect('/');
    }
  })

});

router.get('/suggessions/viewed/:id', authenticationMiddleware(), function (req, res, next) {

  var user_id = req.user.user_id;
  connection.query(SqlString.format('SELECT * FROM users WHERE u_id= ?', [user_id]), function (err, rows) {
    if (rows[0].u_group == 2) {
      var id = req.params.id;
      connection.query(SqlString.format('UPDATE notification SET status = 1 WHERE n_id = ?', [id]), function (err, rows) {
        res.redirect('/admin');
      })
    } else {
      res.redirect('/');
    }
  })

});

router.get('/delete/user:id', authenticationMiddleware(), function (req, res, next) {
  console.log("in delete method");
  var s_p_id = req.params.id;
  connection.query(SqlString.format('UPDATE users SET u_status = 0 WHERE s_p_id = ?', [s_p_id]), function (err, rows) {
    res.redirect('/admin');
  })

});

router.get('/activate/user:id', authenticationMiddleware(), function (req, res, next) {
  console.log("in activate method");
  var u_id = req.params.id;
  connection.query(SqlString.format('UPDATE users SET u_status = 1 WHERE u_id = ?', [u_id]), function (err, rows) {
    res.redirect('/admin');
  })

});
//to get a mian talent
router.get('/edit_main_talent:m_t_id', authenticationMiddleware(), function (req, res, next) {
  console.log("in edit main talent");
  var m_t_id = req.params.m_t_id;
  connection.query(SqlString.format('SELECT * FROM main_talent WHERE m_t_id = ?', [m_t_id]), function (err, main_talent) {
    console.log(main_talent[0].m_t_description);
    res.render('admin/edit_talent', {
      layout: 'admin_layout',
      main_talent: main_talent,
      sub_talent: null

    });
  })
});

//to get sub talent
router.get('/edit_sub_talent:s_t_id?', authenticationMiddleware(), function (req, res, next) {
  console.log("in edit sub talent");
  var s_t_id = req.params.s_t_id;
  connection.query(SqlString.format('SELECT * FROM sub_talent INNER JOIN main_talent ON sub_talent.m_t_id=main_talent.m_t_id WHERE sub_talent.s_t_id = ?', [s_t_id]), function (err, sub_talent) {
    console.log(sub_talent);
    res.render('admin/edit_talent', {
      sub_talent: sub_talent,
      main_talent: null,
      layout: 'admin_layout'
    });
  })
});

router.post('/edit/main_talent/:m_t_id', function (req, res) {
  var user_id = req.user.user_id;
  var m_t_id = req.params.m_t_id;
  if (req.isAuthenticated()) {
    connection.query('SELECT * FROM users WHERE u_id= ?', [user_id], function (err, rows) {
      if (rows[0].u_group == 2) {

        var mtalent = req.body.mtalent;
        var mtdescription = req.body.mtdescription;
        console.log(mtalent);
        console.log(mtdescription);
        connection.query('UPDATE main_talent SET m_t_name=? , m_t_description=? WHERE m_t_id=?', [mtalent, mtdescription, m_t_id], function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })


      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }
})
// to edit sub talents
router.post('/edit/sub_talent/:s_t_id', function (req, res) {
  var user_id = req.user.user_id;
  var s_t_id = req.params.s_t_id;
  if (req.isAuthenticated()) {
    connection.query('SELECT * FROM users WHERE u_id= ?', [user_id], function (err, rows) {
      if (rows[0].u_group == 2) {
        var m_t_id = req.body.m_t_id;
        var s_talent = req.body.s_talent;
        var s_t_description = req.body.s_t_description;
        console.log(m_t_id);
        console.log(s_talent);
        console.log(s_t_description);
        connection.query('UPDATE sub_talent SET s_t_name=? , s_t_description=? , m_t_id=? WHERE s_t_id=?', [s_talent, s_t_description, m_t_id, s_t_id], function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })


      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }
})

router.post('/edit/main_talent', function (req, res) {
  var user_id = req.user.user_id;
  var m_t_id = req.body.mtalentid;
  if (req.isAuthenticated()) {
    connection.query('SELECT * FROM users WHERE u_id= ?', [user_id], function (err, rows) {
      if (rows[0].u_group == 2) {

        var mtalent = req.body.mtalent;
        var mtdescription = req.body.mtdescription;
        console.log(mtalent);
        console.log(mtdescription);
        connection.query('UPDATE main_talent SET m_t_name=? , m_t_description=? WHERE m_t_id=?', [mtalent, mtdescription, m_t_id], function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })


      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }
})
// to edit sub talents
router.post('/edit/sub_talent', function (req, res) {
  var user_id = req.user.user_id;
  var s_t_id = req.body.stalentid;
  if (req.isAuthenticated()) {
    connection.query('SELECT * FROM users WHERE u_id= ?', [user_id], function (err, rows) {
      if (rows[0].u_group == 2) {
        var m_t_id = req.body.m_t_id;
        var s_talent = req.body.s_talent;
        var s_t_description = req.body.s_t_description;
        console.log(m_t_id);
        console.log(s_talent);
        console.log(s_t_description);
        connection.query('UPDATE sub_talent SET s_t_name=? , s_t_description=? , m_t_id=? WHERE s_t_id=?', [s_talent, s_t_description, m_t_id, s_t_id], function (err, result) {
          if (err) throw err;
          res.redirect('/admin');
        })


      } else {
        res.redirect('/');
      }
    })
  } else {
    res.redirect('/');
  }
})


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(
      'req.session.passport.user:${JSON.stringify(req.session.passport)}'
    );
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

}


module.exports = router;