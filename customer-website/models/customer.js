const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const randomstring= require('randomstring');

const customerSchema = new Schema({
    username: String,
    password: String,
    email: String,
    resetPasswordToken:{type:String,default : randomstring.generate(17)},
    resetPasswordExpires:{type: Date, default: Date.now()},
    secretToken: {type:String,default : randomstring.generate(6)},
    isActive: {type: Boolean, default: false},
    info: {
        name: String,
        address: String,
        sdt: String
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

