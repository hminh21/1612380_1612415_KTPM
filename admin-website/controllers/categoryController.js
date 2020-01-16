const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
const Category = require('../models/category');
const productDao = require('../models/dao/productDao');


exports.category_list= async function(req,res)
{
    const category = Category.find();
    const name = req.user.info.name;
    res.render('category/list', { pageTitle: 'Danh sách loại giày',
        categoryList: await category,
        nameAdmin: name
});
};

exports.category_add_get=  function(req,res)
{
    const name = req.user.info.name;
    res.render('category/add', { pageTitle: 'Thêm loại giày',
    nameAdmin: name});
};

exports.category_add_post=  function(req,res)
{
    //console.log(req.body)
    if (req.body._id =='')
        add(req,res);
    
};

function add(req,res){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
    
        console.log('Successfully connected');
    let mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isDeleted: 0,
    });

    mvcCategory.save(function(error){
        if(error) throw error;
        res.redirect('list');
    });  
})}

function update(req,res)
{   mongoose.connect(mongoDB, function(error){
    if(error)
        throw error;

    console.log('Successfully connected');
    let mvcCategory =Category.findById(req.body._id);
    mvcCategory.name= req.body.name,
    mvcCategory.isDeleted= 0,


    mvcCategory.save(function(error){
    if(error) throw error;
    res.redirect('list');
});  
})}

exports.category_edit= async function(req,res)
{
    const name = req.user.info.name;
    const category=  Category.findById(req.params.id);
            res.render('category/add',{
                pageTitle:"Chỉnh sửa thông tin",
                category:  await category,
                nameAdmin: name
            });          
};

exports.category_edit_post= function(req,res)
{
    Category.findByIdAndUpdate(req.body._id,req.body,(err)=>{
        if (!err)
        res.redirect('list');
    }) 
};

exports.category_delete=function(req,res)
{
    Category.findByIdAndRemove(req.params.id, function (err){
        if (!err)
        res.redirect('../list');
    })

};