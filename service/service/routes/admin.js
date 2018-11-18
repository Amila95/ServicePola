var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin/admin_home',{ layout: 'admin_layout' });
  })
  
  module.exports = router;