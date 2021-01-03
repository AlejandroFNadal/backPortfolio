const express = require('express');
const router = express.Router();
var passport = require('passport')

 , LocalStrategy = require('passport-local').Strategy;


router.post('/login', 
    passport.authenticate('local'),
    function(req,res){

        
})

module.exports = router;