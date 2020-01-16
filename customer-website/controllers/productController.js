const Product = require('../models/product');
const Manufacturer = require('../models/manufacturer');
const Category = require('../models/category');
const productDao = require('../models/dao/productDao');
const Comment = require('../models/comment');
const Cart = require('../models/cart');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var mongoose = require('mongoose');
var async = require('async');

exports.product_viewProductList_dec = async function(req, res) {
    //const list = productDao.get_PriceDec_Product_List();
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    const url = '/productList';

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false}).limit(limit).skip(offset).sort({price: -1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        count:count,
        url: url
    });
};

exports.product_viewProductList_asc = async function(req, res) {
    //const list = productDao.get_PriceAsc_Product_List();
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    const url = '/productList/asc';

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false}).limit(limit).skip(offset).sort({price: 1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;


    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        count:count,
        url: url
    });
};

exports.product_viewByManufacturer_dec = async function(req, res) {
    const manufacturerObj = Manufacturer.findById(req.params.id);
    //const list = productDao.get_PriceDec_Product_By_Manufacturer(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();


    const url = '/manufacturer/'+req.params.id;

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const pageStart = page;

    const limit = 3;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false, manufacturer: req.params.id}).limit(limit).skip(offset).sort({price: -1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false, manufacturer: req.params.id});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm' ,
        manufacturerObj: await manufacturerObj,
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,       
         count:count,
        url: url
    });
};

exports.product_viewByCategory_dec = async function(req, res) {
    const categoryObj = Category.findById(req.params.id);
    //const list = productDao.get_PriceDec_Product_By_Category(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();


    const url = '/category/'+req.params.id;

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false, category: req.params.id}).limit(limit).skip(offset).sort({price: -1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false, category: req.params.id});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        categoryObj: await categoryObj,
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        count:count,
        url: url
    });
};

exports.product_viewByManufacturer_asc = async function(req, res) {
    const manufacturerObj = Manufacturer.findById(req.params.id);
    //const list = productDao.get_PriceAsc_Product_By_Manufacturer(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    const url = '/manufacturer/asc/'+req.params.id;

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false, manufacturer: req.params.id}).limit(limit).skip(offset).sort({price: 1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false, manufacturer: req.params.id});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm' ,
        manufacturerObj: await manufacturerObj,
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        count:count,
        url: url
    });
};

exports.product_viewByCategory_asc = async function(req, res) {
    const categoryObj = Category.findById(req.params.id);
    //const list = productDao.get_PriceAsc_Product_By_Category(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    const url = '/category/asc/'+req.params.id;

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const products = Product.find({isDeleted: false, category: req.params.id}).limit(limit).skip(offset).sort({price: 1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Product.count({isDeleted: false, category: req.params.id});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        categoryObj: await categoryObj,
        productList: await products,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        count:count,
        url: url
    });
};

