const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    ID: {
        unique: true,
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: String,
    phone: String

});

module.exports = mongoose.model('user', userSchema);