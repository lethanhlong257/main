const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // eslint-disable-line
const cookieParser = require("cookie-parser");
const request = require("request");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
var path = require('path');

const location = require("./helper/location");
const User = require("./models/user")
const Comment = require("./models/comment")
const PostForum = require("./models/posts-forum")
const Err = require("./models/errors")
const Url = require("./helper/baseURL")


const loginRequired = require("./controller/user").loginRequired;

const isLogin = require("./controller/user").isLogin;
//const isLogin = require('./controller/user').isLogin;

const connectString = "mongodb://localhost:27017/sports";
mongoose.connect(connectString, { useMongoClient: true });


mongoose.connection.on("connected", () => {
    console.log('connect thanh cong') // eslint-disable-line
});

mongoose.connection.on("disconnected", () => {
    console.log('ngat ket noi mongo') // eslint-disable-line
});



app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.set('port', process.env.PORT || 3000) // eslint-disable-line
server.listen(app.get("port"), () => {
    console.log('server started at port ' + app.get('port')) // eslint-disable-line
});

io.on("connection", (socket) => {


    //socket for booking
    socket.on("get time booking request",(data)=>{
        const time = data.time.split("-")
        const date = time[0]
        const month = time[1]
        const year = time[2]
        const fieldID = data.fieldID

        request.get(Url.url2000+"/booking/check/empty/"+fieldID+"/"+year+"/"+month+"/"+date, (err, body, times)=>{
            socket.emit("get time booking response", times)
        })
    })

    socket.on("booking request", data=>{
        const validationTimeBooking = require("./helper/validationTimeBooking")
        if (validationTimeBooking(data.time)) {
            let ownerID = data.ownerID
            , userID = data.userID
            , fieldID = data.fieldID
            , date      = data.date.split("-")[0]
            , month     = data.date.split("-")[1]
            , year      = data.date.split("-")[2]
            , hour      = data.time[0].substring(0, 2)
            , minute    = data.time[0].substring(2, 4)
            , phone     = data.phone
            , email     = data.email
            , note      = data.note
            , duration  = data.duration
            , unitPrice = data.unitPrice
            , totalPrice = data.totalPrice

            const form = {
                ownerID, userID, fieldID,
                date, month, year, hour, minute, phone, email, note, duration, unitPrice, totalPrice
            }

            request.post(Url.url2000+"/booking/field", {form}, (err, response, body)=>{
                
                if (JSON.parse(body).status) {
    
                    socket.emit("booking response success", {message: JSON.parse(body).message, infor: JSON.parse(body).infor})
                } else {
                    socket.emit("booking response err", {message: JSON.parse(body).message})
                }
            })

        } else {
            socket.emit("booking response err", {message: Err.err_validation_time_booking})
        }
    })

    //socket for choose sub field
    socket.on("request sub playfield", fieldID => {
        request(Url.url2000 + "/get/playfield/"+fieldID, (err, response, fields)=>{
            socket.emit("response sub playfield", fields)
        })
    })



    // socket for playfield
    socket.on("user-select-city", city => {
        // get data from specific city
        const data = location.find(
            e => {

                return e.cityName == city.city;
            }
        );
        socket.emit("server send district base on city", data.district);
    });

    socket.on("user select district and want to choose playfield", data => {
        let playfield = [];

        request.post({
            url: "http://localhost:2000/get/playfield/city-district",
            form: { city: data.city, district: data.district }
        }, (err, res, body) => {
            if (err) {
                playfield = "co loi xay ra";
            } else {
                JSON.parse(body).forEach(e => {

                    playfield.push({ fieldName: e.nameOffield, fieldID: e.ID });
                });
                socket.emit("server send playfield base on city and district", playfield);
            }
        });
    });

    socket.on("client send date and fieldid to take order", data => {
        const times = data.time.split("-");
        const fieldid = data.fieldid;
        const date = times[0]
        const month = times[1]
        const year = times[2]


        request("http://localhost:2000/booking/check/empty/" + fieldid + "/" + year + "/" + month + "/" + date, { method: "get" },
            (err, result) => {
                socket.emit("server send order time", JSON.parse(result))
            })

    })

    socket.on("request user list", () => {
        User.find((err, users) => {
            if (err) {
                socket.emit("response user list", err)
            } else {
                socket.emit("response user list", users)

            }
        })
    })

    socket.on("remove comment", data => {
        Comment.findByIdAndRemove(data.commentID, (err) => {
            if (err) {
                socket.emit("remove comment respose", { success: false })
            } else {
                PostForum.findById(data.postID, (err_fid, post) => {
                    if (err_fid) {
                        socket.emit("remove comment respose", { success: false })
                    } else {
                        if (post.anwser === 0) {
                            socket.emit("remove comment respose", { success: true })
                        } else {
                            PostForum.findOneAndUpdate({ _id: data.postID }, { anwser: post.anwser - 1 }, (err_f1, res) => {
                                if (err_f1) {
                                    console.log(err_f1);
                                    socket.emit("remove comment respose", { success: false })
                                } else {
                                    socket.emit("remove comment respose", { success: true })
                                }
                            })
                        }
                    }
                })
            }
        })
    })

    socket.on("update comment", data => {

        Comment.findByIdAndUpdate(data.commentID, { content: data.content }, (err) => {
            if (err) {
                socket.emit("update comment response", { success: false })
            } else {
                socket.emit("update comment response", { success: true })

            }
        })
    })
});

