const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const app = express()

let models = require('./models')

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add User //

app.post('/add-user', (req, res) => {
  let user = req.body;
  models.User.create(user)
  .then(() => res.send({ message : "Success"})
  )
})













app.listen(3001, () => console.log('Example app listening on port 3001!'))
