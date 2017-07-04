const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const jwt = require('express-jwt')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(bodyParser.json())

const getCouchdbConfig = () => {
  let { COUCHDB_PROTOCOL, COUCHDB_URL, COUCHDB_USER, COUCHDB_PASSWORD } = process.env
  return {
    url: `${COUCHDB_PROTOCOL}://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_URL}`
  }
}

let couch = require('nano')(getCouchdbConfig())
let db = couch.use('_users')
// TODO: in couchdb 2.0 the '_users' db will have to be created manually


const queryUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.auth(email, password, (err, body, headers) => {
      if (err) {
        reject(Error('can not authenticate user'))
      }
      resolve()
    })
  })
}

// register user
// * save user in db
// * create db for user
app.post('/register', (req, res) => {
  // let { email, password } = req.body

  res.status(201).send('yes')
})

app.post('/authenticate', (req, res) => {
  let { email, password } = req.body

  if (!email || !password) {
    res.status(400).send('email and password required')
    return
  }

  queryUser(email, password)
    .then(() => res.send('yes yes yes'))
    .catch(err => res.status(400).send(err.message))
    

})

// authenticate
// * return jwt

const server = http.createServer(app);

server.listen(4000, function listening() {
  console.log('Listening on %d', server.address().port);
});

module.exports = server
