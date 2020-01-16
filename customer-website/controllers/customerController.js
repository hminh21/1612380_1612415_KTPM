const Customer = require('../models/customer');
const customerDao = require('../models/dao/customerDao');
const productDao = require('../models/dao/productDao');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
const Cart = require('../models/cart');
const Order = require('../models/order');
var mongoose = require('mongoose');
var async = require('async');
const passport = require('passport');
const randomstring= require('randomstring');
const sendMail=require('../misc/mailer');
const Product = require('../models/product');


exports.forgotPassword_index = function(req, res){
    res.render('customer/forgotPassword', { pageTitle: 'Phục hồi mật khẩu' 
});
};

exports.customer_orders = async function(req, res) {
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    const orders = await Order.find({customer: req.user}).sort({created: -1});
    if(orders){
        res.render('customer/orders', {
            pageTitle: 'Các đơn hàng',
            manufacturerList: await manufacturer,
            categoryList: await category,
            curCustomer: req.user,
            orders: orders
        });
    }
    else
    {
        res.render('customer/orders', {
            pageTitle: 'Các đơn hàng',
            manufacturerList: manufacturer,
            categoryList: category,
            curCustomer: req.user,
        });
    }
};

exports.order_getCartInfo = async function(req,res){
    const orderInfo = await Order.findById(req.params.id,'cart');
    //console.log(orderInfo);
    res.json(orderInfo);
};

exports.order_getReceiverInfo = async function(req,res){
    const receiverInfo = await Order.findById(req.params.id,'name address email sdt');
    res.json(receiverInfo);
};

exports.checkout_get = async function(req, res){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    else{
        const manufacturer = productDao.get_Manufacturer();
        const category = productDao.get_Category();
        //const cart = new Cart(req.session.cart);
        var errMsg = req.flash('error')[0];
        res.render('customer/checkoutWithCreditCard', {
            pageTitle: 'Thanh toán',
            manufacturerList: await manufacturer,
            categoryList: await category,
            curCustomer: req.user,
            //cartProducts: cart.generateArray(),
            //cartTotalPrice: req.session.cart.totalPrice,
            errMsg: errMsg,
            noError: !errMsg
        });
    }
};

exports.checkout_post = function(req, res){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    const cart = new Cart(req.session.cart);
    const stripe = require("stripe")("sk_test_TKy5X1aloFTTY5OBnagOvw7600dk5Ak6Tw");

    stripe.charges.create({
        amount: cart.totalPrice,
        currency: "vnd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: 'Thanh toán bởi '+ req.body.name + ' ' + req.body.email,
    }, function(err, charge) {
        // asynchronously called
        if(err){
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            _id: new mongoose.Types.ObjectId(),
            customer: req.user._id,
            cart: cart,
            payment:'Credit card',
            paymentStripeId: charge.id,
            created: new Date().toLocaleDateString(),
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            sdt: req.body.sdt,
            status: 'Chưa giao'
        });

        order.save(function(err,result){
            req.flash('success','Giao dịch thành công !! Cám ơn bạn :D !!');
            req.session.cart = null;
            res.redirect('/thankyou');
        });

        //add sale to product
        const productsInOrder = cart.items;
        productsInOrder.forEach(  async function(product){
            await Product.findByIdAndUpdate(product._id,{$inc: {sale: 1}});
        });
    });
};

exports.checkoutCOD_get = async function(req,res,){
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    res.render('customer/checkoutCOD',{
        pageTitle: 'Thanh toán COD',
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user
    })
};

exports.checkoutCOD_post = function(req,res,){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    const cart = new Cart(req.session.cart);
    var order = new Order({
        _id: new mongoose.Types.ObjectId(),
        customer: req.user._id,
        cart: cart,
        payment:'Ship COD',
        created: new Date().toLocaleDateString(),
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        sdt: req.body.sdt,
        status: 'Chưa giao'
    });

    order.save(function(error){
        if(error) throw error;
        req.flash('success','Giao dịch thành công !! Cám ơn bạn :D!!');
        req.session.cart = null;
        res.redirect('/thankyou');
    });

    const productsInOrder = cart.items;
    productsInOrder.forEach(  async function(product){
        await Product.findByIdAndUpdate(product._id,{$inc: {sale: 1}});
    });
};

exports.thank_you = async function(req,res){
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    var successMsg = req.flash('success')[0];
    res.render('customer/thankyou', {
        pageTitle: 'Cám ơn bạn',
        successMsg: successMsg,
        manufacturerList: await manufacturer,
        categoryList: await category,
    })
};

exports.customer_register_get =  function(req, res){
    const text = "Bạn hãy điền thông tin của mình, lưu ý nhập email phải thật chính xác vì bạn còn phải xác thực bằng email đó.";
    res.render('customer/register', {
        pageTitle: 'Đăng ký',
        text:text
    });
};

exports.customer_check_email = async (req, res)=>{
    let check = {isAvailable: false};
    const foundEmail = await Customer.findOne({email: req.body.email});

    if(foundEmail)
    {
        check.isAvailable = true;
    }
    res.json(check);
};

exports.customer_check_username = async (req,res)=>{
    let check = {isAvailable: false};
    const foundUsername = await Customer.findOne({username: req.body.username});
    if(foundUsername)
    {
        check.isAvailable = true;
    }
    res.json(check);
};

