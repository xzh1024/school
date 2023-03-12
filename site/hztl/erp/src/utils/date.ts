import dayjs from "dayjs";

export function dateFormat(date: Date | string | number, rule = "YYYY-MM-DD") {
  return date ? dayjs(date).format(rule) : "";
}

export function dateFormatFull(date: Date | string) {
  return dateFormat(date, "YYYY-MM-DD HH:mm");
}

export function dateFormatToSecond(date: Date | string) {
  return dateFormat(date, "YYYY-MM-DD HH:mm:ss");
}

export function getLimtCurTime(time: string, type = "time") {
  const curTime = new Date();
  let targetTime;
  if (type === "time") {
    targetTime = new Date();
    const [h, m, s] = time.split(":");
    targetTime.setHours(Number(h), Number(m), Number(s));
  } else if (type === "date") {
    targetTime = new Date(time);
  } else {
    // 设置错误当成date
    targetTime = new Date(time);
  }
  return parseInt(
    ((targetTime.getTime() - curTime.getTime()) / 1000).toString()
  );
}

export function formateTime(time: string) {
  const date = new Date(time);
  const year = date.getFullYear(); //获取当前年份
  const mon = date.getMonth() + 1; //获取当前月份
  const da = date.getDate(); //获取当前日
  const h = date.getHours(); //获取小时
  const m = date.getMinutes(); //获取分钟
  const s = date.getSeconds(); //获取秒
  let submitTime = "";
  submitTime += year + "-";

  if (mon >= 10) {
    submitTime += mon + "-";
  } else {
    submitTime += "0" + mon + "-";
  }
  if (da >= 10) {
    submitTime += da;
  } else {
    submitTime += "0" + da;
  }
  submitTime += " ";
  if (h >= 10) {
    submitTime += h + ":";
  } else {
    submitTime += "0" + h + ":";
  }
  if (m >= 10) {
    submitTime += m + ":";
  } else {
    submitTime += "0" + m + ":";
  }
  if (s >= 10) {
    submitTime += s;
  } else {
    submitTime += "0" + s;
  }
  return submitTime;
}

export default dayjs;
