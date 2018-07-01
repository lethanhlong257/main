const error = require('../models/errors');
const News = require('../models/news');
const cheerio = require('cheerio')
const Parser = require('rss-parser');
const request = require("request")
const Crawler = require("crawler");
const Err = require("../models/errors")
let parser = new Parser();

exports.getAllNews = (req, res) => {

    News.find()
        .where("category", "Sport")
        .sort({ date: -1 })
        .limit(5)
        .exec((err, five_lasted_news_sport) => {
            News.find()
                .where("category", "Soccer")
                .sort({ data: -1 })
                .limit(5)
                .exec((err, five_lasted_news_soccer) => {
                    News.find()
                        .where("category", "Behind the scense")
                        .sort({ data: -1 })
                        .limit(5)
                        .exec((err, five_lasted_news_behind) => {
                            News.find()
                                .where("category", "golf")
                                .sort({ data: -1 })
                                .limit(5)
                                .exec((err, five_lasted_news_golf) => {
                                    if (err) return res.jon(err);
                                    res.render("news", { user: req.decoded, five_lasted_news_sport, five_lasted_news_soccer, five_lasted_news_behind, five_lasted_news_golf })
                                })
                        })
                })
        })


};

exports.getNewsByID = (req, res) => {
    let id = req.params.id
    News.findById(id, (err, news)=>{

        News.find()
            .where("category", news.category)
            .sort({data: -1})
            .limit(10)
            .exec((err_ten_last_news, ten_last_news)=>{
                if (err) return res.jon(err);
                if (err_ten_last_news) return res.jon(ten_last_news);
                res.render("news_detail", { user: req.decoded, news, ten_last_news })
            })
    })
};

exports.getNewsByCategory = (req, res)=>{
    let categoryID =  parseInt(req.params.categoryID)
    let category
    switch (categoryID) {
        case 1:
            category = "Sport"
            break;
        case 2:
            category = "Soccer"
            break
        case 3:
            category = "Behind the scense"
            break
        case 4:
            category = "golf"
            break
        default:
            return res.json({message: Err.err_format})
            break;
    }
    News.find()
        .where("category", category)
        .sort({data: -1})
        .limit(50)
        .exec((err, news)=>{
            if (err) res.json(err)
            res.render("news_category", {user: req.decoded, news})
        })
}

exports.createNews = (req, res) => {
    const news = News({
        'ID': req.body.ID,
        'title': req.body.title,
        'content1': req.body.content1,
        'content2': req.body.content2,
        'content3': req.body.content3,
        'photo1': req.body.photo1,
        'photo2': req.body.photo2,
        'photo3': req.body.photo3,
        'date': req.body.date,
        'auther': req.body.auther,
        'type': req.body.type
    });

    const ok = {
        message: 'suscess'
    };

    news.save(err => {
        if (err) return res.json(err);
        res.status(201).json(ok);
    });
};

exports.updateNews = (req, res) => {
    News.findOne({ 'ID': req.params.id }, (err, data) => {
        if (err) {
            res.json(err);
        } else if (data) {
            data.ID = req.body.ID || data.ID;
            data.title = req.body.title || data.title;
            data.content1 = req.body.content1 || data.content1;
            data.content2 = req.body.content2 || data.content2;
            data.content3 = req.body.content3 || data.content3;
            data.photo1 = req.body.photo1 || data.photo1;
            data.photo2 = req.body.photo2 || data.photo2;
            data.photo3 = req.body.photo3 || data.photo3;
            data.date = req.body.date || data.date;
            data.auther = req.body.auther || data.auther;
            data.type = req.body.type || data.type;
            data.save(err => {
                if (err) return res.json(err);
                res.status(202).json({ message: 'Suscess' });
            });
        } else {
            res.json(error.notExist);
        }

    });

};


exports.deleteNews = (req, res) => {
    News.findOneAndRemove({ 'ID': req.params.id }, err => {
        if (err) return res.json(err);
        res.status(202).json({ message: 'delete successfully' });
    });
};

exports.syncNewsRss = (req, response) => {
    (async () => {
        let error = true

        let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-11.rss');

        for (let i = 0; i < feed.items.length; i++) {
            const link = feed.items[i].link;
            var c = new Crawler({
                maxConnections: 10,
                // This will be called for each crawled page
                callback: function (error, res, done) {
                    if (error) {
                        console.log(error);
                    } else {
                        var $ = res.$;
                        // $ is Cheerio by default
                        //a lean implementation of core jQuery designed specifically for the server
                        let title = $("h1").text()
                        let desc = $("p.article-sapo.cms-desc").text().trim()
                        let img = $('img.cms-photo').attr('src')
                        let content = $("#article-body").text()
                        let source = "tienphong.vn"
                        let pubDate = feed.items[i].pubDate

                        const news = News({ title, desc, img, content, source, pubDate })

                        News.find()
                            .where("title", title)
                            .exec((err, news) => {
                                if (news) {
                                    console.log("Existed  -  " + link);
                                } else {
                                    news.save(err => {

                                        if (err) {
                                            console.log("That bai  -  " + link);
                                        }
                                        error = false
                                        console.log("Thanh cong  -  " + link);
                                    })
                                }
                            })
                    }
                    done();
                }
            });
            c.queue(link);
        }

        if (error) {
            response.json({ message: "that bai" })
        } else {
            response.json({ message: "thanh cong" })
        }
    })();

}