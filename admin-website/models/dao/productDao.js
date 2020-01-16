
const Product = require('../product');
const Category = require('../category');
const Manufacturer = require('../manufacturer');
const Customer = require('../customer');
const Admin = require('../admin');

//Get product list
exports.get_Product_List = function(req, res, next){

    /*let product = Manufacturer.find({_id: id, isDeleted: false}).then(manufacturerObject => {
       return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
    });
    return product;*/

    var mysort={name:1};
    return Product.find({isDeleted: false})
        .populate('category manufacturer').sort(mysort);
};

//Get product list by manufacturer id
exports.get_Product_By_Manufacturer = async id =>{

    /*let product = Manufacturer.find({_id: id, isDeleted: false}).then(manufacturerObject => {
       return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
    });
    return product;*/

    const manufacturerObject = await Manufacturer.find({_id: id, isDeleted: false});

    return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
};

//Get product list by category id
exports.get_Product_By_Category = async id =>{

    /*let product = Category.find({_id: id, isDeleted: false}).then(categoryObject => {
        return Product.find({category: categoryObject, isDeleted: false}, '_id name img price');
    });
    return product;*/

    const categoryObject = await Category.find({_id: id, isDeleted: false});

    return Product.find({category: categoryObject, isDeleted: false}, '_id name img price');
};


//Get top 3 most sold product list
exports.get_Most_Sold = () => {
    return Product.find({isDeleted: false}, '_id name img price').sort({sale: -1}).limit(3);
};

//Get top 3 most viewed product list
exports.get_Most_Viewed = () => {
    return Product.find({isDeleted: false}, '_id name img price').sort({viewed: -1}).limit(3);
};

//Get top 10 most sold product list
exports.get_Top_10_Sold = () => {
  return Product.find({isDeleted: false}).populate('category manufacturer').sort({sale: -1}).limit(10);
};

function getRandom(min, max){
  return Math.ceil(Math.random() * (max-min) + min);
};

//Slider
exports.get_Random_Product = async () =>{
    /*let product = Product.countDocuments().then(count => {
            const skipRecord = getRandom(count - 7, count - 2);
            return Product.find({isDeleted: false}, '_id name price img').skip(skipRecord);
        });
    return product;*/

    const count = await Product.countDocuments();
    const skipRecord = await getRandom(count - 7, count - 2);

    return  Product.find({isDeleted: false}, '_id name price img').skip(skipRecord);
};

//get 7 Latest Product
exports.get_LatestProduct = () => {
    return Product.find({isDeleted: false}, '_id name img price').sort({releaseDate: -1}).limit(7);
};

//Get manufacturer
exports.get_Manufacturer = () =>{
    return Manufacturer.find({isDeleted: false}, '_id name img');
};

//Get category
exports.get_Category = () => {
  return Category.find({isDeleted: false}, '_id name');
};

//Get Product by id
exports.get_Product_By_Id = id => {
   return Product.findOne({_id: id, isDeleted: false})
       .populate('category').populate('manufacturer');
};

//Get related product
exports.get_Related_Products =  manufacturerObject =>{
  return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
};




