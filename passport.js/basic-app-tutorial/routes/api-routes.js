var express = require('express');
var router = express.Router();
var db = require('../server/models');
var passport = require('../server/config/passport');

router.get('/', function(req, res) {
  res.json('This is the root of the api.');
});

router.post("/login", passport.authenticate("local"), function (req, res) {
  console.log('WOO YOU MADE it to login!')
  res.json({message: "made it to members!"});
});

router.post("/signup", function (req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function () {
    console.log('SOMES SORT OF SUCCESS')
    res.redirect(307, "login");
  }).catch(function (err) {
    console.log('BOO ERROR')
    console.log(err);
    res.json(err);
  });
});

router.get('/logout', function(req, res) {
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
