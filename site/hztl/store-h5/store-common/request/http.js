import axios from "axios"
import wx from "weixin-js-sdk";
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(url, {
        params: params
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data)
        });
    });
}
export function united_get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(axios.defaults.unitedURL+url, {
        params: params
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data)
        });
    });
}
export function basic_get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(axios.defaults.basicURL+url, {
        params: params
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data)
        });
    });
}
export function pay_get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(axios.defaults.payURL+url, {
        params: params
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data)
        });
    });
}
export function athena_get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(axios.defaults.athenaURL+url, {
        params: params
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    });
}
export function united_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.unitedURL+url, params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    });
}
export function basic_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.basicURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    })
}
export function pay_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.payURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    })
}

export function pay_url_path(url) {
    url = url.replace("https://", "").replace("http://","");
    let toResult = "";
    url.split("/").forEach((path, index) => {
        if (index>0){
            toResult+="/"+path;
        }
    });
    return toResult;
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
                reject(res.data.message);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    });
}
export function united_put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(axios.defaults.unitedURL+url, params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else if (res.data.code == "token-err") {
                if(axios.prototype.isH5){
                    window.location.href='/passwordLogin';
                }else{
                    localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
                    window.location.href='/login'
                }
                reject(res.data.message);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        });
    });
}
export function GetQueryString(name){      //获取URL传参
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var value = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (value != null) return value[2]; return null; //返回参数值
}
export function qiniu_access_token(){
    return new Promise((resolve, reject) => {
        get('/img/upToken').then((data)=>{
            resolve(data);
        }).catch((message) => {
            reject(message);
        });
    });
}
export function timeFormat(time, type) {
    if (!time) {
        return "";
    }
    type = (type ? type : "") + "";
    time = new Date(time.replace(/-/g, '/'));
    var year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var timeStr = " " + hour + ":" + minute + ":" + second;
    if (type.search("notime") != -1) {
        timeStr = "";
    } else if (type.search("nosecond") != -1) {
        timeStr = " " + hour + ":" + minute;
    }
    var separatorYear = "/";
    var separatorMonth = "/";
    var separatorDay = "";
    if (type.search("zh-cn") != -1) {
        separatorYear = "年";
        separatorMonth = "月";
        separatorDay = "日";
    }
    if (type == 1) {
        separatorYear = ".";
        separatorMonth = ".";
        timeStr = "";
    }
    if (type.search('noyear') != -1) {
        return month + separatorMonth + date + separatorDay + timeStr;
    } else {
        return year + separatorYear + month + separatorMonth + date + separatorDay + timeStr;
    }
}
export function wxConfig(){
    return new Promise((resolve, reject) => {
    axios({
        method: "get",
        url: "/offiaccount/js-sdk-sign",
        params: {
            url: window.location.href,
            allianceId: axios.prototype.allianceId
        } //向服务端提供授权url参数，并且不需要#后面的部分
        }).then(res => {
        //注册微信工具
            if (res.data.code == "ok") {
                wx.config({
                debug: false, // 开启调试模式,
                appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.data.signature, // 必填，签名，见附录1
                jsApiList: ["chooseImage", "uploadImage", "getLocalImgData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
            resolve(true)
        })
        .catch((err)=>{
            reject(err)
        });
    })
}
export function getTitle() {
    switch (location.hostname) {
        case "hdqp.hztl3.com":
            return "邯郸汽配平台";
        default:
            return "合众通联商城";
    }
}
