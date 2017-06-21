var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');

// GET route to retrieve all suppliers
router.get( '/getAll', function ( req, res ) {
  console.log( 'in get all suppliers' );
  // verify authentication
  if ( req.isAuthenticated() ) {
    console.log( 'fetching suppliers' );
    var suppliers = [];
    pg.connect(function(err, connection, done) {
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

module.exports = router;
