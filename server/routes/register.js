var express = require('express');
var router = express.Router();
var passport = require('passport');
// var Users = require('../models/user');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    email: req.body.email,
    password: encryptLib.encryptPassword(req.body.password),
    name: req.body.name,
    phone: req.body.phone,
    newfarm: req.body.newfarm
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO users (email, password, name, phone, newfarm) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [saveUser.email, saveUser.password, saveUser.name, saveUser.phone, saveUser.newfarm ],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });

});


module.exports = router;
