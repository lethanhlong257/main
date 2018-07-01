const request = require('request');
const Url = require("../helper/baseURL")

module.exports = (req, res)=>{
    let user = req.decoded
    let history =[];
    request(Url.url2000+"/history/booking/"+user.ID,(err, response, bookings) =>{
        if(err) return res.json(err)
        
        JSON.parse(bookings).forEach( (booking) => {
            request(Url.url2000+"/get/owner/"+booking.ownerID, (err_owner, response, owner)=>{
                history.push({booking, owner: JSON.parse(owner)})
            })
        });

        return res.render("user_infor", {history})
    })
};