exports.product_search = async (req, res) => {
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    let productList;
    let pathSearch1='';


    //null
    if(!req.query.name && !req.query.price && !req.query.category && !req.query.manufacturer)
    {
        res.redirect('/');
    }
    //name
    else if(req.query.name && !req.query.price && !req.query.category && !req.query.manufacturer)
    {
        productList = await productDao.search_name(req.query.name);
       // pathSearch1=req.query.name;
    }
    //price
    else if(!req.query.name && req.query.price && !req.query.category && !req.query.manufacturer)
    {
        productList = await productDao.search_price(req.query.price);
       // pathSearch1+=req.query.price;
    }
    //category
    else if(!req.query.name && !req.query.price && req.query.category && !req.query.manufacturer)
    {
        productList = await productDao.get_PriceAsc_Product_By_Category(req.query.category);
        //pathSearch+=req.query.category;
    }
    //manufacturer
    else if(!req.query.name && !req.query.price && !req.query.category && req.query.manufacturer)
    {
        productList = await productDao.get_PriceAsc_Product_By_Manufacturer(req.query.manufacturer);
       // pathSearch+=req.query.manufacturer;
    }

    //name and price
    else if(req.query.name && req.query.price && !req.query.category && !req.query.manufacturer)
    {
        productList = await productDao.search_name_price(req.query.name, req.query.price);
    }
    //name and category
    else if(req.query.name && !req.query.price && req.query.category && !req.query.manufacturer)
        productList = await productDao.search_name_category(req.query.name, req.query.category);
    //name and manufacturer
    else if(req.query.name && !req.query.price && !req.query.category && req.query.manufacturer)
        productList = await productDao.search_name_manufacturer(req.query.name, req.query.manufacturer);
    //price and category
    else if(!req.query.name && req.query.price && req.query.category && !req.query.manufacturer)
        productList = await productDao.search_price_category(req.query.price, req.query.category);
    //price and manufacturer
    else if(!req.query.name && req.query.price && !req.query.category && req.query.manufacturer)
        productList = await productDao.search_price_manufacturer(req.query.price, req.query.manufacturer);
    //category and manufacturer
    else if(!req.query.name && !req.query.price && req.query.category && req.query.manufacturer)
        productList = await productDao.search_category_manufacturer(req.query.category, req.query.manufacturer);
    //name and price and category
    else if(req.query.name && req.query.price && req.query.category && !req.query.manufacturer)
        productList = await productDao.search_name_price_category(req.query.name, req.query.price, req.query.category);
    //name and price and manufacturer
    else if(req.query.name && req.query.price && !req.query.category && req.query.manufacturer)
        productList = await productDao.search_name_price_manufacturer(req.query.name, req.query.price, req.query.manufacturer);
    //name and category and manufacturer
    else if(req.query.name && !req.query.price && req.query.category && req.query.manufacturer)
        productList = await productDao.search_name_category_manufacturer(req.query.name, req.query.category, req.query.manufacturer);
    //price and category and manufacturer
    else if(!req.query.name && req.query.price && req.query.category && req.query.manufacturer)
        productList = await productDao.search_price_category_manufacturer(req.query.price, req.query.category, req.query.manufacturer);
    //name and price and category and manufacturer
    else
        productList = await productDao.search_name_price_category_manufacturer(req.query.name, req.query.price, req.query.category, req.query.manufacturer);


    res.render('product/result-search', {
        pageTitle: 'Kết quả tìm kiếm',
        manufacturerList: await manufacturer,
        categoryList: await category,
        productList: await  productList,
        count: productList.length,
        curCustomer: req.user
    });
};

exports.product_cart = async function(req, res){
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();


    if(!req.session.cart){
        res.render('product/cart', {
            pageTitle: 'Giỏ hàng',
            manufacturerList: await manufacturer,
            categoryList: await category,
            curCustomer: req.user
    });
    }
    else{
        const cartCreate = new Cart(req.session.cart);
        res.render('product/cart', {
            pageTitle: 'Giỏ hàng',
            manufacturerList: await manufacturer,
            categoryList: await category,
            curCustomer: req.user,
            /*cartProducts: await cart.generateArray(),
            cartTotalPrice: req.session.cart.totalPrice*/
            cart: cartCreate
        });
    }
};

exports.product_addToCart = async function(req, res) {
    const productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {items:[]});

    await Product.findById(productId,async function(err,product){
        product.size = req.body.size;
        if(err) { return res.redirect('/');}//xử lý tạm, đúng là là nên có thông báo
        await cart.add(product);
        req.session.cart = await cart;
        res.redirect('../../cart');
    })
};

exports.product_removeFromCart = async function(req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items:{}});
    var productRemoved = await Product.findById(productId);


    productRemoved.size = req.body.removeSize;

    await cart.remove(productRemoved);
    req.session.cart = cart;
    res.redirect('/cart');
};

exports.product_viewProduct = async function(req, res)
{
    const productInfo = await productDao.get_Product_By_Id(req.params.id);
    const related =  productDao.get_Related_Products(productInfo.category);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    const url = '/single-product/'+req.params.id;

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const comments = Comment.find({product:productInfo._id}).limit(limit).skip(offset).sort({price: 1});

    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Comment.count({product:productInfo._id});

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;

 

    res.render('product/single-product', {
        pageTitle: productInfo.name,
        product: productInfo,
        relatedProduct: await related,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        comments:await comments,
        count:count,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
        url: url
    });
};

exports.product_comment_post=async function(req, res){
    await mongoose.connect(mongoDB, function (error) {
        if (error)
            throw error;
        let comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            customerName: req.body.name,
            email: req.body.email,
           detail:req.body.email,
           product:req.params.id,
           detail:req.body.review,
         });
        comment.save(function (error) {
            res.redirect('../single-product/'+req.params.id);
        });  
})
};

exports.product_incView = async function(req, res){
    await Product.findByIdAndUpdate(req.params.id,{$inc: {viewed:1}});
    res.redirect('../single-product/'+req.params.id);
};