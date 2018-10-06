const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

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

    it('should return array of movies sorted by year descending', (done) => {
        chai.request(server)
        .get('/api/movies?sortBy=-Year')
        .then(res => {
            res.should.have.status(200)
            res.body.should.be.an('array')
            done()
        })
        .catch(console.log)
    })
})


