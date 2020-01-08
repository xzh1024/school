/**
 * Created by Admin on 2018/9/21.
 */
const ejs = require('ejs');

ejs.renderFile('./views/1.ejs', {json: {arr: [
    {user: 'blue', pass: '123456'},
    {user: 'zhangsan', pass: '654321'},
    {user: 'xiaoming', pass: '000000'},
]}}, function (err, data) {
    console.log(data);
});