/**
 * Created by Admin on 2018/9/28.
 */
const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
// const ejs = require('ejs');
// const jade = require('jade');
// const consolidate = require('consolidate');

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

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './upload'}).any());

//4.配置模板引擎
//模板文件放在哪儿
server.set('views', 'views');
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

server.get('/login.html', function (req, res) {
    console.log(req.query)
    if(req.query.username == 'xzh'){//登录过
        res.render('1.ejs', {name: '张三'})
    } else {
        res.render('login.ejs', {})
    }
});



//4.static数据
server.use(static('./www'));