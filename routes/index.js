const express = require('express');
const router = express.Router();
var passport = require('passport')
var User = require("../models/user");
var mongoose = require('mongoose')
var config = require('../config/database');
var jwt = require('jsonwebtoken')
 , LocalStrategy = require('passport-local').Strategy;

 router.get('/',(req,res)=>{
    res.send('Hello World!')
})

router.post('/signup', function(req,res){
    if(!req.body.username || !req.body.password){
        res.json({success: false, msg: 'Please give username and pass'});
    } else{
        var newUser = new User({
            username:req.body.username,
            password:req.body.password
        }); //do not forget, here, the pre hook is converting password to its corresponding hash. I am not saving a plaintext password
        newUser.save(function(err){
        if(err){
            return res.json({success:false, msg:'Username already used'});
        }
        res.json({success:true,msg:'Success'});
    });
    }
});

router.post('/signin', function(req,res){
    User.findOne({
        username: req.body.username
    }, function(err,user){
        if(err) throw err;

        if(!user){
            res.status(401).send({success:false, msg:'User not found'});
        } else{
            user.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err){
                    var token = jwt.sign(user.toJSON(), config.secret);
                    res.json({success:true, token: 'JWT '+token})
                } else{
                    res.status(401).send({success:false, msg: 'Wrong pass'});
                }
            })
        }
    })
})
module.exports = router;