//Require mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    img1: String,
    img2: String,
    img3: String,
    price: {type: Number, min: 0},
    status: {type: Boolean, default: true},
    info: String,
    isDeleted: Boolean,
    releaseDate: {type: Date},
    viewed: {type: Number, default: 0},
    sale: {type: Number, default: 0},
    size: {type: Number, default: 0}//36 -> 44
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
