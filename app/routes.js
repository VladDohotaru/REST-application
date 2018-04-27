'use strict';

const Model = require('../config/models/model.js');
const promise = Model.Product;
const userPromise = Model.User;
const shoppingCartPromise = Model.ShoppingCart;
const isAdmin = require('./isAdmin.js');
const requireLogin = require('./requireLogin.js');
const getProductById = require('./getProductById.js');
// const connection = require('../config/db.js').connection;
module.exports = (router, passport) => {
  router.get('/', (req, res) => {
    res.render('index.ejs');
  });

  router.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  router.get('/signup', (req, res) => {
    res.render('signup.ejs');
  });

  router.get('/user_profile', (req, res) => {
    res.render('user_profile.ejs');
  });

  router.get('/admin_profile', requireLogin, isAdmin, (req, res) => {
    res.render('AdminProfile.ejs');
  });

  router.get('/admin_profile/catalog/', (req, res) => {
    promise
      .findAll()
      .then((content) => {
        res.status(200);
        res.json(content).end();
      })
      .catch((getError) => {
        console.log(getError);
        res.status(406);
        res.end();
        return getError;
      });
  });

  router.get('/user_profile/catalog/', (req, res) => {
    promise
      .findAll()
      .then((content) => {
        res.status(200);
        res.json(content).end();
      })
      .catch((getError) => {
        console.log(getError);
        res.status(406);
        res.end();
        return getError;
      });
  });

  router.get('/admin_profile/users/', (req, res) => {
    userPromise
      .findAll()
      .then((usersList) => {
        res.json(usersList);
        res.status(200).end();
      })
      .catch((getUsersError) => {
        console.log(getUsersError);
        res.status(406);
        res.end();
        return getUsersError;
      });
  });

  router.get('/admin_profile/catalog/*', (req, res) => {
    let idToGet = req.params[0];
    getProductById(idToGet, res);
  });

  router.get('/user_profile/catalog/*', (req, res) => {
    let idToGet = req.params[0];
    getProductById(idToGet, res);
  });

  router.get('/download/JAlarm.zip', (req, res) => {
    console.log(__dirname);
    res.sendFile('JAlarm.zip', {root: './views'});
  });
  router.post('/admin_profile/catalog/', (req, res) => {
    let contentToPost = req.body;
    promise
      .create(contentToPost)
      .then( () => {
        res.json({operation: 'POST', status: 'success'});
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err);
        res.json({operation: 'POST', status: 'fail',reason: 'Constraits violation ' + err});
        res.status(406).end();
      });
  });

  router.post('/admin_profile/catalog/*', (req, res) => {
    res.status(406);
    res.json({operation: 'POST', status: 'fail',reason: 'You can not overwrite an existent id'}).end();
  });

  router.put('/admin_profile/catalog/*', (req, res) => {
    let recordToPut = req.body;
    let idToPut = req.params[0];
    promise
      .update({
        productTitle:       recordToPut.productTitle,
        productPrice:       recordToPut.productPrice,
        productDescription: recordToPut.productDescription
      }, {
        where: {
          productId: idToPut
        }
      })
      .then( (rowsAffected) => {
        if (0 === rowsAffected[0]) {
          res.json({operation: 'PUT', status: 'fail', reason: 'id not found'});
          res.statusCode = 404;
        }
        res.json({operation: 'PUT', status: 'success'});
        res.status(200);
      })
      .catch( (updateError) => {
        console.log(updateError);
        res.json({operation: 'PUT', status: 'fail', reason: 'incorect format of input'});
        res.status(406);
        res.end();
        return updateError;
      });
  });

  router.put('/admin_profile/users/set_admin', (req, res) => {
    userPromise
      .update({
        group: 'admin'
      }, {
        where: {
          username: req.body.username
        }
      })
      .then( (rowsAffected) => {
        if (0 === rowsAffected[0]) {
          res.json({operation: 'PUT', status: 'fail', reason: 'user not found'});
          res.statusCode = 404;
        }
        res.json({operation: 'User is admin now', status: 'success'});
        res.status(200);
      })
      .catch((error) => {
        res.json({operation: 'Make admin', status: 'fail' + error});
        res.status(406);
      });
  });

  router.put('/admin_profile/add_to_cart', requireLogin, (req, res) => {
    let id = req.body.id;
    console.log(id,typeof id, req.user.username);
    promise
    .findOne({
      where: {
        productId: id
      }
    })
    .then((foundRecord) => {
      shoppingCartPromise
      .create({
        username:     req.user.username,
        productTitle: foundRecord.productTitle,
        productPrice: foundRecord.productPrice,
      })
      .catch((error) => {
        res.json({operation: 'add to cart', status: 'fail' + error});
        res.status(406);
      });
    });
  });

  router.get('/admin_profile/myShoppingCart',requireLogin, (req, res) => {
    res.status(200);
  });

  router.delete('/admin_profile/catalog/*', (req, res) => {
    let idToDelete = req.params[0];
    promise
      .destroy({
        where: {
          productId: idToDelete
        }
      })
      .then((rowsAffected) => {
        if (0 === rowsAffected) {
          res.status(406).json({operation: 'DELETE', status: 'fail'}).end();
        }
        res.json({operation: 'DELETE', status: 'success'}).status(200).end();
      })
      .catch( (deleteProductError) => {
        console.log(deleteProductError);
        return deleteProductError;
      });
  });

  router.get('/logout', (req, res) => {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

  router.post( '/login', passport.authenticate('user-login', {
    successRedirect: '/admin_profile',
    failureRedirect: '/login',
    failureFlash:    false
  }));

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash:    false,
  }));
  router.get('/auth/facebook', passport.authenticate('facebook-login', {scope: 'email'}));

  router.get('/auth/facebook/callback', passport.authenticate('facebook-login', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));
};
