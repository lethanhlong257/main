$(document).ready(function () {
    // Chức năng thông báo uncompleted
    $(".uncompleted").click(function (e) { 
        e.preventDefault();
        alert("Chức năng chưa làm xong. Quay lại sau nhé!! ahihi");
    });
    // chức năng cuộn trang ở home

    $("[data-toggle=\"popover\"]").popover(); 

    // chuc nang dang nhap
    $("#username").blur(function (e) { 
        e.preventDefault();
        if ($("#username").val()=="") {
            $("#username_err").text("username không được để trống");
        }
        if ($("#username").val()!="") {
            $("#username_err").text("");
        }
    });

    
    $("#password").blur(function (e) { 
        e.preventDefault();
        if ($("#password").val()=="") {
            $("#password_err").text("password không được để trống");
        }
        if ($("#password").val()!="") {
            $("#password_err").text("");
        }

    });

    $("#username2").blur(function (e) { 
        e.preventDefault();
        if ($("#username2").val()=="") {
            $("#username_err2").text("username không được để trống");
        }
        if ($("#username2").val()!="") {
            $("#username_err2").text("");
        }

    });

    $("#password2").blur(function (e) { 
        e.preventDefault();
        if ($("#password2").val()=="") {
            $("#password_err2").text("password không được để trống");
        }
        if ($("#password2").val()!="") {
            $("#password_err2").text("");
        }

    });

    $("#login").submit(function () { 
        if ($("#username").val()=="" && $("#password").val()=="" ) {
            $("#password_err").text("username và password không được để trống");
            $("#password_err2").text("username và password không được để trống");
            return false;
        }  else return true;
    });

    $("#login-modal").submit(function () { 
        if ($("#username2").val()=="" && $("#password2").val()=="" ) {
            $("#password_err").text("username và password không được để trống");
            $("#password_err2").text("username và password không được để trống");
            return false;
        }  else return true;
    });

    $(".register").submit(function () { 
        if ($("#username3").val()=="" || $("#password3").val()==""||$("#email").val()==""|| $("#name").val()=="" ) {
            $("#register_err").text("Thông tin không được để trống");
            return false;
        }  else return true;
    });

    // Chức năng bật tắt khung chat
    // var chat = false;
    // $('#chat-button').click(function () { 
    //     if (!chat) {
    //         $('.chat-content').removeClass('hide');
    //         chat = !chat;
    //     } else {
    //         $('.chat-content').addClass('hide');
    //         chat = !chat;
    //     }

    // });


    

    $('[data-toggle="tooltip"]').tooltip(); 
    
    $(window).scroll(function(){
        var current = $(window).scrollTop();
        if(current >337){
            $('#news-category-menu').addClass('fixed-nav');
            $('.menu-news').addClass('fixed');
        } 
        else if(current <337){
            $('#news-category-menu').removeClass('fixed-nav');
            $('.news-menu').removeClass('fixed');
        }
    })

    

});