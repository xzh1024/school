// 屏幕尺寸变化时,echarts自适应
import type { EChartsType } from 'echarts';
class Resize {
  echartsArr: Array<EChartsType>;
  constructor() {
    this.echartsArr = [];
  }
  // add echarts into echartsArr
  add(instance: EChartsType) {
    this.echartsArr.push(instance);
  }
  // update view
  update() {
    this.echartsArr.forEach((item) => {
      item.resize();
    });
  }
}
export default new Resize();
