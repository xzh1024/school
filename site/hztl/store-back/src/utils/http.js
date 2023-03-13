import axios from "axios"
import * as qiniu from "qiniu-js";
import $ from 'jquery'
import { envConfig } from "envConfigPath";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

/* 根据不同的运行环境请求不同的接口 */
axios.defaults.unitedURL =envConfig.unitedURL;
axios.defaults.accountsURL = envConfig.accountsURL;
axios.defaults.basicURL = envConfig.basicURL;
axios.defaults.payURL = envConfig.payURL;

// axios.interceptors.response.use(
//     response => {
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 
//     // 否则的话抛出错误
//         if (response.status === 200&&response.data.code=="ok") {
//             return Promise.resolve(response.data.data);
//         } else {
//             Message.error(response.data.message);
//             return Promise.reject(response.data.message);
//         }
//     },
//     // 服务器状态码不是2开头的的情况
// // 这里可以跟你们的后台开发人员协商好统一的错误状态码 
// // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
// // 下面列举几个常见的操作，其他需求可自行扩展
//     error => {
//         if (error.response.status) {
//             switch (error.response.status) {
//                 // 404请求不存在
//             case 404:
//                 Message.error('网络请求不存在');
//                 break;
//                 // 其他错误，直接抛出错误提示
//             default:
//                 Message.error(error.response.data.message);
//             }
//             return Promise.reject(error.response);
//         }
//     }
// )
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
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data) 
        }) 
    });
}
export function accounts_get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(axios.defaults.accountsURL+url, {  
        params: params 
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data) 
        }) 
    });
}
export function basic_get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(axios.defaults.basicURL+url, {  
        params: params 
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data) 
        }) 
    });
}
export function pay_get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(axios.defaults.payURL+url, {  
        params: params 
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        }).catch(err =>{
            reject(err.data) 
        }) 
    });
}
export function chats_get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(axios.defaults.chatsURL+url, {  
        params: params 
        }).then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
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
        axios.post(axios.defaults.unitedURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
        });
}
export function accounts_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.accountsURL+url, params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
        });
}
export function basic_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.basicURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
        });
}
export function pay_post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(axios.defaults.payURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
        });
}
export function accounts_put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(axios.defaults.accountsURL+url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url,params)
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
export function Delete(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url,{data:params})
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
export function accounts_delete(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(axios.defaults.accountsURL+url,{data:params})
        .then(res => {
            if(res.data.code=="ok"){
                resolve(res.data.data);
            }else{
                reject(res.data.message)
            }
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
export function GetQueryString(name){      //获取URL传参
    let after ='?'+ window.location.hash.split("?")[1];
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var value = after.substr(1).match(reg);  //匹配目标参数
    if (value != null) return value[2]; return null; //返回参数值
}
export function timeFormat(time, type) {
    if (!time) {
        return "";
    }
    type = (type ? type : "") + "";
    time = new Date(time);
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
    if(type == 2){
        separatorYear = "-";
        separatorMonth = "-";
        timeStr = "";
    }
    if (type.search('noyear') != -1) {
        return month + separatorMonth + date + separatorDay + timeStr;
    } else {
        return year + separatorYear + month + separatorMonth + date + separatorDay + timeStr;
    }
}

export function precisionNumber(number){
    if(!number){
        return 0;
    }
    var nf = parseFloat(number);
    if(!Number.isNaN(nf)){
        return parseFloat(number.toFixed(10));
    }
}
export function getToken(file) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: axios.defaults.accountsURL + "/img/upToken",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if (data.code == "ok") {
                    let sendData = data.data;

                    let observer = {
                    error(err) {
                        reject(err);
                    },
                    complete(res) {
                        if (res && res.key) {
                        resolve({
                            previewUrl: sendData.httpUrl,
                            url: sendData.url
                        });
                        } else {
                        resolve(false);
                        }
                    }
                    };
                    let putExtra = {
                        fname: file.name,
                        params: {},
                        mimeType: ["image/png", "image/jpeg", "image/jpg"]
                    };
                    let config = {
                        useCdnDomain: true,
                        region: "z1"
                    };

                    let options = {
                        qulity: 0.92,
                        noCompressIfLarger: true
                        // maxWidth: 800
                    };
                    //上传前压缩
                    qiniu.compressImage(file, options).then(data => {
                    let observable = qiniu.upload(
                        data.dist,
                        sendData.key,
                        sendData.token,
                        putExtra
                        //   config
                    );
                    let subscription = observable.subscribe(observer); // 上传开始
                    });
                } else {
                    reject();
                }
            }
        });
    });
}

export function isObjEqual(o1,o2){
	var props1 = Object.getOwnPropertyNames(o1);
    var props2 = Object.getOwnPropertyNames(o2);
    if (props1.length != props2.length) {
        return false;
    }
    for (var i = 0,max = props1.length; i < max; i++) {
        var propName = props1[i];
        if (o1[propName] !== o2[propName]) {
            return false;
        }
    }
    return true;
}
export function randomCode(length) {
    let codeArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_','-','$','%','&','@','+','!'];
    let ranCode = '';
    let codeArrLen = codeArr.length;
    for (var i=0; i<length; i++){
        var x = Math.floor(Math.random()*codeArrLen);
        ranCode += codeArr[x];
    }
    return ranCode;
}
export function convertCurrency(money) {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money == '') { return ''; }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
        return '';
    }
    if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
            zeroCount++;
            } else {
            if (zeroCount > 0) {
                chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}