const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/movies', require('./routing/movies/route'))
app.use('/api/comments', require('./routing/comments/route'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moviesapp', { 
    useNewUrlParser: true
}).then(() => {
    console.log('Server is running on port: 8001');
    app.listen(8001);
});

module.exports = app;

// module.exports = (url) => mongoose.connect(process.env.MONGODB_URI || url, { 
//     useNewUrlParser: true
// }).then(x => app)