
var socket = io("http://localhost:4000");
var socket3000 = io("http://localhost:3000");



$(document).ready(function () {
    var user = $("#user-sender").val()
    $("#chat-button-togle").click(function () {
        $(".chat-box-content").removeClass("hide");
        $("#chat-button-togle").addClass("hide")
        $(".chat-box").css("width", "500px")
        $(".chat-box").css("height", "500px")
        
        socket.emit("take user conservation list when chat btn pressed", user)
    });

    $("#togle-close-chat-box").click(function () {
        $(".chat-box-content").addClass("hide");
        $("#chat-button-togle").removeClass("hide")
        $(".chat-box").css("width", "100px")
        $(".chat-box").css("height", "100px")
    });

    $("#fm-send-chat").submit(function(){
        var message = $("#txt-chat-field").val()
        var userReciever = $("#top-user-chat").html()
        var userSender = $("#user-sender").val() 
        if(!message) return false
        
        socket.emit("user send message", {message,userReciever, userSender})
        $("#txt-chat-field").val("");
        return false
    })

    var reciever;
    $(".btn-connect-chat").click(function(){
        var recv = $(this).val().slice(0, $(this).val().indexOf("@"))
        reciever = recv
        $(".chat-box-content").removeClass("hide");
        $("#chat-button-togle").addClass("hide")
        $(".chat-left-user ul").empty()
        $(".chat-left-user ul").append(`
            <li class="list-group-item active">`+reciever+`</li>
        `)
        socket.emit("take user conservation list", user)

    })

    if (user) {
        socket.emit("client-send-chat-register", user)
    }


    socket.on("server return historical conservation", function(historicalConservation) {
        $(".chat-right-content").empty("")
        var userSender = $("#user-sender").val()
        
        historicalConservation.forEach(conservation => {
            let time = new Date(conservation.time)
            if (userSender === conservation.sender) {
                $(".chat-right-content").append(
                    `<div class="container-chat darker">
                        <img src="images/user.png" alt="Avatar" class="right">
                        <p>`+conservation.message+`</p>
                        <span class="time-left">`+time.getDate()+`/`+time.getMonth()+`/`+time.getFullYear()+ `  `
                        +time.getHours()+`:`+time.getMinutes()+`</span>
                    </div>`
                )
            } else{
                $(".chat-right-content").append(
                    `<div class="container-chat">
                        <img src="images/user.png" alt="Avatar">
                        <p>`+conservation.message+`</p>
                        <span class="time-left">`+time.getDate()+`/`+time.getMonth()+`/`+time.getFullYear()+ `  `
                        +time.getHours()+`:`+time.getMinutes()+`</span>
                    </div>`
                )
            }
        });
    })

    socket.on("server return lastest conservation", function(conservation){
        let time = new Date(conservation.time)
        var userSender = $("#user-sender").val()
        if (userSender === conservation.sender) {
            $(".chat-right-content").append(
                `<div class="container-chat darker">
                        <img src="images/user.png" alt="Avatar" class="right">
                        <p>`+conservation.message+`</p>
                        <span class="time-left">`+time.getDate()+`/`+time.getMonth()+`/`+time.getFullYear()+ `  `
                        +time.getHours()+`:`+time.getMinutes()+`</span>
                    </div>`
            )
        } else{
            $(".chat-right-content").append(
                `<div class="container-chat">
                        <img src="images/user.png" alt="Avatar">
                        <p>`+conservation.message+`</p>
                        <span class="time-left">`+time.getDate()+`/`+time.getMonth()+`/`+time.getFullYear()+ `  `
                        +time.getHours()+`:`+time.getMinutes()+`</span>
                    </div>`
            )
        }
    })

    socket.on("server return userConservationList", function(recieverConservationList){
        
        recieverConservationList.forEach(function(recieverUser){
            $(".chat-left-user ul").append(`
                <li class="list-group-item">`+recieverUser+`</li>
            `)
        })
        
        $(document).ready(function(){
            
            var userReciever = reciever
            var userSender = user
            $("#top-user-chat").empty()
            $("#top-user-chat").append(userReciever)
              
            socket.emit("take conservation", {userReciever, userSender})

            $(".chat-left-user ul li").click(function () {
                var userReciever = $(this).html()
                var userSender = user
                $("#top-user-chat").empty()
                $("#top-user-chat").append(userReciever)
              
                socket.emit("take conservation", {userReciever, userSender})
            })
            
        })

    })

    socket.on("server return list of reciver when chat btn pressed", function (listRecivers) {          
        $(".chat-left-user ul").empty()
        listRecivers.forEach(function(reciever) {
            $(".chat-left-user ul").prepend(`
                <li class="list-group-item">`+reciever+`</li>
            `)
        })

        $(document).ready(function(){
            $(".chat-left-user ul li").click(function () {
                var userReciever = $(this).html()
                var userSender = user
                $("#top-user-chat").empty()
                $("#top-user-chat").append(userReciever)
              
                socket.emit("take conservation", {userReciever, userSender})
            })
        })
    
    })

    

    socket3000.emit("request user list")
    socket3000.on("response user list", users => {
        users.forEach(user => {
            $(".member-list").append(`
            <a href="javascript:void(0)" class="list-group-item list-group-item-light member">`+user.username+`</a>
            `)
        })

        $(".member").click(function(){
            var recv = $(this).html()
            reciever = recv
            $(".chat-box-content").removeClass("hide");
            $("#chat-button-togle").addClass("hide")
            $(".chat-left-user ul").empty()
            $(".chat-left-user ul").append(`
                <li class="list-group-item active">`+reciever+`</li>
            `)
            socket.emit("take user conservation list", user)

        })
                           
    })


})


