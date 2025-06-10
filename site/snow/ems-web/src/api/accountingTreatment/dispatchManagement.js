import axios from '@u/request';

// 派单列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountEmpExpCategory/listByPage`,
    method: 'post',
    headers,
    data,
  });
};

// 模板下载
export const downloadTemplate = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountEmpExpCategory/downloadTemplate`,
    method: 'post',
    headers,
    responseType: 'blob',
    data,
  });
};

// 导入
export const importData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountEmpExpCategory/importData`,
    method: 'post',
    headers,
    data,
  });
};

// 修改[优先从缓存池抢单]配置
export const changeClaimUseCacheFlag = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountEmpExpCategory/changeClaimUseCacheFlag?openFlag=${data}`,
    method: 'post',
    headers,
  });
};

// 获取初始状态
export const getSwitchStatus = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountEmpExpCategory/home`,
    method: 'post',
    headers,
    data,
  });
};

// 修改抢单开关
export const changeRushFlag = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountRushStatusRecord/changeRushStatus?rushStatus=${data}`,
    method: 'post',
    headers,
  });
};
