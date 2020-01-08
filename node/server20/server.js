/**
 * Created by Admin on 2018/9/30.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
// const ejs = require('ejs');
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

server.get('/', (req, res) => {
    // res.render('index.ejs', {});
    //查询banner的东西
    db.query('SELECT * FROM `banner_table`;', (err, data) => {
        if(err) {
            console.log('出错：', err);
            res.status(500).send('databese error').end();
        } else {
            console.log(data);
            res.render('index.ejs', {banners: data});
        }
    });
});
server.post('/upload', function (req, res) {
    // console.log(req.files);
    // console.log(req.files[0].originalname);
    // console.log(path.parse(req.files[0].originalname));
    var oldPath = req.files[0].path;
    var newPath = req.files[0].path + path.parse(req.files[0].originalname).ext;
    // console.log(newPath)
    fs.rename(oldPath, newPath, function (err) {
        if(err){
            res.send('上传失败');
        } else{
            // res.send('upload/' + path.win32.basename(newPath));
            let imgUrl = 'upload/' + path.win32.basename(newPath);
            console.log(imgUrl)
            //增加
            db.query('INSERT INTO `imgs_table` (`ID`, `src`) VALUES(0, "'+imgUrl+'");', (err, data) => {
                if(err) {
                    console.log('出错：', err);
                } else {
                    console.log('成功：', data);
                    // res.send(imgUrl);
                    //查询
                    db.query('SELECT * FROM `imgs_table`;', (err, data) => {
                        if(err) {
                            console.log('出错：', err);
                            res.status(500).send('databese error').end();
                        } else {
                            console.log(data);
                            res.render('imgs.ejs', {imgs: data});
                        }
                    });
                }
            });
        }
    });
});


//4.static数据
server.use(static('./www'));