exports.customer_register_post = async function(req, res){
    if(await Customer.findOne({email: req.body.email}))
    {
        //const text='Nếu tài khoản của bạn sử dụng gmail, xin hãy vào trang web sau đây để mở quyền truy cập để chúng tôi có thể gửi mail cho bạn: https://myaccount.google.com/u/1/lesssecureapps?pageId=none'
        res.render('customer/register', {
            pageTitle: 'Đăng ký',
            //text:text,
            errorMsg: 'Email này đã được dùng'
        });
    }
    await mongoose.connect(mongoDB, function (error) {
        if (error)
            throw error;
        let customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            info: {
                name: req.body.name,
                address: req.body.address,
                sdt: req.body.sdt
            }
        });
        const secretToken=randomstring.generate(6);
        customer.secretToken=secretToken;
        customer.isActive=false;


        customer.password = customer.generateHash(req.body.inputPassword);
        customer.save( function (error) {
            if (error) throw error;
            //Compose email       
            const html=`Chào bạn,
            Cám ơn vì đã tạo tài khoản.
            Tên đăng nhập của bạn là: ${customer.username}       
            Vui lòng xác thực email bằng cách nhập đoạn mã:  ${secretToken}
            Vào trang: https://website-customer.herokuapp.com/verify
            Chúc một ngày tốt lành.`;
            sendMail(customer.email,'Verify',html,function(err,data){
                if (err) throw err;
                req.flash(
                    'success_msg',
                    'Hãy kiểm tra email của bạn'
                );
                res.redirect('login');
            });
        });
    });
};


exports.customer_updateProfile_get = function(req, res) {
    res.render('customer/updateProfile', { pageTitle: 'Chỉnh sửa thông tin',curCustomer: req.user
});
};

exports.customer_updateProfile_post = function(req, res) {

    //customer.password=customer.generateHash(req.body.password);
    Customer.findByIdAndUpdate(req.session.passport.user,{
        info: {
            name: req.body.name,
            address: req.body.address,
            sdt: req.body.sdt
        }
    },{},function(err){
        if(err){return next(err);}
        res.redirect('/');
    })
};

exports.customer_verify_get=function (req,res){
    res.render('customer/verify');
};

exports.customer_verify_post= async function (req,res,next) {
    try{
        const {secretToken} =req.body;

     const customer= await Customer.findOne({'secretToken':secretToken.trim()});
    if(!customer) {
        req.flash('error','Không thấy người dùng');
        res.redirect('verify');
        return;
    }

    customer.isActive=true;
    customer.secretToken='';
    customer.save(function (error) {
        if (error) throw error;
        req.flash(
            'success_msg',
            'Cám ơn. Giờ bạn có thể đăng nhập'
        );
        res.redirect('login');
    })}
    catch(err)
    {
        next(err);
    }
};

exports.customer_resetPassword = async function(req, res) {
    try{
        const customer=await Customer.findOne({email:req.body.inputEmail});
        if(!customer) {
            req.flash('error','Không thấy người dùng');
            res.redirect('forgotPassword');
        }
        const resetToken=randomstring.generate(17);
        customer.resetPasswordToken=resetToken;
        customer.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        customer.save(function(err){
            if (err) throw err
            else{ const html=`Chào bạn,   
            Tên đăng nhập của bạn là: ${customer.username}       
            Vui lòng vào trang: http://website-customer.herokuapp.com/resetPassword/${resetToken} để cài đặt lại password mới
            Chúc một ngày tốt lành.`
            sendMail(customer.email,'Reset mật khẩu',html,function(err,data){
                if (err) throw err;
                req.flash(
                    'success_msg',
                    'Yêu cầu đặt lại mật khẩu đã gửi tới email của bạn.'
                );
                res.redirect('login');}
            )}}   )     
        }
    catch(err)
    {
        throw err
    }

};

exports.customer_reset_get=function(req,res)
{
    try{
        Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              req.flash('error', 'Mã reset không tồn tại hoặc đã hết hạn');
              return res.redirect('../forgotPassword');
            }
            res.render('customer/resetPassword', {
            });
          });
    }
    catch(err)
    {
        next(err);
    }}

exports.customer_reset_post= async function(req,res)
{
          Customer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },async function(err, customer) {
            if (!customer) {
              return res.redirect('forgotPassword');
            }
            customer.password = customer.generateHash(req.body.password);
            customer.resetPasswordToken = undefined;
            customer.resetPasswordExpires = undefined;
    
            await customer.save();
            req.flash(
                'success_msg',
                'Mật khẩu của bạn đã được đặt lại'
            );
            res.redirect('/')
             }
          
            )
}

exports.changepassword_get=function(req,res)
{
    res.render('customer/changePassword',{pageTitle:'Thay đổi mật khẩu'});
}

exports.changepassword_post=async function(req,res)
{
    const customer= await Customer.findById(req.user._id);
    const oldPass=req.body.oldPassword;
    const newPass=req.body.newPassword;
    if (!customer.validPassword(oldPass)){
        req.flash(
            'error',
            'Mật khẩu cũ không đúng'
        );
        return res.redirect('changePassword');
    }
    else{
       customer.password = customer.generateHash(newPass);
        await customer.save();
        req.flash(
            'success_msg',
            'Mật khẩu của bạn đã đổi thành công'
        );
        res.redirect('/')
    }

};
