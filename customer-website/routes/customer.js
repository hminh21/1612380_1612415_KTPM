const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const customerDao = require('../models/dao/customerDao');
//Require controller modules
const customerController = require('../controllers/customerController');
//GET register
router.get('/register',customerController.customer_register_get);

//POST register
router.post('/register',customerController.customer_register_post);
router.post('/register/check-username-available',customerController.customer_check_username);
router.post('/register/check-email-available', customerController.customer_check_email);

//VERIFY
router.post('/verify',customerController.customer_verify_post);
router.get('/verify',customerController.customer_verify_get);


//GET login page
router.get('/login',function(req,res,next){
    const errorMessages = res.locals.error[0];
    const successMsg = res.locals.success_msg[0];
    res.render('customer/login',{
        errorMessages: errorMessages,
        successMsg: successMsg});
});

//POST login
//router.post('/login', customerController.customer_login_post);
router.post('/login', passport.authenticate('local.signin',{
    failureRedirect: '../login',
    failureFlash:true,
}),function(req,res){
    if(req.session.oldUrl){
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else
    {
        res.redirect('/');
    }
});

//logout
router.get('/logout',function(req,res,next){
   req.logout();
   res.redirect('/');
});

//GET forgot password page
router.get('/forgotPassword', customerController.forgotPassword_index);

//GET order page
router.get('/orders',isLoggedIn, customerController.customer_orders);
router.get('/orders/list/cartInfo/:id',isLoggedIn, customerController.order_getCartInfo);
router.get('/orders/list/receiverInfo/:id',isLoggedIn, customerController.order_getReceiverInfo);

//GET credit cart checkout page
router.get('/checkout',isLoggedIn, customerController.checkout_get);

//POST credit card checkout page
router.post('/checkout',isLoggedIn, customerController.checkout_post);

//GET credit cart checkout page
router.get('/checkoutCOD',isLoggedIn, customerController.checkoutCOD_get);

//POST credit card checkout page
router.post('/checkoutCOD',isLoggedIn, customerController.checkoutCOD_post);

//GET thank you page
router.get('/thankyou',isLoggedIn, customerController.thank_you);

//GET update profile
router.get('/updateProfile',isLoggedIn, customerController.customer_updateProfile_get);

//POST update profile
router.post('/updateProfile',isLoggedIn, customerController.customer_updateProfile_post);

//POST reset password
router.post('/forgotPassword', customerController.customer_resetPassword);

//Reset

router.post('/resetPassword/:token',customerController.customer_reset_post);
router.get('/resetPassword/:token',customerController.customer_reset_get);

//GET credit cart checkout page
router.get('/changePassword',isLoggedIn, customerController.changepassword_get);

//POST credit card checkout page
router.post('/changePassword',isLoggedIn, customerController.changepassword_post);


module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Xin hãy đăng nhập !!');
    req.session.oldUrl = req.url;
    res.redirect('/login');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
