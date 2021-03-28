const express = require('express')
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var path = require('path');
var cookieParser = require('cookie-parser')
var cors = require('cors');

const sls = require('serverless-http')
const app = express()
const port = 5000
require('dotenv').config()
let db = config.database
if(process.env.ENV == 'PROD'){
    db = config.remoteDB
    console.log("Using remote DB")
}
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology:true});

var api = require('./routes/index');
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public'))); //eliminar esto ni bien haya problemas, esto no va a ir

app.use(require('./routes/index'))



app.listen(port,() =>{
    console.log('Backend Portfolio runnning')
})

//this is done so I can get a handler for Lambda
//exports.app = app;
module.exports.server = sls(app)