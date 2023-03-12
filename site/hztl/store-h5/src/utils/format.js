import dayjs from "dayjs";

export function dateFormat(date, rule = "YYYY-MM-DD") {
  return date ? dayjs(date).format(rule) : "";
}

export function dateFormatFull(date) {
  return dateFormat(date, "YYYY-MM-DD HH:mm");
}

export function dateFormatToSecond(date) {
  return dateFormat(date, "YYYY-MM-DD HH:mm:ss");
}

export function formatDate(fmt, date) {
  if (typeof date === "number") {
    date = new Date(date);
  }
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
