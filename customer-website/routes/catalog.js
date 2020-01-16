const express = require('express');
const Product = require('../models/product');
const router = express.Router() ;
const async = require('async');

//Require controller modules
const productController = require('../controllers/productController');

//GET poroduct list page
router.get('/productList', productController.product_viewProductList_dec);
router.get('/productList/asc', productController.product_viewProductList_asc);
//GET product list page by Manufacturer
router.get('/manufacturer/:id', productController.product_viewByManufacturer_dec);
router.get('/manufacturer/asc/:id', productController.product_viewByManufacturer_asc);
//GET product list page by Category
router.get('/category/:id', productController.product_viewByCategory_dec);
router.get('/category/asc/:id', productController.product_viewByCategory_asc);

//GET view product page
router.get('/single-product/:id',productController.product_viewProduct);
router.post('/incView/:id',productController.product_incView);
router.post('/single-product/:id',productController.product_comment_post);

//GET result-search page
router.get('/result-search', productController.product_search);

//GET cart page
router.get('/cart', productController.product_cart);

//GET add product to cart
router.post('/cart/add/:id', productController.product_addToCart);

//GET reduce product qty in cart
//router.get('/cart/reduce/:id', productController.product_reduceInCart);

//GET remove product from cart
router.post('/cart/remove/:id', productController.product_removeFromCart);


module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Xin hãy đăng nhập !!');
    res.redirect('/login');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}