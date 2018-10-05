const Movie = require('../../models/movie')
const { defaultResponse, getFilters } = require('../../common')
const fetch = require('node-fetch')

exports.find = defaultResponse(req => {
    const filter = getFilters(req.query)
    return Movie.find(filter).sort(req.query.sortBy || '').exec()
})

exports.findById = defaultResponse(req => Movie.findById(req.params.id).exec())

exports.pagination = defaultResponse(req => {
    const page = req.params.page
    const limit = Number(req.params.limit)
    const filter = getFilters(req.query)
    return Promise.all([
        Movie.countDocuments(filter),
        Movie.find(filter).sort(req.query.sort || '').skip(limit * (page - 1)).limit(limit)
    ]).then(([total, result]) => ({total, result}))
})

exports.add = defaultResponse(async req => {
    if ( Object.keys(req.body).length > 1 || req.body.title) throw 'You can only send movie title with capitalized first letter'

    return fetch(`http://www.omdbapi.com/?apikey=a02d102&t=${req.body.Title}`)
        .then(res => res.json())
        .then(body => new Movie({...req.body, ...body}).save())
        .catch(console.log)
})

exports.delete = defaultResponse(req => {
    return Movie.findByIdAndRemove(req.params.id).then(movie => `Deleted ${movie.Title} movie`)
})