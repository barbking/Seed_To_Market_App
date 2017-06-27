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

router.get('/', function(req,res) {
  console.log('in planner getReports');
  var reports = [];
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        console.log('connected to db');
          var resultSet = connection.query("SELECT seeds.seed_id, seeds.crop, seeds.variety, planted.planted_id, planted.area_sqft, planted.location, harvested.plant_id, harvested.harvested_id, harvested.date_harvested, harvested.yield, sold.weight_sold, sold.sold_to FROM seeds INNER JOIN planted ON seeds.seed_id=planted.seed_id INNER JOIN harvested ON planted.planted_id=harvested.plant_id INNER JOIN sold ON harvested.harvested_id=sold.harvest_id WHERE harvested.user_id=$1", [req.user.user_id]);
        resultSet.on( 'row', function( row ){
        reports.push( row );
      });
        resultSet.on( 'end', function(){
         done();
         res.send( reports );
       }); //end on end
     } // end no error
   }); //end pool
 } else {
   res.sendStatus(403);
 }// end response if user not authenticated
});//end get reports


module.exports = router;
