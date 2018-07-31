const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const app = express()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const keys = require('./config/keys')
const passportAuth = require('./passport')()
const jwt = require('jsonwebtoken')

let models = require('./models')

// Load Input Validation //
const validateRegisterInput = require('./validators/register');
const validateLoginInput = require('./validators/login')

// Body Parser //
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// Initializing JWT //
app.use(passportAuth.initialize());

// CORS //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add User //

app.post('/add-user', (req, res) => {
  const {errors,isValid} = validateRegisterInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  models.User.findOne({where: {email : req.body.email}}).then(user => {
    if(user) {
      errors.email = "Email already exists"
      return res.status(400).json(errors);
    } else {

      bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            let newUser = {
              firstName : req.body.firstName,
              lastName : req.body.lastName,
              email : req.body.email,
              password : hash
      }
      models.User.create(newUser)
        .then(() => res.send({ message : "Success"}))
        })
      })
    }
  })
})

// SIGN IN //
app.post('/login', (req,res) => {
  const errors = validateLoginInput(req.body);


  //Check Validation
  if(!errors.isValid) {
    return res.status(400).json(errors);
  }

  models.User.findOne({ where: {email : req.body.email}}).then(user => {
    if(!user) {
      errors.errors.email = "User not found";
      console.log(errors)
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if(isMatch) {
        const payload = { id : user.id}

        // Sign Token //
        const token = jwt.encode(payload, keys.jwtSecret)
        res.json({
          token : 'Bearer ' + token
        })
      } else {
        errors.password = "Password incorrect"
        return res.status(401).json(errors)
      }
    })
  })
})

// Dashboard //
app.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.firstName,
      email: req.user.email
    });
  }
);



// GETTING USER LIST - TO DELETE//
app.get('/users', (req,res) => {

    models.User.findAll()
      .then( products => products = res.status(200).json(products))
})













app.listen(3001, () => console.log('Example app listening on port 3001!'))
