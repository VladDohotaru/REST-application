'use strict';

module.exports = function isAdmin ( req, res, next) {
  if ('admin' === req.user.group) {
    next();
  } else {
    res.redirect('/user_profile');
  }
};
