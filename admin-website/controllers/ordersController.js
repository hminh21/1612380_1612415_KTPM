const orderDao = require('../models/dao/orderDao');
const Order = require('../models/order');
const Cart = require('../models/cart');
const mongoose = require('mongoose');
exports.order_list= async function(req,res)
{
    const name = req.user.info.name;
    //const order = await orderDao.get_Order();

    const url = '/orders/list/';

    let page = req.query.page || 1;
    page=parseInt(page);
    const numPageLink = 2;

    const pageStart = page;
    const prev=page-1 >0?page-1:1;
    const next=page+1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const orders = await Order.find().limit(limit).skip(offset).sort({created:-1});
    const prevPages = pageStart - numPageLink > 0 ? pageStart - numPageLink : 1;
    const nextPages = pageStart + numPageLink;
    const count = await Order.count();

    const numPages = Math.ceil(count / limit);
    const pageEnd = page + numPageLink < numPages ? page + numPageLink : numPages;


    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn',
        orders: orders,
        nameAdmin: name,
        prev:prev,
        next:next,
        prevPages:prevPages,
        nextPages:nextPages,
        numPages:numPages,
        pageStart:pageStart,
        pageEnd:pageEnd,
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