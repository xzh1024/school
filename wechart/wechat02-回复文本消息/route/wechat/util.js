/**
 * Created by Admin on 2018/12/17.
 */
'use strict'

var xml2js = require('xml2js');  //XML到JavaScript对象转换器。它支持双向转换。
var Promise = require('bluebird');

//解析XML数据(异步)
exports.parseXMLAsync = function (xml) {
    return new Promise(function(resolve, reject){
        //解析
        xml2js.parseString(xml, {trim: true}, function (err, content) {
            //拿到结果
            if(err) reject(err)
            else resolve(content)
        })
    });
};

//格式化数据
function formatMessage(result) {
    console.log('格式化数据');
    var message = {};

    if(typeof result === 'object'){
        var keys = Object.keys(result);  //得到一个包含result所有key的数组

        for(let i = 0; i < keys.length; i++){
            var item = result[keys[i]];
            var key = keys[i];

            if(!(item instanceof Array) || item.length === 0){ //如果不是一个数组或者长度为0
                continue  //开始循环的一次新迭代
            } else if(item.length === 1){
                let val = item[0];

                if(typeof val === 'object'){
                    message[key] = formatMessage(val);  //递归
                } else {
                    message[key] = (val || '').trim(); //string.trim()去除首位空格
                }
            } else { //既不是0也不是1说明是一个有多元素的数组
                message[key] = [];

                for (let j = 0, k = item.length; j < k; j++){
                    message[key].push(formatMessage((item[j])));
                }
            }
        }
    }

    return message;
}

//格式化数据
exports.formatMessage = formatMessage;