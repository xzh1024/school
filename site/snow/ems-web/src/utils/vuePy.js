
import { pinyin } from './pinyin.js';
export default {
  chineseToPinYin: function (l1) {
    let l2 = l1.length;
    let I1 = '';
    let reg = new RegExp('[a-zA-Z0-9]');
    for (let i = 0; i < l2; i++) {
      let val = l1.substr(i, 1);
      let name = this.arraySearch(val, pinyin);
      if (reg.test(val)) {
        I1 += val;
      } else if (name !== false) {
        I1 += name;
      }
    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-');
    }
    return I1;
  },
  arraySearch: function (l1, l2) {
    for (let name in pinyin) {
      if (pinyin[name].indexOf(l1) !== -1) {
        return this.ucfirst(name);
      }
    }
    return false;
  },
  ucfirst: function (l1) {
    if (l1.length > 0) {
      let first = l1.substr(0, 1).toUpperCase();
      let spare = l1.substr(1, l1.length);
      return first + spare;
    }
  }
};