
var mongoose = require('mongoose')

// User Schema
var UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    studentid: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    hindi:{
        type: String
    },
    english:{
        type: String
    },
    math:{
        type: String
    },
    science:{
        type: String
    },
    computer:{
        type: String
    }

});

var User = module.exports = mongoose.model('User', UserSchema);
  