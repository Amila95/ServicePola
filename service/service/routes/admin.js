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
    // console.log(allusers);
    res.render('admin/admin_home', { allusers: allusers, layout: 'admin_layout' });
  })
});

router.get('/all_user/more/:id', function (req, res, next) {
  var id=req.params.id;
  res.send('id is '+ id);
});

module.exports = router;