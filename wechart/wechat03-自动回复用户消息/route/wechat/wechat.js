/**
 * Created by Admin on 2018/12/17.
 */
'use strict'
// const https = require('https');
const fs = require('fs');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');

let prefix = 'https://api.weixin.qq.com/cgi-bin/';
let api = {
    accessToken: prefix + 'token?grant_type=client_credential',
    upload: prefix + 'media/upload'
};

//构造函数 生成实例
function Wechat(opts) {
    console.log('5555550');
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.getAccessToken()
        .then(function (data) {
            try{
                data = JSON.parse(data);
                // console.log('---------------------------------------');
                // console.log(data);
            }
                //文件不存在、不合法
            catch (e){
                console.log('文件不存在、不合法');
                //更新票据
                return that.updateAccessToken();
            }

            //拿到票据，判断票据是否在有效期内
            if(that.isValidAccessToken(data)){
                console.log('拿到票据');
                console.log(data);
                // console.log(Promise.resolve(data));
                return Promise.resolve(data);
                // return data;
            }
            //不合法，过期的
            else {
                console.log('不合法，过期的')
                //更新票据
                return that.updateAccessToken();
            }
        })
        //拿到票据结果
        .then(function (data) {
            console.log(data);
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;

            //调用此方法，保存token
            that.saveAccessToken(data);
        })
}
//原型链上添加判断票据是否过期的方法
Wechat.prototype.isValidAccessToken = function (data) {
    console.log('检查是否过期');
    if(!data || !data.access_token || !data.expires_in){
        return false
    }

    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now < expires_in){
        return true
    }
    else {
        return false
    }
};

//更新票据的方法
Wechat.prototype.updateAccessToken = function () {
    console.log('更新票据');
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken  + '&appid=' + appID + '&secret=' + appSecret;
    // console.log(url);

    return new Promise(function (resolve, reject) {
        console.log('发起请求');
        //发起请求
        request({
            url: url,
            json: true
        }).then(function (response) {
            // var data = response[1];
            let data = response.body;
            // console.log(response.body);
            // console.log(data);

            var now = (new Date().getTime());
            var expires_in = now + (data.expires_in - 20) * 1000;

            data.expires_in = expires_in;

            resolve(data);
        });

        // https.get(url, (response) => {
        //     // console.log('状态码：', response.statusCode);
        //     // console.log('请求头：', response.headers);
        //
        //     response.on('data', (d) => {
        //         // process.stdout.write(d);
        //         // console.log(Object.prototype.toString.call(d));
        //         var data = JSON.parse(Buffer.from(d).toString());
        //         console.log(data);
        //         var now = (new Date().getTime());
        //         var expires_in = now + (data.expires_in - 20) * 1000;
        //
        //         data.expires_in = expires_in;
        //
        //         resolve(data)
        //     });
        //
        // }).on('error', (e) => {
        //     console.error(e);
        // });
    });
};

//回复消息
Wechat.prototype.reply = function () {
    var content = this.body;
    var message = this.weixin;

    var xml = util.tpl(content, message);

    console.log('xml:');
    console.log(typeof xml);
    console.log(xml);
    this.status = 200; //回复的状态
    this.type = 'application/xml'; //回复的类型
    this.body = xml;

}

module.exports = Wechat;


