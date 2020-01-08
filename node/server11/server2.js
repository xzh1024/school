/**
 * Created by Admin on 2018/9/18.
 */
const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.use(cookieParser('wdsdwes7ad21vxa4iyuerew')); //校验签名

//cookie
server.use('/', function (req, res) {
    req.secret = 'wdsdwes7ad21vxa4iyuerew'; //可省略，自动添加
    res.cookie('user', 'blue', {signed: true}); //签名
    console.log('签名cookie:',req.signedCookies); //签名过的cookie保存在signedCookies对象里
    console.log('无签名cookie:',req.cookies); //无签名的cookie保存在cookies对象里

    res.send('ok');
    res.end();
});

server.listen(8081, function () {
    console.log('服务器启动成功...')
});