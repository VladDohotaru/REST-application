'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // pentru log-uri
const Model = require('./config/models/model.js');
const createProductTable = Model.Product;
const createUsersTable = Model.User;

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
app.use(router);
createProductTable
  .sync({
    logging: console.log
  });
createUsersTable
  .sync({
    logging: console.log
  });

/* configurare passport + conectare baza de date */
require('./config/passport.js')(passport, session);
/* import rutele cu autentificarea configurata */
require('./app/routes.js')(router, passport);


/* pornesc serverul */
let port = process.env.PORT || 3000;
app.listen(port);
console.log('Server started on port ' + port);
