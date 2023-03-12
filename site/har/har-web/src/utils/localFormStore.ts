/**
 * 如果是vue 尽量toRaw   可能存在克隆不了 存入数据库报错问题
 *
 * */

import localStore from '@/utils/localStore';

export function setLocalForm(key: string, value: any) {
  return localStore.setLocal('local', key, value);
}
export function getLocalForm(key: string) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await localStore.getLocal('local', key);
      if (res) {
        const { value } = res;
        resolve(value);
      } else {
        resolve(res);
      }
    } catch (e) {
      console.error(e);
      reject();
    }
  });
}
export function deleteLocalForm(key: string) {
  return localStore.deleteLocal('local', key);
}
