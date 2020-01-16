const hbs=require('handlebars');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');

module.exports = {
    productPage: function (id) {
        const url = '/single-product/' + id;
        return new hbs.SafeString(url);
    },

    categoryPage: function (id) {
       const url = '/category/' + id;
       return new hbs.SafeString(url);
    },

    manufacturerPage: function(id){
        const url = '/manufacturer/' + id;
        return new hbs.SafeString(url);
    },

    formatCurrency: function (num) {
        num = num.toString();
        for (let i = num.length - 3; i > 0; i -= 3) {
            num = num.slice(0, i) + "." + num.slice(i);
        };
        num = num + ' VNĐ';
        return new hbs.SafeString(num)
    },

    formatDate: date => {
        const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return new hbs.SafeString(dateString);
    },
    forLoop: function(url, from, to, block) {
        let accum = '';
        for(let i = from; i <= to; i++)
        {
            accum += block.fn(i).slice(0,65) + url + block.fn(i).slice(65);
        }
        return accum;
    },
    ifCond: function(v1, v2, options) {
        if(v1 < v2) {
            return options.fn(this);
        }
        return options.inverse(this);
      }
};
