const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Admin = require('../models/admin');
const adminDao = require('../models/dao/adminDao');

exports.admin_login_get= function(req,res)
{
    res.render('admin/login',{pageTitle:"Đăng nhập"});
};

exports.admin_register_get= function(req,res)
{
    res.render('admin/register',{pageTitle:"Đăng kí"});
};

exports.admin_register_post= function(req,res)
{
    const { name, email, password, password2, phone, address, position } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2 || !phone || !address || !position) {
      errors.push({ msg: 'Xin hãy điền hết thông tin' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Mật khẩu không khớp' });
    }
  
    if (password.length > 6) {
      errors.push({ msg: 'Mật khẩu phải ít hơn 6 kí tự' });
    }
  
    if (errors.length > 0) {
      res.render('admin/register', {
        errors
      });
    } else {
      Admin.findOne({ email: email }).then(admin => {
        if (admin) {
          errors.push({ msg: 'Email này đã tồn tại' });
          res.render('admin/register', {
            errors
          });
        } else {
          const newAdmin = new Admin({
              email: email,
              password,
              info:{
                  name: name,
                  address: address,
                  sdt: phone,
                  position: position
              }
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin
                .save()
                .then(admin => {
                  req.flash(
                    'success_msg',
                    'Bạn đã đăng ký thành công và có thể đăng nhập lúc này'
                  );
                  res.redirect('/admin/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
};

exports.admin_check_email_available = async (req, res) =>{

    let check = {isAvailable: false};
    const foundEmail = await Admin.findOne({email: req.body.email});

    if(foundEmail)
    {
       check.isAvailable = true;
    }
    res.json(check);

};

exports.admin_login_post=function(req,res,next)
{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true})(req, res, next);
};

exports.admin_logout=function(req,res,next)
{
    req.logout();
    req.flash('success_msg', 'Bạn đã đăng xuất thành công');
    res.redirect('/admin/login');
};

exports.admin_list = async (req,res) =>
{
    const admins = await adminDao.get_Admin_List();
    const name = req.user.info.name;
    //console.log(req.user.info.position === 'Quản lý');
    res.render('admin/list', {
        pageTitle: 'Danh sách admin',
        adminList: admins,
        nameAdmin: name,
        isManager: req.user.info.position === 'Quản lý',
    });
};

exports.admin_info = async (req, res) => {
    const admin = req.user;
    res.render('admin/info',{
        pageTitle: 'Thông tin cá nhân',
        admin: admin,
        nameAdmin: admin.info.name
    });
};

exports.admin_update_get = async (req, res) => {
    const name= req.user.info.name;
    const admin = await adminDao.get_Admin_By_ID(req.params.id);

    res.render('admin/update',{ pageTitle: 'Cập nhật admin',
        admin: admin,
        nameAdmin: name,
        isManager: admin.info.position === 'Quản lý'
    })
};

exports.admin_update_post = async function(req, res){
    const adminInfo = await adminDao.get_Admin_By_ID(req.params.id);
    let errMsg = [];

    if(adminInfo == null)
        res.status(404).send();

    const foundEmail = await Admin.findOne({email: req.body.email});

    if(foundEmail && foundEmail._id.toString() != adminInfo._id.toString())
    {
        errMsg.push({msg: 'Email này đã có người sử dụng'});
    }

    if(req.body.phone.length != 10)
    {
        errMsg.push(({msg:'Số điện thoại phải đủ 10 số'}));
    }

    if(errMsg.length > 0)
    {
        const name= req.user.info.name;
        const admin = await adminDao.get_Admin_By_ID(req.params.id);
        res.render('admin/update',{
            admin: admin,
            nameAdmin: name,
            isManager: admin.info.position === 'Quản lý',
            errors: errMsg
        });
        return;
    }

    adminInfo.email = req.body.email;
    adminInfo.info.name = req.body.name;
    adminInfo.info.address = req.body.address;
    adminInfo.info.sdt = req.body.phone;
    adminInfo.info.position = req.body.position;

    adminInfo.save(err => {
        if(err) throw err;
        res.redirect('../list');
    });
};

exports.admin_delete = async function(req, res){
    const adminInfo = await adminDao.get_Admin_By_ID(req.params.id);

    if(adminInfo != null)
    {
        req.flash('error_msg','Bạn không thể xóa tài khoản của mình');
        res.redirect('../list');
        return;
    }

    Admin.findByIdAndRemove(req.params.id,function (err) {
        if(err){return next(err);}
        res.redirect("../list");
    })
};
