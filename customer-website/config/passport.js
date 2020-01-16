const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const passport = require('passport');

//LOCAL STRATEGY

passport.serializeUser(function(customer, done){
    done(null, customer.id);
});

passport.deserializeUser(function(id, done){
    Customer.findById(id, function(err, customer) {
        done(err, customer);
    });
});

passport.use('local.signin',new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
},async (req,username,password,done) => {

    const customer = await Customer.findOne({username:username});

        if(!customer){
            req.flash('error','Tài khoản chưa được đăng ký.');
            return done(null,false,{message:'Tài khoản chưa được đăng ký.'});
        }
        if(!customer.validPassword(password)){
            req.flash('error','Sai mật khẩu !!');
            return done(null,false,{message:'Sai mật khẩu'});
        }
        if(customer.isBlocked)
        {
            req.flash('error', 'Tài khoản của bạn đã bị Administrator khóa');
            return done(null, false, {message: 'Tài khoản của bạn đã bị Administrator khóa'});
        }
        return done(null,customer);
}));

