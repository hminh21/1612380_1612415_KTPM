Stripe.setPublishableKey('pk_test_Ja8L4IMRpdVZur3v54b1DkCD00OtDVRwZa');

var $form = $('#checkoutForm');

$form.submit(function(event){
    $form.find('#charge-error').addClass('hidden');
    $form.find('#confirmBtn').prop('disabled',true);
    Stripe.card.createToken({
        number: $('#billing_card_number').val(),
        cvc: $('#billing_card_cvc').val(),
        exp_month: $('#card_expiry_month').val(),
        exp_year: $('#card_expiry_year').val(),
        name: $('#billing_card_name').val()
    }, stripeResponseHandler);
    return false;//chưa validate xong nên phải return false trước
});

function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        $form.find('#charge-error').text(response.error.message);
        $form.find('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}