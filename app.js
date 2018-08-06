const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const app = express()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const keys = require('./config/keys')
const passportAuth = require('./passport')()
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 5000
const path = require("path")

let models = require('./models')

// Load Input Validation //
const validateRegisterInput = require('./validators/register');
const validateLoginInput = require('./validators/login')
const validateClientInput = require('./validators/addclient')
const validateProjectInput = require('./validators/addproject')

// Body Parser //
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// Initializing JWT //
app.use(passportAuth.initialize());

// Cross with react //

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, './timesheet_app/build')))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./timesheet_app/build/index.html"));
  });
}

// CORS //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// ADD USER //

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
        const token = jwt.sign(payload, keys.jwtSecret, {expiresIn: 7200},
        (err,token) => {
          res.json({
            success: true,
            token : 'Bearer ' + token,
            userID : user.id
        })
      }
    )} else {
        errors.errors.password = "Password incorrect"
        return res.status(401).json(errors)
      }
    })
  })
})

// DASHBOARD //
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

// CLIENTS //
// ADD CLIENTS //

app.post('/addClient', (req, res) => {
  const {errors,isValid} = validateClientInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  models.Client.findOne({where: {clientName : req.body.name}}).then(client => {
    if(client) {
      errors.name = "Client already exists"
      return res.status(400).json(errors);
    } else {

      let newClient = {
        clientName : req.body.name,
        contactName : req.body.contact,
        email : req.body.email,
        phoneNumber : req.body.phone,
        userID : req.body.userID
      }

      models.Client.create(newClient).then(() =>
        models.Client.findAll({
          where: {
            userID : req.body.userID
          },
          order : [
            ['clientName', 'ASC']
          ],
        })
      ).then(clients => res.status(200).json(clients))
    }
    })
    })

  // DELETE CLIENT //

  app.delete('/deleteclient', (req,res) => {
    console.log(req.body)
    models.Client.destroy({
        where : {
          id : req.body.id
        }
      }).then((results) => models.Client.findAll({
          where: {
            userID: req.body.userID
          }
      }))
        .then( clients => clients = res.status(200).json(clients))
    })


// POPULATE CLIENT LIST //

app.post('/clientList', (req,res) => {
  console.log(req.body.id)
    models.Client.findAll({
      where : {
        userID : req.body.id
      },
      order : [
        ['clientName', 'ASC']
      ],
      })
      .then( clients => res.status(200).json(clients))
})

// PROJECTS//
// ADD PROJECT //

app.post('/addProject', (req, res) => {
  const {errors,isValid} = validateProjectInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  models.Project.findOne({where: {projectName : req.body.name}}).then(client => {
    if(client) {
      errors.name = "Project already exists"
      return res.status(400).json(errors);
    } else {

      let newProject = {
        projectName : req.body.projectName,
        projectDesc : req.body.projectDesc,
        budgetedHours : req.body.budget,
        rate : req.body.rate,
        actualHours : 0,
        userID : req.body.userID,
        clientID : req.body.clientID,
        clientName : req.body.clientName,
        ETC : req.body.budget,
        totalBill : 0 ,
        Status : "Not Started"

      }

      models.Project.create(newProject).then(() =>
        models.Project.findAll({
          where : {
            userID : req.body.userID,
            clientID : req.body.clientID,
            Status : ["Not Started", "In Progress"]
          },
          order : [
            ['projectName', 'ASC']
          ],
        })
          .then( projects => projects = res.status(200).json(projects))
        )
    }
    })
    })

// DELETE PROJECT //

app.delete('/deleteproject', (req,res) => {
  console.log(req.body)
  models.Project.destroy({
      where : {
        id : req.body.projectID
      }
    }).then((results) => models.Project.findAll({
        where: {
          clientID: req.body.clientID
        }
    }))
      .then( projects => projects = res.status(200).json(projects))
  })



// POPULATE PROJECT LIST //

app.post('/projectList', (req,res) => {

    models.Project.findAll({
      where : {
        userID : req.body.userID,
        clientID : req.body.clientID,
        Status : ["Not Started", "In Progress"]
      },
      order : [
        ['projectName', 'ASC']
      ],
      })
      .then( projects => res.status(200).json(projects))
})

// POPULATE COMPLETE PROJECT LIST //

app.post('/completeProjectList', (req,res) => {
  console.log(req.body, "Hello")
    models.Project.findAll({
      where : {
        userID : req.body.id,
      },
      order : [
        ['clientName', 'ASC']
      ],
      })
      .then( projects => res.status(200).json(projects))
})

// INDIVIDUAL PROJECTS //

// POPULATE INDIVIDUAL PROJECTS //

app.post('/indiProject', (req,res) => {

    models.Project.findOne({
      where : {
        id : req.body.projectID
      },
      })
      .then( project => res.status(200).json(project))
})

// ADD HOURS //

app.post('/addHours', (req,res) => {
  console.log(req.body)

  let hours = req.body.hours;
  let actuals = req.body.data.actualHours;
  let budget = req.body.data.budgetedHours;
  let rate = req.body.data.rate;
  let status = req.body.status

  models.Project.update({
    actualHours : (actuals) + (hours),
    ETC : (budget - hours) - (actuals),
    totalBill : (actuals + hours) * (rate),
    Status : status
  },
    {
      where: {
        id : req.body.data.projectID
      }
    })
      .then((result) => models.Project.findOne({
        where : {
          id : req.body.data.projectID
        },
        })
      .then( project => res.status(200).json(project)))
})

// REMOVE HOURS //

app.post('/removeHours', (req,res) => {
  console.log(req.body)

  let hours = req.body.hours;
  let actuals = req.body.data.actualHours;
  let budget = req.body.data.budgetedHours;
  let rate = req.body.data.rate;
  let status = req.body.status

  models.Project.update({
    actualHours : (actuals) - (hours),
    ETC : (budget + hours) - (actuals),
    totalBill : (actuals - hours) * (rate),
    Status : status
  },
    {
      where: {
        id : req.body.data.projectID
      }
    })
      .then((result) => models.Project.findOne({
        where : {
          id : req.body.data.projectID
        },
        })
      .then( project => res.status(200).json(project)))
})

// GETTING USER LIST - TO DELETE//
app.get('/users', (req,res) => {

    models.User.findAll()
      .then( products => products = res.status(200).json(products))
})

// POPULATE FINISHED LIST //

app.post('/finishedList', (req,res) => {
    console.log(req.body)
    models.Project.findAll({
      where : {
        userID : req.body.userID,
        clientID : req.body.clientID,
        Status : "Completed"
      },
      order : [
        ['projectName', 'ASC']
      ],
      })
      .then( completed => res.status(200).json(completed))
})

// INVOICE //

app.post('/invoice', (req,res) => {
    console.log(req.body)
    models.Project.findOne({
      where : {
        id : req.body.projectID,
      },
      })
      .then( invoice => res.status(200).json(invoice))
})



// Server
app.listen(PORT, () => console.log('I am listening on ${PORT}!'))
