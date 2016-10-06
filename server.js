'use strict';

const express = require('express');
const app = express();
<<<<<<< HEAD
const router = express.Router();
=======
>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // pentru log-uri
<<<<<<< HEAD
const Model = require('./config/models/model.js');
const createProductTable = Model.Product;
const createUsersTable = Model.User;
const createShoppingCart = Model.ShoppingCart;
const http = require('http');
=======

>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8

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
<<<<<<< HEAD
app.use(router);
createProductTable
  .sync({
    logging: console.log
  });
createUsersTable
  .sync({
    logging: console.log
  });
createShoppingCart
  .sync({
    logging: console.log
  });
/* configurare passport + conectare baza de date */
require('./config/passport.js')(passport, session);
/* import rutele cu autentificarea configurata */
require('./app/routes.js')( router, passport);

/* pornesc serverul */
let port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port, () => {
  console.log('Huiak so pornit');
});


module.exports = app;
=======

/* configurare passport + conectare baza de date */
require('./config/passport.js')(passport, session);
/* import rutele cu autentificarea si aplicatatia configurata */
require('./app/routes.js')(app, passport);


/* pornesc serverul */
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8
