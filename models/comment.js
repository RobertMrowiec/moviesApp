const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema ({
    description: { type: String, required: true},
    movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true }
})

module.exports = mongoose.model('Comment', Comment)