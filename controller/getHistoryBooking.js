const fetch = require('isomorphic-fetch');
const Url = require("../helper/baseURL")

module.exports = (req, res) => {
    let user = req.decoded
    let history = [];

    fetch(Url.url2000 + "/history/booking/" + user.ID)
        .then(bookings => { return bookings.json() })
        .then( async (bookingsJSON) => {
            
            for (let i = 0; i < bookingsJSON.length; i++) {
                const booking = bookingsJSON[i];
                const owner = await fetch(Url.url2000 + "/get/owner/" + booking.ownerID);
                const ownerJSON = await owner.json()
                history.push({ booking, owner: ownerJSON })
            }
            
            return res.render("user_infor", { history, user })
        })
        .catch( err => { return res.json(err) } )

                
               

    // request(Url.url2000 + "/history/booking/" + user.ID, (err, response, bookings) => {
    //     if (err) return res.json(err)
    //     JSON.parse(bookings).forEach((booking) => {
    //         request(Url.url2000 + "/get/owner/" + booking.ownerID, (err_owner, response, owner) => {
    //             history.push({ booking, owner: JSON.parse(owner) })
    //         })
    //     });
    //     return res.render("user_infor", { history, user })
    // })
};
