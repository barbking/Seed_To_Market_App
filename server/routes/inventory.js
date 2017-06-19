var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


router.post('/addSeed', function (req, res){
  console.log('in inventory addSeed with -->', req.body);
    if (req.isAuthenticated()) {
    //query to add new seed to database
    res.sendStatus( 200 );
    //end response of success if user logged in and new seed added
  } else {
    res.sendStatus( 403 );
  }// end response if user not authenticated
});//end of POST route for adding new seed

module.exports = router;
