var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const multer = require('multer');

var categoryController=require('../controllers/categoryController');
var usersController=require('../controllers/usersController');
var item_controller=require('../controllers/itemsController');
var ordersController=require('../controllers/ordersController');
var reportController=require('../controllers/reportsController');
var manufacturerController=require('../controllers/manufacturerController');
var adminController=require('../controllers/adminController');


router.get('/report/items',ensureAuthenticated,reportController.report_item);

router.get('/report/profit',ensureAuthenticated,reportController.report_profit);

//Order
router.get('/orders/list',ensureAuthenticated,ordersController.order_list);
router.get('/orders/list/customerInfo/:id',ensureAuthenticated, ordersController.order_getCustomerInfo);
router.get('/orders/list/receiverInfo/:id',ensureAuthenticated, ordersController.order_getReceiverInfo);
router.get('/orders/list/cartInfo/:id',ensureAuthenticated, ordersController.order_getCartInfo);
router.get('/orders/update/:id',ensureAuthenticated, ordersController.order_update_get);
router.post('/orders/update/:id',ensureAuthenticated, ordersController.order_update_post);
router.get('/orders/delete/:id',ensureAuthenticated, ordersController.order_delete);

//Product
router.get('/items/list',ensureAuthenticated,item_controller.item_list);
router.get('/items/add',ensureAuthenticated,item_controller.item_add_get);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, ' ./../../customer-website/public/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage : storage,
    fileFilter: fileFilter
});/*.fields([
    {name: 'img1'},
    {name: 'img2'},
    {name: 'img3'},
]);*/

router.post('/items/add',upload.array('img',3),ensureAuthenticated,item_controller.item_add_post);
router.get('/items/update/:id',ensureAuthenticated,item_controller.item_update_get);
router.post('/items/update/:id',upload.array('img',3),ensureAuthenticated,item_controller.item_update_post);
router.get('/items/delete/:id',ensureAuthenticated,item_controller.item_delete);
router.post('/items/list/block/:id', ensureAuthenticated, item_controller.item_change_block);

//Customer
router.get('/users/list',ensureAuthenticated,usersController.user_list);
router.get('/users/add',ensureAuthenticated,usersController.user_add_get);
router.post('/users/add',ensureAuthenticated,usersController.user_add_post);
router.get('/users/update/:id',ensureAuthenticated,usersController.user_update_get);
router.post('/users/update/:id',ensureAuthenticated,usersController.user_update_post);
router.get('/users/delete/:id',ensureAuthenticated,usersController.user_delete);
router.post('/users/list/block/:id', ensureAuthenticated, usersController.user_change_block);

//Category
router.get('/category/list',ensureAuthenticated,categoryController.category_list);
router.get('/category/add',ensureAuthenticated,categoryController.category_add_get);
router.get('/category/:id',ensureAuthenticated,categoryController.category_edit);
router.post('/category/add',ensureAuthenticated,categoryController.category_add_post);
router.get('/category/delete/:id',ensureAuthenticated,categoryController.category_delete);
router.post('/category/:id',ensureAuthenticated,categoryController.category_edit_post);

//Manufacturer
router.get('/manufacturer/list',ensureAuthenticated,manufacturerController.manufacturer_list);
router.get('/manufacturer/add',ensureAuthenticated,manufacturerController.manufacturer_add_get);
router.get('/manufacturer/:id',ensureAuthenticated,manufacturerController.manufacturer_edit);
router.post('/manufacturer/add',ensureAuthenticated,manufacturerController.manufacturer_add_post);
router.get('/manufacturer/delete/:id',ensureAuthenticated,manufacturerController.manufacturer_delete);
router.post('/manufacturer/:id',ensureAuthenticated,manufacturerController.manufacturer_edit_post);

//Admin
router.get('/admin/login',adminController.admin_login_get);
router.get('/admin/register',adminController.admin_register_get);
router.post('/admin/register',adminController.admin_register_post);
router.post('/admin/login',adminController.admin_login_post);
router.get('/admin/logout', adminController.admin_logout);
router.get('/admin/list',ensureAuthenticated,adminController.admin_list);
router.get('/admin/info', ensureAuthenticated, adminController.admin_info);
router.get('/admin/update/:id', ensureAuthenticated, adminController.admin_update_get);
router.post('/admin/update/:id', ensureAuthenticated, adminController.admin_update_post);
router.get('/admin/delete/:id', ensureAuthenticated, adminController.admin_delete);
router.post('/admin/register/check-email-available', adminController.admin_check_email_available);
module.exports = router;
