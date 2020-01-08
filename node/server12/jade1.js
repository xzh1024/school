/**
 * Created by Admin on 2018/9/19.
 */
const jade = require('jade');

// var str = jade.render('html');
var str = jade.renderFile('./views/2.jade', {pretty: true});

console.log(str);
