const express = require('express')
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var path = require('path');
var cookieParser = require('cookie-parser')
var cors = require('cors');
const app = express()
const port = 5000

mongoose.connect(config.database, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology:true});

var api = require('./routes/index');
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public'))); //eliminar esto ni bien haya problemas, esto no va a ir

app.use(require('./routes/index'))



app.listen(port,() =>{
    console.log('Example app')
})