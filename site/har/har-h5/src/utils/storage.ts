/**
 * 存储数据
 * @param {key} data1
 * @param {data} data2
 */
const setStoraged = (data1: string, data2: any) => {
  uni.setStorage({
    key: data1,
    data: JSON.stringify(data2)
  });
};
/**
 * 获取数据
 * @param {data} data1
 */
const getStoraged = (data1: string) => {
  const data = uni.getStorageSync(data1);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
/**
 * 删除本地数据
 * @param {key} data1
 */
const removeStoraged = (data1: string) => {
  uni.removeStorageSync(data1);
};
export { setStoraged, getStoraged, removeStoraged };
