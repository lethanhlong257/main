const cheerio = require('cheerio')
const Parser = require('rss-parser');
const request = require("request")
const Crawler = require("crawler");
const News = require("../models/news")
const Err = require("../models/errors")

let parser = new Parser();

module.exports = (async () => {

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
                   
                    const news = News({title, desc, img, content, source, pubDate})
                    
                    news.save(err => {
                        
                        if (err) {
                            return console.log(Err.err_save_data);
                        }
                        console.log("Save news thanh cong");
                    })
                }
                done();
            }
        });

        c.queue(link);
    }
})();
