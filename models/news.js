const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    pubDate: {
        type: String,
        require: true
    },
    category: String,
    date: Number
    

})

module.exports = mongoose.model('news', newsSchema)
