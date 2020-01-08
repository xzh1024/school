/**
 * Created by Admin on 2018/12/17.
 */
'use strict'
// const https = require('https');
const fs = require('fs');
var Promise = require('bluebird');
var _ = require('lodash');
var request = Promise.promisify(require('request'));
var util = require('./util');

//https://api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE
let prefix = 'https://api.weixin.qq.com/cgi-bin/';
let api = {
    accessToken: prefix + 'token?grant_type=client_credential',
    temporary: { //临时素材
        //新增
        upload: prefix + 'media/upload?',
        //获取https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID
        fetch: prefix + 'media/get?',
    },
    permanent: { //永久素材
        //新增其他类型永久素材
        upload: prefix + 'material/add_material?', //access_token=ACCESS_TOKEN&type=TYPE
        //获取https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=ACCESS_TOKEN
        fetch: prefix + 'material/get_material?',
        //新增图文素材
        uploadNews: prefix + 'material/add_news?', //access_token=ACCESS_TOKEN
        //上传图文消息内的图片获取URL(本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。图片仅支持jpg/png格式，大小必须在1MB以下)。
        uploadNewsPic: prefix + 'media/uploadimg?', //access_token=ACCESS_TOKEN
        //删除https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=ACCESS_TOKEN
        del: prefix + 'material/del_material?',
        //修改https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=ACCESS_TOKEN
        update: prefix + 'material/update_news?',
        //获取素材总数https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=ACCESS_TOKEN
        count: prefix + 'material/get_materialcount?',
        //获取素材列表https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=ACCESS_TOKEN
        batch: prefix + 'material/batchget_material?',
    }
};

//构造函数 生成实例
function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.fetchAccessToken();
    // this.getAccessToken()
    //     .then(function (data) {
    //         try{
    //             data = JSON.parse(data);
    //             // console.log('---------------------------------------');
    //             // console.log(data);
    //         }
    //             //文件不存在、不合法
    //         catch (e){
    //             console.log('文件不存在、不合法');
    //             //更新票据
    //             return that.updateAccessToken();
    //         }
    //
    //         //拿到票据，判断票据是否在有效期内
    //         if(that.isValidAccessToken(data)){
    //             console.log('拿到票据');
    //             console.log(data);
    //             // console.log(Promise.resolve(data));
    //             return Promise.resolve(data);
    //             // return data;
    //         }
    //         //不合法，过期的
    //         else {
    //             console.log('不合法，过期的')
    //             //更新票据
    //             return that.updateAccessToken();
    //         }
    //     })
    //     //拿到票据结果
    //     .then(function (data) {
    //         console.log(data);
    //         that.access_token = data.access_token;
    //         that.expires_in = data.expires_in;
    //
    //         //调用此方法，保存token
    //         that.saveAccessToken(data);
    //     })
}

//获取票据
Wechat.prototype.fetchAccessToken = function() {
    var that = this;
    if(this.access_token && this.expires_in){
        if(this.isValidAccessToken(this)){
            console.log('有效票据');
            return Promise.resolve(this);
        }
    }

    console.log('无效票据');
    this.getAccessToken()
        .then(function(data) {
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
                return Promise.resolve(data);
                // return data;
            }
            //不合法，过期的
            else {
                console.log('不合法，过期的');
                //更新票据
                return that.updateAccessToken();
            }
        })
        //拿到票据结果
        .then(function(data) {
            console.log(data);
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;

            //调用此方法，保存token
            that.saveAccessToken(data);

            return Promise.resolve(data);
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

//素材管理
// Wechat.prototype.uploadMaterial = function (type, filepath) {
Wechat.prototype.uploadMaterial = function (type, material, permanent) {
    //material: 如果是图文则传入一个数组，如果是图片或视频则传入一个路径
    var that = this;
    var form = {};
    var uploadUrl = api.temporary.upload;

    if(permanent){
        uploadUrl = api.permanent.upload;

        _.extend(form, permanent);
    }

    if(type === 'pic'){ //图片
        uploadUrl = api.permanent.uploadNewsPic;
    }
    if(type === 'news'){ //图文
        uploadUrl = api.permanent.uploadNews;
        form = material;
    } else {
        form.media = fs.createReadStream(material);
    }

    // var form = {
    //     media: fs.createReadStream(filepath)
    // };

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('素材管理:');
                // var url = api.upload + '&access_token=' + data.access_token + '&type=' + type;
                var url = uploadUrl + '&access_token=' + data.access_token;

                if(!permanent){
                    url += '&type=' + type;
                } else {
                    form.access_token = data.access_token;
                }

                var options = {
                    method: 'POST',
                    url: url,
                    json: true
                };

                if(type === 'news'){
                    options.body = form;
                } else {
                    options.formData = form;
                }

                //发起请求
                request(options).then(function (response) {
                    console.log('上传素材结果：');
                    console.log(response.body);
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('Upload material fails');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};

//获取素材
Wechat.prototype.fetchMaterial = function (mediaId, type, permanent) {
    var that = this;
    var fetchUrl = api.temporary.fetch;

    if(permanent){
        fetchUrl = api.permanent.fetch;
    }

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取素材:');
                var url = fetchUrl + '&access_token=' + data.access_token;
                var form = {};
                var options = {
                    method: 'POST',
                    url: url,
                    json: true
                };
                if(permanent){
                    form.media_id = mediaId;
                    form.access_token = data.access_token;
                    options.body = form;
                } else {
                    if(type === 'video'){
                        url = url.replace('https://', 'http://');
                    }

                    url += '&media_id=' + mediaId;
                }

                console.log(url);
                if(type === 'news' || type === 'video'){
                    //发起请求
                    request(options).then(function (response) {
                        console.log('获取素材结果：');
                        console.log(response.body);
                        let _data = response.body;

                        if(_data){
                            console.log('成功：');
                            resolve(_data);
                        } else {
                            console.log('失败：');
                            throw new Error('fetch material fails');
                        }
                    }).catch(function (err) {
                        console.log('err：');
                        reject(err);
                    });
                } else {
                    resolve(url);
                }
            })
    });
};
//删除素材
Wechat.prototype.deleteMaterial = function (mediaId) {
    var that = this;
    var form = {
        media_id: mediaId
    };

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('删除永久素材:');
                var url = api.permanent.del + '&access_token=' + data.access_token + '&media_id=' + mediaId;

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('删除素材结果：');
                    console.log(response.body);
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('delete material fails');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};

//更新素材
Wechat.prototype.updateMaterial = function (mediaId, news) {
    var that = this;
    var form = {
        media_id: mediaId
    };

    _.extend(form, news);

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('更新永久素材:');
                var url = api.permanent.update + '&access_token=' + data.access_token + '&media_id=' + mediaId;

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('更新素材结果：');
                    console.log(response.body);
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('update material fails');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};
//获取素材总数
Wechat.prototype.countMaterial = function () {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取素材总数:');
                var url = api.permanent.count + '&access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    json: true
                }).then(function (response) {
                    console.log('获取素材总数结果：');
                    console.log(response.body);
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('count material fails');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};
//获取素材列表
Wechat.prototype.batchMaterial = function (options) {
    //material: 如果是图文则传入一个数组，如果是图片或视频则传入一个路径
    var that = this;

    options.type = options.type || 'image';
    options.offset = options.offset || 0;
    options.count = options.count || 1;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取素材列表:');
                var url = api.permanent.batch + '&access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: options,
                    json: true
                }).then(function (response) {
                    console.log('获取素材列表结果：');
                    console.log(response.body);
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('batch material fails');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
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


