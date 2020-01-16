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
            if(this.items[i]){//khi 1 item xóa thì vị trí item bị xóa là null nên phải if để ko báo cannot read _id of null
                if(this.items[i]._id == product._id && this.items[i].size == product.size)
                {
                    delete this.items[i];
                    break;
                }
            }
        }

    };
};