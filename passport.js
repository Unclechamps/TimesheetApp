
const passportJWT = require('passport-jwt');
const passport = require('passport')
const keys = require('./config/keys')
let models = require('./models')

// Passport JWT init
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: keys.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

/* SIGN IN */

module.exports = () => {
    var strategy = new Strategy(params, (payload, done) => {
    models.User.findOne({where: { id : payload.id}})
    .then(user => {
      if (user) {
          return done(null, user);
      }
      return done(null, false)
  });
})

    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", keys.jwtSession);
        }
    };
};
