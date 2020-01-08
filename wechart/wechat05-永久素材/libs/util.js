/**
 * Created by Admin on 2018/12/12.
 */
'use strict'
const fs = require('fs');
const Promise = require('bluebird');

//读取
exports.readFileAsync = function (fpath, encodnig) {
    console.log(fpath);
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encodnig, (err, data) => {
            if (err) throw err;
            else console.log(data);resolve(data);
        });
    })
};
//写入
exports.writeFileAsync = function (fpath, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, data, (err) => {
            if (err) throw err;
            else resolve();
        });
    })
};