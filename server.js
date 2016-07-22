'use strict';

const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // pentru log-uri


/* configurarea aplicatiei express */
app.set('view engine', 'ejs');
app.use(session({
  cookieName:        'session',
  secret:            'secret',
  resave:            true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

/* configurare passport + conectare baza de date */
require('./config/passport.js')(passport, session);
/* import rutele cu autentificarea si aplicatatia configurata */
require('./app/routes.js')(app, passport);


/* pornesc serverul */
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
