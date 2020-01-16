$/*("#customerButton").click(() =>{
    //const customer = document.getElementById("customer").value;
    const customerModal = $("#customerModal");
    const CustomerInput = $("#customerInfo");
    $.ajax({
        url: '/orders/list',
        contentType: 'application/json',
        success: res =>{
            customerModal.find("#name").text(CustomerInput.find("#name").val());
            customerModal.find("#address").text(CustomerInput.find("#address").val());
            customerModal.find("#sdt").text(CustomerInput.find("#sdt").val());
            customerModal.find("#email").text(CustomerInput.find("#email").val());
            console.log("abc");
            customerModal.modal('show');
        }
    });
});*/

function get_ID_Order(index){
    const id = "#idOrder" + index;
    return $('#body-order').find(id);
}

$('button[id^="customerButton"]').on('click', function (e) {
    const customerModal = $("#customerModal");
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/customerInfo/' + idOrder.text();
    $.ajax({
        url: toURL,
        contentType: 'application/json',
        method: 'GET',
        dataType: 'json',
        success: res =>{
            customerModal.find("#cusName").text(res.info.name);
            customerModal.find("#cusAddress").text(res.info.address);
            customerModal.find("#cusEmail").text(res.email);
            customerModal.find("#cusSdt").text(res.info.sdt);
        }
    });
});

$('button[id^="receiverButton"]').on('click', function (e) {
    const receiverModal = $("#receiverModal");
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/receiverInfo/' + idOrder.text();
    $.ajax({
        url: toURL,
        contentType: 'application/json',
        method: 'GET',
        dataType: 'json',
        success: res =>{
            receiverModal.find("#receiverName").text(res.name);
            receiverModal.find("#receiverAddress").text(res.address);
            receiverModal.find("#receiverEmail").text(res.email);
            receiverModal.find("#receiverSdt").text(res.sdt);
        }
    });
});

$('button[id^="cartButton"]').on('click', function (e) {
   const cartModal = $('#cartModal');
   const idOrder = get_ID_Order($(this).val());
   const toURL = '/orders/list/cartInfo/' + idOrder.text();

   $.ajax({
      url: toURL,
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: res =>{
          res.cart.items.forEach(product => {
              if(product){
                  cartModal.find('tbody').append('<tr> ' +
                      '<td>' + product.name + '</td> ' +
                      '<td>' + product.size + '</td> ' +
                      '<td>' + product.price + '</td> ' +
                      '</tr>');
              }
          });
      }
   });
});


$('#customerModal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
});

$('#cartModal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
    $(this).find('tbody').html('');
});

$("input[id='email']").on('blur', () => {
    const email = $('input[id="email"]').val();
    const alert = $('.card.card-body').find('.alert.alert-warning.alert-dismissible.fade.show');
    if (email == '')
    {
        return;
    }

    $.ajax({
        url:'/admin/register/check-email-available',
        type:'POST',
        data: {
            'email' : email
        },
        success: (res) => {
            if (res.isAvailable == false) {
                if (alert.exists() == true) {
                    alert.hide();
                }
            }
            else {
                if (alert.exists() == false) {
                    $('.card.card-body').prepend('<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                        + 'Email này đã tồn tại' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span></button></div>');
                }
                else
                {
                    alert.show();
                }
            }
        }
    })
});

function changeBlockUser(index, href){
    const id = '#block' + index;
    $.ajax({
        url: href,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: res =>{

            if(res.isBlocked)
            {
                $(id).append('<i class="fas fa-lock" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock-open').remove();

            }
            else
            {
                $(id).append('<i class="fas fa-lock-open" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock').remove();
            }
        }
    });
};

function changeStatusProduct(index, href){
    const id = '#block' + index;
    $.ajax({
        url: href,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: res =>{

            if(res.isOn)
            {
                $(id).append('<i class="fas fa-lock-open" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock').remove();
            }
            else
            {
                $(id).append('<i class="fas fa-lock" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock-open').remove();
            }
        }
    });
};

$.fn.exists = function () {
    return this.length !== 0;
};


