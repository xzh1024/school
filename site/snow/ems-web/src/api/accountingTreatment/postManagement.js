import axios from '@u/request';

// 顶岗状态列表接口
export const getPostStatusList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/listAccountCoverStatus`,
    method: 'post',
    data,
    headers,
  });
};

// 顶岗状态打开关闭
export const switchPostStatus = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/changeAccountCoverStatus`,
    method: 'post',
    data,
    headers,
  });
};

// 顶岗状态刷新缓存
export const refreshPostStatus = (businessTypeCode, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/refreshAccountCoverStatus2Redis?businessTypeCode=${businessTypeCode}`,
    method: 'post',
    headers,
  });
};

// 业务循环下拉数据
export const getBusinessTypeList = (data={}, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/businessTypeList`,
    method: 'post',
    headers,
    data,
  });
};

// 顶岗管理列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/listByPage`,
    method: 'post',
    headers,
    data,
  });
};

// 模板下载
export const downloadTemplate = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/downloadTemplate`,
    method: 'post',
    headers,
    responseType: 'blob',
    data,
  });
};

// 导入
export const importData = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/accountingService/wrest/accountCover/importData`,
    method: 'post',
    headers,
    data,
  });
};