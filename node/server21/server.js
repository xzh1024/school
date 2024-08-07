/**
 * Created by Admin on 2018/10/12.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
// const jade = require('jade');
// const consolidate = require('consolidate');
const mysql = require('mysql');

//1.连接池
//createConnection(哪台服务器, 用户名, 密码, 库名);
const db = mysql.createPool({
    host:'localhost',
    port: 3306,      //端口号
    user: 'root',
    password: '123456',
    database: 'blog'    //库名
});

//2.查询
//query(SQL语句, 回调)
// db.query('SELECT * FROM `user_table`;', (err, data) => {
//     if(err)
//         console.log('出错：', err);
//     else
//         console.log('成功：', data);
//     console.log(JSON.stringify(data));
// });

var server = express();

server.listen(8081, function () {
    console.log('服务器已启动...');
});

//1.解析cookie
server.use(cookieParser('sadkflkafklasf23asfasfasffdafa'));

//2.使用session
var arr = [];
for(let i = 0; i < 100000; i++){
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000}));


// server.use('/static', express.static(path.join(__dirname, 'www'))); //访问静态资源

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

//4.配置模板引擎
//模板文件放在哪儿
server.set('views', './www/views');
//输出什么东西
server.set('view engine', 'html');
//那种模板引擎

//用户请求
// server.use('/', function (req, res, next) {
//     console.log(req.query);
//     console.log(req.body);
//     console.log(req.cookies);
//     console.log(req.session);
// });
server.get('/', (req, res, next) => {
    console.log('reqUrl：');
    console.log(req.url);
    //查询banner的东西
    db.query('SELECT * FROM `banner_table`;', (err, data) => {
        if(err) {
            console.log('banner_table出错：', err);
            res.status(500).send('databese error').end();
        } else {
            // console.log(data);
            // res.render('index.ejs', {banners: data});
            res.banners = data;
            next();
        }
    });
});
server.get('/', (req, res, next) => {
    // console.log(res.banners);
    //查询新闻列表
    db.query('SELECT title,summary FROM `article_table`;', (err, data) => {
        if(err) {
            console.log('article_table出错：', err);
            res.status(500).send('databese error').end();
        } else {
            console.log('------------------------------------------------------------');
            // console.log(data);
            res.articles = data;
            next();
        }
    });
});
server.get('/', (req, res) => {
    res.render('index.ejs', {banners:res.banners, articles:res.articles});
});
server.get('/article', (req, res) => {
    res.render('conText.ejs', {});
});

//4.static数据
server.use(static('./www'));
