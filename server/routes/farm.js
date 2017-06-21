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
var pool = new pg.Pool(config);

router.get('/farmInfo', function(req, res) {
  console.log('in router GET farm info with');
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        connection.query("SELECT farm_name, farm_address, farm_city, farm_state, farm_zip FROM users WHERE user_id=$1", [req.user.user_id], function(err, result) {
          if (err) {
            console.log('query err ', err);
            done(err);
            release();
          } else {
            var resultSet = result.rows[0];
            console.log('resultSet.row-->', resultSet);
            res.send(resultSet);
          }
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.put('/savefarm', function(req, res) {
  console.log('in router put for save farm with-->', req.query);
  var farmInfo = req.query;
  if (req.isAuthenticated()) {
    pool.connect(function(err, connection, done) {
      if (err) {
        res.send(400);
      } else {
        var resultSet = connection.query("UPDATE users SET farm_name = $1, farm_address = $2, farm_city = $3, farm_state = $4, farm_zip =$5 WHERE user_id=$6", [req.query.farm_name, req.query.farm_address, req.query.farm_city, req.query.farm_state, req.query.farm_zip, req.user.user_id]);
        done();
        res.send(resultSet);
      } //end else
    });
  } else {
    res.sendStatus(403);
  }

});

module.exports = router;
