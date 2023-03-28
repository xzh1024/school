/**
 * 
 * 这个类由四部分组成：
 *    TrafficLight.colors ：交通灯颜色的常量属性。
 *    lightIndex ：一个变量，跟踪当前交通灯颜色的索引。
 *    light ：以字符串形式返回当前交通灯颜色的类属性。
 *    next() ：将红绿灯更改为下一个灯光颜色的功能。
 * 
 * **/

class TrafficLight {
  constructor() {
    this.lightIndex = 0;
  }

  static get colors() {
    return ['green', 'yellow', 'red'];
  }
  get light() {
    return TrafficLight.colors[this.lightIndex];
  }
  next() {
    this.lightIndex++;
    // This is intentionally wrong!
    if (this.lightIndex === TrafficLight.colors.length) {
      this.lightIndex = 0;
    }
  }
}

module.exports = TrafficLight;
