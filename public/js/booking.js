$(document).ready(function () {

    var timeBooking;
    var price;

    var now = new Date()
    var month = now.getMonth() + 1

    var now1 = new Date(now.getTime() + (1000 * 24 * 60 * 60))
    var month1 = now1.getMonth() + 1

    var now2 = new Date(now1.getTime() + (1000 * 24 * 60 * 60))
    var month2 = now2.getMonth() + 1

    var now3 = new Date(now2.getTime() + (1000 * 24 * 60 * 60))
    var month3 = now3.getMonth() + 1

    var now4 = new Date(now3.getTime() + (1000 * 24 * 60 * 60))
    var month4 = now4.getMonth() + 1

    var now5 = new Date(now4.getTime() + (1000 * 24 * 60 * 60))
    var month5 = now5.getMonth() + 1

    var now6 = new Date(now5.getTime() + (1000 * 24 * 60 * 60))
    var month6 = now6.getMonth() + 1

    $(".date").append("<option value='" + now.getDate() + "-" + month + "-" + now.getFullYear() + "' >" + now.getDate() + " tháng " + month + "-" + now.getFullYear() + "</option>")
    $(".date").append("<option value='" + now1.getDate() + "-" + month1 + "-" + now1.getFullYear() + "' >" + now1.getDate() + " tháng " + month1 + "-" + now1.getFullYear() + "</option>")
    $(".date").append("<option value='" + now2.getDate() + "-" + month2 + "-" + now2.getFullYear() + "' >" + now2.getDate() + " tháng " + month2 + "-" + now2.getFullYear() + "</option>")
    $(".date").append("<option value='" + now3.getDate() + "-" + month3 + "-" + now3.getFullYear() + "' >" + now3.getDate() + " tháng " + month3 + "-" + now3.getFullYear() + "</option>")
    $(".date").append("<option value='" + now4.getDate() + "-" + month4 + "-" + now4.getFullYear() + "' >" + now4.getDate() + " tháng " + month4 + "-" + now4.getFullYear() + "</option>")
    $(".date").append("<option value='" + now5.getDate() + "-" + month5 + "-" + now5.getFullYear() + "' >" + now5.getDate() + " tháng " + month5 + "-" + now5.getFullYear() + "</option>")
    $(".date").append("<option value='" + now6.getDate() + "-" + month6 + "-" + now6.getFullYear() + "' >" + now6.getDate() + " tháng " + month6 + "-" + now6.getFullYear() + "</option>")



    $("#booking-date").change(function () {
        var time = "";
        var timeOfDay = [
            '0000', '0030', '0100', '0130', '0200', '0230', '0300', '0330',
            '0400', '0430', '0500', '0530', '0600', '0630', '0700', '0730',
            '0800', '0830', '0900', '0930', '1000', '1030', '1100', '1130',
            '1200', '1230', '1300', '1330', '1400', '1430', '1500', '1530',
            '1600', '1630', '1700', '1730', '1800', '1830', '1900', '1930',
            '2000', '2030', '2100', '2130', '2200', '2230', '2300', '2330'
        ]

        $("#booking-date option:selected").each(function () {
            time = $(this).val();
        });
        var fieldID = $("#subFieldID").val()
        
        if ($("#booking-date").val()!=="") {
            $("#err_date").empty()
            socket3000.emit("get time booking request", { fieldID, time })
        } else {
            $("#pick-time-field").empty()
        }
    })

    socket3000.on("get time booking response", function (data) {
        var times = JSON.parse(data)
        $("#pick-time-field").empty()
        timeOfDay.forEach(_30minute => {
            if (isExist(times, _30minute)) {
                $("#pick-time-field").append(
                    `<button data-toggle="tooltip" data-placement="top" value="` + _30minute + `"
                    title="Mỗi button là 30 phút!" type="button" disabled class="btn btn-success btn-date">`+
                    _30minute[0] + _30minute[1] + ":" + _30minute[2] + _30minute[3]

                    + `</button>`
                )
            } else {
                $("#pick-time-field").append(
                    `<button data-toggle="tooltip" data-placement="top" value="` + _30minute + `"
                     title="Mỗi button là 30 phút!" type="button" class="btn btn-success btn-date">` +
                    _30minute[0] + _30minute[1] + " : " + _30minute[2] + _30minute[3] + `</button>`
                )
            }
        })

        $('[data-toggle="tooltip"]').tooltip();

        $(".btn-date").click(function () {
            $(this).toggleClass("btn-selected")
        })

        $("#btn-booking").click(function () {

            let err = false;
            let date = $("#booking-date").val()
            let time = []
            $(".btn-selected").each(function () {
                time.push($(this).val())
            })
            timeBooking = time
            let name = $("#ip-name").val()
            let email = $("#ip-email").val()
            let phone = $("#ip-phone").val()
            let address = $("#address_booking").text()
            let phone_field = $("#phone_booking").text()
            let typeField = $("#typeField_booking").text()
            let note = $("#note").text()

            price = $("#price_booking").text()

           
            if (date === "") {
                $("#err_date").append("Không được để trống")
                err = true
            }
            if (name.length <= 0) {
                $("#err_name").text("Không được để trống")
                err = true
            }
            if (phone.length < 10 || phone.length > 11 || !validatePhone(phone)) {
                $("#err_phone").text("Sai định dạng điện thoại (10 hoặc 11 số)")
                err = true
            }
            if (!validateEmail(email)) {
                $("#err_email").text("Sai định dạng email")
                err = true
            }
            if (err) {
                return false
            }

            let formated_time = []
            let duration = 0
            time.forEach(t => {
                formated_time.push(" "+t[0]+t[1]+"h"+t[2]+t[3])
                duration += 30
            })
            


            let caculated_price = price * (duration/60 )
    

            $("#name_booking").text(name)
            $("#phone_booking").text(phone)
            $("#email_booking").text(email)
            $("#date_booking").text(date)
            $("#address_booking_check").text(address)
            $("#phoneField_booking").text(phone_field)
            $("#time_booking").text(formated_time)
            $("#duration_booking").text(duration)
            $("#price_booking_check").html(caculated_price)
            $("#typeField_booking_check").text(typeField)
            $("#note_booking_check").text(note)

        
        })


    })

    socket3000.on("booking response err", data=>{
        $("#err_booking").text(data.message)
        $("#err_time").text(data.message)
    })

    socket3000.on("booking response success", data=>{
        $(location).attr('href', '/buffer/booking/success')
    })

    $("#btn-booking").click(function() {
        var err = false;
        var date = $("#booking-date").val()
        var time = []
        $(".btn-selected").each(function() {
            time.push($(this).val())
        })

        if (date === "") {
            $("#err_date").text("Không được để trống")
            err = true
        }
        if (time.length<=0) {
            $("#err_time").text("Thời gian phải được chọn")
            err = true
        }
        if (err) {
            return false
        }



    })

    $("#ip-name").blur(function() {
        if ($(this).val() <=0) {
            $("#good_name").empty()
            $("#err_name").text("Không được để trống")
        } else {
            $("#err_name").empty()
            $("#good_name").text("Good!")
        }
    })

    $("#ip-email").blur(function() {
        if (!validateEmail($(this).val())) {
            $("#good_email").empty()
            $("#err_email").text("Sai định dạng email (example@domain.xxx)")
        } else {
            $("#err_email").empty()
            $("#good_email").text("Good!")
        }
    })

    $("#ip-phone").blur(function() {
        let phone = $(this).val()
        if (phone.length < 10 || phone.length > 11 || !validatePhone(phone)) {
            $("#err_phone").text("Sai định dạng số điện thoại (10 hoặc 11 số)")
            $("#good_phone").empty()
        } else {
            $("#err_phone").empty()
            $("#good_phone").text("Good!")
        }
    })

    $("#btn-agree-booking").click(function() {
        // ownerid, userID, fieldID, time, duration, note, phone, email, unitPrice, totalPrice
        let ownerID = $("#ownerID").val()
        let userID = $("#userID").val()
        let fieldID = $("#subFieldID").val()
        let time = timeBooking
        let duration = $("#duration_booking").text()
        let note = $("#not").text()
        let phone = $("#phone_booking").text()
        let email = $("#email_booking").text()
        let date = $("#date_booking").text()
        let unitPrice = price
        let totalPrice = $("#price_booking_check").text()

        

        socket3000.emit("booking request", {ownerID, userID, fieldID, time, duration, note, phone, email, date, unitPrice, totalPrice})
    })


    function isExist(array, value) {
        var flat = false
        for (var i = 0; i < array.length; i++) {
            e = array[i]
            if (e === value) {
                flat = true
            }
        }
        return flat
    }

    /* jQuery Validate Emails with Regex */
    function validateEmail(Email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return $.trim(Email).match(pattern) ? true : false;
    }

    function validatePhone(phone) {
        var pattern = /(09|01[2|6|8|9])+([0-9]{8})\b/;

        return $.trim(phone).match(pattern) ? true : false;
    }




})