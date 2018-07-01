const Parser = require('rss-parser');
const request = require("request")
const Crawler = require("crawler");
const cheerio = require('cheerio')
let parser = new Parser();
(async () => {

    let feed = await parser.parseURL('https://www.tienphong.vn/rss/the-thao-11.rss');
    let link = feed.items[2].link
    request(link, (err, res, html)=>{
        const $ = cheerio.load(html)
        let body = $('#article-body p').text()
        let title = $('h1').text().trim()
        let img = $('img.cms-photo').attr('src')
        let desc = $("p.article-sapo.cms-desc").html()
        console.log(body);
        
    })
    
})();

let getBody = (source , pre, post)=>{
    return source.substring(source.indexOf(pre)+pre.length, source.indexOf(post));
  }