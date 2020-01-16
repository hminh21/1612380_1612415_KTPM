var express = require('express');
var router = express.Router();
const productDao = require('../models/dao/productDao');

/* GET users listing. */
router.get('/about', async function(req, res, next) {

    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    res.render('home/about', {
        pageTitle: 'Liên hệ',
        curCustomer: req.user,
        manufacturerList: await manufacturer,
        categoryList: await category
    });
});

module.exports = router;