// custom 500 page
app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
    next();
});

app.get("/", require("./controller/index"));
app.get("/test", loginRequired, (req, res) => {
    res.send({
        message: "dang nhap thanh cong voi token",
        user: req.decoded.username,
        name: req.decoded.name
    });
});

app.get("/logout", require("./controller/user").logout);

app.route("/register")
    .get(require("./controller/user").getRegister)
    .post(urlencodedParser, require("./controller/user").registerUser);

app.route("/registerAPI")
    .get(require("./controller/user").getRegister)
    .post(urlencodedParser, require("./controller/user").registerUserAPI);

app.route("/login")
    .get(require("./controller/user").login)
    .post(urlencodedParser, require("./controller/user").loginUser);

app.route("/loginAPI")
    .get(require("./controller/user").loginUserAPI)
    .post(urlencodedParser, require("./controller/user").loginUserAPI);

app.get("/playfield", loginRequired, require("./controller/playfield"));
//app.get("/booking/:id", require("./controller/booking"));
app.post("/booking",loginRequired, urlencodedParser, require("./controller/booking"))

app.route("/forum")
    .get(loginRequired, require("./controller/forum").getForum)
    .post(loginRequired, urlencodedParser, require("./controller/forum").postForum)
app.get("/forum/:param", loginRequired, require("./controller/forum").getForum)

app.get("/forum/post/:id", loginRequired, require("./controller/forum").getForumPostById)

app.get("/getUserList", require("./controller/user").getUserList)

app.get("/buffer/booking/success", (req, res)=> res.render("buffer_booking"))
app.get("/postforum/1/1", (req, res) => res.render("post-forum"))

app.post("/forum/submit/comment", loginRequired, urlencodedParser, require("./controller/forum").submitCommentForum)

app.route("/forum/category/:categoryID")
    .get(loginRequired, require("./controller/forum").getForumPostByCategory)

app.route("/sync/news")
    .get(isLogin, require("./controller/news").syncNewsRss)

app.route("/news")
    .get(isLogin, require("./controller/news").getAllNews)
app.route("/news/:id")
    .get(isLogin, require("./controller/news").getNewsByID)

app.route("/news/category/:categoryID")
    .get(isLogin, require("./controller/news").getNewsByCategory)

app.route("/booking2")
    .get(isLogin,require("./controller/booking2").getFieldsBooking2)

app.route("/booking/success")
    .post(loginRequired, urlencodedParser, require("./controller/booking2").bookingSuccess)

app.route("/user/history/booking")
    .get(loginRequired, require("./controller/getHistoryBooking"))

// custom 404 page
app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

//myTimer();

setInterval(myTimer, 1000 * 3600 * 12);

