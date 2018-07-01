var uncomplete =0;
$(document).ready(function () {
    // Chức năng thông báo uncompleted
    $('.uncompleted').click(function (e) { 
        e.preventDefault();
        alert("Chức năng chưa làm xong. Quay lại sau nhé!! ahihi");
    });
    // chức năng cuộn trang ở home




    // chuc nang dang nhap
    $('#username').blur(function (e) { 
        e.preventDefault();
        if ($('#username').val()=='') {
            $('#username_err').text('username không được để trống');
        }
        if ($('#username').val()!='') {
            $('#username_err').text('');
        }

    });
    $('#password').blur(function (e) { 
        e.preventDefault();
        if ($('#password').val()=='') {
            $('#password_err').text('password không được để trống');
        }
        if ($('#password').val()!='') {
            $('#password_err').text('');
        }

    });

    $('#login').submit(function () { 
        if ($('#username').val()=='' && $('#password').val()=='' ) {
            $('#password_err').text('username và password không được để trống');
            return false;
        }  else return true;
    });

    $('.addCart').click(function () { 
        let productName = $('.title').text();
        let productSize = $('.size').val();
        alert(productName + productSize);
    })
    
});