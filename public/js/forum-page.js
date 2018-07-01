$(document).ready(function () {
    // catch err submit forum
    $("#form-post-forum").submit(function () {
        var title = $("#topic-title").val()
        var content = $("#topic-content").val()
        if (title.length < 10) {
            $(".err").text("Do dai title can lon hon 10")
            return false
        } else if (content.length < 50) {
            $(".err").text("Do dai content can lon hon 50")
            return false
        } else {
            return true
        }
    })

    $("#fm-send-comment").submit(function () {
        var comment = $("#comment").val()
        
        if (comment.length < 10) {
            $(".err").text("Độ dài kí tự cần lớn hơn 10")
            return false
        } else {
            return true
        }
    })

    $(".btn-agree-remove-commnet").click(function () {
        var commentID = $(this).val()
        var postID = $("#post-id").val()
        socket3000.emit("remove comment", {commentID, postID })
    })

    socket3000.on("remove comment respose", success=>{
       
        if (success) {
            window.location.reload();
        } else {
            $(".err").append("Có lỗi xảy ra")
        }
    })

    $(".btn-agree-update-commnet").click(function () {
        var content = $("#comment-update").val()
        var commentID = $(this).val()
        if (content.length < 10) {
            $(".err").text("Nội dung cần lớn hơn 10 kí tự")
            return false
        }else {
            socket3000.emit("update comment", {commentID, content})
        }
    })

    socket3000.on("update comment response", success=>{
        if (success) {
            window.location.reload();
        } else {
            $(".err").append("Có lỗi xảy ra")
        }
    })

    


})
