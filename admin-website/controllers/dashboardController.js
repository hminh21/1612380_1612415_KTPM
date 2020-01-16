const Product=require('../models/product')
const Order=require('../models/order')
const Customer=require('../models/customer')
const Admin=require('../models/admin')
const productDao=require('../models/dao/productDao')
const async = require('async');
 
exports.homepage=async function(req, res)
 {
    const name = req.user.info.name;
    const productCount= await Product.count();
    const orderCount= await Order.count();
    const customerCount=await Customer.count()
    const adminCount=await Admin.count();

    let productList = await productDao.get_Top_10_Sold();
    
    productList.forEach(product => {
       product.price = product.price * product.sale;
    });
    const currentDate = new Date();
    const dateTime = "Last updated at " + currentDate.getHours() + ":"
                                        + currentDate.getMinutes() + " "
                                        + currentDate.getDate() + "/"
                                        + (currentDate.getMonth() + 1) + "/"
                                        + currentDate.getFullYear();

    res.render('dashboard', {
        pageTitle:"Dashboard",
        admin: req.admin,
        nameAdmin: name,
        productCount:productCount,
        orderCount:orderCount,
        customerCount:customerCount,
        adminCount:adminCount,
        productList:productList,
        dateTime:dateTime
    })
};