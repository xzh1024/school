/**
 * Created by Admin on 2018/9/19.
 */

const jade = require('jade');
const fs = require('fs');

// var str = jade.render('html');
var str = jade.renderFile('./views/3.jade', {pretty: true});

console.log(str);

fs.writeFile('./build/jade3.html', str, function (err) {
    if (err)
        console.log(err);
    else
        console.log('文件已保存！');
});

