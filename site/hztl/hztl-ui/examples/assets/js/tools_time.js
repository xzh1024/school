//时间戳转换成日期时间
function formatTimeStamp(unixtime, type, timeType) {
  let dateTime = new Date(unixtime);
  if (timeType) {
    dateTime = new Date(unixtime);
  }
  const year = dateTime.getFullYear();
  let month = dateTime.getMonth() + 1;
  let day = dateTime.getDate();
  let hour = dateTime.getHours();
  let minute = dateTime.getMinutes();
  let second = dateTime.getSeconds();
  // var now = new Date();
  // var now_new = Date.parse(now.toDateString());  //typescript转换写法
  // var milliseconds = now_new - dateTime;
  if (String(month).split("").length === 1) {
    month = "0" + month;
  }
  if (String(day).split("").length === 1) {
    day = "0" + day;
  }
  let timeSpanStr = year + "-" + month + "-" + day;
  if (type) {
    if (String(hour).split("").length === 1) {
      hour = "0" + hour;
    }
    if (String(minute).split("").length === 1) {
      minute = "0" + minute;
    }
    if (String(second).split("").length === 1) {
      second = "0" + second;
    }
    timeSpanStr =
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }
  return timeSpanStr;
}

export default formatTimeStamp;
