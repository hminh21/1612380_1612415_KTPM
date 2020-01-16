$("input[id='username']").on('blur', () => {
    const username = $('input[id="username"]').val();

    if (username == '')
    {
        return;
    }

    $.ajax({
        url:'/register/check-username-available',
        type:'POST',
        data: {
            'username' : username
        },
        success: (res) => {
            if (res.isAvailable == false) {
                document.getElementById('message').style.visibility = "visible";
                document.getElementById('message').className = "alert alert-success";
                document.getElementById('messageText').innerText = 'Tên tài khoản này bạn có thể dùng được';
                document.getElementById('commitRegister').disabled = false;
            }
            else {
                document.getElementById('message').style.visibility = "visible";
                document.getElementById('message').className = "alert alert-warning";
                document.getElementById('messageText').innerText = 'Rất tiếc tên tài khoản này đã tồn tại, hãy thử tên khác';
                document.getElementById('commitRegister').disabled = true;
            }
        }
    })
});

$("input[id='email']").on('blur', () => {
    const email = $('input[id="email"]').val();

    if (email == '')
    {
        return;
    }

    $.ajax({
        url:'/register/check-email-available',
        type:'POST',
        data: {
            'email' : email
        },
        success: (res) => {
            if (res.isAvailable == false) {
                document.getElementById('message').style.visibility = "visible";
                document.getElementById('message').className = "alert alert-success";
                document.getElementById('messageText').innerText = 'Email này bạn có thể dùng được';
                document.getElementById('commitRegister').disabled = false;
            }
            else {
                document.getElementById('message').style.visibility = "visible";
                document.getElementById('message').className = "alert alert-warning";
                document.getElementById('messageText').innerText = 'Rất tiếc email này đã tồn tại, hãy thử email khác';
                document.getElementById('commitRegister').disabled = true;
            }
        }
    })
});

function checkPassword()
{
    var inputPassword = document.forms["registerForm"]["inputPassword"].value;
    var confirmPassword = document.forms["registerForm"]["confirmPassword"].value;
    if(inputPassword != '' && confirmPassword != '') {
        if (inputPassword != confirmPassword) {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-danger";
            document.getElementById('messageText').innerText = 'Mật khẩu nhập lại không trùng khớp';
            document.getElementById('commitRegister').disabled = true;
        } else {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-success";
            document.getElementById('messageText').innerText = 'Mật khẩu hợp lệ';
            document.getElementById('commitRegister').disabled = false;
        }
    }
}

$.fn.exists = function () {
    return this.length !== 0;
};
