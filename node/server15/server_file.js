/**
 * Created by Admin on 2018/9/25.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
// const expressStatic = require('express-static');
const bodyParser = require('body-parser');  //解析post数据 enctype="application/x-www-form-urlencoded"
const multer = require('multer');   //解析post文件 enctype="multipart/form-data"

var server = express();

server.use('/static', express.static(path.join(__dirname, 'public'))); //访问静态资源
// server.use(objMulter.single('f1'));  //处理指定文件
/*
* .single(fieldname) - 单个文件上传
        接收一个名为fieldname的上传文件，所上传的文件会被保存在req.file。

* .array(fieldname[, maxCount]) - 多个文件上传
         接收名为fieldname的，多个上传文件数组。可选参数maxCount表示可接受的文件数量，
         上传文件数超出该参数指定的数据后会抛出一个错误。文件数组会被保存在req.files中。

* .fields(fields) - 多个文件上传
        接收通过fields指定的多个上传文件。文件数组对象会被保存在req.files中。
         fields是一个包含对象的数组，对象中会包含name和maxCount两个属性：
         [
         { name: 'avatar', maxCount: 1 },
         { name: 'gallery', maxCount: 8 }
         ]

 *.any() - 接收所有文件
        接收请求中的所有文件。上传文件数组会被保存在req.files中。
* */
server.use(multer({dest: './upload/'}).any());    //处理所有文件

server.post('/', function (req, res) {
    console.log(req.files);
    console.log(req.files[0].originalname);
    console.log(path.parse(req.files[0].originalname));
    var oldPath = req.files[0].path;
    var newPath = req.files[0].path + path.parse(req.files[0].originalname).ext;
    console.log(newPath)
    fs.rename(oldPath, newPath, function (err) {
        if(err)
            res.send('上传失败');
        else
            res.send('/static/upload/' + path.win32.basename(newPath));
    });
});
// server.use(expressStatic('./'));

server.listen(8081, function () {
    console.log('服务器已启动...');
});