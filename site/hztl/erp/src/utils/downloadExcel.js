import XLSX from "xlsx";

function downloadExcel(tableData, columns, fileName) {
  const json = tableData.map(item => {
    const newItem = {};
    columns.forEach(column => {
      newItem[column.label] = item[column.prop];
    });
    return newItem;
  });
  const sheet = XLSX.utils.json_to_sheet(json);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "导入数据");
  XLSX.writeFile(wb, fileName);

  // let cashedata = json[0];
  // json.unshift({});
  // let keyMap = []; //获取keys
  // //keyMap =Object.keys(json[0]);
  // for (let k in cashedata) {
  //     keyMap.push(k);
  //     json[0][k] = {
  //         v: k
  //     };
  // }
  // let tmpdata = [];//用来保存转换好的json
  // json.map((cell, i) => {
  //     return keyMap.map((item, index) => {
  //         return Object.assign({}, cell[item], {
  //             position: (index > 25 ? getCharCol(index) : String.fromCharCode(65 + index)) + (i + 1)
  //         })
  //     })
  // }).reduce((prev, next) => prev.concat(next)).forEach((data) => {
  //         tmpdata[data.position] = {
  //             v: data.v,
  //             c: data.c
  //         };
  //         if (tmpdata[data.position].c) {
  //             tmpdata[data.position].c.hidden = true;
  //         }
  //     });
  // let outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10\
  // let tmpWB = {
  //     SheetNames: ['mySheet'], //保存的表标题
  //     Sheets: {
  //         'mySheet': Object.assign({},
  //             tmpdata, //内容
  //             {
  //                 '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
  //             })
  //     }
  // };
  // XLSX.writeFile(tmpWB, fileName);
}
//     tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
//         { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
//     ), {
//             type: ""
//         }); //创建二进制对象写入转换好的字节流
//     let href = URL.createObjectURL(tmpDown); //创建对象超链接
//     document.getElementById("hf").href = href; //绑定a标签
//     document.getElementById("hf").click(); //模拟点击实现下载
//     setTimeout(function () { //延时释放
//         URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
//     }, 100);
// }

// function s2ab(s) { //字符串转字符流
//     let buf = new ArrayBuffer(s.length);
//     let view = new Uint8Array(buf);
//     for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//     return buf;
// }
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
// function getCharCol(n) {
//     let s = '',
//         m = 0
//     while (n > 0) {
//         m = n % 26 + 1
//         s = String.fromCharCode(m + 64) + s
//         n = (n - m) / 26
//     }
//     return s
// }

export default downloadExcel;
