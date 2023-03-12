import axios from 'axios';
import dayjs from 'dayjs';
import { Ref, isRef } from 'vue';
import { cloneDeep } from 'lodash';
import { Message, Modal } from '@arco-design/web-vue';
// @ts-ignore
import { NodeJS } from 'timers';
import lsStore from '@/utils/ls-store';
import useToken from '@/composables/useToken';
import { SelectOptions, SelectValue } from '@/components/i-select/interface';
import { typeOf } from '@har/use';
import { isNumber, isString } from '@/utils/is';

export function routeFlat<T extends Recordable>(flatArr: T[]): T[] {
  const newArr: T[] = [];
  for (let i = 0, len = flatArr.length; i < len; i++) {
    const item = flatArr[i];
    if ('children' in item) {
      if (Array.isArray(item.children) && item.children?.length > 0) {
        const res = routeFlat(item.children);
        newArr.push(item, ...res);
      } else {
        newArr.push(item);
      }
    }
  }
  return newArr;
}

// 图片下载
export function download(src: string, name?: string, options?: Recordable) {
  const linkNode = document.createElement('a');
  if (options) {
    const params: Array<string> = [];
    for (const [k, v] of Object.entries(options)) {
      params.push(`${k}=${v && typeof v === 'object' ? JSON.stringify(v) : v}`);
    }
    if (params.length > 0) {
      src += `?${params.join('&')}`;
    }
  }
  linkNode.href = src;
  linkNode.target = '_blank';
  linkNode.download = name || '';
  linkNode.style.display = 'none';
  document.body.appendChild(linkNode);
  linkNode.click();
  document.body.removeChild(linkNode);
}

// @ts-ignore
const baseURL = import.meta.env.BASE_URL;
// 通用下载方法
export function ruoyiDownload(fileName: string) {
  window.location.href = `${baseURL}/common/download?fileName=${encodeURI(
    fileName
  )}&delete=${true}`;
}

// todo 待优化
// 部门id处理
export function deptTree(data: any[] = []): any {
  const hash: any = {};
  data = data.reverse();
  data?.forEach((item: any) => {
    const children =
      item.children && item.children.length ? item.children : null;
    if (hash[item.deptId]) {
      hash[item.deptId] = {
        children,
        ...item,
        ...hash[item.deptId]
      };
      if (!hash[item.parentId]) {
        hash[item.parentId] = {
          children: [hash[item.deptId]]
        };
      } else {
        hash[item.parentId].children.push(hash[item.deptId]);
      }
      delete hash[item.deptId];
    } else if (hash[item.parentId]) {
      hash[item.parentId].children.push({ ...item, children });
    } else {
      hash[item.parentId] = {
        children: [{ ...item, children }]
      };
    }
  });
  const arr = Object.values(hash);
  return arr.map((i: any) => (i.deptId ? i : i?.children?.[0]));
}

// 数字转中文数字
export function numToString(num: number) {
  const changeNum = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九'
  ];
  const unit = ['', '十', '百', '千', '万'];
  const getWan = (temp: number) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    const newArr: string[] = [];
    strArr.forEach((item, index) => {
      newArr.unshift(
        item === '0'
          ? changeNum[item]
          : changeNum[item as unknown as number] + unit[index]
      );
    });
    const numArr: number[] = [];
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n);
    });
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m;
          }
        } else {
          newNum += m;
        }
        newNum = newNum.replace(/^一十/, '十');
      });
    } else {
      newNum = newArr[0];
    }
    return newNum;
  };
  const overWan = Math.floor(num / 10000);
  let noWan: any = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan;
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
}
// 固定金额分期处理
export function getDistribute(total: number, s: number) {
  const a = total % s;
  const b = Math.floor(total / s);
  const arr = Array(s - a).fill(b);
  let i = 0;
  while (i < a) {
    arr.push(b + 1);
    i++;
  }
  return arr;
}

// 阿拉伯数字转中文
export function sectionToChinese(num: number) {
  let i;
  if (!/^\d*(\.\d*)?$/.test(`${num}`)) {
    return 0;
  }
  const AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const BB = ['', '十', '百', '千', '万', '亿', '点', ''];
  const a = `${num}`.replace(/(^0*)/g, '').split('.');
  let k = 0;
  let re = '';
  for (i = a[0].length - 1; i >= 0; i--) {
    // eslint-disable-next-line default-case
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp(`0{4}\\d{${a[0].length - i - 1}}$`).test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        // eslint-disable-next-line prefer-destructuring
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0')
      re = AA[0] + re;
    if (a[0].charAt(i) !== '0')
      re = AA[Number(a[0].charAt(i))] + BB[k % 4] + re;
    k++;
  }
  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (i = 0; i < a[1].length; i++) re += AA[Number(a[1].charAt(i))];
  }
  return re;
}

// 日期格式化
// 时间格式化
export const formatTime = (time?: string, rule?: string): string =>
  time ? dayjs(time).format(rule || 'YYYY-MM-DD HH:mm:ss') : '--';

