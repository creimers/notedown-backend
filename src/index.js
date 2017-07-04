const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const jwt = require('express-jwt')

const app = express();

app.use(cors())
app.use(bodyParser.json())

// register user
// * save user in db
// * create db for user
app.post('/register', (req, res) => {
  let { email, password } = req.body
  res.status(201).send('yes')
})

// authenticate
// * return jwt

const server = http.createServer(app);

server.listen(4000, function listening() {
  console.log('Listening on %d', server.address().port);
});

module.exports = server
