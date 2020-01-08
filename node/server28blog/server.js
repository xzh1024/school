/**
 * Created by Admin on 2018/11/9.
 */
const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');  //Multer是nodejs中处理multipart/form-data数据格式(主要用在上传功能中）的中间件
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');    //模板引擎库 帮助express适配各种引擎
const expressRoute = require('express-route');


var server = express();
server.listen(8081, function () {
   console.log('服务器已启动...');
});

//1.获取请求数据
//get自带
server.use(multer({dest: './static/upload'}).any());

//2.cookie、session
server.use(cookieParser());
(function() {
    var keys = [];
    for(let i = 0; i < 100000; i++){
        keys[i] = 'a_'+Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20*60*1000  //20min
    }));
})();


//3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

//4.route
server.use('/', require('./route/web.js')());
server.use('/admin', require('./route/admin.js')());
// var router1 = require('./route/1.js');
// server.use('/article/', require('./route/1.js')());
// server.use('/article/', createRouter());
// function createRouter() {
//     var route = express.Router();
//     route.get('/1.html', function (req, res) {
//         res.send('我是文章111').end();
//     });
//     route.get('/2.html', function (req, res) {
//         res.send('我是文章222').end();
//     });
//     return route;
// }
// server.use('/blog/', require('./route/2.js')());
// var route2 = express.Router();
// server.use('/blog/', route2);
// route2.get('/1.html', function (req, res) {
//     res.send('我是blog1').end();
// });
// route2.get('/2.html', function (req, res) {
//     res.send('我是blog2').end();
// });

//5.default:static
server.use(static('./static/'));