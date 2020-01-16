const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const customerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    info: {
        name: String,
        address: String,
        sdt: String,
    },
    isBlocked: {type: Boolean, default: false}
});

//hash the password
customerSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
customerSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password,this.password);
};

const Customer =  mongoose.model('Customer', customerSchema);

module.exports = Customer;

