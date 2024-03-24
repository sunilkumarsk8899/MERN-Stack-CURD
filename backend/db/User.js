const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name  : String,
    last_name   : String,
    email       : String,
    password    : String,
    country     : String,
    subject     : String,
    role        : {type: String, default: 'user'},
});

module.exports = mongoose.model("users",UserSchema);