/*
 * @Author: Yong
 * @Date: 2021-10-25 14:21:33
 * @LastEditors: Yong
 * @LastEditTime: 2021-10-25 15:06:08
 * @Description: 页面数据本地缓存工具集
 */
const saveKey = "pageData";
class Local {
  set(path: string, value: Record<string, any>): void {
    const storage = this.get();
    storage[path] = Object.assign(storage[path] || {}, value);
    localStorage.setItem(saveKey, JSON.stringify(storage));
  }
  get(path?: string): Record<string, any> {
    const pageData = JSON.parse(localStorage.getItem(saveKey) || "{}");
    return path ? pageData[path] || {} : pageData;
  }
}

export default new Local();
