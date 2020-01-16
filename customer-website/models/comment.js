const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerName:String,
    email:String,
    product: mongoose.Schema.Types.ObjectId,
    detail: String,
    
    isDeleted: Boolean
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;