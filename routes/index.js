const express = require('express');
const router = express.Router();
var passport = require('passport')
var User = require("../models/user");
var Contact = require("../models/contact");

//Validators
var contactValidator = require("../validators/contact");

var mongoose = require('mongoose')
var config = require('../config/database');
var jwt = require('jsonwebtoken')
 , LocalStrategy = require('passport-local').Strategy;

require('../config/passport')(passport);

router.get('/',(req,res)=>{
    res.send('Hello World!')
})

var getToken = function(headers){
    if(headers && headers.authorization){
        var parted = headers.authorization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }
        else{
            return null;
        }
    } else{
        return null;
    }
};
/*router.post('/signup', function(req,res){
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
});*/

router.post('/signin', function(req,res){
    console.log("Attempting signin ")
    User.findOne({
        username: req.body.username
    }, function(err,user){
        if(err) throw err;

        if(!user){
            res.status(401).send({success:false, msg:'User not found'});
        } else{
            console.log(user)
            user.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err){
                    var token = jwt.sign(user.toJSON(), config.secret, {expiresIn:'30m'});
                    res.json({success:true, token: 'JWT '+token})
                } else{
                    res.status(401).send({success:false, msg: 'Wrong pass'});
                }
            })
        }
    })
})

router.get('/authorize', passport.authenticate('jwt',{session:false}), function(req,res){
    console.log("attempt to authorize")
    console.log(JSON.stringify(req.headers));
    var token = getToken(req.headers);
    if(token){
        res.json({success:true})
    }
    else{
        return res.status(403).send({success:false})
    }
});

router.post('/saveContact', async function(req,res,next){
    try{
        aName = req.body.name;
        aEmail = req.body.email;
        aMessage = req.body.message;
        if(contactValidator(aEmail,aMessage,aName)){
            var newContact = new Contact({
                email:aEmail,
                message:aMessage,
                name : aName
            });
            await newContact.save()
            res.status(200).json({success:true})
        }
        else{
            res.json({success:false})
        }
    } catch(error){
        console.log(error);
        next();
    }
})

router.get('/getContacts', passport.authenticate('jwt',{session:false}),async function(req,res,next){
    try{
        const contacts = await Contact.find({});
        res.statusCode= 200;
        res.setHeader('content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(contacts);
    } catch(error){
        console.log(error);
        next();
    }
})
module.exports = router;