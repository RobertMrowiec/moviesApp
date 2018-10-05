const express = require('express')
const router = express.Router()
const movie = require('./details')

router.get('/', movie.find)
    .get('/:id', movie.findById)
    .get('/page/:page/limit/:limit', movie.pagination)
    .post('/', movie.add)
    .delete('/:id', movie.delete)

module.exports = router