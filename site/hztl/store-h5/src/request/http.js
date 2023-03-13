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