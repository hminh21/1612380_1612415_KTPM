module.exports = function Cart(oldCart){
    //cart có thể được update từ cart cũ trong session hoặc được tạo mới hẳn
    this.items = oldCart.items || [];
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item){
        this.items.push(item);
        this.totalQty++;
        this.totalPrice += item.price;
    };

    this.remove = function(product){
        this.totalQty --;
        this.totalPrice -= product.price;

        for(let i=0; i < this.items.length;i++){
                if(this.items[i]._id == product._id && this.items[i].size == product.size)
                {
                    //delete this.items[i];
                    this.items.splice(i,1);
                    break;
                }
        }
    };
};