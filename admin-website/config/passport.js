const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const Admin = require('../models/admin');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
      // Match user
      Admin.findOne({
        email: email
      }).then(admin => {
        if (!admin) {
          return done(null, false, { message: 'Email này chưa được đăng ký' });
        }
        // Match password
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, { message: 'Mật khẩu không chính xác' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });
};