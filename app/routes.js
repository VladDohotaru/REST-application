'use strict';
<<<<<<< HEAD

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
=======
const connection = require('../config/db');
module.exports = (app, passport) => {

  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/signup', (req, res) => {
    res.render('signup.ejs');
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  app.get('/profile', requireLogin, (req, res) => {
    res.render('profile.ejs');
  });
  app.use( (req, res, next) => {
    if (req.session && req.session.user) {
      connection.query('SELECT * FROM users WHERE username = ?', [req.session.user.email], (err, user) => {
        if (err) {
          console.log('Aici crapa ' + err);
          return;
        }
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = user;

          // req.locals.user = user;
        }
        next();
      });
    } else {
      next();
    }
  });



  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash:    false
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash:    false
  }));

  app.get('/profile/catalog/', (req, res) => {
    connection.query('SELECT * FROM products;',(err, rows) => {
      if (err) return err;
      res.json(rows).end();
    });
  });
// {"productID":2,"productTitle":"shulala","productPrice":100,"productDescription":"huiak"}
  app.post('/profile/catalog', (req, res) => {
    let flag = false;
    let i;
    let recordToPost = req.body;
    connection.query('SELECT productID FROM products;',(err, rows) => {
      if (err) {
        return err;
      }
      for (i = 0; i < rows.length; i++) {
        if (recordToPost.productID === rows[i].productID) {
          flag = true;
          break;
        }
      }
      if ( true === flag) {
        res.json({operation: 'POST', status: 'fail',reason: 'existing ID'}).end();
        flag = false;
      } else {
        connection.query(`INSERT INTO products (productID,productTitle,productPrice,productDescription) values ('${recordToPost.productID}','${recordToPost.productTitle}','${recordToPost.productPrice}','${recordToPost.productDescription}')`, (insertError) => {
          if (insertError) {
            console.log(insertError);
            return insertError;
          }
          res.json({operation: 'POST',status: 'success'});
        });
      }
    });
  });

  app.get('/profile/catalog/*', (req, res) => {
    let idToGet = req.params[0];
    connection.query('SELECT * FROM products WHERE productID = ?', [idToGet], (selectError, rows) => {
      if (selectError) {
        return selectError;
      }
      res.json(rows).end();
    });
  });

  app.delete('/profile/catalog/*', (req, res) => {
    let idToDelete = req.params[0];
    connection.query('DELETE FROM products WHERE productID = ?', [idToDelete], (err) => {
      if (err) {
        return err;
      }
      res.json({operation: 'DELETE', status: 'success'});
    });
  });

  app.put('/profile/catalog/*', (req, res) => {
    let recordToPut = req.body;
    let idToPut = req.params[0];
    connection.query(`UPDATE products SET productID = '${recordToPut.productID}', productTitle = '${recordToPut.productTitle}',productPrice='${recordToPut.productPrice}',productDescription='${recordToPut.productDescription}' WHERE productID = ?;`,[idToPut], (err, rows) => {
      if (err) {
        return err;
      }
      if (0 === rows.affectedRows) {
        res.json({operation: 'PUT',status: 'FAIL',reason: 'Can not update product with given ID. No such product found.'});
      } else {
        res.json({operation: 'PUT',status: 'SUCCESS'});
      }
      res.end();
    });
  });


  app.get('/logout', (req, res) => {
>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

<<<<<<< HEAD
  router.post( '/login', passport.authenticate('user-login', {
    successRedirect: '/admin_profile',
    failureRedirect: '/login',
    failureFlash:    false
  }));

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash:    false
=======
  app.get('/auth/facebook', passport.authenticate('facebook-login', {scope: 'email'}));

  app.get('/auth/facebook/callback', passport.authenticate('facebook-login', {
    successRedirect: '/profile',
    failureRedirect: '/'
>>>>>>> aa025684d765ef9a3098099971ff3f28397cd6f8
  }));
};
