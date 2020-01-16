const productDao = require('../models/dao/productDao');
const Product = require('../models/product');
const Order=require('../models/order');

exports.report_item = async (req,res) =>
{
    const name = req.user.info.name;
    let productList = await productDao.get_Top_10_Sold();

    productList.forEach(product => {
       product.price = product.price * product.sale;
    });
    const month=[01,02,03,04,05,06,07,08,09,10,11,12];
    const firstDayinMonth=[];
    const lastDayinMonth=[];
    let orderList={};
    let orderByMonth=[];
    for(let i=0;i<12;i++)
    {
        const firstDay=new Date(2019,month[i]-1,01)
        const lastDay=new Date(2019,month[i]-1,31)
        firstDayinMonth.push(firstDay);
        lastDayinMonth.push(lastDay);
        const order=await Order.find({created:{$gte:firstDay,$lte: lastDay}})
        let sumTotalPrice=0;
        let monthOrder=0;
        orderList[i]=order;
        order.forEach(_order=>{
                sumTotalPrice= sumTotalPrice + _order.cart.totalPrice;  
                monthOrder =_order.created.getMonth()+1;
            })
      
            orderByMonth.push({id:i+1,monthIndex:monthOrder,sumTotalPrice:sumTotalPrice})
    }


    const currentDate = new Date();
    const dateTime = "Last updated at " + currentDate.getHours() + ":"
                                        + currentDate.getMinutes() + " "
                                        + currentDate.getDate() + "/"
                                        + (currentDate.getMonth() + 1) + "/"
                                        + currentDate.getFullYear();

    res.render('report/items', { pageTitle: 'Thống kê sản phẩm và doanh thu',
    nameAdmin: name,
    productList: productList,
    orderByMonth:orderByMonth,
    datetime: dateTime});
};

exports.report_profit=function(req,res)
{
    const name = req.user.info.name;
    res.render('report/profit', { pageTitle: '',
    nameAdmin: name});
};