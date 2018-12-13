var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passport');

/* GET home page. */
router.get('/auth', function(req, res, next) {
  console.log('in / handler')
  res.json({ message: 'hi' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('/LOGIN SUCCESSFULLY AUTHED');
  res.json({ user:req.user })
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function() {
      console.log('NEW USER CREATED');
      res.redirect(307, 'login');
    })
    .catch(function(err) {
      console.log('FAILED TO CREATE NEW USER');
      console.log(err);
      res.json(err);
    });
});

router.get('/logout', function(req, res) {
  req.logout();
  console.log('LOGGING OUT');
  res.json({})
});

module.exports = router;
