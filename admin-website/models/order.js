const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   customer: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Customer'
   },
    cart: {type: Object, required: true},
    payment: {type: String, enum:['Ship COD','Credit card']},
    paymentStripeId: String,
    created: Date,
    name: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true},
    sdt: {type: String, required: true},
    status: {type: String, enum:['Đã giao', 'Đang giao', 'Chưa giao']}
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;