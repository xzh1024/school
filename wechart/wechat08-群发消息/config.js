/**
 * Created by Admin on 2018/12/19.
 */
var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');

var config = {
    wechat: {
        appID: 'wxfb63a450ad4fea74',
        // appID: 'wxf7cb5c507d9eeca5',
        appSecret: '35d04dd9f94f7bca2b9b9ed33009302d',
        // appSecret: 'f052e158329f3ef3f3e2995ec03a22f2',
        token: 'weixin',
        // token: 'wechatToken',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
}

module.exports = config;