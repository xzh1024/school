/**
 * Created by Admin on 2018/9/18.
 */
const express = require('express');

var server = express();

//cookie
server.use('/aaa/a.html', function (req, res) {
    //发送cokie
    res.cookie('user', 'blue', {path: '/aaa', maxAge: 30*24*3600*1000});
    res.send('ok');
    res.end();
});

server.listen(8081, function () {
    console.log('服务器启动成功...')
});