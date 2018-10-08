const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const swaggerDocument = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/comments', require('./routing/comments/route'))
app.use('/api/movies', require('./routing/movies/route'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moviesapp', { 
    useNewUrlParser: true
}).then(() => {
    console.log('Server is running on port: 8001');
    app.listen(8001);
});

module.exports = app;