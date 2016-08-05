'use strict';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Model = require('./models/model.js');
const encryption = require('./passwordEncryption.js');
const passwordCheck = require('./passwordCheck.js');
const userPromise = Model.User;
const fbAuth = Model.fbAuth;

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

  const facebookOptions = {
    clientID:          '218647501867726',
    clientSecret:      'c3f73a4249e0e447cf1cb7880f36b11c',
    callbackURL:       'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true,
    profileFields:     ['id', 'emails', 'name']
  };
  passport.use('facebook-login', new FacebookStrategy(facebookOptions,
  (token, refreshToken, profile, done) => {
    process.nextTick( () => {
      console.log(JSON.stringify(profile) + '    iacatalai');
      fbAuth
        .findOne({
          where: {
            fbId: profile.id
          }
        })
        .then((selectedUser) => {
          if (selectedUser) {
            return done(null, selectedUser);
          } else {
            let newUser = {
              id:    profile.id,
              token: token,
              name:  profile.name.givenName + ' ' + profile.name.familyName,
              email: profile.emails.value
            };
            fbAuth
            .create(newUser)
            .then(() => {
              if (!newUser) {
                return done(null, false);
              }
              return done(null, newUser);
            })
            .catch( (facebookAuthError) => {
              console.log(facebookAuthError);
              return done(facebookAuthError);
            });
          }
        })
        .catch((selectError) => {
          console.log('IHAAAAAAAAAAAAA');
          return done(selectError);
        });
    });
  }));

};
