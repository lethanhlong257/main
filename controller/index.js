const jwt = require('jsonwebtoken');
module.exports = (req, res)=>{
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) return res.render('index');
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) return res.render('index');
        res.cookie.token = loginedToken;
        res.header({ 'x-access-token': loginedToken });
        res.render('index', {user: decoded});
    });
};