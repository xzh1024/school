/**
 * Created by Admin on 2018/11/12.
 */
var express = require('express');

module.exports = function () {
    var router = express.Router();

    //检查登录状态
    router.use((req, res, next) => {
        if(!req.session['admin_id'] && req.url != '/login'){  //没有登陆
            res.redirect('/admin/login');  //重定向
        } else {
            next();
        }
    });

    router.get('/login', function (req, res) {
        res.render('admin/login.ejs', {});
    });

    return router;
};