/**
 * Created by Admin on 2018/9/18.
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

var server = express();

//cookie
server.use(cookieParser());
server.use(cookieSession({
    name: 'sess', //session的名字
    keys: ['aaa', 'bbb', 'ccc'], //密匙
    maxAge: 2*3600*1000 //session的过期时间
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