const mongoose = require('mongoose');
const postForum = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    views: Number,
    date: Number,
    anwser: Number
});

module.exports = mongoose.model('postForum', postForum);