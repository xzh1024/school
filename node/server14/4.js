/**
 * Created by Admin on 2018/9/21.
 */
const ejs = require('ejs');

ejs.renderFile('./views/4.ejs', {type: 'admin'}, function (err, data) {
    console.log(data);
});