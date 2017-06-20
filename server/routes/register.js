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
    user_name: req.body.user_name,
    phone_number: req.body.phone_number,
    farm_name: req.body.farm_name,
    farm_address: req.body.farm_address,
    farm_city: req.body.farm_city,
    farm_state: req.body.farm_state,
    farm_zip: req.body.farm_zip
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO users (email, password, user_name, phone_number, farm_name, farm_address, farm_city, farm_state, farm_zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id",
      [saveUser.email, saveUser.password, saveUser.user_name, saveUser.phone_number, saveUser.farm_name, saveUser.farm_address, saveUser.farm_city, saveUser.farm_state, saveUser.farm_zip ],
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
