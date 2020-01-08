/**
 * Created by Admin on 2018/11/22.
 */
const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');

//1.连接池
//createConnection(哪台服务器, 用户名, 密码, 库名);
const db = mysql.createPool({
    host:'localhost',
    port: 3306,      //端口号 可缺省,默认3306
    user: 'root',
    password: '123456',
    database: 'blog'    //库名
});

module.exports = function () {
    var router = express.Router();

    //检查登录状态
    router.use((req, res, next) => {
        // console.log(req.url);
        if(!req.session['admin_id'] && req.url != '/login' && req.url != '/login.html'){  //没有登陆
            res.redirect('/admin/login');  //重定向
        } else {
            next();
        }
    });
    router.use('/logout', (req, res) => {
        delete req.session['admin_id'];
        // res.render('admin/login.ejs', {});
        res.send('<script>location.href="/admin/login.html";</script>');
    });
    router.get('/login', (req, res) => {
        // res.render('admin/login.ejs', {});
        res.send('<script>location.href="/admin/login.html";</script>');
    });
    router.post('/login', (req, res) => {
        console.log(req.body);
        var username = req.body.username;
        var password = common.md5(req.body.password + common.MD5_SUFFIX);

        db.query(`SELECT * FROM admin_table WHERE username='${username}'`,
        (err, data) => {
            if(err){
                console.log(err);
                // res.status(500).send('database error').end();
                res.send({
                    status: 0,
                    msg: 'database error',
                    data: ''
                }).end();
            } else {
                // console.log(data);
                if(data.length == 0){
                    // res.status(400).send('no this admin').end();
                    res.send({
                        status: 0,
                        msg: '账号不存在',
                        data: ''
                    }).end();
                } else {
                    if(data[0].password == password){
                        //登录成功
                        req.session['admin_id'] = data[0].ID;
                        console.log('登录成功');
                        res.send({
                            status: 1,
                            msg: '登录成功',
                            data: ''
                        }).end()
                        // res.redirect('/admin/login.html');  //重定向
                    } else {
                        // res.status(400).send('this password is incorrect').end();
                        res.send({
                            status: 0,
                            msg: '密码错误',
                            data: ''
                        }).end();
                    }
                }
            }
        });

    });

    router.use('/article', require('./article.js'));
    return router;
};