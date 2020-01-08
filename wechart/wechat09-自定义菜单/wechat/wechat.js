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
    //临时素材
    temporary: {
        //新增
        upload: prefix + 'media/upload?',
        //获取https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID
        fetch: prefix + 'media/get?',
    },
    //永久素材
    permanent: {
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
    },
    //标签管理
    tag: { //用户管理  group
        /*
        * 标签管理
        * */
        //一个公众号，最多可以创建100个标签
        //创建标签
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/create?access_token=ACCESS_TOKEN
        create: prefix + 'tags/create?',
        // 获取公众号已创建的标签
        // http请求方式：GET（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/get?access_token=ACCESS_TOKEN
        get: prefix + 'tags/get?',
        //编辑标签
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/update?access_token=ACCESS_TOKEN
        update: prefix + 'tags/update?',
        //删除标签
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=ACCESS_TOKEN
        delete: prefix + 'tags/delete?',
        //获取标签下粉丝列表
        // http请求方式：GET（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=ACCESS_TOKEN
        getlist: prefix + 'user/tag/get?',

        /*
         * 用户管理
         * */
        //标签功能目前支持公众号为用户打上最多20个标签。
        //批量为用户打标签
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=ACCESS_TOKEN
        batchtagging: prefix + 'tags/members/batchtagging?',
        //批量为用户取消标签
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=ACCESS_TOKEN
        batchuntagging: prefix + 'tags/members/batchuntagging?',
        //获取用户身上的标签列表
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=ACCESS_TOKEN
        check: prefix + 'tags/getidlist?'
    },
    user:{
        //设置用户备注名(开发者可以通过该接口对指定用户设置备注名，该接口暂时开放给微信认证的服务号。 接口调用请求说明)
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/create?access_token=ACCESS_TOKEN
        updateremark: prefix + 'user/info/updateremark?',
        //获取用户基本信息（包括UnionID机制）
        // http请求方式: GET
        // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
        info: prefix + 'user/info?',
        //批量获取用户基本信息
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN
        batchget: prefix + 'user/info/batchget?',
        //获取用户列表
        // http请求方式: GET（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
        list: prefix + 'user/get?',
        //获取公众号的黑名单列表
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=ACCESS_TOKEN
        getblacklist: prefix + 'tags/members/getblacklist?',
        //拉黑用户
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=ACCESS_TOKEN
        batchblacklist: prefix + 'tags/members/batchblacklist?',
        //取消拉黑用户
        // http请求方式：POST（请使用https协议）
        // https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=ACCESS_TOKEN
        batchunblacklist: prefix + 'tags/members/batchunblacklist?',
    },
    //消息管理
    mass:{
        //根据标签进行群发【订阅号与服务号认证后均可用】
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
        sendAll: prefix + 'message/mass/sendall?',
        //根据OpenID列表群发【订阅号不可用，服务号认证后可用】
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=ACCESS_TOKEN
        send: prefix + 'message/mass/send?',
        //删除群发【订阅号与服务号认证后均可用】
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=ACCESS_TOKEN
        delete: prefix + 'message/mass/delete?',
        //预览接口【订阅号与服务号认证后均可用】
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=ACCESS_TOKEN
        preview: prefix + 'message/mass/preview?',
        //查询群发消息发送状态【订阅号与服务号认证后均可用】
        // http请求方式: POST
        // https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token=ACCESS_TOKEN
        get: prefix + 'message/mass/get?',
        //事件推送群发结果
        //使用 clientmsgid 参数，避免重复推送
        //控制群发速度
        //设置群发速度
    },
    //自定义菜单
    menu:{
        //创建
        // http请求方式：POST（请使用https协议） https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
        create: prefix + 'menu/create?',
        //查询
        // http请求方式：GET
        // https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN
        get: prefix + 'menu/get?',
        //删除
        // http请求方式：GET
        // https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN
        delete: prefix + 'menu/delete?',
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

//创建标签
Wechat.prototype.createTag = function (name) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('创建标签:');
                var url = api.tag.create + 'access_token=' + data.access_token;
                var form = {
                    "tag": {
                        "name": name
                    }
                };
                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('创建标签结果：');
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

//获取已创建的标签
Wechat.prototype.getTag = function () {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取已创建的标签:');
                var url = api.tag.get + 'access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    json: true
                }).then(function (response) {
                    console.log('获取已创建的标签结果：');
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

//获取用户身上的标签列表
Wechat.prototype.checkTag = function (openId) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取用户身上的标签列表:');
                var url = api.tag.check + 'access_token=' + data.access_token;
                var form = {
                    "openid": openId
                };

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('获取用户身上的标签列表结果：');
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

//编辑标签（根据标签id修改标签name）
Wechat.prototype.updateTag = function (id, name) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('编辑标签:');
                var url = api.tag.update + 'access_token=' + data.access_token;
                var form = {
                    "tag": {
                        "id": id,
                        "name": name
                    }
                };

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('编辑标签结果：');
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

//删除标签
Wechat.prototype.deleteTag = function (id) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('删除标签:');
                var url = api.tag.delete + 'access_token=' + data.access_token;
                var form = {
                    "tag": {
                        "id": id
                    }
                };

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('删除标签结果：');
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

//获取标签下粉丝列表
Wechat.prototype.getlistTag = function (tagId, openId) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取标签下粉丝列表:');
                var url = api.tag.getlist + 'access_token=' + data.access_token;
                var form = {
                    "tagid": tagId,
                    "next_openid": openId //第一个拉取的OPENID，不填默认从头开始拉取
                };

                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('获取标签下粉丝列表结果：');
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

//批量为用户打标签
Wechat.prototype.batchtaggingTag = function (tagId, openIds) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('批量为用户打标签:');
                var url = api.tag.batchtagging + 'access_token=' + data.access_token;
                var form = {
                    // "openid_list" : [//粉丝列表
                    //     "ocYxcuAEy30bX0NXmGn4ypqx3tI0",
                    //     "ocYxcuBt0mRugKZ7tGAHPnUaOW7Y"
                    // ],
                    "openid_list" : openIds,
                    "tagid" : tagId
                };

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('批量为用户打标签结果：');
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
//批量为用户取消标签
Wechat.prototype.batchuntaggingTag = function (tagId, openIds) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('批量为用户取消标签:');
                var url = api.tag.batchuntagging + 'access_token=' + data.access_token;
                var form = {
                    // "openid_list" : [//粉丝列表
                    //     "ocYxcuAEy30bX0NXmGn4ypqx3tI0",
                    //     "ocYxcuBt0mRugKZ7tGAHPnUaOW7Y"
                    // ],
                    "openid_list" : openIds,
                    "tagid" : tagId
                };

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('批量为用户取消标签结果：');
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

//获取用户基本信息（包括UnionID机制）
Wechat.prototype.batchgetUser = function (openIds, lang) {
    var that = this;
    lang = lang || 'zh_CN'; //zh_CN 简体，zh_TW 繁体，en 英语

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取用户基本信息:');
                var url = '';

                var options = {
                    url: url,
                    json: true
                };
                if(Array.isArray(openIds)){
                    options.url = api.user.batchget + 'access_token=' + data.access_token;
                    options.method = 'POST';
                    let userList = [];
                    for(let i = 0,len = openIds.length; i < len; i++){
                        userList[i] = {};
                        userList[i].openid = openIds[i];
                        userList[i].lang = lang;
                    }
                    options.body = {
                        "user_list": userList
                    }
                } else {
                    options.url = api.user.info + 'access_token=' + data.access_token + '&openid=' + openIds + '&lang=' + lang;
                    options.method = 'GET';
                }
                //发起请求
                request(options).then(function (response) {
                    console.log('获取用户基本信息结果：');
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

//获取用户列表
Wechat.prototype.listUser = function (openId) {
    var that = this;
    openId = openId || ''; //第一个拉取的OPENID，不填默认从头开始拉取

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取用户列表:');
                var url = api.user.list + 'access_token=' + data.access_token + '&next_openid=' + openId;
                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    // body: form,
                    json: true
                }).then(function (response) {
                    console.log('获取用户列表结果：');
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

//获取公众号得黑名单列表
Wechat.prototype.getblacklistUser = function (openId) {
    var that = this;
    openId = openId || '';  //当 begin_openid 为空时，默认从开头拉取。

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('获取公众号得黑名单列表:');
                var url = api.user.getblacklist + 'access_token=' + data.access_token;
                var form = {
                    "begin_openid": openId
                };
                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('获取公众号得黑名单列表结果：');
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
//拉黑用户
Wechat.prototype.batchblacklistUser = function (openIds) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('拉黑用户:');
                var url = api.user.batchblacklist + 'access_token=' + data.access_token;
                var form = {
                    "openid_list": openIds
                };
                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('拉黑用户结果：');
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
//取消拉黑用户
Wechat.prototype.batchunblacklistUser = function (openIds) {
    var that = this;
    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('取消拉黑用户:');
                console.log(openIds);
                var url = api.user.batchunblacklist + 'access_token=' + data.access_token;
                var form = {
                    "openid_list": openIds
                };
                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: form,
                    json: true
                }).then(function (response) {
                    console.log('取消拉黑用户结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
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

/*
* 参数	是否必须	说明
* touser	是	填写图文消息的接收者，一串OpenID列表，OpenID最少2个，最多10000个
* mpnews	是	用于设定即将发送的图文消息
* media_id	是	用于群发的图文消息的media_id
* msgtype	是	群发的消息类型，图文消息为mpnews，文本消息为text，语音为voice，音乐为music，图片为image，视频为video，卡券为wxcard
* title	否	消息的标题
* description	否	消息的描述
* thumb_media_id	是	视频缩略图的媒体ID
* send_ignore_reprint	是	图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0。
* */
//根据标签进行群发【订阅号与服务号认证后均可用】
Wechat.prototype.sendAllMass = function (type, message, tagId) {
    var that = this;
    var msg = {
        "filter":{
        //     "is_to_all": false,
        //     "tag_id":2
        },
        // "mpnews":{
        //     "media_id": "qp8wEAvjkkdXGbGJwc9yNUKRc9wUlkwUxLMbHPRtoc8"
        // },
        "msgtype": type
        // "send_ignore_reprint": 0
    };

    msg[type] = message;

    if(!tagId){
        msg.filter.is_to_all = true;
    } else {
        msg.filter = {
            "is_to_all": false,
            "tag_id": tagId
        }
    }

    if(type === 'mpnews'){ //图文
        msg.send_ignore_reprint = 0;
    } else if(type === 'text'){

    } else if(type === 'voice'){ //语音、音频

    } else if(type === 'image'){

    } else if(type === 'video'){ //视频

    } else if(type === 'card'){ //卡券

    }

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('根据标签进行群发消息');
                var url = api.mass.sendAll + 'access_token=' + data.access_token;

                console.log('msg:');
                console.log(msg);
                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: msg,
                    json: true
                }).then(function (response) {
                    console.log('根据标签进行群发消息结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('null data');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};
//查询群发消息发送状态
Wechat.prototype.getMass = function (msgId) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('根据标签进行群发消息');
                var url = api.mass.get + 'access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: {
                        msg_id: msgId
                    },
                    json: true
                }).then(function (response) {
                    console.log('根据标签进行群发消息结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('null data');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};

//创建菜单
Wechat.prototype.createMenu = function (menu) {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('创建菜单');
                var url = api.menu.create + 'access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'POST',
                    url: url,
                    body: menu,
                    json: true
                }).then(function (response) {
                    console.log('创建菜单结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('null data');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};
//查询菜单
Wechat.prototype.getMenu = function () {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('查询菜单');
                var url = api.menu.get + 'access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    // body: form,
                    json: true
                }).then(function (response) {
                    console.log('查询菜单结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('null data');
                    }
                }).catch(function (err) {
                    console.log('err：');
                    reject(err);
                });
            })
    });
};
//删除菜单
Wechat.prototype.deleteMenu = function () {
    var that = this;

    return new Promise(function(resolve, reject) {
        that
            .fetchAccessToken()
            .then(function (data) {
                console.log('删除菜单');
                var url = api.menu.delete + 'access_token=' + data.access_token;

                //发起请求
                request({
                    method: 'GET',
                    url: url,
                    // body: form,
                    json: true
                }).then(function (response) {
                    console.log('删除菜单结果：');
                    let _data = response.body;

                    if(_data){
                        console.log('成功：');
                        console.log(_data);
                        resolve(_data);
                    } else {
                        console.log('失败：');
                        throw new Error('null data');
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
    console.log('content1:');
    console.log(content);

    var xml = util.tpl(content, message);

    console.log('xml:');
    console.log(typeof xml);
    console.log(xml);
    this.status = 200; //回复的状态
    this.type = 'application/xml'; //回复的类型
    this.body = xml;
}

module.exports = Wechat;


