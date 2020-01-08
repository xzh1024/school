/**
 * Created by Admin on 2018/9/18.
 */
const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.use(cookieParser('wdsdwesadvxaiyuerew'));

//cookie
server.use('/', function (req, res) {
    res.clearCookie('user'); //清除Cookie
    res.send('ok');
    res.end();
});

server.listen(8081, function () {
    console.log('服务器启动成功...')
});