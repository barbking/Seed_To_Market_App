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

router.get('/PlantsAndSeeds', function(req,res) {
  console.log('in get PlantsandSeeds');
  //array to save plant inventory from db
  var plantTableInventory = [];
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT seeds.seed_id, seeds.crop, seeds.variety, planted.location, planted.planted_id FROM seeds INNER JOIN planted ON seeds.seed_id=planted.seed_id WHERE seeds.user_id=$1 and planted.harvest_complete=false;", [req.user.user_id]);
        resultSet.on( 'row', function( row ){
        plantTableInventory.push( row );
      });
        resultSet.on( 'end', function(){
         done();
         res.send( plantTableInventory );
       }); //end on end
     } // end no error
   }); //end pool
 } else {
   res.sendStatus(403);
 }
});//end get

router.post('/addHarvest', function(req, res) {
  console.log('in inventory addHarvest with -->', req.body);
  if (req.isAuthenticated()) {
    //query to add new plant to database
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query("INSERT INTO harvested (" +
          "plant_id, location, date_harvested, yield, area_sqft, notes, user_id)"+
          "VALUES ( $1, $2, $3, $4, $5, $6, $7 )", [req.body.plant_id, req.body.location, req.body.date_harvested, req.body.yield, req.body.area_sqft, req.body.notes, req.user.user_id]);
        done(); //close connection
        res.sendStatus(200);
        //end response of success if user logged in and new seed added
      }
    });
  } else {
    res.sendStatus(403);
  } // end response if user not authenticated
}); //end of POST

router.get('/Harvest', function(req,res) {
  console.log('in inventory getHarvest');
  var harvestInventory = [];
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query("SELECT * from harvested WHERE user_id= $1", [req.user.user_id]);
        resultSet.on( 'row', function( row ){
        harvestInventory.push( row );
      });
        resultSet.on( 'end', function(){
         done();
         res.send( harvestInventory );
       }); //end on end
     } // end no error
   }); //end pool
 } else {
   res.sendStatus(403);
 }
});//end get

router.get('/HarvestAndCrop', function(req,res) {
  console.log('in inventory getHarvestAndCrop');
  var harvestInventory = [];
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
          var resultSet = connection.query("SELECT seeds.seed_id, seeds.crop, seeds.variety, planted.planted_id, harvested.plant_id, harvested.date_harvested FROM seeds INNER JOIN planted ON seeds.seed_id=planted.seed_id INNER JOIN harvested ON planted.planted_id=harvested.plant_id WHERE harvested.user_id=$1", [req.user.user_id]);
        resultSet.on( 'row', function( row ){
        harvestInventory.push( row );
      });
        resultSet.on( 'end', function(){
         done();
         res.send( harvestInventory );
       }); //end on end
     } // end no error
   }); //end pool
 } else {
   res.sendStatus(403);
 }
});//end get

router.put('/updatePlanted', function(req, res) {
  console.log('in updatePlanted with -->', req.body);
  if (req.isAuthenticated()) {
    //query to add new plant to database
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query("UPDATE planted SET harvest_complete=$1, harvest_complete_date=$2 WHERE planted_id=$3 VALUES( $1, $2, $3)", [req.body.harvest_complete, req.body.harvest_complete_date,req.body.planted_id,]);
        done(); //close connection
        res.sendStatus(200);
        //end response of success if user logged in and new seed added
      }
    });
  } else {
    res.sendStatus(403);
  } // end response if user not authenticated
}); //end of POST

module.exports = router;
