const Admin = require('../admin');

exports.get_Admin_List = () =>{
    return Admin.find();
};

exports.get_Admin_By_ID = id =>{
  return Admin.findOne({_id: id});
};