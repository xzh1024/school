/**
 * Created by Admin on 2018/9/18.
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

var server = express();

//cookie
var arr = [];
//动态生成较多的key，加大破解难度
for(var i = 0; i < 100000; i++){
    arr.push('sig_'+ Math.random());
}

server.use(cookieParser());
server.use(cookieSession({
    name: 'sess',
    keys: arr,
    maxAge: 2*3600*1000
}));

server.use('/', function (req, res) {

    if(req.session['count'] == null){
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }
    console.log(req.session)
    res.send('ok');
    // res.end();
});

server.listen(8081, function () {
    console.log('服务器启动成功...')
});