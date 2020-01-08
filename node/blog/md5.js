/**
 * Created by Admin on 2018/11/23.
 */
// const crypto = require('crypto'); //引入加密模块
//
// var obj = crypto.createHash('md5');
//
// obj.update('123456');
//
// var str = obj.digest('hex');  //16进制结果
//
// console.log(str);

const common = require('./libs/common'); //引入加密模块

// var str = common.md5(common.md5('555555'));
var str = common.md5('123456'+common.MD5_SUFFIX);
console.log(str);