const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

let commentId
let secondCommentId
let firstMovieId
let secondMovieId

describe('POST COMMENTS', () => {
    before('Add Shrek movie', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({ Title: 'Shrek' })
            .then(x => {
                firstMovieId = x.body._id
                done()
            })
    })

    before('Add IT movie', (done) => {
        chai.request(server)
            .post('/api/movies')
            .send({ Title: 'IT' })
            .then(x => {
                secondMovieId = x.body._id
                done()
            })

    })

    it('should add comment', (done) => {
        chai.request(server)
            .post('/api/comments')
            .send({
                description: 'So amazing! I`m in love with this movie.',
                movieId: firstMovieId
            })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.description.should.equal('So amazing! I`m in love with this movie.')
                commentId = res.body._id
                done()
            })
            .catch(console.log)
    })

    it('should add another comment', (done) => {
        chai.request(server)
            .post('/api/comments')
            .send({
                description: 'Beautiful.',
                movieId: secondMovieId
            })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                res.body.description.should.equal('Beautiful.')
                secondCommentId = res.body._id
                done()
            })
            .catch(console.log)
    })

    it('should throw an error without description and movie', (done) => {
        chai.request(server)
            .post('/api/comments')
            .send({
                something: ''
            })
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })

    it('should throw an error without movieId', (done) => {
        chai.request(server)
            .post('/api/comments')
            .send({
                description: 'some description text'
            })
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })

    it('should throw an error if movie not exist', (done) => {
        chai.request(server)
            .post('/api/comments')
            .send({
                description: 'some description text',
                movieId: '5b0c6def6aeeed6ba6f91e7d'
            })
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })
})

describe('GET Comments', () => {
    it('should return array of comments', (done) => {
        chai.request(server)
            .get('/api/comments')
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
            .catch(console.log)
    })

    it('should return array of comments filtered by movieId', (done) => {
        chai.request(server)
            .get(`/api/comments?filterBy=movieId&filterValue=${firstMovieId}`)
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('array') 
                res.body[0].description.should.equal('So amazing! I`m in love with this movie.')
                done()
            })
            .catch(console.log)
    })
})

describe('GET BY ID Comments', () => {
    it('should return comment by ID', (done) => {
        chai.request(server)
            .get(`/api/comments/${commentId}`)
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
            .catch(console.log)
    })
})

describe('PAGINATION Comments', () => {
    let firstMovieDescription
    
    it('should return only first comment', (done) => {
        chai.request(server)
            .get('/api/comments/page/2/limit/1')
            .then(res => {
                res.body.result.should.have.length(1)
                res.body.result[0].description.should.exist
                firstMovieDescription = res.body.result[0].description
                done()
            })
    })

    it('should return only second comment', (done) => {
        chai.request(server)
            .get('/api/comments/page/1/limit/1')
            .then(res => {
                res.body.result.should.have.length(1)
                res.body.result[0].description.should.not.equal(firstMovieDescription)
                done()
            })
    })
})

describe('DELETE Comments', () => {
    after('Delete movie',  async () => {
        await chai.request(server).delete(`/api/movies/${firstMovieId}`)
        await chai.request(server).delete(`/api/movies/${secondMovieId}`)
    })

    it('should delete comment', (done) => {
        chai.request(server)
            .delete(`/api/comments/${commentId}`)
            .then(res => {
                res.body.should.equal('Deleted comment')
                done()
            })
    })

    it('should delete another comment', (done) => {
        chai.request(server)
            .delete(`/api/comments/${secondCommentId}`)
            .then(res => {
                res.body.should.equal('Deleted comment')
                done()
            })
    })
})
