import axios from '@u/request';

// 获取列表数据
export const getList = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myReimburse/queryMySubmitedList`,
    method: 'post',
    data,
    headers
  });
};

// 删除草稿数据
export const deleteDraft = (id, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myReimburse/ajaxZFClaimBase?claimId=${id}`,
    method: 'post',
    headers
  });
};

// 查询是否有实物
export const queryHasPhysicalBills = (id, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myReimburse/queryHasPhysicalBills?claimId=${id}`,
    method: 'post',
    headers
  });
};

// 保存实物
export const saveAddAfterReal = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/myReimburse/saveAddAfterReal`,
    method: 'post',
    headers,
    data
  });
};


// 实物邮寄获取信息
export const getExpressInfo = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/emsExpressLine/getCurrentUserInfo`,
    method: 'post',
    headers,
    data
  });
};

// 实物邮寄下单
export const sendExpress = (data, headers = {}) => {
  return axios({
    url: `/ems-ms/reimburseService/emsExpressLine/sendAndSave`,
    method: 'post',
    headers,
    data
  });
};
