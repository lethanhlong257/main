const jwt = require('jsonwebtoken');
module.exports = (req, res)=>{
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) res.redirect('/playfield')
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) return res.redirect('/playfield')
        res.cookie.token = loginedToken;
        res.header({ 'x-access-token': loginedToken });
        res.redirect('/playfield')
    });
};