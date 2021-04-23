var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('users', usersSchema,'users');