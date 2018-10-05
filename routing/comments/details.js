const Comment = require('../../models/comment')
const { defaultResponse, getFilters } = require('../../common')

exports.find = defaultResponse(req => {
    const filter = getFilters(req.query)
    return Comment.find(filter).populate('movieId').sort(req.query.sortBy || '').exec()
})

exports.findById = defaultResponse(req => Comment.findById(req.params.id).populate('movieId').exec())

exports.pagination = defaultResponse(req => {
    const page = req.params.page
    const limit = Number(req.params.limit)
    const filter = getFilters(req.query)
    return Promise.all([
        Comment.countDocuments(filter),
        Comment.find(filter).sort(req.query.sort || '').populate('movieId').skip(limit * (page - 1)).limit(limit)
    ]).then(([total, result]) => ({total, result}))
})

exports.add = defaultResponse(req => new Comment(req.body).save())

exports.delete = defaultResponse(req => Comment.findByIdAndRemove(req.params.id).then(() => `Deleted comment`))