// 字典处理 children
export function filterList(arr: any) {
  return arr.map((i: any) => {
    if (i.children && i.children.length) {
      i.children = filterList(i.children);
      i.isLeaf = false;
    } else {
      i.children = null;
      i.isLeaf = true;
    }
    return { ...i };
  });
}

interface dicType {
  key: string;
  value: any;
  children?: Array<dicType>;
}

// 处理树状结构最后一级children为空的情况
export function filterEmptyChildren(tree: dicType[]): Array<dicType> {
  return tree.map((item: any) => {
    const { children = [] } = item;
    if (children.length > 0) {
      item.children = filterEmptyChildren(children);
    } else {
      delete item.children;
    }
    return item;
  });
}
// 折叠表格数据去除空的children字段
export function formatData(arr: { [key: string]: any }[] = []) {
  arr.forEach((el: any) => {
    if (el.children && el.children.length === 0) {
      delete el.children;
    } else {
      formatData(el.children);
    }
  });
  return arr;
}
export function getArrayNumSum(arr: number[], fix = 2) {
  if (!Array.isArray(arr)) {
    throw new Error('arr不是数组');
  }
  return arr.reduce((total, el) => (el += total), 0).toFixed(fix);
}
export function getArrayObjSum(
  arr: { [key: string]: any }[] = [],
  key: string,
  fix = 2
) {
  if (!Array.isArray(arr)) {
    throw new Error('arr不是数组');
  }
  return arr.reduce((total, el) => (el[key] += total), 0).toFixed(fix);
}

function extend<T extends {}, K>(to: T, _from: K): T & K {
  return Object.assign(to, _from);
}

