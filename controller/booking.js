const rp = require("request-promise")

module.exports = (req, res) => {
    const id = req.body.playfield
    const time = req.body.date
   
   
    rp({
        // thông tin của chủ sấn dựa trên id chủ sân
        uri: "http://localhost:2000/get/owner/"+id
    })
        .then( owner => {
            // lấy danh sách sân dựa trên id của chủ sân
            rp("http://localhost:2000/get/playfield/"+id)
                .then( playfields => {
                   
                    res.render("booking.ejs", {owner: JSON.parse(owner),fields: JSON.parse(playfields), time })
                })
                .catch({message: "co loi xay ra"})
        })
        .catch( err=> {
            res.json({message: "co loi xay ra", err})
        })
    
}