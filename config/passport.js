'use strict';

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt-nodejs');
const connection = require('./db');

module.exports = (passport) => {
  passport.serializeUser( (user, done) => {
    done(null, user);
  });

  passport.deserializeUser( (user, done) => {
    // connection.query('SELECT * FROM USERS WHERE username = ? ', [user], (err, rows) => {
    done(null, user);
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField:     'email',
    passportField:     'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {

    connection.query('SELECT * FROM users WHERE username = ?', [email], (err, rows) => {
      if (err) {
        return done(err);
      }
      if (rows.length) {
        return done(null, false);
      } else {
        let salt = bcrypt.genSaltSync(5);
        let securedPassword = bcrypt.hashSync(password, salt);
        let newUser = {
          username: email,
          password: securedPassword
        };
        connection.query(`INSERT INTO users (username, password) VALUES ('${newUser.username}','${securedPassword}');`, (insertError) => {
          if (insertError) {
            return done(insertError);
          }
          return done(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField:     'email',
    passportField:     'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    connection.query('SELECT * FROM users WHERE username = ?', [email], (err, rows) => {
      if (err) {
        return done(err);
      }

      /*
      The purpose of a verify callback is to find the user that possesses a set of credentials.
      If the credentials are not valid (for example, if the password is incorrect),
      done should be invoked with false instead of a user to indicate an authentication failure.
      */
      if (!rows.length) {
        return done(null, false);
      }
      if (!bcrypt.compareSync(password, rows[0].password)) {
        return done(null, false);
      }
      /*
      If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
      */
      req.session.user = JSON.stringify(rows[0]);
      return done(null, rows[0]);
    });
  })
);

  passport.use('facebook-login', new FacebookStrategy({
    clientID:     '************',
    clientSecret: '*************',
    callbackURL:  'http://localhost:3000/auth/facebook/callback'
  },
  (token, refreshToken, profile, done) => {
    process.nextTick( () => {
      connection.query('SELECT * FROM fbAuth WHERE fbId = ?', [profile.id], (selectError, selectedUser) => {
        if (selectError) {
          return done(selectError);
        }
        if (selectedUser) {
          console.log('intra aici! CUM?!');
          return done(null, selectedUser);
        } else {
          let newUser = {
            id:    profile.id,
            token: token,
            name:  profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails[0].value
          };
          connection.query(`INSERT INTO fbAuth (fbId, fbToken, fbName, fbEmail) VALUES ('${newUser.id}','${newUser.token}','${newUser.name}','${newUser.email}');`, (insertError) => {
            if (insertError) {
              return done(insertError);
            }
            return done(null, newUser);
          });
        }
      });
    });
  }
));

};
