import axios from '@u/request';

// 吸并处理
export const doSuction = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/glConsolidation/doGlConsolidation`,
    method: 'post',
    data,
    headers
  });
};

// 获取吸并业务列表
export const getSuctionList = () => {
  return axios({
    url: `/ems-ms/reimburseService/glConsolidation/glConsolidationScope`,
    method: 'get',
  });
};



// 采购吸并处理
export const doSuctionPurchase = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/glConsolidation/doProcureMerge`,
    method: 'post',
    data,
    headers
  });
};

// 获取采购吸并业务列表
export const getSuctionListPurchase = () => {
  return axios({
    url: `/ems-ms/reimburseService/glConsolidation/procureScope`,
    method: 'get',
  });
};