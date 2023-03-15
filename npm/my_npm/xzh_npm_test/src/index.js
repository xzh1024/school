// 引入依赖
import _ from 'lodash';
// 引入数据文件
import numRef from './ref.json';

// 导出工具函数 numToWord
export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}
// 导出工具函数 wordToNum
export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}