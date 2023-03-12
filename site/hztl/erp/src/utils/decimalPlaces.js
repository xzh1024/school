export default function(val, fixedNum = 0) {
  if (val === undefined) {
    return;
  }
  val = val.toString();
  if (fixedNum === 0) {
    //过滤纯数字
    val = val.replace(/[^\d]/g, "");
  } else {
    //过滤数字
    val = val.replace("。", ".").replace(/[^\d.]/g, "");
    //过滤小数符号
    val = val
      .replace(".", "@")
      .replace(/\./g, "")
      .replace("@", ".");
  }
  //过滤0
  val = val.replace(/^0\d+/, function(integerPart) {
    return parseInt(integerPart);
  });
  const matchFixed = val.match(new RegExp("\\d+\\.\\d{" + fixedNum + "}"));
  if (matchFixed) {
    val = matchFixed[0];
  }
  return val;
}
