const mongoose = require('mongoose');
const comment = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    postID: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: Number
});

module.exports = mongoose.model('comment', comment);