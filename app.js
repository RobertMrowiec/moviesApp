const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

module.exports = (url) => mongoose.connect(process.env.MONGODB_URI || url, { 
    useNewUrlParser: true
}).then(x => app)