function myTimer() {
    const News = require("./models/news");
    const cheerio = require('cheerio')
    const Parser = require('rss-parser');
    const request = require("request")
    const Crawler = require("crawler");
    const Err = require("./models/errors")
    let parser = new Parser();

    // crawler general
    (async () => {

        let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-11.rss');

        for (let i = 0; i < feed.items.length; i++) {
            const link = feed.items[i].link;
            request(link, (err, res, html) => {
                const $ = cheerio.load(html)
                let content = $('#article-body p').text().trim()
                let title = $('h1').text().trim()
                let img = $('img.cms-photo').attr('src')
                let desc = $("p.article-sapo.cms-desc").text().trim()
                let source = "tienphong.vn"
                let pubDate = feed.items[i].pubDate
                let date = Date.now()
                let category = "Sport"
                const news = News({ title, desc, img, content, source, pubDate, category, date })
                News.find()
                    .where("category", category)
                    .where("title", title)
                    .select("title")
                    .exec((err, titles) => {
                        if (titles.length === 0) {
                            news.save(err => {
                                if (err) {
                                    console.log("That bai  -  " + link);
                                    console.log(err);
                                } else {
                                    console.log("Thanh cong  -  " + link);
                                }
                            })
                        }
                    })
            })


        }
    })();

    // crawler soccer
    (async () => {

        let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-bong-da-49.rss');

        for (let i = 0; i < feed.items.length; i++) {
            const link = feed.items[i].link;
            request(link, (err, res, html) => {
                const $ = cheerio.load(html)
                let content = $('#article-body').text().trim()
                let title = $('h1').text().trim()
                let img = $('img.cms-photo').attr('src')
                let desc = $("p.article-sapo.cms-desc").text().trim()
                let source = "tienphong.vn"
                let pubDate = feed.items[i].pubDate
                let date = Date.now()
                let category = "Soccer"
                const news = News({ title, desc, img, content, source, pubDate, category, date })
                News.find()
                    .where("category", category)
                    .where("title", title)
                    .select("title")
                    .exec((err, titles) => {
                        if (titles.length === 0) {
                            news.save(err => {
                                if (err) {
                                    console.log("That bai  -  " + link);
                                    console.log(err);
                                } else {
                                    console.log("Thanh cong  -  " + link);
                                }
                            })
                        }
                    })
            })


        }
    })();

    // crawler behind the scense
    (async () => {

        let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-hau-truong-111.rss');

        for (let i = 0; i < feed.items.length; i++) {
            const link = feed.items[i].link;
            request(link, (err, res, html) => {
                const $ = cheerio.load(html)
                let content = $('#article-body').text().trim()
                let title = $('h1').text().trim()
                let img = $('img.cms-photo').attr('src')
                let desc = $("p.article-sapo.cms-desc").text().trim()
                let source = "tienphong.vn"
                let pubDate = feed.items[i].pubDate
                let date = Date.now()
                let category = "Behind the scense"
                const news = News({ title, desc, img, content, source, pubDate, category, date })
                News.find()
                    .where("category", category)
                    .where("title", title)
                    .select("title")
                    .exec((err, titles) => {
                        if (titles.length === 0) {
                            news.save(err => {
                                if (err) {
                                    console.log("That bai  -  " + link);
                                    console.log(err);
                                } else {
                                    console.log("Thanh cong  -  " + link);
                                }
                            })
                        }
                    })
            })


        }
    })();

    // crawler golf
    (async () => {

        let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-golf-280.rss');

        for (let i = 0; i < feed.items.length; i++) {
            const link = feed.items[i].link;
            request(link, (err, res, html) => {
                const $ = cheerio.load(html)
                let content = $('#article-body').text().trim()
                let title = $('h1').text().trim()
                let img = $('img.cms-photo').attr('src')
                let desc = $("p.article-sapo.cms-desc").text().trim()
                let source = "tienphong.vn"
                let pubDate = feed.items[i].pubDate
                let date = Date.now()
                let category = "golf"
                const news = News({ title, desc, img, content, source, pubDate, category, date })
                News.find()
                    .where("category", category)
                    .where("title", title)
                    .select("title")
                    .exec((err, titles) => {
                        if (titles.length === 0) {
                            news.save(err => {
                                if (err) {
                                    console.log("That bai  -  " + link);
                                    console.log(err);
                                } else {
                                    console.log("Thanh cong  -  " + link);
                                }
                            })
                        }
                    })
            })


        }
    })();

}


function isDuplicate(array, element) {
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        let flat = false
        if (condition) {

        }
    }
}

