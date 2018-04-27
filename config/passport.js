'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Model = require('./models/model.js');
const encryption = require('./passwordEncryption.js');
const passwordCheck = require('./passwordCheck.js');
const userPromise = Model.User;


module.exports = (passport) => {

  passport.serializeUser( (user, done) => {
    done(null, user);
  });

  passport.deserializeUser( (user, done) => {
    done(null, user);
  });
  const optionsOverride = {
    usernameField:     'email',
    passportField:     'password',
    passReqToCallback: true
  };

  passport.use('local-signup', new LocalStrategy(optionsOverride,
  (req, email, password, done ) => {
    let securedPassword = encryption(password);
    let newUser = {
      username: email,
      password: securedPassword
    };
    userPromise
      .create(newUser)
      .then(() => {
        if (!newUser) {
          return done(null, false);
        }
        return done(null, newUser);
      })
      .catch( (signupError) => {
        console.log(signupError);
        return done(signupError);
      });
  })
);

  passport.use('user-login', new LocalStrategy(optionsOverride,
    (req, email, password, done) => {
      userPromise
        .findOne({
          where: {
            username: email
          }
        })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (false === passwordCheck(password, user.password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch( (loginError) => {
          console.log(loginError);
          return done(loginError);
        });
    })
  );
};
