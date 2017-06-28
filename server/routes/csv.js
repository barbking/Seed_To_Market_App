var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');
var csvtojson = require('csvtojson');
var json2csv = require('json2csv');

// set up config for the pool
var config = {
  database: 'seed-to-market',
  host: 'localhost',
  port: 5432,
  max: 10
}; // end config

// setup new pool
var pool = new pg.Pool(config);

// GET request seeds .csv file
router.get('/exportSeeds/:fromDate?/:toDate?', function (req, res, next) {
  console.log('hit export seeds route');
      // if (req.isAuthenticated()) {
        // connects to the pool
        pool.connect(function(err, connection, done) {
              if (err) {
                res.sendStatus( 403 );
              } else {
                if (req.params.fromDate === undefined && req.params.toDate === undefined) {
                  var jsonQueryAllSeeds = 'SELECT * FROM seeds WHERE user_id= $1';
                  connection.query(jsonQueryAllSeeds,[req.user.user_id], function(queryError, result) {
                    done();
                    if (queryError) {
                      res.sendStatus(500);
                    } else {
                      // converts query resutl to JSON
                      var jsonString = JSON.stringify(result.rows);
                       console.log('result-->', result);
                        console.log('result.rows -->', result.rows);
                      var json = JSON.parse(jsonString);
                      console.log('json -->', json);

                      var opts = {
                        data: json,
                        feilds: ['seed_id', 'crop', 'date_created', 'variety', 'purchase_date', 'lot_number', 'quantity', 'out_of_stock', 'item_code', 'supplier_id', 'organic', 'untreated', 'non-gmo', 'seed_check_sources', 'receipt_url'],
                        quotes: ''
                      };
                      var result = json2csv(opts);
                      // sends csv file to client
                      res.attachment('Seed_Reports.csv');
                      res.status(200).send(result);
                    }
                  });
                    } else {
                      // query that selects all reports for a selected period of time
                      var jsonQuerySeeds = 'SELECT * FROM seeds WHERE purchase_date >=$1 and purchase_date <=$2 and user_id= $3';
                      connection.query(jsonQuerySeeds, [req.params.fromDate, req.params.toDate, 1], function(queryError, result) {
                        done();
                        if (queryError) {
                          res.sendStatus(500);
                        } else {
                          // converts query resutl to JSON
                          var jsonString = JSON.stringify(result.rows);
                          var json = JSON.parse(jsonString);
                          // parameters for json2csv function
                          var opts = {
                            data: json,
                            feilds: ['seed_id', 'crop', 'date_created', 'variety', 'purchase_date', 'lot_number', 'quantity', 'out_of_stock', 'item_code', 'supplier_id', 'organic', 'untreated', 'non-gmo', 'seed_check_sources', 'receipt_url'],
                            quotes: ''
                          };
                          // converts json data to csv
                          var result = json2csv(opts);
                          // sends csv file to client
                          res.attachment('Seed_Reports.csv');
                          res.status(200).send(result);
                        } // else
                      }); // db.query
                    } // else
                   // pool.connect
            }
              });
            // } else {
            //   res.sendStatus( 403 );
            // }
          });



            module.exports = router;
