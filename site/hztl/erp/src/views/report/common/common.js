function strNumSize(tempNum) {
  const stringNum = tempNum.toString();
  const index = stringNum.indexOf(".");
  let newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

export function toFixed2(num) {
  let m = 0;
  if (Number(num || 0)) {
    m = Number(num).toFixed(2);
  }
  return m;
}

export function unitConvert(num) {
  if (Number(num || 0)) {
    const moneyUnits = ["元", "万元", "亿元", "万亿元"];
    const dividend = 10000;
    let curentNum = Number(num);
    //转换数字
    let curentUnit = moneyUnits[0];
    //转换单位
    for (let i = 0; i < 4; i++) {
      curentUnit = moneyUnits[i];
      if (strNumSize(curentNum) < 5) {
        break;
      }
      curentNum = curentNum / dividend;
    }
    const m = curentNum.toFixed(2) + curentUnit;
    return m;
  } else {
    return 0;
  }
}

function change(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}
export function getDate() {
  //把日期区间设置为今天
  const d = new Date();
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());
  const dateStart = `${year}-${month}-${day}`;
  const dateEnd = `${year}-${month}-${day}`;
  return {
    dateStart: dateStart,
    dateEnd: dateEnd
  };
}

export function getCurMonth() {
  //把日期区间设置本月
  const d = new Date();
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());

  const monthFirstD = new Date();
  monthFirstD.setDate(1);
  const startDay = change(monthFirstD.getDate());

  const dateStart = `${year}-${month}-${startDay}`;
  const dateEnd = `${year}-${month}-${day}`;
  return {
    dateStart: dateStart,
    dateEnd: dateEnd
  };
}

export function getCurQuarter() {
  //把日期区间设置为本季度
  const d = new Date();
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());

  const quarterFirstD = new Date();
  const quarterFirstM = quarterFirstD.getMonth();
  if (quarterFirstM < 3) {
    quarterFirstD.setMonth(0);
  } else if (2 < quarterFirstM && quarterFirstM < 6) {
    quarterFirstD.setMonth(3);
  } else if (5 < quarterFirstM && quarterFirstM < 9) {
    quarterFirstD.setMonth(6);
  } else if (8 < quarterFirstM && quarterFirstM < 11) {
    quarterFirstD.setMonth(9);
  }
  quarterFirstD.setDate(1);
  const startMonth = change(quarterFirstD.getMonth() + 1);
  const startDay = change(quarterFirstD.getDate());

  const dateStart = `${year}-${startMonth}-${startDay}`;
  const dateEnd = `${year}-${month}-${day}`;
  return {
    dateStart: dateStart,
    dateEnd: dateEnd
  };
}

export function getCurYear() {
  //把日期区间设置为本年
  const d = new Date();
  const year = d.getFullYear();
  const month = change(d.getMonth() + 1);
  const day = change(d.getDate());

  const yearFirstD = new Date();
  yearFirstD.setMonth(0);
  yearFirstD.setDate(1);
  const startMonth = change(yearFirstD.getMonth() + 1);
  const startDay = change(yearFirstD.getDate());

  const dateStart = `${year}-${startMonth}-${startDay}`;
  const dateEnd = `${year}-${month}-${day}`;
  return {
    dateStart: dateStart,
    dateEnd: dateEnd
  };
}
