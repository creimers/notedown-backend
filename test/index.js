process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()

chai.use(chaiHttp)
let expect = chai.expect

describe('AuthBackend', () => {

  describe('register user', () => {


      it('sould register', done => {

        let email = "johannes@paul.com"
        let password = "duckducksnow"

        chai.request(server)
        .post('/register')
        .send({email, password})
        .end((err, res) => {
          res.should.have.status(201)
          done()
        })
      })

      it('sould fail for missing data', done => {

        let email = "johannes@paul.com"
        let password = "duckducksnow"

        chai.request(server)
        .post('/authenticate')
        .send({email, password})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })

      it('sould fail for unexisting user', done => {

        let email = ""
        let password = "duckducksnow"

        chai.request(server)
        .post('/authenticate')
        .send({email, password})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
      })

  })

})
