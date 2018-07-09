const fetch = require("isomorphic-fetch");
const baseURL = require("../helper/baseURL")
module.exports = async (req, res) => {
    let user = req.decoded
    let ID  = req.params.id

    let URL = baseURL.url2000+"/get/playfield/"+ID
    let URL_owner = baseURL.url2000+"/get/owner/"+ID

    const subField = await fetch(URL)
    const owner = await fetch(URL_owner)

    const subFieldJSON = await subField.json()
    const ownerJSON = await owner.json()

    res.render("booking3.ejs", {user, subFields : subFieldJSON, owner: ownerJSON})
};