export function toObject<T extends Recordable>(arr: Array<T>): Recordable<T> {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

export function debounce(fn: () => void, delay = 200) {
  let timeout: NodeJS.Timeout | null = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
export const getPastDays = (s = 8) => {
  const t = new Date(Date.now() - 24 * 60 * 60 * 1000 * s);
  const t2 = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const y1 = t.getFullYear();
  const m1 = t.getMonth() + 1;
  const d1 = t.getDate();
  const y2 = t2.getFullYear();
  const m2 = t2.getMonth() + 1;
  const d2 = t2.getDate();
  return {
    startDate:
      y1 + '-' + (m1 <= 9 ? '0' + m1 : m1) + '-' + (d1 <= 9 ? '0' + d1 : d1),
    endDate:
      y2 + '-' + (m2 <= 9 ? '0' + m2 : m2) + '-' + (d2 <= 9 ? '0' + d2 : d2),
    standardStart: t,
    standardEnd: t2
  };
};
export const getRecentDays = (s = 8) => {
  const t = new Date(Date.now());
  const t2 = new Date(Date.now() + 24 * 60 * 60 * 1000 * s);
  const y1 = t.getFullYear();
  const m1 = t.getMonth() + 1;
  const d1 = t.getDate();
  const y2 = t2.getFullYear();
  const m2 = t2.getMonth() + 1;
  const d2 = t2.getDate();
  return {
    startDate:
      y1 + '-' + (m1 <= 9 ? '0' + m1 : m1) + '-' + (d1 <= 9 ? '0' + d1 : d1),
    endDate:
      y2 + '-' + (m2 <= 9 ? '0' + m2 : m2) + '-' + (d2 <= 9 ? '0' + d2 : d2)
  };
};
export const valueFindLabel = (
  arr: { label?: string; value?: number | string }[],
  v?: number | string
) => {
  return arr.find((e) => e.value === v)?.label || '--';
};
export const handleArrToString = (arr: string[]) => {
  let str = '--';
  if (arr.length) {
    str = '';
    arr.forEach((el: string) => {
      str += el + '、';
    });
    str = str.substring(0, str.length - 1);
  }
  return str;
};

export function dataURLtoFile(dataUrl: string, filename: string) {
  //将base64转换为文件
  const arr: Array<any> = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bStr = window.atob(arr[1]);
  let n = bStr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/*
 * 平台
 * **/

export function getPlatformFlag() {
  const url = location.href;
  const [, current = ''] = url.split('/#/');
  const [path] = current.split('/');
  if (['platform', 'svc', 'pcs', 'vms'].includes(path)) {
    return path;
  }
  return '';
}

export function setActiveProject(id: number | string) {
  if (!id) return;
  lsStore.setItem('projectId', String(id));
}
export function getActiveProjectId() {
  return Number(lsStore.getItem('projectId'));
}
export const formatterNumber = (value: string) => {
  const values = value.split('.');
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return values.join('.');
};
// 数字添加千分位
export function priceShowComma(num: number | string) {
  let result = '';
  let counter = 0;
  const dotIdx = String(num).indexOf('.');
  if (dotIdx !== -1) {
    const content = String(num).substring(dotIdx + 1, String(num).length);
    num = String(num).split('.')[0];
    num = (num || 0).toString();
    for (let i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i !== 0) {
        result = ',' + result;
      }
    }
    result = result + '.' + content;
    return result;
  } else {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
}

export function formatPrice(v?: number | string) {
  if (typeof v === 'undefined' || v === '') return '--';
  let res = String(v);
  if (res.indexOf(',') > -1) return res;
  res = Number.parseFloat(res).toFixed(5);
  return priceShowComma(res.substring(0, res.length - 3));
}

export async function exportDownload<T extends Record<string, any>>(
  requestUrl: string,
  params: T,
  name: string,
  type = 'application/vnd.ms-excel',
  method = 'get'
) {
  try {
    const token = useToken();
    let p = '';
    Object.keys(params).map((i) => {
      p += `${i}=${params[i]}&`;
    });

    const d: any = await axios({
      method,
      url: `${requestUrl}?${p}`,
      headers: {
        Authorization: token.getToken() || ''
      },
      data: method === 'post' ? { ...params } : undefined,
      responseType: 'blob'
    });
    const blob = new Blob([d.data], { type });
    const url = window.URL.createObjectURL(blob);
    download(url, name);
  } catch (e) {
    console.error(e);
  }
}
export async function exportDownloadPost<T extends Record<string, any>>(
  requestUrl: string,
  data: T,
  name: string,
  type = 'application/vnd.ms-excel'
) {
  try {
    const token = useToken();
    const d: any = await axios({
      method: 'post',
      url: requestUrl,
      headers: {
        Authorization: token.getToken() || ''
      },
      responseType: 'blob',
      data
    });
    const blob = new Blob([d.data], { type });
    const url = window.URL.createObjectURL(blob);
    download(url, name);
  } catch (e) {
    console.error(e);
  }
}

export function transformPathName(v: string) {
  return v.replace(/\//g, '-').slice(1);
}

export function genUUID(hyphen = '-') {
  const url = URL.createObjectURL(new Blob());
  const uuid = url.toString();
  return uuid.substr(uuid.lastIndexOf('/') + 1).replace(/-/gim, hyphen);
}

export function assignDeep<T>(
  target: T,
  ...copyItemList: Array<{ [propName: string]: any }>
): T {
  copyItemList.forEach((obj) => {
    for (const [k, v] of Object.entries(cloneDeep(obj))) {
      if (isRef(target)) {
        // @ts-ignore
        target.value[k] = v;
      } else {
        // @ts-ignore
        target[k] = v;
      }
    }
  });
  return target;
}

export function asyncTask<T>(data: T, ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

export function getOptionLabel(
  options: SelectOptions = [],
  value: SelectValue,
  labelKey = 'label',
  valueKey = 'value'
): string {
  const item = options.find((itm) => itm[valueKey] === value);
  return (item?.[labelKey] ?? '') as string;
}

export function modalConfirm(
  content: string,
  fn?: () => void,
  title = '提示',
  opt: Record<string, any> = { hideCancel: false }
) {
  return new Promise((resolve, reject) => {
    Modal.open({
      title,
      content,
      simple: false,
      ...opt,
      onOk: () => {
        fn && fn();
        resolve(true);
      },
      onClose() {
        reject();
      }
    });
  });
}

type Arr = {
  expenseCode: string;
  children?: any[];
};
export function delChildrenByLength(arr: Arr[]) {
  arr.forEach((item: Arr) => {
    if (item.children) {
      if (item.children.length === 0) {
        delete item.children;
      } else {
        delChildrenByLength(item.children);
      }
    }
  });
  return arr;
}

export function resetOptionsData<T, F extends SelectOptions>(
  formModel: Ref<T>,
  optionsData: F,
  modelValueKey: string,
  optionsValueKey = 'value'
) {
  const value = (formModel.value as Recordable)?.[modelValueKey];
  const optionsValueList = optionsData.map((itm) => itm[optionsValueKey]);
  if (Array.isArray(value)) {
    const waiteDeleteList = value.filter((v) => !optionsValueList.includes(v));
    while (waiteDeleteList.length) {
      const v = waiteDeleteList.shift();
      const index = value.indexOf(v);
      index !== -1 && value.splice(index, 1);
    }
  }
  // 已经选择的数据，在新的options中没有，进行重置
  if (!optionsValueList.includes(value)) {
    (formModel.value as Recordable)[modelValueKey] = '';
  }
}
export function hasCapableData<
  T extends {
    businessStat: number;
    auditStat: number;
    [key: string]: any;
  }
>(
  dataList: Array<T>,
  ids: number[],
  businessList: number[],
  auditStatList: number[] = [],
  key = 'id'
) {
  return ids.every((item) => {
    const obj = dataList.find((sub) => Number(sub[key]) === Number(item));
    return (
      obj &&
      (businessList.length ? businessList.includes(obj.businessStat) : true) &&
      (auditStatList.length ? auditStatList.includes(obj.auditStat) : true)
    );
  });
}
// 避免传入的值obj.status 可能是undefined
export const isArrIncludes = (statusList: number[], num?: number) => {
  return statusList.includes(num!);
};
