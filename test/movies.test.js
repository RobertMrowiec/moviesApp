const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

let fastMovieId
let tomorrowMovieId

describe('POST Movies', () => {
    it('should add movie', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({
                Title: 'Fast'
            })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.Title.should.equal('Fast & Furious 6')
                res.body.Rated.should.equal('PG-13')
                fastMovieId = res.body._id
                done()
            })
            .catch(console.log)
    })

    it('should add another movie', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({
                Title: 'Tomorrow'
            })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.Title.should.equal('Tomorrow')
                res.body.Year.should.equal('2015')
                tomorrowMovieId = res.body._id
                done()
            })
            .catch(console.log)
    })

    it('should throw an error with title key', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({
                title: 'Fast'
            })
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })

    it('should throw an error if something more than title is sended', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({
                Title: 'Fast',
                something: 'qwe'
            })
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })
})

describe('GET Movies', () => {
    it('should return array of movies', (done) => {
        chai.request(server)
            .get('/api/movies')
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
            .catch(console.log)
    })

    it('should return array of movies filtered by Title', (done) => {
        chai.request(server)
            .get('/api/movies?filterBy=Title&filterValue=Tomorrow')
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array') 
                res.body[0].Year.should.equal('2015')
                res.body[0].Title.should.equal('Tomorrow')
                done()
            })
            .catch(console.log)
    })

    it('should return array of movies sorted by year descending', (done) => {
        chai.request(server)
            .get('/api/movies?sortBy=-Year')
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                if (res.body[0].Year >= res.body[1].Year) return done()
                throw {error: 'descending sorting not working properly'}
            })
            .catch(console.log)
    })

    it('should return array of movies sorted by year ascending', (done) => {
        chai.request(server)
            .get('/api/movies?sortBy=Year')
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                if (res.body[0].Year <= res.body[1].Year) return done()
                throw {error: 'ascending sorting not working properly'}
            })
            .catch(console.log)
    })
})

describe('GET BY ID Movies', () => {
    it('should return movie by ID', (done) => {
        chai.request(server)
            .get(`/api/movies/${fastMovieId}`)
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })
})

describe('PAGINATION Movies', () => {
    let firstMovieWriter
    it('should return only first movie', (done) => {
        chai.request(server)
            .get('/api/movies/page/1/limit/1')
            .then(res => {
                res.body.result.should.have.length(1)
                res.body.result[0].Writer.should.exist
                firstMovieWriter = res.body.result[0].Writer
                done()
            })
    })

    it('should return only second movie', (done) => {
        chai.request(server)
            .get('/api/movies/page/2/limit/1')
            .then(res => {
                res.body.result.should.have.length(1)
                res.body.result[0].Writer.should.not.equal(firstMovieWriter)
                done()
            })
    })

    it('should return only movie with Title Fast & Furious', (done) => {
        chai.request(server)
            .get('/api/movies/page/1/limit/1?filterBy=Title&filterValue=Tomorrow')
            .then(res => {
                res.body.result.should.have.length(1)
                res.body.result[0].Title.should.equal('Tomorrow')
                done()
            })
    })
})

describe('DELETE Movies', () => {
    it('should delete Fast & Furious movie', (done) => {
        chai.request(server)
            .delete(`/api/movies/${fastMovieId}`)
            .then(res => {
                res.body.should.equal('Deleted Fast & Furious 6 movie')
                done()
            })
    })
    it('should delete Tomorrow movie', (done) => {
        chai.request(server)
            .delete(`/api/movies/${tomorrowMovieId}`)
            .then(res => {
                res.body.should.equal('Deleted Tomorrow movie')
                done()
            })
    })
})
