const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema ({
    title: { type: String, required: true },
},
    { strict: false }
)

module.exports = mongoose.model('Movie', Movie)