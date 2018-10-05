const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/movies', require('./routing/movies/route'))
app.use('/api/comments', require('./routing/comments/route'))

module.exports = (url) => mongoose.connect(process.env.MONGODB_URI || url, { 
    useNewUrlParser: true
}).then(x => app)