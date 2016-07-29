'use strict';
const Model = require('../config/models/model.js');
const promise = Model.Product;
module.exports = ( router, passport) => {

  router.get('/', (req, res) => {
    res.render('index.ejs');
  });

  router.get('/signup', (req, res) => {
    res.render('signup.ejs');
  });

  router.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  router.get('/profile', requireLogin, (req, res) => {
    res.render('profile.ejs');
  });


  router.get('/profile/catalog/', (req, res) => {
    promise
      .findAll()
      .then((content) => {
        res.status(200);
        res.json(content).end();
      })
      .catch((getError) => {
        console.log(getError);
        return getError;
      });
  });

  router.get('/profile/catalog/*', (req, res) => {
    let idToGet = req.params[0];
    promise
      .findOne({
        where: {
          id: idToGet
        }
      })
      .then((foundRecord) => {
        if (foundRecord) {
          res.status(200);
          res.json(foundRecord).end();
        } else {
          res.status(404);
          res.json({operation: 'GET', status: 'fail',reason: 'can not found record with given id'}).end();
        }
      })
      .catch((getError) => {
        console.log(getError);
        res.status(500);
        res.json({operation: 'GET', status: 'fail',reason: 'internal DB error'}).end();
      });
  });

  router.post('/profile/catalog/*', (req, res) => {
    let idToPost = req.params[0];
    let contentToPost = req.body;
    promise
      .findOne({
        where: {
          id: idToPost
        }
      })
      .then((content) => {
        console.log(content);
        if (!content) {
          promise
          .create(contentToPost);
          res.status(200);
          res.json({operation: 'POST', status: 'success'}).end();
        } else {
          res.status(401);
          res.json({operation: 'POST', status: 'fail',reason: 'existing ID'}).end();
        }
      })
      .catch((postError) => {
        console.log(postError);
        return postError;
      });
  });


  router.put('/profile/catalog/*', (req, res) => {
    let recordToPut = req.body;
    let idToPut = req.params[0];
    promise
      .update({
        productTitle:       recordToPut.productTitle,
        productPrice:       recordToPut.productPrice,
        productDescription: recordToPut.productDescription
      }, {
        where: {
          id: idToPut
        }
      })
      .then( (rowsAffected) => {
        if (0 === rowsAffected[0]) {
          res.status(404);
          res.json({operation: 'PUT', status: 'fail', reason: 'id not found'}).end();
        }
        res.status(200);
        res.json({operation: 'PUT', status: 'success'}).end();
      })
      .catch( (updateError) => {
        console.log(updateError);
        res.json({operation: 'PUT', status: 'fail', reason: 'incorect format of input'}).end();
        return updateError;
      });
  });

  router.delete('/profile/catalog/*', (req, res) => {
    let idToDelete = req.params[0];
    promise
      .destroy({
        where: {
          id: idToDelete
        }
      })
      .then((rowsAffected) => {
        if (0 === rowsAffected) {
          res.status(406);
          res.json({operation: 'DELETE', status: 'fail'}).end();
        }
        res.status(200);
        res.json({operation: 'DELETE', status: 'success'}).end();
      })
      .catch( (deleteError) => {
        console.log(deleteError);
      });
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash:    false
  }));

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash:    false
  }));

};
