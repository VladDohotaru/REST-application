'use strict';
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

  app.get('/profile', (req, res) => {
    res.render('profile.ejs', {
    });
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
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook', passport.authenticate('facebook-login', {scope: 'email'}));

  app.get('/auth/facebook/callback', passport.authenticate('facebook-login', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));
};
