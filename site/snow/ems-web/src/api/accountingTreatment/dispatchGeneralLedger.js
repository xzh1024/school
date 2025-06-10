import axios from '@u/request';

// 列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/glWrestExpCategory/listByPage`,
    method: 'post',
    headers,
    data,
  });
};

// 获取抢单开关状态、是否优先从缓存池抢单：
export const glWrestExpCategory = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/glWrestExpCategory/home`,
    method: 'post',
    data,
    headers,
  });
};

// 关闭、打开优先从缓存池抢单
export const switchPostStatus = data => {
  const { openFlag } = data;
  return axios({
    url: `/ems-ms/accountingService/wrest/glWrestExpCategory/changeClaimUseCacheFlag?openFlag=${openFlag}`,
    method: 'post',
    data,
  });
};

// 模板下载
export const downloadTemplate = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/glWrestExpCategory/downloadTemplate`,
    method: 'post',
    headers,
    responseType: 'blob',
    data,
  });
};

// 导入
export const importData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/glWrestExpCategory/importData`,
    method: 'post',
    headers,
    data,
  });
};
