const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Manufacturer = require('../models/manufacturer');
const productDao = require('../models/dao/productDao');


exports.manufacturer_list=async function(req,res)
{
    const name = req.user.info.name;
    const manufacturer = Manufacturer.find();
    res.render('manufacturer/list', { pageTitle: 'Danh sách nhà sản xuất',
        manufacturerList: await manufacturer,
        nameAdmin: name
});
};

exports.manufacturer_add_get=  function(req,res)
{
    const name = req.user.info.name;
    res.render('manufacturer/add', { pageTitle: 'Thêm nhà sản xuất',
    nameAdmin: name});

};

exports.manufacturer_add_post=  function(req,res)
{
    if (req.body._id == '')
        add(req,res);
    
};

function add(req,res){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
    
        console.log('Successfully connected');
    let mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isDeleted: 0,
        img: '/img/'+req.body.img
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
        res.redirect('list');
    });  
})}

exports.manufacturer_edit= function(req,res)
{
    const name = req.user.info.name;
     Manufacturer.findById(req.params.id,(err,doc)=> {
        if (!err)
        {
            res.render('manufacturer/add',{
                pageTitle:"Chỉnh sửa thông tin",
                manufacturer:  doc,
                nameAdmin: name
            });
        }
    });
};

exports.manufacturer_edit_post= function(req,res)
{
     Manufacturer.findByIdAndUpdate(req.body._id,req.body,(err)=> {
        if (!err)
        {
           res.redirect('list');
        }
    });
};
exports.manufacturer_delete=function(req,res)
{
    Manufacturer.findByIdAndRemove(req.params.id, function (err){
        if (!err)
        res.redirect('../list');
    })
};