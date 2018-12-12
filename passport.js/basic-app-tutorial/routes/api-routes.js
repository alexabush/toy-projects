var express = require('express');
var router = express.Router();
var db = require('../server/models');
var passport = require('../server/config/passport');

router.get('/', function(req, res) {
  res.json('This is the root of the api.');
});

// router.post('/login', function(req, res) {
//   console.log('in /login');
//   console.log('REQ.BODY', req.body)

//   // res.redirect('../members');
// });

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('/LOGIN SUCCESSFULLY AUTHED');
  console.log('REQ.BODY', req.body)
  // res.json('/members');

  res.redirect('../members');
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
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
  console.log('LOGGING OUT');
  req.logout();
  res.redirect('/');
});

router.get('/user_data', function(req, res) {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
