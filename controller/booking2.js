const request = require("request")
const Url = require("../helper/baseURL")
const Err = require("../models/errors")

exports.getFieldsBooking2 = (req, res) => {
    const fieldID = req.query.fieldID
    const subFieldID = req.query.subFieldID
    request(Url.url2000+"/get/owner/"+fieldID, (err, response, playfield)=>{
        if (err) return res.json({error: Err.err_read_API})
        request(Url.url2000+"/get/playfield/id/"+subFieldID, (err_owner, response_owner, subField)=>{
            if (err_owner) return res.json({error: Err.err_read_API})
            return res.render("booking2", {owner: JSON.parse(playfield), subField: JSON.parse(subField), user: req.decoded})
            
        })
    })
}

exports.bookingSuccess = (req, res)=>{
    //let infor = req.body.infor
    res.render("index")
    //res.render("booking_success", infor)
}