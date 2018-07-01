const request = require("request");
const location = require("../helper/location");
module.exports = (req, res) => {
    request("http://localhost:2000/playfield/all", function (error, response, body) {
        if(error) return res.render("playfield", {message: "Error when read http://localhost:2000/playfield/all"});
        return res.render("playfield.ejs", {datas: JSON.parse(body), location, user: req.decoded});
    });
};