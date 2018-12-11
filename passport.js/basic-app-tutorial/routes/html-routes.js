var express = require('express');
var router = express.Router();
var path = require('path');

var isAuthenticated = require('../server/config/middleware/isAuthenticated');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/members');
  }
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/members');
  }
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/members', isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, '../public/members.html'));
});

module.exports = router;
