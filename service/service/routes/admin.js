var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var expressValidator = require('express-validator');


var connection = mysql.createConnection({
  host: 'localhost',
  database: 'servicepoladb',
  user: 'root',
  password: '',
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM service_provider', function (err, allusers) {
    connection.query('SELECT * FROM main_talent', function (err, main_talents) {
      connection.query('SELECT * FROM notification WHERE content_type=1 ORDER BY status,n_id DESC', function (err, site_suggesions) {
        connection.query('SELECT * FROM notification WHERE content_type=2 AND status=0', function (err, new_notifications_count) {
          connection.query('SELECT * FROM notification WHERE content_type=1 AND status=0', function (err, new_suggessions_count) {
            connection.query('SELECT * FROM notification WHERE content_type=2 ORDER BY status,n_id DESC', function (err, all_notifications) {
              //console.log(main_talents); content type 1 is site suggestions
              new_notifications_count = new_notifications_count.length;
              new_suggessions_count = new_suggessions_count.length;
              res.render('admin/admin_home', {
                allusers: allusers,
                all_notifications: all_notifications,
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
});

router.post('/sub_talent_add', function (req, res) {

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
    connection.query('INSERT INTO sub_talent(s_t_name,s_t_description,m_t_id) VALUES(?,?,?)', [stalent, stdescription, maintalentid], function (err, result) {
      if (err) throw err;
      res.redirect('/admin');
    })

  }
})

router.post('/main_talent_add', function (req, res) {

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
    connection.query('INSERT INTO main_talent(m_t_name,m_t_description) VALUES(?,?)', [mtname, mtdescription], function (err, result) {
      if (err) throw err;
      res.redirect('/admin');
    })

  }
})

router.get('/all_user/more/:id', function (req, res, next) {
  var id = req.params.id;
  res.send('id is ' + id);
});

router.get('/notifications/viewed/:id', function (req, res, next) {
  var id = req.params.id;
  connection.query('UPDATE notification SET status = 1 WHERE n_id = ?', [id], function (err, rows) {
    res.redirect('/admin');
  })
});

router.get('/suggessions/viewed/:id', function (req, res, next) {
  var id = req.params.id;
  connection.query('UPDATE notification SET status = 1 WHERE n_id = ?', [id], function (err, rows) {
    res.redirect('/admin');
  })
});


module.exports = router;