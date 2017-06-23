var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');

// set up config for the pool
var config = {
  database: 'seed-to-market',
  host: 'localhost',
  port: 5432,
  max: 10
}; // end config

// setup new pool
var pool = new pg.Pool( config );

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
    // check if logged in
    console.log('checking /user route ');
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(false);
    }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logout();
  res.sendStatus(200);
});


router.post('/addPlant', function(req, res) {
  console.log('in inventory addPlant with -->', req.body);
  if (req.isAuthenticated()) {
    //query to add new plant to database
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query("INSERT INTO planted (" +
          "seed_id, location, date_planted, quantity, area_sqft, notes, user_id)"+
          "VALUES ( $1, $2, $3, $4, $5, $6, $7 )", [req.body.seed_id, req.body.location, req.body.date_planted, req.body.quantity, req.body.area_sqft, req.body.notes, req.user.user_id]);
        done(); //close connection
        res.sendStatus(200);
        //end response of success if user logged in and new seed added
      }
    });
  } else {
    res.sendStatus(403);
  } // end response if user not authenticated
}); //end of POST route for adding new plant

router.get('/Plants', function(req,res) {
  console.log('in inventory getPlants');
  //array to save plant inventory from db
  var plantInventory = [];
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from planted WHERE user_id= $1", [req.user.user_id]);
        resultSet.on( 'row', function( row ){
        plantInventory.push( row );
      });
        resultSet.on( 'end', function(){
         done();
         res.send( plantInventory );
       }); //end on end
     } // end no error
   }); //end pool
 } else {
   res.sendStatus(403);
 }
});//end get

module.exports = router;
