import { Random, mock } from 'mockjs';

export function resData<T>(data: T, code = 200, msg = 'mock拦截成功') {
  return {
    code,
    msg,
    data
  };
}

export function delay(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(''), time);
  });
}

export function create<T>(data: T) {
  return (isMock = true) => {
    if (!isMock) return [];
    return data;
  };
}

export function mockList<T = any>(
  item: T,
  opts?: { pageSize?: number; pageNum?: number }
) {
  const { pageNum = 1, pageSize = 10 } = opts;
  const num = (pageNum - 1) * pageSize;
  const int = Random.integer(0, pageSize * 4);
  let row = pageSize;
  if (int < pageSize) {
    row = int % pageSize;
  }
  if (row === 1) {
    row = 1;
  }
  return mock({
    total: num + int,
    [`rows|${row}`]: [item]
  });
}

export function mockList1<T>(item: T, num = 5) {
  const arr = [];
  for (let index = 0; index < num; index++) {
    arr.push(mock(item));
  }
  return arr;
}

export enum MOCK {
  // 通用ID生成
  id = '@id',
  // 日期
  date = '@date',
  //日期+时间
  datatetime = '@datetime',
  //string
  string = '@string',
  //imageurl
  image = '@image',
  //标题
  title = '@title',
  //中文标题
  ctitle = '@ctitle',
  //名字
  name = '@name',
  //中文名字
  cname = '@cname',
  //boolean
  boolean = '@boolean',
  //单词
  word = '@word',
  //整数
  integer = '@integer'
}
