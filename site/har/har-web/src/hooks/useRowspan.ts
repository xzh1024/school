import { reactive } from 'vue';

const data = reactive<any>({
  tableData: [],
  colSpanArr: [],
  rowIndexArr: [],
  colNum: 1
});
/**
 * @params prop:string 合并依据的属性
 * @params dataList:object[] 数据源
 * @params colNum:number 对colNum列执行合并操作
 * */
const getColSpanData = (prop: string, dataList: any, colNum?: number) => {
  data.colNum = colNum;
  if (dataList && dataList.length) {
    let colLength = 1;
    dataList.forEach((element: any, index: number) => {
      if (index === 0) {
        data.rowIndexArr = [];
        data.colSpanArr = [];
        data.rowIndexArr.push(0);
        colLength = 1;
      } else if (index > 0) {
        if (element[prop] === dataList[index - 1][prop]) {
          // 当相邻两条数据相等时，rowspan+1,即colLength+1
          colLength += 1;
          // 当最后一条数据与倒数第2条不等式，在colSpanArr中push(1)
          if (index === dataList.length - 1) {
            data.colSpanArr.push(colLength);
          }
        } else {
          //  相邻两条不等时push index和合并的长度
          data.colSpanArr.push(colLength);
          data.rowIndexArr.push(index);
          if (index === dataList.length - 1) {
            data.colSpanArr.push(1);
          }
          colLength = 1;
        }
      }
    });
    data.rowIndexArr.push(dataList.length);
  }
};
const SpanMethod = ({ rowIndex, columnIndex }: any) => {
  if (columnIndex <= data.colNum) {
    for (let i = 0; i < data.colSpanArr.length; i++) {
      if (rowIndex === data.rowIndexArr[i]) {
        return {
          rowspan: data.colSpanArr[i],
          colspan: 1
        };
      }
      if (
        rowIndex > data.rowIndexArr[i] &&
        rowIndex < data.rowIndexArr[i + 1]
      ) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
  return true;
};
export default function useRowspan() {
  return [getColSpanData, SpanMethod];
}
