const express = require('express')
const router = express.Router()
const comment = require('./details')

router.get('/', comment.find)
    .get('/:id', comment.findById)
    .get('/page/:page/limit/:limit', comment.pagination)
    .post('/', comment.add)
    .delete('/:id', comment.delete)

module.exports = router