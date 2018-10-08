const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const allowedOrigins = ['http://editor.swagger.io', 'http://localhost:8001']
app.use(require('surprise-cors')(allowedOrigins))

app.use('/api/comments', require('./routing/comments/route'))
app.use('/api/movies', require('./routing/movies/route'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moviesapp', { 
    useNewUrlParser: true
}).then(() => {
    console.log(`Server is running on port: ${process.env.PORT || 8001}`);
    app.listen(process.env.PORT || 8001);
});

module.exports = app;