var mongoose = require('mongoose');
var Schema = mongoose.Schema

var Contact = new Schema({
    email:{
        type: String,
        unique: false,
        required:true
    },
    message:{
        type: String,
        unique:false,
        required:true
    },
    name:{
        type:String,
        unique:false,
        required:true
    }
});

module.exports = mongoose.model('Contact', Contact);