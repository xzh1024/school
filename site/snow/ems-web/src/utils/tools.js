import JSEncrypt from 'jsencrypt';
import storage from './storage';

export const phoneRegExp = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

export const expressRegExp = /^[A-Za-z0-9-]{4,35}$/;

/**
 * @function downloadByUrl
 * @description 通过链接下载文件到本地
 * @param {string} url
 * @param {string} fileName
 * @return {void}
 */
export const downloadByUrl = (url, fileName) => {
  const nodeA = document.createElement('a');
  nodeA.href = url;
  nodeA.style.display = 'none';
  nodeA.download = `${new Date().getTime()}-${fileName}`;
  document.body.appendChild(nodeA);
  nodeA.click();
  document.body.removeChild(nodeA);
};

/**
 * @function downloadByBlob
 * @description 通过文件流下载文件
 * @param {Blob} data
 * @param {string} fileName
 * @return {void}
 */
export const downloadByBlob = (data, fileName) => {
  console.log(fileName, 9999);
  const url = window.URL.createObjectURL(data);

  const nodeA = document.createElement('a');
  nodeA.href = url;
  nodeA.style.display = 'none';
  nodeA.download = fileName;
  document.body.appendChild(nodeA);
  nodeA.click();
  document.body.removeChild(nodeA);
};

/**
 * @function getParamsByUrl
 * @description 获取url上的参数
 * @param {string | undefined} key 参数key值
 * @param {string | undefined} defaultValue 没有该参数时的默认值
 * @return {object | any} 没有key参数时返回一个key-value
 */
export const getParamsByUrl = (key, defaultValue = undefined) => {
  if (location.search.length === 0) {
    return defaultValue;
  }
  const paramsArr = location.search.slice(1).split('&');
  const params = {};
  paramsArr.forEach(item => {
    const [objKey, value] = item.split('=');
    params[objKey] = value;
  });

  if (key) {
    return params[key] || defaultValue;
  }

  return params;
};

/**
 * @function setTokenByUrl
 * @description 获取url中的token持久化
 * @return {boolean | undefined} 成功返回true
 */
export const setTokenByUrl = (key = 'token') => {
  const search = location.search;
  if (search.length === 0) {
    return false;
  }
  const paramsArr = search.slice(1).split('&');
  const params = {};
  paramsArr.forEach(item => {
    const [objKey, value] = item.split('=');
    params[objKey] = value;
  });

  if (params[key]) {
    storage.set(key, params[key], 'sessionStorage');
    location.href = location.origin + location.pathname + search.replace(`${key}=${params[key]}`, '');
    return true;
  }
};

/**
 * @function hexToRgba
 * @description 将16进制颜色转化为rgba
 * @param {string} hexColor 16进制字符串
 * @param {number} alpha 透明度
 * @return {string} 返回 rgba字符串
 */
export const hexToRgba = (hexColor, alpha = 0.5) => {
  // 移除 # 号并提取颜色值
  var hex = hexColor.replace('#', '');

  // 将颜色值拆分成 R、G、B 三个部分
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // 转换为 RGBA 格式并添加透明度
  var rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return rgba;
};

/**
 * @function getValueByPath
 * @description 通过xxx.xxx.xxx来访问对象值
 * @param {string} hexColor 16进制字符串
 * @param {number} alpha 透明度
 * @return {string} 返回 rgba字符串
 */
export const getValueByPath = (obj = {}, path = '', defaultValue = undefined) => {
  let paths = path.split('.'); //[xxx,yyy,zzz,...]

  let res = obj;
  let prop;
  while ((prop = paths.shift())) {
    res = res[prop];
    if (!res && paths.length > 0) {
      return defaultValue;
    }
  }
  return res;
};

export const encrypt = word => {
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let password = encrypt.encrypt(word); // rac加密后的字符串
  console.log(password, word, 29393);
  return password;
};

/**
 * @function toHump
 * @description 下划线转换成驼峰
 * @param {string} str
 * @return {string} 返回 驼峰格式字符串
 */
export function toHump(str) {
  return str.toLowerCase().replace(/_(.)/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

/**
 * @function toLine
 * @description 驼峰转换下划线
 * @param {string} str
 * @return {string} 返回 下划线格式字符串
 */
export function toLine(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
