/**
 * Created by Admin on 2018/9/25.
 */
const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const jade = require('jade');

var server = express();

server.listen(8080);

//1.解析cookie
server.use(cookieParser('sadkflkafklasf23asfasfasffdafa'));

//2.使用session
var arr = [];
for(let i = 0; i < 100000; i++){
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './upload'}).any());

//用户请求
server.use('/', function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.session);
});

//4.static数据
server.use(static('./www'));