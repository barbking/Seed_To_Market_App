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

// GET route to retrieve all suppliers
router.get( '/getAll', function ( req, res ) {
  console.log( 'in get all suppliers' );
  // verify authentication
  if ( req.isAuthenticated() ) {
    console.log( 'fetching suppliers' );
    var suppliers = [];
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        var resultSet = connection.query( "SELECT * FROM suppliers WHERE user_id=$1", [ req.user.user_id ]); // end connection.query
        resultSet.on( 'row', function( row ){
          suppliers.push( row );
        });
        resultSet.on( 'end', function(){
          done();
          res.status( 200 ).send( suppliers );
        }); //end on end
      } // end if err
    }); // end pool.connect
  } else {
    console.log( 'authentication error' );
    res.status( 403 ).send( 'authentication error, try relogging in' );
  } // end if authenticated
}); // end GET getAll

// POST route to add a supplier to the database
/*
POST objectStructure
{
  name: String,
  website: String,
  phone_number: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  description: String,
  user_id: Number ( req.user.user_id )
}
*/
router.post( '/addSupplier', function ( req, res ) {
  console.log( 'in add to suppliers' );
  // verify authentication
  if ( req.isAuthenticated() ) {
    console.log( 'adding supplier' );
    var suppliers = [];
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
        connection.query( "INSERT INTO suppliers ( name, website, phone_number, address, city, state, zip, description, user_id ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )", [ req.body.name, req.body.website, req.body.phone_number, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.description, req.user.user_id ], function ( err, result ) {
          if ( err ) {
            console.log( 'error:', err );
            res.status( 500 ).send( 'Error creating new supplier' );
          } else {
            done();
            res.status( 201 ).send( 'supplier added to database' );
          }
        }); // end connection.query
      } // end if err
    }); // end pool.connect
  } else {
    console.log( 'authentication error' );
    res.status( 403 ).send( 'authentication error, try relogging in' );
  } // end if authenticated
}); // end POST to addSupplier

module.exports = router;
