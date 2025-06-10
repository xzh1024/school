import axios from '@u/request';

export const getList = (data) => {
  //列表接口
  return axios({
    url: `/ems-ms/manageService/fundPool/page`,
    method: 'post',
    data,
  });
};

export const getPoolOptions = (data) => {
  //列表接口
  return axios({
    url: `/ems-ms/manageService/fundPool/getFundPoolAccountList`,
    method: 'post',
    data,
  });
};

export const getOptions = (data) => {
  //列表接口
  return axios({
    url: `/ems-ms/manageService/fundPool/getOuList`,
    method: 'post',
    data,
  });
};

export const save = (data) => {
  //列表接口
  return axios({
    url: `/ems-ms/manageService/fundPool/save`,
    method: 'post',
    data,
  });
};

export const del = (id) => {
  //列表接口
  return axios({
    url: `/ems-ms/manageService/fundPool/del?id=` + id,
    method: 'post',
  });
};