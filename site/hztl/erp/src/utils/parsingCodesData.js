export default function parsingCodesData(string) {
  const rows = string.split("\n");
  const list = [];
  rows.forEach(item => {
    const rowsSplit = item.toUpperCase().split(/\t+/);
    let code = "",
      num = 1;

    if (rowsSplit.length === 1) {
      // 只粘贴一列
      num = 1;
      code = rowsSplit[0];
    } else if (rowsSplit[0] && rowsSplit[1]) {
      // 粘贴多列 只取用第一二列数据
      if (parseInt(rowsSplit[1]) == rowsSplit[1]) {
        num = rowsSplit[1];
        code = rowsSplit[0];
      } else if (parseInt(rowsSplit[0]) == rowsSplit[0]) {
        num = rowsSplit[0];
        code = rowsSplit[1];
      }
    }
    code = code.replace(/[^a-zA-Z0-9]+/g, "");
    num = parseInt(num);

    if (code) {
      const data = list.find(it => it.code === code);

      if (data) {
        data.num += num;
      } else {
        list.push({
          code,
          num
        });
      }
    }
  });
  return list;
}
