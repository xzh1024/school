/**
 * Created by Admin on 2018/11/27.
 */
common = {
    formatDate : function (timestamp, unit) {
        var time = timestamp?new Date(timestamp * 1000):new Date();
        var year = time.getFullYear();
        var month = '-' + (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1);
        var date = '-' + (time.getDate() < 10 ? '0'+time.getDate() : time.getDate());
        var hour = ' ' + (time.getHours() < 10 ? '0'+time.getHours() : time.getHours());
        var minute = ':' + (time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes());
        var second = ':' + (time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds());
        if(unit){
            if(unit == 's'){
                return year+month+date+hour+minute+second;
            } else if(unit == 'm'){
                return year+month+date+hour+minute;
            } else if(unit == 'D'){
                return year+month+date;
            } else if(unit == 'M'){
                return year+month;
            } else {
                return year+month+date;
            }
        } else {
            return year+month+date;
        }
    }
}