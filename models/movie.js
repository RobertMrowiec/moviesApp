const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema ({
    Title: { type: String, required: true }
},
    { strict: false }
)

module.exports = mongoose.model('Movie', Movie)