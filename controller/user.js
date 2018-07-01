const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');
const error = require("../models/errors")

//const cookieParser = require('cookie-parser')

exports.registerUser = (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, data) => {
        if (err) return res.json(err); 
        if (data) return res.render('register', {message: 'Tên đăng nhập đã tồn tại hãy chọn tên khác'});
        const hashPassword = crypt.hashSync(req.body.password, 3);
        const user = User({
            ID: Date.now(),
            username: req.body.username,
            password: hashPassword,
            name: req.body.name,
            email: req.body.email
        });

        user.save(err => {
            if (err) return res.json(err);
            const token = jwt.sign({
                username: user.username,
                name: user.name
            }, 'myapp', { expiresIn: 3600 });
            res.cookie('token', token);
            res.header({ 'x-access-token': token });
            res.render('register', {
                success: true,
                username: user.username,
                name: user.name,
                email: user.email
            });
        });
    });
};

exports.registerUserAPI = (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, data) => {
        if (err)return res.json(err); 
        if (data) {
            res.json({
                message: 'Username đã tồn tại',
                exist: true
            });
        } else {
            const hashPassword = crypt.hashSync(req.body.password, 3);
            const user = User({
                ID: Date.now(),
                username: req.body.username,
                password: hashPassword,
                name: req.body.name,
                email: req.body.email
            });

            user.save(err => {
                if (err) return res.json(err);
                res.status(201).json({
                    message: 'Đăng kí thành công',
                    
                    yourUser: {
                        ID: Date.now(),
                        username: req.body.username,
                        password: hashPassword,
                        name: req.body.name,
                        email: req.body.email
                    }
                });
            });
        }

    });

};

exports.editUserInfor = (req, res) => {
    User.findOne({
        'ID': req.params.id
    }, (err, data) => {
        if (err) return res.json(err);
        if (data) {
            const hashPassword = crypt.hashSync(req.body.password, 3);
            data.ID = req.body.ID || data.ID;
            data.username = req.body.username || data.username;
            data.password = hashPassword || data.password;
            data.name = req.body.name || data.name;

            data.save(err => {
                if (err) return res.json(err);
                res.status(202).json({
                    message: 'Update thành công'
                });
            });
        } else {
            res.json({
                message: 'Tài khoản không tồn tại'
            });
        }

    });
};

exports.loginUser = (req, res) => {
    const username = req.body.username;
    User.findOne({
        username
    }, (err, user) => {
        if (err) return res.json(err);
        if (!user) return res.render('login', {
            message: 'Sai username roi',
            username: req.body.username,
            password: req.body.password
        }); 
        const password = crypt.compareSync(req.body.password, user.password);
        if (!password) return res.render('login', {message: 'Sai password roi'}); 
        const token = jwt.sign({
            ID: user.ID,
            username: user.username,
            name: user.name,
            address: user.address || "",
            phone: user.phone || "",
            email: user.email || ""
        }, 'myapp', { expiresIn: 3600*24 });
        res.cookie('token', token);
        res.header({ 'x-access-token': token });
        res.render('index', {user});
    });
};

exports.loginUserAPI = (req, res) => {
    const username = req.body.username;
    User.findOne({
        username
    }, (err, user) => {
        if (err) return res.json(err);
        if (user) {
            const password = crypt.compareSync(req.body.password, user.password);
            if (password) {
                const token = jwt.sign({
                    username: user.username,
                    name: user.name
                }, 'myapp', { expiresIn: 3600 });
               
                res.cookie('token', token);
                res.header(
                    { 'x-access-token': token }
                );
                res.json({ 
                    success: true,
                    message: 'dang nhap thanh cong',
                    user: user.username,
                    name: user.name
                });
            } else {
                res.json({ message: 'sai password' });
            }
        } else {
            res.json({
                message: 'Sai username'
            });
        }
    });
};

exports.loginRequired = (req, res, next) => {
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken)  return res.render('login', {message: error.require_login});
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) res.render('index');
        //res.cookie('token', decoded)
        res.header(
            { 'x-access-token': loginedToken }
        );
        req.decoded = decoded;
        next();
    });
};

exports.isLogin = (req, res, next)=>{
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) {
        return next();
    }
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) {
            const url = req.originalUrl;
            return res.redirect(url);
        }
        res.header(
            { 'x-access-token': loginedToken }
        );
        req.decoded = decoded;
        next();
    });
};

exports.loginRequiredAPI = (req, res, next) => {
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) {
        return res.status(403).send({
            success: false,
            message: 'Khong co token quyen truy cap. Hay dang nhap di'
        });
    } else {
        jwt.verify(loginedToken, 'myapp', function (err, decoded) {
            if (err) return res.json({ success: false, message: 'Chưa đăng nhập vào tài khoản đăng nhập' });
            //res.cookie('token', decoded)
            res.header(
                { 'x-access-token': loginedToken }
            );
            req.decoded = decoded;
            next();
        });
    }
};

exports.login = (req, res)=>{
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) return res.render('login');
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) return res.render('login');
        res.cookie.token = loginedToken;
        res.header({ 'x-access-token': loginedToken });
        res.render('index', {user: decoded});
    });
};

exports.logout = (req, res)=>{
    res.clearCookie('token');
    res.redirect('/login');
};

exports.getRegister = (req, res)=>{
    const loginedToken = req.cookies.token ||req.headers['x-access-token'];
    if (!loginedToken) return res.render('register');
    jwt.verify(loginedToken, 'myapp', function (err, decoded) {
        if (err) return res.render('index');
        res.cookie.token = loginedToken;
        res.header({ 'x-access-token': loginedToken });
        res.render('register', {user: decoded});
    });
};

exports.getUserList = (req, res) => {
    User.find((err, users)=>{
        if(err) return res.json(err)
        return res.json(users)
    })
}