
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
    if (type.search('noyear') != -1) {
        return month + separatorMonth + date + separatorDay + timeStr;
    } else {
        return year + separatorYear + month + separatorMonth + date + separatorDay + timeStr;
    }
}