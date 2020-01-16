const orderDao = require('../models/dao/orderDao');
const Order = require('../models/order');
const Cart = require('../models/cart');
const mongoose = require('mongoose');
const db = require('../models/index')
const Pagination = require('../class/Pagination')

exports.order_list= async function(req,res)
{
    const name = req.user.info.name;
    //const order = await orderDao.get_Order();

    const url = '/orders/list/';

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;
    const limit = 5;

    const pagination = (new Pagination({page, limit, count, numPageLink})).get()
    const orders = await db.Order.find().limit(limit).skip(pagination.offset).sort({created:-1});
    const count = await db.Order.count();



    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn',
        orders: orders,
        nameAdmin: name,
        ...pagination,
        url: url
       });
};

exports.order_update_get= async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);
    const name = req.user.info.name;

    res.render('orders/update', { pageTitle: 'Cập nhật đơn hàng',
        order: orderInfo,
        isCreditCard: orderInfo.payment === 'Credit card',
        isShipCod: orderInfo.payment === 'Ship COD',
        isShipping: orderInfo.status === 'Đang giao',
        isShipped: orderInfo.status === 'Đã giao',
        isNotShip: orderInfo.status === 'Chưa giao',
        nameAdmin: name
    });

};

exports.order_update_post = async function(req, res){
  const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

  if(orderInfo == null)
      res.status(404).send();

  orderInfo.cart.totalPrice = req.body.totalPrice;
  orderInfo.status = req.body.status;
  orderInfo.payment = req.body.payment;

  orderInfo.save(err => {
     if(err) throw err;
     res.redirect('../list');
  });
};

exports.order_delete = async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

    if(orderInfo == null)
        res.status(404).send();

    orderInfo.isDeleted = true;

    orderInfo.save(err => {
        if(err) throw err;
        res.redirect('../list');
    });
};

exports.order_getCustomerInfo = async (req,res) =>{
    const customerInfo = await orderDao.get_CustomerInfo_By_ID(req.params.id);
    res.json(customerInfo);
};

exports.order_getReceiverInfo = async (req,res) =>{
    const receiverInfo = await orderDao.get_ReceiverInfo_By_ID(req.params.id);
    res.json(receiverInfo);
};

exports.order_getCartInfo = async (req,res) => {
    const cartInfo = await orderDao.get_Cart_By_ID(req.params.id);
    res.json(cartInfo);
};