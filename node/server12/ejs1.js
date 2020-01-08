/**
 * Created by Admin on 2018/9/20.
 */
const express = require('express');
const fs = require('fs');
// const ejs = require('ejs');

var server = express();

server.use('/', function (req, res) {
    // ejs.renderFile('./views/1.ejs', {name: '张三'}, function (err, data) {
    //     if(err){
    //         console.log('编译失败');
    //     } else {
    //         res.send(data);
    //         res.end();
    //     }
    // });
    // res.render('1.ejs', {name: '王五'}, function (err, html) {
    //     if(err){
    //         console.log('编译失败');
    //     } else {
    //         res.send(html);
    //         res.end();
    //     }
    // });
    res.render('1.ejs', {name: '马六'}, function (err, html) {
        if(err){
            console.log('编译失败');
        } else {
            fs.writeFile('./build/ejs1.html', html, function (err) {
                if (err){
                    console.log(err);
                } else {
                    console.log('文件已保存！');
                    res.send(html);
                    res.end();
                }
            });
        }
    });
});

server.listen(8081, function () {
    console.log('服务器已启动...')
});