process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()

chai.use(chaiHttp)
let expect = chai.expect

describe('AuthBackend', () => {

  describe('register user', () => {


      it('sould be unauthorized', done => {

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

  })

})
