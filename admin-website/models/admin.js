const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    email: String,
    password: String,
    info:{
        name: String,
        address: String,
        sdt: String,
        position: {type: String, enum: ['Quản lý', 'Nhân viên']}
    }
});

//hash the password
adminSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//checking if password is valid
adminSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password,this.password);
};

const Admin =  mongoose.model('Admin', adminSchema);

module.exports = Admin;

