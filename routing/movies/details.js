const Movie = require('../../models/movie')
const defaultResponse = require('../../common')

exports.find = defaultResponse(req => Movie.find().exec())

exports.findById = defaultResponse(req => Movie.findById(req.params.id).exec())

exports.add = defaultResponse(async req => {
    if ( Object.keys(req.body).length > 1 ) throw 'You can only send movie title'

    return new Movie(req.body).save()
})

exports.delete = defaultResponse(async req => {
    return Movie.findByIdAndRemove(req.params.id).then(movie => `Deleted ${movie.title} movie`)
})
