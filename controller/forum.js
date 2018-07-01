const Comment = require("../models/comment")
const PostForum = require("../models/posts-forum")
exports.getForum = (req, res)=>{
    let param = req.params.message
    let message;
    switch (param) {
    case 0:
        message = "Co loi xay ra xin thu lai sau"
        break;
    case 1:
        message = "Tác vụ thành công"
        break
    default:
        message = undefined
        break;
    }

    PostForum.find()
        .sort({date: -1})
        .limit(20)
        .exec((err, posts)=>{
            res.render("forum", {user: req.decoded, posts, message})
        })
};

exports.getForumPostById = (req, res)=>{
    let postID = req.params.id
    if (postID) {
        PostForum.findOne({_id: postID}, (err, post)=>{
            if(err) res.render("post-forum", {user: req.decoded,message: err})
            PostForum.findOneAndUpdate({_id: postID}, {views: post.views+1}, (err, result)=>{
                if(err) res.render("post-forum", {user: req.decoded,message: err})
                Comment.find()
                    .where("postID", postID)
                    .sort({date: -1})
                    .limit(10)
                    .exec((err, comments)=>{
                        res.render("post-forum", {user: req.decoded, post: result, comments})
                    })
            })
        })
    } else {
        res.render("post-forum")
    }
    

}

exports.getForumPostByCategory = (req, res)=>{
    let categoryID = req.params.categoryID
    if (categoryID) {
        PostForum.find()
            .where({"category": Number(categoryID)})
            .exec((err, posts)=>{
                if(err) return res.render("post-forum", {user: req.decoded,message: err})
                return res.render("post-forum-category", {posts, user: req.decoded})
            })
    } else {
        res.render("post-forum")
    }
}

exports.postForum = (req, res)=>{
    let {title, category, content, author} = req.body
        , views = 0
        , anwser = 0
        , date = Date.now()
    if (title.length < 10) {
        return res.redirect("/forum")
    } else if (content.length < 50) {
        return res.redirect("/forum")
    } else if(!author){
        return res.redirect("/forum")
    } else {
        const postForum = PostForum({title, category, content, author, views, date, anwser})
        postForum.save(err=>{
            let url = req.originalUrl
            err ? res.redirect("/forum") : 
                res.render("buffer", {
                    message: "Đăng bài viết vào forum thành công",
                    url
                })
        })
    }
}

exports.submitCommentForum = (req, res) => {
    const {user, postID, content} = req.body
    const date = Date.now()
    const comment = Comment({user, postID, content, date})
    comment.save(err=>{
        if (err) return res.send({message: "Có lỗi xảy ra ở save comment", err})
        PostForum.findOne({_id: postID}, (err, post)=>{
            if(err) return res.send({message: "Có lỗi xảy ra ở dòng findone save comment", err})
            PostForum.findOneAndUpdate({_id: postID}, {anwser: post.anwser+1}, (err_f1)=>{
                if(err_f1) return res.send({message: "Có lỗi xảy ra ở dòng findOneAndUpdate trong save comment", err_f1})
                res.redirect("/forum/post/"+postID)
            })
        })
    })
    

}
