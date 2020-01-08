/**
 * Created by Admin on 2018/11/22.
 */
const express = require('express');
// const path = require('path');
const static = require('express-static');
const bodyParser = require('body-parser');  //对post请求的请求体进行解析
const multer = require('multer');  //Multer是nodejs中处理multipart/form-data数据格式(主要用在上传功能中）的中间件
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');    //模板引擎库 帮助express适配各种引擎
// const expressRoute = require('express-route');


var app = express();


//1.获取请求数据
//get自带
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: './public/upload'}).any());

//2.cookie、session
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));  //访问静态资源
(function() {
    var keys = [];
    for(let i = 0; i < 100000; i++){
        keys[i] = 'a_'+Math.random();
    }
    app.use(cookieSession({
        name: 'session_id',
        keys: keys,
        maxAge: 20*60*1000  //20min
    }));
})();


//3.模板
app.engine('html', consolidate.ejs);
app.set('views', 'views');
app.set('view engine', 'html');//表示没有指定文件模板格式时，默认使用的引擎插件。如果这里设置为html文件，设置路由指定文件时，只需写文件名，就会找对应的html文件

//4.route
app.use('/', require('./route/web/web.js'));
app.use('/admin', require('./route/admin/admin.js')());
app.use('/weixin', require('./route/weixin/weixin.js'));

//5.default:static
app.use(static('./public/'));  //访问静态资源

app.listen(80, function () {
    console.log('服务器已启动...');
});